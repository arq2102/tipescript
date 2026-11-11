// Data model for an airline delay dashboard
type FlightStatus = "scheduled" | "delayed" | "cancelled";

interface Flight {
  code: string;
  from: string;
  to: string;
  delayMin: number;
  status: FlightStatus;
  international: boolean;
}

const flights: Flight[] = [
  { code: "KC 851", from: "NQZ", to: "ALA", delayMin: 0, status: "scheduled", international: false },
  { code: "Azamat", from: "ALA", to: "IST", delayMin: 45, status: "delayed", international: true },
  { code: "DV 703", from: "NQZ", to: "URA", delayMin: 30, status: "cancelled", international: false },
];

function delayed(list: Flight[]): Flight[] {
  return list.filter((f) => f.status === "delayed");
}

function totalDelay(list: Flight[]): number {
  let sum = 0;
  for (const f of list) {
    sum = sum + f.delayMin;
  }
  return sum;
}

console.log(delayed(flights));
console.log(totalDelay(flights));
