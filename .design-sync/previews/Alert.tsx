import { Alert, AlertTitle, AlertDescription, AlertAction, Button } from "careui";

export function Default() {
  return (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}

export function Variants() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Alert variant="info">
        <AlertTitle>Session expiring soon</AlertTitle>
        <AlertDescription>
          Your session will expire in 30 minutes. Save your work to avoid losing changes.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your subscription has been updated. Changes take effect immediately.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Storage limit approaching</AlertTitle>
        <AlertDescription>
          You've used 85% of your storage quota. Consider upgrading your plan.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Unable to save changes</AlertTitle>
        <AlertDescription>
          An error occurred while saving. Please try again or contact support.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function WithAction() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Alert variant="warning" layout="horizontal">
        <AlertTitle>Your trial ends in 3 days</AlertTitle>
        <AlertDescription>
          Upgrade to keep access to all premium features.
        </AlertDescription>
        <AlertAction>
          <Button size="sm">Upgrade now</Button>
          <Button size="sm" variant="ghost">Remind later</Button>
        </AlertAction>
      </Alert>
      <Alert variant="info" layout="horizontal">
        <AlertTitle>New update available</AlertTitle>
        <AlertAction>
          <Button size="sm" variant="secondary">Update</Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
