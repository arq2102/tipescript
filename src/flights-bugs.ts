type FlightStatus = "scheduled" | "delayed" | "cancelled";

interface Flight {
  id: number;
  code: string;
  from: string;
  to: string;
  delayMin: number;
  status: FlightStatus;
  international: boolean;
}

type Car = "bugati" | "mers" |"bmw" | "honqi" 

const flights: Flight [] = [
  { code: "KC 851", id: 222, from: "nqz", to: "ALA", delayMin: 15, status: "delayed", international: false },
  { code: "KC 921", id: 721, from: "ALA", to: "IST", delayMin: 45, status: "scheduled", international: true },
  { code: "DV 703", from: "NQZ", to: "URA", delayMin: 0, status: "cancelled", id: 111, international: true}, 
];
