const fs = require("fs");
const fetch = require("node-fetch");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    const parsedData = data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    fs.writeFileSync("users.json", JSON.stringify(parsedData, null, 2));
    console.log("Data written to users.json");
  })
  .catch((error) => console.error("Error fetching data:", error));

// 2)
const [, , carModel, carReleaseDate, carColor] = process.argv;
if (carModel && carReleaseDate && carColor) {
  const newCar = {
    id: Date.now(),
    carModel,
    carColor,
    carReleaseDate,
  };

  let cars = [];
  if (fs.existsSync("cars.json")) {
    cars = JSON.parse(fs.readFileSync("cars.json"));
  }
  cars.push(newCar);
  fs.writeFileSync("cars.json", JSON.stringify(cars, null, 2));
  console.log("New car added to cars.json");
}

// 3)
const randomText = "This is a random string with some vowels.";
fs.writeFileSync("text.txt", randomText);
console.log("Random text written to text.txt");

const textData = fs.readFileSync("text.txt", "utf-8");
const vowelCount = [...textData].filter((char) =>
  "aeiouAEIOU".includes(char)
).length;
console.log(`Number of vowels in text.txt: ${vowelCount}`);
