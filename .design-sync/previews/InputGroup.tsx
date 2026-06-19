import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "careui";
import { Search, Eye, Globe } from "lucide-react";

export function SearchField() {
  return (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <Search />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Search patients..." />
      </InputGroup>
    </div>
  );
}

export function UrlField() {
  return (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <Globe />
            https://
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </div>
  );
}

export function PasswordField() {
  return (
    <div className="w-80">
      <InputGroup>
        <InputGroupInput type="password" placeholder="Enter password" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Toggle visibility">
            <Eye />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function TextareaWithLabel() {
  return (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="block-start">
          <span className="text-xs font-medium text-muted-foreground">Notes</span>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="Add clinical notes..." rows={3} />
      </InputGroup>
    </div>
  );
}
