import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "careui";

export function Default() {
  return (
    <div className="px-12 w-80">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="flex h-32 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-medium text-sm">
              Slide 1 — Vitals
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex h-32 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-medium text-sm">
              Slide 2 — Lab Results
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex h-32 items-center justify-center rounded-lg bg-violet-100 text-violet-700 font-medium text-sm">
              Slide 3 — Medications
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export function MultipleVisible() {
  return (
    <div className="px-12 w-96">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <CarouselItem key={day} className="basis-1/3">
              <div className="flex h-20 flex-col items-center justify-center rounded-lg bg-muted text-sm font-medium gap-1">
                <span className="text-muted-foreground text-xs">{day}</span>
                <span className="text-foreground font-semibold">3</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="flex justify-center py-8">
      <Carousel orientation="vertical" className="w-64" style={{ height: "192px" }}>
        <CarouselContent className="-mt-1" style={{ height: "192px" }}>
          <CarouselItem className="pt-1 basis-full">
            <div className="flex h-full items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-medium text-sm">
              Step 1 — Registration
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1 basis-full">
            <div className="flex h-full items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-medium text-sm">
              Step 2 — Triage
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1 basis-full">
            <div className="flex h-full items-center justify-center rounded-lg bg-rose-100 text-rose-700 font-medium text-sm">
              Step 3 — Consultation
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
