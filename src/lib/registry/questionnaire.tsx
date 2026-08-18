import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const questionnaireItems = [
  {
    choices: [
      {
        description: "Show what the agent ran and what came back.",
        label: "Tool call timeline",
        value: "tool-calls",
      },
      {
        description: "Ask before sensitive or destructive actions.",
        label: "Approval checkpoints",
        value: "approvals",
      },
      {
        description: "Make delegated work and results easier to follow.",
        label: "Sub-agent handoffs",
        value: "handoffs",
      },
    ],
    description: "Choose a direction or describe another task.",
    input: {
      label: "Another agent feature",
      placeholder: "Describe another feature...",
    },
    name: "direction",
    required: true,
    title: "What should the agent build next?",
  },
  {
    choices: [
      { label: "Progress", value: "progress" },
      { label: "Decisions", value: "decisions" },
      { label: "Risks", value: "risks" },
      { label: "Next step", value: "next-step" },
    ],
    description: "Select all that apply, or skip this question.",
    multiple: true,
    name: "signals",
    required: false,
    title: "What should every progress update include?",
  },
  {
    choices: [
      { label: "Start now", value: "now" },
      { label: "Next development cycle", value: "next-cycle" },
      { label: "Add it to the backlog", value: "backlog" },
    ],
    description: "Choose when the agent should begin the work.",
    name: "timing",
    required: true,
    title: "When should work begin?",
  },
] as const;

