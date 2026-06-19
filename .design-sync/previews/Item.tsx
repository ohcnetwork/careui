import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemActions,
  ItemSeparator,
  ItemHeader,
  ItemFooter,
} from "careui";
import { Badge } from "careui";
import { Button } from "careui";
import { Bell, User, FileText } from "lucide-react";

export function PatientCard() {
  return (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="image">
            <div className="size-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <User className="size-5 text-primary" />
            </div>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Rahul Sharma</ItemTitle>
            <ItemDescription>
              OP/2024/001234 · 34 years · Male
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="outline">Admitted</Badge>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="image">
            <div className="size-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <User className="size-5 text-primary" />
            </div>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Priya Menon</ItemTitle>
            <ItemDescription>
              OP/2024/001235 · 28 years · Female
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="outline">Discharged</Badge>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}

export function TaskItem() {
  return (
    <div className="w-96">
      <ItemGroup>
        <Item variant="muted" size="sm">
          <ItemMedia variant="icon">
            <FileText className="text-muted-foreground" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Review discharge summary</ItemTitle>
            <ItemDescription>Patient Rahul Sharma · Ward 3B</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Review
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="muted" size="sm">
          <ItemMedia variant="icon">
            <Bell className="text-muted-foreground" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Lab results available</ItemTitle>
            <ItemDescription>CBC Panel · Received 10 min ago</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge>New</Badge>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}

export function ItemWithHeader() {
  return (
    <div className="w-96">
      <Item variant="outline">
        <ItemHeader>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Encounter #2024-1189
          </span>
          <Badge variant="outline" className="text-xs">
            OPD
          </Badge>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>General Consultation</ItemTitle>
          <ItemDescription>
            Dr. Anita Patel · 14 Jun 2024 · 10:30 AM
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">ICD-10: J00</span>
          <Button size="sm" variant="ghost">
            View details
          </Button>
        </ItemFooter>
      </Item>
    </div>
  );
}
