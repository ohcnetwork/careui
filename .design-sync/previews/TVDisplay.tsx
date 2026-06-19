import {
  TVDisplay,
  TVDisplayBody,
  TVDisplayDoctor,
  TVDisplayHeader,
  TVDisplayRoom,
  TVDisplayRow,
  TVDisplayToken,
} from "careui";

export function Default() {
  return (
    <div className="w-full max-w-3xl">
      <TVDisplay aspectRatio="16/9">
        <TVDisplayHeader>
          <span>Doctor</span>
          <span>Room</span>
          <span>Token</span>
        </TVDisplayHeader>
        <TVDisplayBody>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Sarah Johnson" specialty="Cardiologist" />
            <TVDisplayRoom label="Room">101</TVDisplayRoom>
            <TVDisplayToken current="OP-025" next={["OP-026", "OP-027"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Rajesh Kumar" specialty="Neurologist" />
            <TVDisplayRoom label="Room">204</TVDisplayRoom>
            <TVDisplayToken current="OP-043" next={["OP-044"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Emily Chen" specialty="Pediatrician" />
            <TVDisplayRoom label="Room">315</TVDisplayRoom>
            <TVDisplayToken current="OP-012" next={["OP-013", "OP-014"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Michael Osei" specialty="Orthopedic Surgeon" />
            <TVDisplayRoom label="Room">108</TVDisplayRoom>
            <TVDisplayToken current="OP-067" next={["OP-068"]} />
          </TVDisplayRow>
        </TVDisplayBody>
      </TVDisplay>
    </div>
  );
}

export function Compact() {
  return (
    <div className="w-full max-w-3xl">
      <TVDisplay aspectRatio="16/9" density="compact">
        <TVDisplayHeader>
          <span>Consulting Doctor</span>
          <span>Room No.</span>
          <span>Serving Token</span>
        </TVDisplayHeader>
        <TVDisplayBody>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Anita Patel" specialty="General Physician" />
            <TVDisplayRoom>A1</TVDisplayRoom>
            <TVDisplayToken current="GP-001" next={["GP-002", "GP-003"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. James Murphy" specialty="Dermatologist" />
            <TVDisplayRoom>B2</TVDisplayRoom>
            <TVDisplayToken current="DE-015" next={["DE-016"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Fatima Al-Hassan" specialty="Ophthalmologist" />
            <TVDisplayRoom>C3</TVDisplayRoom>
            <TVDisplayToken current="OP-008" />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Liu Wei" specialty="Endocrinologist" />
            <TVDisplayRoom>D4</TVDisplayRoom>
            <TVDisplayToken current="EN-031" next={["EN-032", "EN-033"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Clara Oliveira" specialty="Rheumatologist" />
            <TVDisplayRoom>E5</TVDisplayRoom>
            <TVDisplayToken current="RH-022" next={["RH-023"]} />
          </TVDisplayRow>
        </TVDisplayBody>
      </TVDisplay>
    </div>
  );
}

export function UltrawideRatio() {
  return (
    <div className="w-full max-w-3xl">
      <TVDisplay aspectRatio="21/9">
        <TVDisplayHeader>
          <span>Doctor</span>
          <span>Room</span>
          <span>Token</span>
        </TVDisplayHeader>
        <TVDisplayBody>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Sarah Johnson" specialty="Cardiologist" />
            <TVDisplayRoom>101</TVDisplayRoom>
            <TVDisplayToken current="OP-025" next={["OP-026", "OP-027"]} />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Rajesh Kumar" specialty="Neurologist" />
            <TVDisplayRoom>204</TVDisplayRoom>
            <TVDisplayToken current="OP-043" />
          </TVDisplayRow>
          <TVDisplayRow>
            <TVDisplayDoctor name="Dr. Emily Chen" specialty="Pediatrician" />
            <TVDisplayRoom>315</TVDisplayRoom>
            <TVDisplayToken current="OP-012" next={["OP-013"]} />
          </TVDisplayRow>
        </TVDisplayBody>
      </TVDisplay>
    </div>
  );
}
