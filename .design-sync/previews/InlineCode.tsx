import { InlineCode } from "careui";

export function Default() {
  return <InlineCode>npm install careui</InlineCode>;
}

export function InSentence() {
  return (
    <p className="text-sm">
      Run <InlineCode>pnpm dev</InlineCode> to start the development server.
    </p>
  );
}

export function CommandSnippets() {
  return (
    <div className="space-y-2 text-sm">
      <p>
        Install dependencies: <InlineCode>npm install</InlineCode>
      </p>
      <p>
        Build for production: <InlineCode>npm run build</InlineCode>
      </p>
      <p>
        Run tests: <InlineCode>npm test</InlineCode>
      </p>
    </div>
  );
}

export function ApiReference() {
  return (
    <div className="space-y-1 text-sm">
      <p>
        Use the <InlineCode>variant</InlineCode> prop to change the button style.
      </p>
      <p>
        The <InlineCode>size</InlineCode> prop accepts{" "}
        <InlineCode>sm</InlineCode>, <InlineCode>md</InlineCode>, or{" "}
        <InlineCode>lg</InlineCode>.
      </p>
    </div>
  );
}
