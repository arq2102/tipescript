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

// const xyz: string[] = ["apple", "banana", "chery"];
// console.log(xyz);
// console.log("NEXT");
// xyz.push("orange");
// console.log(xyz);
// console.log("NEXT");
// xyz.splice(2, 1, "kiwi", "peach");
// console.log(xyz);
// console.log("NEXT");
// console.log(xyz.length);
// console.log("NEXT");
// xyz.splice(0, xyz.length - 1);
// console.log(xyz);
// console.log("NEXT");
// xyz.push("alice", "bob");
// console.log(xyz);
// console.log("NEXT");
// console.log(xyz.shift());
// console.log(xyz);




// const a = [ "111", "222", "333"];
// console.log(a);
// console.log("NEXT--------");
// a.shift()                       // убирает первое значение
// console.log(a);
// console.log("NEXT--------");
// a.unshift("000");                // добавляет первое значение
// console.log(a);
// console.log("NEXT---------");
// a.pop()
// console.log(a);



// const fruits: string[] = ["orange", "apple", "kiwi", "banana"];
// console.log(fruits);
// console.log("NEXT");
// fruits.sort();          //сортирует числа от 1 и выше или слова по алфавиту
// console.log(fruits);



// const nums: number[] = [10, 9, 1, 2, 100, 108, 306];
// console.log(nums);
// console.log("NEXT");
// nums.sort();
// console.log(nums); //выводит числа пример-100, 1001, 2003, 5006  и тд не смотря на 2-значные числа 
// nums.sort((a, b) => a - b);
// // nums.sort((a, b) => b - a);    b a меняли местами

// console.log(nums)







// let abc: string[] = ["bus", "car"];
// console.log(abc);

// abc.push("plane");
// console.log(abc);
// abc = ["alice", "bob"];
// console.log(abc);


// const xyz: string[] = ["apple", "banana", "kiwi", "orange"];
// console.log(xyz);
// console.log("NEXT");
// xyz.reverse();
// console.log(xyz);




// const arr = new Array(3).fill("x");
// console.log(arr);
// // [ 'x', 'x', 'x' ]