import { Avatar, AvatarImage, AvatarFallback } from "careui";

export function Default() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?u=alice" alt="Alice Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?u=bob" alt="Bob Smith" />
        <AvatarFallback>BS</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function Shapes() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar shape="circle" size="lg">
        <AvatarFallback color="primary">CC</AvatarFallback>
      </Avatar>
      <Avatar shape="rounded" size="lg">
        <AvatarFallback color="green">RD</AvatarFallback>
      </Avatar>
      <Avatar shape="squircle" size="lg">
        <AvatarFallback color="violet">SQ</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function FallbackColors() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Avatar><AvatarFallback color="primary">P</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="red">R</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="orange">O</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="green">G</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="blue">B</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="violet">V</AvatarFallback></Avatar>
      <Avatar><AvatarFallback color="pink">K</AvatarFallback></Avatar>
    </div>
  );
}
