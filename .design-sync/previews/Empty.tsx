import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Button,
} from "careui";
import { InboxIcon, SearchIcon, ServerCrashIcon } from "lucide-react";

export function NoData() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No records yet</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first record.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create record</Button>
      </EmptyContent>
    </Empty>
  );
}

export function NoSearchResults() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you are looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear filters</Button>
      </EmptyContent>
    </Empty>
  );
}

export function ErrorState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ServerCrashIcon />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          We could not load your data. Please try again or{" "}
          <a href="#">contact support</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Retry</Button>
      </EmptyContent>
    </Empty>
  );
}

export function Minimal() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No patients assigned</EmptyTitle>
        <EmptyDescription>
          Patients will appear here once they are assigned to you.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
