// Список валют, курс которых показываем (коды валют по отношению к доллару).
// Чтобы добавить ещё одну, допишите её код, например "JPY".
const currencies = ["KZT", "EUR", "RUB", "CNY", "GBP", "TRY"];

// Список городов. кординаты можно взять в гугл мапс
const cities = [
  { name: "Алматы", lat: 43.24, lon: 76.89 },
  { name: "Астана", lat: 51.17, lon: 71.43 },
  { name: "Тараз", lat: 42.9, lon: 71.37 },
  { name: "Шымкент", lat: 42.32, lon: 69.59 },
  { name: "Santo Domingo", lat: 18.45, lon: -69.73 },
];

// интерфейс как должно выглядеть в консоле
interface Weather {
  current: {
    time: string; // время
    temperature_2m: number; // температура
    wind_speed_10m: number; // скорость ветра 
  };
}

// Как выглядит ответ сервера с курсами валют.
interface Rates {
  base_code: string; // базовая валюта (у нас USD)
  rates: Record<string, number>; // "валюта -> сколько её стоит 1 доллар"
}

// Функция получает lat и lon
async function getWeather(lat: number, lon: number): Promise<Weather> { // обещает вывести позже как будут результаты
// async function getWeather(): Promise<Weather> {
  // Собираем адрес запроса, подставляя координаты вместо ${lat} и ${lon}.
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
// ссылка откуда берет инфо


  // Отправляем запрос в интернет и ждём ответ
  const response = await fetch(url);

  // Если сервер ошибка останавливаем функцию.
  if (!response.ok) {
    throw new Error(`Сервер вернул ошибку: ${response.status}`);
  }

 
  const data: Weather = await response.json();

  return data;
}

// Функция получает курсы валют относительно доллара.
async function getRates(): Promise<Rates> {
  // Адрес сервиса с курсами валют.
  const url = "https://open.er-api.com/v6/latest/USD";
  const response = await fetch(url);

  // Если сервер ответил ошибкой, останавливаем функцию.
  if (!response.ok) {
    throw new Error(`Курс валют: сервер вернул ошибку ${response.status}`);
  }

  const data: Rates = await response.json();
  return data;
}

// Главная функция: ОДНОВРЕМЕННО получает курс валют и погоду по всем городам.
async function main() {
  try {
    // Promise.all запускает все запросы сразу и ждёт, пока придут все ответы.
    // cities.map(...) делает запрос погоды для каждого города и запоминает пару "город + погода".
    const [rates, weatherList] = await Promise.all([
      getRates(),
      Promise.all(
        cities.map(async (city) => ({
          city,
          weather: await getWeather(city.lat, city.lon),
        })),
      ),
    ]);

    // Печатаем курс каждой валюты из списка currencies.
    for (const code of currencies) {
      console.log(`1 USD = ${rates.rates[code]} ${code}`);
    }

    // Печатаем погоду для каждого города.
    for (const { city, weather } of weatherList) {
      console.log(`${city.name}: ${weather.current.temperature_2m} °C, ветер ${weather.current.wind_speed_10m} км/ч`);
    }
  } catch (error) {
    // Если упал хотя бы один запрос (нет интернета, ошибка сервера), пишем понятную фразу.
    console.log("Не удалось получить данные:", error);
  }
}

// Предыдущая версия main (только погода, у каждого города свой try/catch).
// async function main() {
//   for (const city of cities) {
//     try {
//       const weather = await getWeather(city.lat, city.lon);
//       console.log(`${city.name}: ${weather.current.temperature_2m} °C, ветер ${weather.current.wind_speed_10m} км/ч`);
//     } catch (error) {
//       console.log(`${city.name}: не удалось получить погоду`);
//     }
//   }
// }

// async function main() {
//   for (const city of cities) {
//     const weather = await getWeather(city.lat, city.lon);
//     console.log(`${city.name}: ${weather.current.temperature_2m} °C, ветер ${weather.current.wind_speed_10m} км/ч`);
//   }
// }

// async function main() {
//   const weather = await getWeather();
//   // console.log(weather);
//   console.log(`В Таразе сейчас ${weather.current.temperature_2m} °C`);
//   console.log(`Ветер ${weather.current.wind_speed_10m} км/ч`);
// }

// Запускаем программу.
main();




// Как выглядит ответ сервера.
// interface CatFact {
//   fact: string;
//   length: number;
// }

// async function main() {
//   const response = await fetch("https://catfact.ninja/fact");
//   const data: CatFact = await response.json();
//   console.log(data.fact);
// }

// main();