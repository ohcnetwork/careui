import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import {
  CopyIcon,
  FileTextIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const col = (className: string, ...children: React.ReactNode[]) =>
  React.createElement("div", { className }, ...children);

// small avatar helper — no real image in registry previews
const av = (fallback: string) =>
  React.createElement(
    Avatar,
    null,
    React.createElement(AvatarFallback, null, fallback)
  );

// ─── doc ────────────────────────────────────────────────────────────────────

export const messageDoc: ComponentDoc = {
  id: "message",
  name: "Message",
  description:
    "Displays a message in a conversation, with optional avatar, header, footer, and alignment.",
  installation: {
    cli: "npx shadcn@latest add message",
    manual:
      "Copy and paste the message component source code into your project.",
  },
  usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

export function MessageDemo() {
  return (
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}`,

  preview: {
    code: `<div className="flex w-full max-w-sm flex-col gap-6 py-12">
  <Message align="end">
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>Deploying to prod real quick.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message>
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>It&apos;s a one-line change.</BubbleContent>
      </Bubble>
      <MessageFooter>Delivered</MessageFooter>
    </MessageContent>
  </Message>
  <Message>
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>It&apos;s always a one-line change 😭.</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>Alright, let me take a look.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </MessageContent>
  </Message>
</div>`,
    component: col(
      "flex w-full max-w-sm flex-col gap-6 py-12",
      React.createElement(
        Message,
        { align: "end" },
        React.createElement(MessageAvatar, null, av("ME")),
        React.createElement(
          MessageContent,
          null,
          React.createElement(
            Bubble,
            null,
            React.createElement(
              BubbleContent,
              null,
              "Deploying to prod real quick."
            )
          )
        )
      ),
      React.createElement(
        Message,
        null,
        React.createElement(MessageAvatar, null, av("R")),
        React.createElement(
          MessageContent,
          null,
          React.createElement(
            Bubble,
            { variant: "muted" },
            React.createElement(
              BubbleContent,
              null,
              "It's 4:55 PM. On a Friday."
            )
          )
        )
      ),
      React.createElement(
        Message,
        { align: "end" },
        React.createElement(MessageAvatar, null, av("ME")),
        React.createElement(
          MessageContent,
          null,
          React.createElement(
            Bubble,
            null,
            React.createElement(BubbleContent, null, "It's a one-line change.")
          ),
          React.createElement(MessageFooter, null, "Delivered")
        )
      ),
      React.createElement(
        Message,
        null,
        React.createElement(MessageAvatar, null, av("R")),
        React.createElement(
          MessageContent,
          null,
          React.createElement(
            BubbleGroup,
            null,
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "It's always a one-line change 😭."
              )
            ),
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "Alright, let me take a look."
              )
            )
          )
        )
      )
    ),
  },

  examples: [
    // ── Avatar ─────────────────────────────────────────────────────────────
    {
      name: "Avatar",
      description:
        'Use `MessageAvatar` to render an avatar anchored to the bottom of the message. Set `align="end"` on `Message` to mirror the row.',
      code: `<div className="flex w-full max-w-sm flex-col gap-6 py-12">
  <Message>
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>The build failed during dependency installation.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>Can you share the exact error?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-6 py-12",
        React.createElement(
          Message,
          null,
          React.createElement(MessageAvatar, null, av("R")),
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "The build failed during dependency installation."
              )
            )
          )
        ),
        React.createElement(
          Message,
          { align: "end" },
          React.createElement(MessageAvatar, null, av("ME")),
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              null,
              React.createElement(
                BubbleContent,
                null,
                "Can you share the exact error?"
              )
            )
          )
        )
      ),
    },

    // ── Group ──────────────────────────────────────────────────────────────
    {
      name: "Group",
      description:
        "Use `MessageGroup` to stack consecutive messages from the same sender. Render an empty `MessageAvatar` on earlier messages to keep them aligned.",
      code: `<div className="flex w-full max-w-sm flex-col gap-6 py-12">
  <MessageGroup>
    <Message>
      <MessageAvatar />
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>I checked the registry addresses.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The component and example JSON now live under the UI registry.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </MessageGroup>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-6 py-12",
        React.createElement(
          MessageGroup,
          null,
          React.createElement(
            Message,
            null,
            React.createElement(MessageAvatar, null),
            React.createElement(
              MessageContent,
              null,
              React.createElement(
                Bubble,
                { variant: "muted" },
                React.createElement(
                  BubbleContent,
                  null,
                  "I checked the registry addresses."
                )
              )
            )
          ),
          React.createElement(
            Message,
            null,
            React.createElement(MessageAvatar, null, av("CN")),
            React.createElement(
              MessageContent,
              null,
              React.createElement(
                Bubble,
                { variant: "muted" },
                React.createElement(
                  BubbleContent,
                  null,
                  "The component and example JSON now live under the UI registry."
                )
              )
            )
          )
        )
      ),
    },

    // ── Header and Footer ──────────────────────────────────────────────────
    {
      name: "Header and Footer",
      description:
        "Use `MessageHeader` for a sender name above the message and `MessageFooter` for metadata such as delivery status below it.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Message>
    <MessageContent>
      <MessageHeader>Olivia</MessageHeader>
      <Bubble variant="muted">
        <BubbleContent>I already checked the logs.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageContent>
      <Bubble>
        <BubbleContent>
          Send the report to the team. Ping @shadcn if you need help.
        </BubbleContent>
      </Bubble>
      <MessageFooter>
        Read <span className="font-normal">Yesterday</span>
      </MessageFooter>
    </MessageContent>
  </Message>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Message,
          null,
          React.createElement(
            MessageContent,
            null,
            React.createElement(MessageHeader, null, "Olivia"),
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "I already checked the logs."
              )
            )
          )
        ),
        React.createElement(
          Message,
          { align: "end" },
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              null,
              React.createElement(
                BubbleContent,
                null,
                "Send the report to the team. Ping @shadcn if you need help."
              )
            ),
            React.createElement(
              MessageFooter,
              null,
              "Read ",
              React.createElement(
                "span",
                { className: "font-normal" },
                "Yesterday"
              )
            )
          )
        )
      ),
    },

    // ── Actions ────────────────────────────────────────────────────────────
    {
      name: "Actions",
      description:
        "Place message-level action buttons in `MessageFooter`, such as copy, retry, or feedback buttons.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Message>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>
          The install failure is coming from the workspace package.
        </BubbleContent>
      </Bubble>
      <MessageFooter>
        <Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
          <CopyIcon />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Like" title="Like">
          <ThumbsUpIcon />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Dislike" title="Dislike">
          <ThumbsDownIcon />
        </Button>
      </MessageFooter>
    </MessageContent>
  </Message>
  <Message align="end">
    <MessageContent>
      <Bubble>
        <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
      </Bubble>
      <MessageFooter className="gap-2">
        <span className="font-normal text-destructive">Failed to send</span>
        <Button variant="ghost" size="icon-xs" title="Retry" aria-label="Retry">
          <RefreshCcwIcon />
        </Button>
      </MessageFooter>
    </MessageContent>
  </Message>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Message,
          null,
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "The install failure is coming from the workspace package."
              )
            ),
            React.createElement(
              MessageFooter,
              null,
              React.createElement(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Copy",
                  title: "Copy",
                },
                React.createElement(CopyIcon)
              ),
              React.createElement(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Like",
                  title: "Like",
                },
                React.createElement(ThumbsUpIcon)
              ),
              React.createElement(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Dislike",
                  title: "Dislike",
                },
                React.createElement(ThumbsDownIcon)
              )
            )
          )
        ),
        React.createElement(
          Message,
          { align: "end" },
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              null,
              React.createElement(
                BubbleContent,
                null,
                "Okay drop me a link. Taking a look..."
              )
            ),
            React.createElement(
              MessageFooter,
              { className: "gap-2" },
              React.createElement(
                "span",
                { className: "font-normal text-destructive" },
                "Failed to send"
              ),
              React.createElement(
                Button,
                {
                  variant: "ghost",
                  size: "icon-xs",
                  title: "Retry",
                  "aria-label": "Retry",
                },
                React.createElement(RefreshCcwIcon)
              )
            )
          )
        )
      ),
    },

    // ── Attachment ─────────────────────────────────────────────────────────
    {
      name: "Attachment",
      description:
        "Render `Attachment` inside `MessageContent` alongside a `Bubble` to display file or image attachments in a message.",
      code: `<div className="flex w-full max-w-sm flex-col gap-8 py-12">
  <Message>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>
          Done. Here&apos;s the PDF with the image added as the cover page.
        </BubbleContent>
      </Bubble>
      <Attachment>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            type="button"
            title="Download"
            aria-label="Download"
            size="icon-sm"
            variant="secondary"
          >
            <DownloadIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </MessageContent>
  </Message>
</div>`,
      preview: col(
        "flex w-full max-w-sm flex-col gap-8 py-12",
        React.createElement(
          Message,
          null,
          React.createElement(
            MessageContent,
            null,
            React.createElement(
              Bubble,
              { variant: "muted" },
              React.createElement(
                BubbleContent,
                null,
                "Done. Here's the PDF with the image added as the cover page."
              )
            ),
            React.createElement(
              Attachment,
              null,
              React.createElement(
                AttachmentMedia,
                null,
                React.createElement(FileTextIcon)
              ),
              React.createElement(
                AttachmentContent,
                null,
                React.createElement(
                  AttachmentTitle,
                  null,
                  "sales-dashboard.pdf"
                ),
                React.createElement(AttachmentDescription, null, "PDF · 2.4 MB")
              ),
              React.createElement(
                AttachmentActions,
                null,
                React.createElement(
                  AttachmentAction,
                  {
                    title: "Download",
                    "aria-label": "Download",
                    size: "icon-sm",
                    variant: "secondary",
                  },
                  React.createElement(FileTextIcon)
                )
              )
            )
          )
        )
      ),
    },
  ],

  props: [
    {
      name: "align",
      type: '"start" | "end"',
      default: '"start"',
      description:
        "The alignment of the message row. Apply on Message. Use `end` for the current user's messages.",
    },
  ],
};
