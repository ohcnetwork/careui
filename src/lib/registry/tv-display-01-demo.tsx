import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "@/components/ui/tv-display";
import { cn } from "@/lib/utils";

interface QueueRow {
  doctor: string;
  specialty: string;
  room: string;
  current: string;
  next: string[];
}

const QUEUE: QueueRow[] = [
  {
    doctor: "Dr. Arjun Radhakrishnan",
    specialty: "General",
    room: "1",
    current: "OP-025",
    next: ["OP-026", "OP-027", "OP-024"],
  },
  {
    doctor: "Dr. Meera Das",
    specialty: "Pediatrics",
    room: "2",
    current: "OP-009",
    next: ["OP-010", "OP-011", "OP-012"],
  },
  {
    doctor: "Dr. Rahul Sen",
    specialty: "Orthopedics",
    room: "3",
    current: "OP-134",
    next: ["OP-135"],
  },
  {
    doctor: "Dr. Neha Roy",
    specialty: "ENT",
    room: "12",
    current: "OP-012",
    next: ["OP-013", "OP-014"],
  },
];

export function TVDisplay01Demo({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-neutral-950",
        fullPage ? "min-h-screen" : ""
      )}
      style={{
        height: fullPage ? "100vh" : "480px",
      }}
    >
      <div className="w-full max-w-400">
        <TVDisplay aspectRatio="16/9">
          <TVDisplayHeader>
            <span>Doctor</span>
            <span>Room</span>
            <span>Token</span>
          </TVDisplayHeader>
          <TVDisplayBody>
            {QUEUE.map((row) => (
              <TVDisplayRow key={row.doctor}>
                <TVDisplayDoctor name={row.doctor} specialty={row.specialty} />
                <TVDisplayRoom>{row.room}</TVDisplayRoom>
                <TVDisplayToken current={row.current} next={row.next} />
              </TVDisplayRow>
            ))}
          </TVDisplayBody>
        </TVDisplay>
      </div>
    </div>
  );
}
