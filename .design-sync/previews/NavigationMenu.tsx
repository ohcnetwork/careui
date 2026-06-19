import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "careui";

export function MainNav() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Patients</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 p-2 w-48">
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                All Patients
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Admitted
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Discharged
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Clinical</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 p-2 w-48">
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Encounters
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Lab Orders
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Prescriptions
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function SimpleLinks() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} data-active="true">
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Records
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Reports
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Settings
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
