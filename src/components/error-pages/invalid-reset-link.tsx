import { KeyRound, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function InvalidResetLinkErrorPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="bg-muted text-muted-foreground mx-auto flex size-14 items-center justify-center rounded-full">
          <KeyRound className="size-6" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            This reset link is no longer valid
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6 text-balance">
            Password reset links expire after one&nbsp;hour and can only be used
            once. Request a new link and we&rsquo;ll send it to your registered
            email.
          </p>
        </div>

        <ul className="border-border bg-card divide-border mt-8 divide-y rounded-lg border text-sm">
          <li className="flex items-center justify-between px-4 py-3">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">Expired</span>
          </li>
          <li className="flex items-center justify-between px-4 py-3">
            <span className="text-muted-foreground">Issued</span>
            <span className="font-medium">2&nbsp;hours ago</span>
          </li>
          <li className="flex items-center justify-between px-4 py-3">
            <span className="text-muted-foreground">Valid for</span>
            <span className="font-medium">1&nbsp;hour</span>
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-2">
          <Button size="lg" className="w-full">
            <Mail data-icon="inline-start" />
            Send a new reset link
          </Button>
          <Button size="lg" variant="ghost" className="w-full">
            Back to sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
