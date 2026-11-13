// Модель данных сервиса аренды машин

// ---------- Типы с вариантами (union) ----------

// Статус машины
export type CarStatus =
  | "available"    // свободна
  | "reserved"     // забронирована, клиент ещё не приехал
  | "rented"       // в аренде
  | "cleaning"     // мойка между арендами
  | "maintenance"  // на обслуживании
  | "damaged"      // повреждена
  | "sold";        // списана

export type Transmission = "manual" | "automatic"; // коробка передач
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric"; // топливо
export type CarClass = "economy" | "comfort" | "business" | "suv"; // класс машины

// ---------- Главная сущность: машина ----------

export interface Car {
  id: number;
  brand: string;            // марка, например "Toyota"
  model: string;            // модель, например "Camry"
  year: number;             // год выпуска
  pricePerDay: number;      // цена аренды за сутки, в тенге
  status: CarStatus;
  transmission: Transmission;
  fuel: FuelType;
  carClass: CarClass;
  rentedUntil?: string;     // до какого числа в аренде (знак ? — поле может отсутствовать)
}

// ---------- Вторая сущность: аренда ----------

export type RentalStatus = "active" | "completed" | "cancelled";

export interface Rental {
  id: number;
  carId: number;            // какая машина арендована
  customerName: string;     // имя клиента
  days: number;             // на сколько суток
  totalCost: number;        // итоговая стоимость
  status: RentalStatus;
}

// ---------- Данные: автопарк ----------

const cars: Car[] = [
  { id: 1, brand: "Toyota", model: "Camry", year: 2022, pricePerDay: 25000, status: "available", transmission: "automatic", fuel: "petrol", carClass: "comfort" },
  { id: 2, brand: "Hyundai", model: "Solaris", year: 2020, pricePerDay: 15000, status: "rented", transmission: "automatic", fuel: "petrol", carClass: "economy", rentedUntil: "2026-11-20" },
  { id: 3, brand: "BMW", model: "X5", year: 2023, pricePerDay: 60000, status: "maintenance", transmission: "automatic", fuel: "diesel", carClass: "suv" },
  { id: 4, brand: "Kia", model: "Rio", year: 2021, pricePerDay: 14000, status: "available", transmission: "manual", fuel: "petrol", carClass: "economy" },
  { id: 5, brand: "Chevrolet", model: "Cobalt", year: 2019, pricePerDay: 10000, status: "available", transmission: "manual", fuel: "petrol", carClass: "economy" },
  { id: 6, brand: "Mercedes", model: "E200", year: 2022, pricePerDay: 45000, status: "available", transmission: "automatic", fuel: "hybrid", carClass: "business" },
  { id: 7, brand: "Skoda", model: "Octavia", year: 2020, pricePerDay: 18000, status: "rented", transmission: "manual", fuel: "diesel", carClass: "comfort", rentedUntil: "2026-11-16" },
  { id: 8, brand: "Nissan", model: "Qashqai", year: 2021, pricePerDay: 30000, status: "available", transmission: "automatic", fuel: "petrol", carClass: "suv" },
  { id: 9, brand: "Lada", model: "Granta", year: 2018, pricePerDay: 8000, status: "available", transmission: "manual", fuel: "petrol", carClass: "economy" },
  { id: 10, brand: "Volkswagen", model: "Polo", year: 2022, pricePerDay: 16000, status: "cleaning", transmission: "automatic", fuel: "petrol", carClass: "economy" },
];

// ---------- Функции ----------

// 1. Свободные машины не дороже maxPrice за сутки, сначала самые дешёвые
function findAvailable(list: Car[], maxPrice: number): Car[] {
  return list
    .filter((c) => c.status === "available" && c.pricePerDay <= maxPrice)
    .sort((a, b) => a.pricePerDay - b.pricePerDay);
}

// 2. Свободные машины нужного класса
function findByClass(list: Car[], carClass: CarClass): Car[] {
  return list.filter((c) => c.status === "available" && c.carClass === carClass);
}

// 3. Стоимость аренды: от 7 суток скидка 10%
function rentalCost(car: Car, days: number): number {
  const total = car.pricePerDay * days;
  return days >= 7 ? total * 0.9 : total;
}

// 4. Сколько машин в каждом статусе
function countByStatus(list: Car[]): Record<CarStatus, number> {
  const result: Record<CarStatus, number> = {
    available: 0,
    reserved: 0,
    rented: 0,
    cleaning: 0,
    maintenance: 0,
    damaged: 0,
    sold: 0,
  };
  for (const c of list) {
    result[c.status] = result[c.status] + 1;
  }
  return result;
}

// 5. Оформить аренду: меняет статус машины и возвращает запись об аренде.
//    Если машина не свободна — возвращает null (аренду оформить нельзя).
function rentCar(car: Car, customerName: string, days: number): Rental | null {
  if (car.status !== "available") {
    return null;
  }
  car.status = "rented";
  return {
    id: Date.now(),
    carId: car.id,
    customerName,
    days,
    totalCost: rentalCost(car, days),
    status: "active",
  };
}

// ---------- Показываем результат ----------

const camry = cars[0]!; // знак ! — мы уверены, что первая машина в списке есть

// console.log("1. Свободные до 20 000:", findAvailable(cars, 60000));
console.log("2. Свободные внедорожники:", findByClass(cars, "business"));
// console.log("3. Camry на 3 дня:", rentalCost(camry, 3));
// console.log("3. Camry на 10 дней (со скидкой):", rentalCost(camry, 10));
console.log("4. Машин по статусам:", countByStatus(cars));
console.log("5. Аренда Camry:", rentCar(camry, "Азамат", 3));
console.log("5. Аренда Camry ещё раз:", rentCar(camry, "Айдар", 2));
console.log("4. Статусы после аренды:", countByStatus(cars));

