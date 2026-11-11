function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

function greet(name: string, city?: string): string {
  if (city) {
    return `Привет, ${name} из города ${city}!`;
  }
  return `Привет, ${name}!`;
}

function price(amount: number, discount: number = 0): number {
  return amount - (amount * discount) / 100;
}

function log(message: string): void {
  console.log(`[log] ${message}`);
}

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(greet("Айгерим")); // Привет, Айгерим!
console.log(greet("Айгерим", "Алматы")); // Привет, Айгерим из города Алматы!
console.log(price(10000, 15)); // 8500
log("готово");
