// Модель данных сервиса аренды машин

// Статус машины: свободна, в аренде или на обслуживании
export type CarStatus = "available" | "rented" | "maintenance";

// Главная сущность — машина в автопарке
export interface Car {
  id: number;
  brand: string;       // марка, например "Toyota"
  model: string;       // модель, например "Camry"
  year: number;        // год выпуска
  pricePerDay: number; // цена аренды за сутки, в тенге
  status: CarStatus;
}

// Примеры машин из автопарка
const cars: Car[] = [
  { id: 1, brand: "Toyota", model: "Camry", year: 2022, pricePerDay: 25000, status: "available" },
  { id: 2, brand: "Hyundai", model: "Solaris", year: 2020, pricePerDay: 15000, status: "rented" },
  { id: 3, brand: "BMW", model: "X5", year: 2023, pricePerDay: 60000, status: "maintenance" },
  { id: 4, brand: "Kia", model: "Rio", year: 2021, pricePerDay: 14000, status: "available" },
  { id: 5, brand: "Chevrolet", model: "Cobalt", year: 2019, pricePerDay: 10000, status: "available" },
  { id: 6, brand: "Mercedes", model: "E200", year: 2022, pricePerDay: 45000, status: "available" },
  { id: 7, brand: "Skoda", model: "Octavia", year: 2020, pricePerDay: 18000, status: "rented" },
  { id: 8, brand: "Nissan", model: "Qashqai", year: 2021, pricePerDay: 30000, status: "available" },
  { id: 9, brand: "Lada", model: "Granta", year: 2018, pricePerDay: 8000, status: "available" },
  { id: 10, brand: "Volkswagen", model: "Polo", year: 2022, pricePerDay: 16000, status: "maintenance" },
];

// Возвращает свободные машины не дороже maxPrice за сутки, сначала самые дешёвые
function findAvailable(list: Car[], maxPrice: number): Car[] {
  return list
    .filter((c) => c.status === "available" && c.pricePerDay <= maxPrice)
    .sort((a, b) => a.pricePerDay - b.pricePerDay);
}

// Показываем результат: свободные машины до 20 000 за сутки
console.log(findAvailable(cars, 20000));