export const questionnaireDoc: ComponentDoc = {
  id: "questionnaire",
  name: "Questionnaire",
  description:
    "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.",
  installation: {
    cli: "npx shadcn@latest add questionnaire",
    manual:
      "Install @shadcn/react and copy the questionnaire component source code into your project.",
  },
  usage: `import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  {
    name: "direction",
    required: true,
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    choices: [
      { value: "delegation", label: "Delegation" },
      { value: "questions", label: "Question prompts" },
      { value: "both", label: "Both together" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer..." },
  },
] as const

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  {items.map((question) => (
    <QuestionnaireItem
      key={question.name}
      name={question.name}
      required={question.required}
    >
      <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
      <QuestionnaireDescription>{question.description}</QuestionnaireDescription>
      <QuestionnaireChoices>
        {question.choices.map((choice) => (
          <QuestionnaireChoice key={choice.value} value={choice.value}>
            <span className="font-medium">{choice.label}</span>
          </QuestionnaireChoice>
        ))}
        {"input" in question ? (
          <QuestionnaireInput
            aria-label={question.input.label}
            placeholder={question.input.placeholder}
          />
        ) : null}
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
  ))}
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`,
  preview: {
    code: `"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const questionnaireItems = [
  {
    choices: [
      { label: "Tool call timeline", value: "tool-calls" },
      { label: "Approval checkpoints", value: "approvals" },
      { label: "Sub-agent handoffs", value: "handoffs" },
    ],
    description: "Choose a direction or describe another task.",
    input: {
      label: "Another agent feature",
      placeholder: "Describe another feature...",
    },
    name: "direction",
    required: true,
    title: "What should the agent build next?",
  },
  {
    choices: [
      { label: "Progress", value: "progress" },
      { label: "Decisions", value: "decisions" },
      { label: "Risks", value: "risks" },
      { label: "Next step", value: "next-step" },
    ],
    description: "Select all that apply, or skip this question.",
    multiple: true,
    name: "signals",
    required: false,
    title: "What should every progress update include?",
  },
  {
    choices: [
      { label: "Start now", value: "now" },
      { label: "Next development cycle", value: "next-cycle" },
      { label: "Add it to the backlog", value: "backlog" },
    ],
    description: "Choose when the agent should begin the work.",
    name: "timing",
    required: true,
    title: "When should work begin?",
  },
] as const

export function QuestionnaireDemo() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="direction"
      items={questionnaireItems}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      {questionnaireItems.map((question) => (
        <QuestionnaireItem
          key={question.name}
          multiple={"multiple" in question && question.multiple}
          name={question.name}
          required={question.required}
        >
          <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
          <QuestionnaireDescription>
            {question.description}
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            {question.choices.map((choice) => (
              <QuestionnaireChoice key={choice.value} value={choice.value}>
                <span className="font-medium">{choice.label}</span>
                {"description" in choice ? (
                  <span className="text-muted-foreground">
                    {choice.description}
                  </span>
                ) : null}
              </QuestionnaireChoice>
            ))}
            {"input" in question ? (
              <QuestionnaireInput
                aria-label={question.input.label}
                placeholder={question.input.placeholder}
              />
            ) : null}
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
      ))}
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}`,
    component: React.createElement(() => {
      function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
      }

      return React.createElement(
        Questionnaire,
        {
          className: "mx-auto max-w-md",
          defaultItem: "direction",
          items: questionnaireItems,
          shortcuts: "letters",
          onSubmit: handleSubmit,
        },
        React.createElement(QuestionnaireProgress),
        questionnaireItems.map((question) =>
          React.createElement(
            QuestionnaireItem,
            {
              key: question.name,
              multiple: "multiple" in question && Boolean(question.multiple),
              name: question.name,
              required: question.required,
            },
            React.createElement(QuestionnaireTitle, {}, question.title),
            React.createElement(
              QuestionnaireDescription,
              {},
              question.description
            ),
            React.createElement(
              QuestionnaireChoices,
              {},
              question.choices.map((choice) =>
                React.createElement(
                  QuestionnaireChoice,
                  { key: choice.value, value: choice.value },
                  React.createElement(
                    "span",
                    { className: "font-medium" },
                    choice.label
                  ),
                  "description" in choice
                    ? React.createElement(
                        "span",
                        { className: "text-muted-foreground" },
                        choice.description
                      )
                    : null
                )
              ),
              "input" in question
                ? React.createElement(QuestionnaireInput, {
                    "aria-label": question.input.label,
                    placeholder: question.input.placeholder,
                  })
                : null
            ),
            React.createElement(QuestionnaireError)
          )
        ),
        React.createElement(
          QuestionnaireActions,
          {},
          React.createElement(QuestionnairePrevious),
          React.createElement(QuestionnaireSkip),
          React.createElement(QuestionnaireNext, {}, "Next"),
          React.createElement(QuestionnaireSubmit, {}, "Save plan")
        )
      );
    }),
  },
  examples: [
    {
      name: "Multiple Selection",
      description:
        "Use the multiple prop for items that accept more than one fixed answer.",
      code: `const items = [
  {
    name: "context",
    required: true,
    multiple: true,
    choices: [
      { value: "source", label: "Relevant source files" },
      { value: "tests", label: "Existing tests" },
      { value: "docs", label: "Architecture docs" },
    ],
  },
] as const

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireItem name="context" multiple required>
    <QuestionnaireTitle>What context should the agent inspect?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="source">Relevant source files</QuestionnaireChoice>
      <QuestionnaireChoice value="tests">Existing tests</QuestionnaireChoice>
      <QuestionnaireChoice value="docs">Architecture docs</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
  </QuestionnaireActions>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          items={[
            {
              name: "context",
              required: true,
              choices: [
                { value: "source" },
                { value: "tests" },
                { value: "docs" },
              ],
            },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireItem name="context" multiple required>
            <QuestionnaireTitle>
              What context should the agent inspect?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="source">
                Relevant source files
              </QuestionnaireChoice>
              <QuestionnaireChoice value="tests">
                Existing tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="docs">
                Architecture docs
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Freeform Answer",
      description:
        "Compose QuestionnaireInput with fixed choices when users can provide another answer.",
      code: `<QuestionnaireItem name="approach" required>
  <QuestionnaireTitle>
    How should the agent approach this refactor?
  </QuestionnaireTitle>
  <QuestionnaireChoices>
    <QuestionnaireChoice value="incremental">
      Make the smallest safe change
    </QuestionnaireChoice>
    <QuestionnaireChoice value="module">
      Refactor one module at a time
    </QuestionnaireChoice>
    <QuestionnaireInput
      aria-label="Another refactoring approach"
      placeholder="Describe another approach..."
    />
  </QuestionnaireChoices>
  <QuestionnaireError />
</QuestionnaireItem>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          items={[
            {
              name: "approach",
              required: true,
              choices: [
                { value: "incremental" },
                { value: "module" },
                { value: "rewrite" },
              ],
            },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireItem name="approach" required>
            <QuestionnaireTitle>
              How should the agent approach this refactor?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="incremental">
                Make the smallest safe change
              </QuestionnaireChoice>
              <QuestionnaireChoice value="module">
                Refactor one module at a time
              </QuestionnaireChoice>
              <QuestionnaireChoice value="rewrite">
                Replace implementation
              </QuestionnaireChoice>
              <QuestionnaireInput
                aria-label="Another approach"
                placeholder="Describe another approach..."
              />
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnaireSubmit>Use approach</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Explicit Skip",
      description:
        "Add QuestionnaireSkip when an optional item may be intentionally left unanswered.",
      code: `<QuestionnaireActions>
  <QuestionnairePrevious />
  <QuestionnaireSkip />
  <QuestionnaireNext>Next</QuestionnaireNext>
  <QuestionnaireSubmit>Submit brief</QuestionnaireSubmit>
</QuestionnaireActions>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="task"
          items={[{ name: "task", required: true }, { name: "constraints" }]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="task" required>
            <QuestionnaireTitle>
              What kind of change is this?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="feature">Feature</QuestionnaireChoice>
              <QuestionnaireChoice value="fix">Bug fix</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="constraints">
            <QuestionnaireTitle>Any constraints?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="preserve-api">
                Preserve API
              </QuestionnaireChoice>
              <QuestionnaireInput
                aria-label="Other constraint"
                placeholder="Describe another constraint..."
              />
            </QuestionnaireChoices>
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Submit brief</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Shortcuts",
      description:
        "Assign a letter or number key to each answer with shortcuts.",
      code: `<Questionnaire
  items={items}
  shortcuts="letters"
  onSubmit={handleSubmit}
>
  <QuestionnaireItem name="action" required>
    <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="inspect">Inspect implementation</QuestionnaireChoice>
      <QuestionnaireChoice value="tests">Run tests</QuestionnaireChoice>
      <QuestionnaireChoice value="patch">Prepare patch</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          items={[
            {
              name: "action",
              required: true,
              choices: [
                { value: "inspect" },
                { value: "tests" },
                { value: "patch" },
              ],
            },
          ]}
          shortcuts="letters"
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireItem name="action" required>
            <QuestionnaireTitle>
              What should the agent do next?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="inspect">
                Inspect implementation
              </QuestionnaireChoice>
              <QuestionnaireChoice value="tests">Run tests</QuestionnaireChoice>
              <QuestionnaireChoice value="patch">
                Prepare patch
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Custom Validation",
      description:
        "Combine controlled navigation with an external schema like Zod to return to invalid items and show errors.",
      code: `const questionnaireSchema = z.object({
  detail: z.enum(["summary", "complete"]),
  audience: z.enum(["team", "public"]),
})

<Questionnaire item={item} items={items} onItemChange={setItem} onSubmit={handleSubmit}>
  <QuestionnaireItem invalid={Boolean(errors.detail)} name="detail" required>
    <QuestionnaireTitle>How much detail should the answer include?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="summary">Concise summary</QuestionnaireChoice>
      <QuestionnaireChoice value="complete">Complete answer</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError>{errors.detail}</QuestionnaireError>
  </QuestionnaireItem>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          item="detail"
          items={[
            { name: "detail", required: true },
            { name: "audience", required: true },
          ]}
          onItemChange={() => undefined}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireItem invalid name="detail" required>
            <QuestionnaireTitle>
              How much detail should the answer include?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="summary">
                Concise summary
              </QuestionnaireChoice>
              <QuestionnaireChoice value="complete">
                Complete answer
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>
              Public answers need enough context. Choose a complete answer.
            </QuestionnaireError>
          </QuestionnaireItem>
          <QuestionnaireItem name="audience" required>
            <QuestionnaireTitle>Who will read the answer?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="team">My team</QuestionnaireChoice>
              <QuestionnaireChoice value="public">
                Public audience
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Validate</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Controlled",
      description:
        "Control the active item from host state, such as returning to an invalid step.",
      code: `<Questionnaire
  item={item}
  items={items}
  onItemChange={setItem}
  onSubmit={handleSubmit}
>
  <QuestionnaireProgress />
  <QuestionnaireItem name="scope" required>{/* ... */}</QuestionnaireItem>
  <QuestionnaireItem name="checks" required>{/* ... */}</QuestionnaireItem>
  <QuestionnaireItem name="output" required>{/* ... */}</QuestionnaireItem>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          item="scope"
          items={[
            { name: "scope", required: true },
            { name: "checks", required: true },
            { name: "output", required: true },
          ]}
          onItemChange={() => undefined}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="scope" required>
            <QuestionnaireTitle>What may the agent change?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="component">
                Target component
              </QuestionnaireChoice>
              <QuestionnaireChoice value="feature">
                Feature area
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="checks" required>
            <QuestionnaireTitle>Verification depth</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="targeted">
                Targeted tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="full">
                Full checks
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="output" required>
            <QuestionnaireTitle>Final output</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="summary">Summary</QuestionnaireChoice>
              <QuestionnaireChoice value="handoff">
                Detailed handoff
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save workflow</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Resume",
      description:
        "Restore a saved active item and default answers, then reset changes back to that saved state.",
      code: `<Questionnaire
  defaultItem="verification"
  items={items}
  onReset={() => toast("Saved answers restored")}
  onSubmit={handleSubmit}
>
  <QuestionnaireProgress />
  <QuestionnaireItem name="change" required>{/* ... */}</QuestionnaireItem>
  <QuestionnaireItem name="verification" multiple required>{/* ... */}</QuestionnaireItem>
  <QuestionnaireItem name="notes">{/* ... */}</QuestionnaireItem>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="verification"
          items={[
            { name: "change", required: true },
            { name: "verification", required: true },
            { name: "notes" },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="change" required>
            <QuestionnaireTitle>Migration type</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="incremental" defaultChecked>
                Incremental migration
              </QuestionnaireChoice>
              <QuestionnaireChoice value="cutover">
                Single cutover
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="verification" multiple required>
            <QuestionnaireTitle>Verification</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="tests" defaultChecked>
                Run tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="typecheck" defaultChecked>
                Typecheck
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="notes">
            <QuestionnaireTitle>Notes</QuestionnaireTitle>
            <QuestionnaireInput
              aria-label="Saved note"
              defaultValue="Keep public API stable."
            />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Update draft</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Conditional Items",
      description: "Disable items that do not apply to earlier answers.",
      code: `const items = [
  { name: "runtime", required: true },
  { name: "environment", required: true, disabled: runtime !== "cloud" },
  { name: "approval", required: true },
]

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireItem name="runtime" required>{/* ... */}</QuestionnaireItem>
  <QuestionnaireItem name="environment" disabled={runtime !== "cloud"} required>
    {/* ... */}
  </QuestionnaireItem>
  <QuestionnaireItem name="approval" required>{/* ... */}</QuestionnaireItem>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="runtime"
          items={[
            { name: "runtime", required: true },
            { name: "environment", required: true, disabled: true },
            { name: "approval", required: true },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="runtime" required>
            <QuestionnaireTitle>Runtime</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="local">
                Local workspace
              </QuestionnaireChoice>
              <QuestionnaireChoice value="cloud">
                Cloud workspace
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem disabled name="environment" required>
            <QuestionnaireTitle>Cloud environment</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="preview">Preview</QuestionnaireChoice>
              <QuestionnaireChoice value="staging">Staging</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="approval" required>
            <QuestionnaireTitle>Approval timing</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="writes">
                Before writes
              </QuestionnaireChoice>
              <QuestionnaireChoice value="sensitive">
                Sensitive only
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Navigation State",
      description:
        "Read item status to opt into disabled navigation and custom action styling.",
      code: `<QuestionnaireNext
  className="data-[status=unanswered]:opacity-50"
  disabled={unanswered}
  variant="secondary"
>
  Next
</QuestionnaireNext>
<QuestionnaireSubmit disabled={unanswered}>
  Save permissions
</QuestionnaireSubmit>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="permission"
          items={[
            { name: "permission", required: true },
            { name: "verification", required: true },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="permission" required>
            <QuestionnaireTitle>Permission scope</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="files">Files</QuestionnaireChoice>
              <QuestionnaireChoice value="config">
                Files and config
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="verification" required>
            <QuestionnaireTitle>Verification</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
              <QuestionnaireChoice value="all">All checks</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext variant="secondary">Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save permissions</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Custom Progress",
      description:
        "Use Progress render state to build a custom progress indicator.",
      code: `<QuestionnaireProgress
  className="w-full"
  render={(props, state) => (
    <div {...props}>
      <div className="mb-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: state.total }, (_, index) => (
          <span
            key={index}
            className={
              index < state.current
                ? "h-1.5 flex-1 rounded-full bg-primary"
                : "h-1.5 flex-1 rounded-full bg-muted"
            }
          />
        ))}
      </div>
      <span>Checkpoint {state.current} of {state.total}</span>
    </div>
  )}
/>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="scope"
          items={[
            { name: "scope", required: true },
            { name: "strategy", required: true },
            { name: "tests", required: true },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress
            className="w-full"
            render={(props, state) => (
              <div {...props}>
                <div className="mb-2 flex gap-1.5" aria-hidden="true">
                  {Array.from({ length: state.total }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < state.current
                          ? "bg-primary h-1.5 flex-1 rounded-full"
                          : "bg-muted h-1.5 flex-1 rounded-full"
                      }
                    />
                  ))}
                </div>
                <span>
                  Checkpoint {state.current} of {state.total}
                </span>
              </div>
            )}
          />
          <QuestionnaireItem name="scope" required>
            <QuestionnaireTitle>Change scope</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="small">
                Small patch
              </QuestionnaireChoice>
              <QuestionnaireChoice value="large">
                Large refactor
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Finish plan</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Animated Items",
      description:
        "Animate the active item while keeping progress and navigation stationary.",
      code: `const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none"

<QuestionnaireItem className={itemClassName} name="task" required>
  {/* ... */}
</QuestionnaireItem>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="task"
          items={[
            { name: "task", required: true },
            { name: "review", required: true },
          ]}
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem
            className="data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300"
            name="task"
            required
          >
            <QuestionnaireTitle>Task</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="implement">
                Implement
              </QuestionnaireChoice>
              <QuestionnaireChoice value="debug">Debug</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save workflow</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      ),
    },
    {
      name: "Card",
      description:
        "Compose Questionnaire with Card slots while keeping title and description semantic.",
      code: `<Questionnaire defaultItem="task" items={items} shortcuts="numbers" onSubmit={handleSubmit}>
  <Card>
    <QuestionnaireItem aria-labelledby={taskTitleId} name="task" required>
      <CardHeader>
        <QuestionnaireTitle id={taskTitleId} render={<CardTitle />}>
          What should the agent work on?
        </QuestionnaireTitle>
      </CardHeader>
    </QuestionnaireItem>
  </Card>
</Questionnaire>`,
      preview: (
        <Questionnaire
          className="mx-auto max-w-md"
          defaultItem="task"
          items={[
            { name: "task", required: true },
            { name: "output", required: true },
          ]}
          shortcuts="numbers"
          onSubmit={(event) => event.preventDefault()}
        >
          <Card className="w-full">
            <QuestionnaireItem name="task" required>
              <CardHeader>
                <QuestionnaireTitle render={<CardTitle />}>
                  What should the agent work on?
                </QuestionnaireTitle>
                <QuestionnaireDescription render={<CardDescription />}>
                  Choose the next task.
                </QuestionnaireDescription>
              </CardHeader>
              <CardContent>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="fix">
                    Fix tests
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="docs">
                    Update docs
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
              </CardContent>
            </QuestionnaireItem>
            <CardFooter>
              <QuestionnaireActions className="w-full">
                <QuestionnairePrevious />
                <QuestionnaireNext>Next</QuestionnaireNext>
                <QuestionnaireSubmit>Create task</QuestionnaireSubmit>
              </QuestionnaireActions>
            </CardFooter>
          </Card>
        </Questionnaire>
      ),
    },
    {
      name: "Dialog",
      description:
        "Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.",
      code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger render={<Button variant="outline" />}>Open clarification</DialogTrigger>
  <DialogContent>
    <Questionnaire defaultItem="scope" items={items} onSubmit={handleSubmit}>
      <QuestionnaireItem name="scope" required>{/* ... */}</QuestionnaireItem>
      <QuestionnaireItem name="tests" required>{/* ... */}</QuestionnaireItem>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Send answer</QuestionnaireSubmit>
        </QuestionnaireActions>
      </DialogFooter>
    </Questionnaire>
  </DialogContent>
</Dialog>`,
      preview: (
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Open clarification
          </DialogTrigger>
          <DialogContent>
            <Questionnaire
              defaultItem="scope"
              items={[
                { name: "scope", required: true },
                { name: "tests", required: true },
              ]}
              onSubmit={(event) => event.preventDefault()}
            >
              <QuestionnaireItem name="scope" required>
                <QuestionnaireProgress />
                <QuestionnaireTitle render={<DialogTitle />}>
                  Which files are in scope?
                </QuestionnaireTitle>
                <QuestionnaireDescription render={<DialogDescription />}>
                  Choose change scope.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="component">
                    Component only
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="feature">
                    Feature directory
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="tests" required>
                <QuestionnaireProgress />
                <QuestionnaireTitle render={<DialogTitle />}>
                  Verification depth?
                </QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="targeted">
                    Targeted tests
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="full">
                    Full workspace checks
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <DialogFooter>
                <DialogClose
                  render={<Button type="button" variant="outline" />}
                >
                  Cancel
                </DialogClose>
                <QuestionnaireActions>
                  <QuestionnairePrevious />
                  <QuestionnaireNext>Next</QuestionnaireNext>
                  <QuestionnaireSubmit>Send answer</QuestionnaireSubmit>
                </QuestionnaireActions>
              </DialogFooter>
            </Questionnaire>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      name: "Accessibility",
      description:
        "QuestionnaireItem renders a fieldset and QuestionnaireTitle renders its legend. Active descriptions and errors are linked, invalid items set aria-invalid, and navigation uses native buttons.",
      items: [
        {
          title: "Labeling",
          description:
            "Always provide QuestionnaireInput an accessible name via visible label, aria-label, or aria-labelledby.",
        },
        {
          title: "Navigation",
          description:
            "Successful navigation focuses the newly active item; failed validation focuses an available answer control.",
        },
      ],
    },
    {
      name: "Composition",
      description:
        "Questionnaire owns item order, active item, answer state, validation, progress, and navigation.",
      code: `Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit`,
      preview: (
        <pre className="bg-muted/30 w-full overflow-x-auto rounded-md border p-4 text-sm leading-relaxed">
          {`Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit`}
        </pre>
      ),
    },
    {
      name: "Server Rendering",
      description:
        "Pass items to server-render active item, progress, actions, and answer shortcuts. See /docs/react/questionnaire for complete behavior.",
    },
    {
      name: "Unstyled",
      description:
        "The behavior comes from @shadcn/react. Use it directly when you need custom markup and styling.",
    },
    {
      name: "API Reference",
      description:
        "Styled parts inherit unstyled props. Navigation parts also accept Button size and variant props; QuestionnaireActions is a styled-only layout helper.",
    },
  ],
};
