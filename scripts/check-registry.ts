#!/usr/bin/env tsx
/**
 * Registry Drift Check
 *
 * Verifies that the committed registry JSON under public/registry/care-ui/**
 * matches what scripts/generate-registry.ts produces from the current source
 * in src/components/ui/*.tsx and src/hooks/*.ts.
 *
 * Run in CI and locally. If the generated output differs from what is
 * committed, the source was changed without running `pnpm build:registry`.
 *
 * Exit codes:
 *   0 - registry is in sync (no drift)
 *   1 - drift detected (regenerated files differ from committed)
 *   2 - the check itself failed to run (generation or git error)
 */

import { execFileSync } from "child_process";
import { generateRegistry, registryConfig } from "./generate-registry";

const REGISTRY_PATH = registryConfig.registryDir;

function gitChangedFiles(pathspec: string): string[] {
  const out = execFileSync("git", ["status", "--porcelain", "--", pathspec], {
    encoding: "utf-8",
  });
  return out
    .split("\n")
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

async function main(): Promise<void> {
  // Snapshot drift that already exists before we regenerate, so we don't
  // wrongly blame regeneration for an unrelated dirty working tree.
  const preexisting = new Set(gitChangedFiles(REGISTRY_PATH));

  console.log("🔍 Regenerating registry to check for drift...");
  await generateRegistry();

  const changed = gitChangedFiles(REGISTRY_PATH).filter(
    (file) => !preexisting.has(file)
  );

  if (changed.length === 0) {
    console.log(`✅ Registry is in sync — no drift in ${REGISTRY_PATH}`);
    return;
  }

  console.error(
    `\n❌ Registry drift detected. ${changed.length} file(s) differ from source:`
  );
  for (const file of changed) {
    console.error(`   - ${file}`);
  }
  console.error(
    "\nThe component source was changed without regenerating the registry."
  );
  console.error(
    "Fix: run `pnpm build:registry` and commit the updated JSON files.\n"
  );
  process.exit(1);
}

main().catch((error) => {
  console.error("❌ Registry check failed to run:", error);
  process.exit(2);
});
