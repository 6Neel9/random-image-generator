const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());



const blue = ["54A1FC", "0EEEEE", "7EFCFC", "2AFCFC", "7EB6FC", "54FCFC", "A8CBFC", "7EFCFC", "D2E0FC", "A8FCFC", "D2E0FC", "A8FCFC", "2A8CFC", "0EEEEE", "622DD7", "916DF8", "5B39A8"];
const red = ["FC0E30", "FC8C2A", "FC0E30", "FC8C9C", "FC3854", "FC8C2A", "FC6278", "FCA154", "FC8C9C", "FCB67E", "FCCBA8",];
const grey = ["141411", "585858", "22221E", "777775", "1A1A16", "777775", "22221E", "A2A29F", "2F2F2B", "BEBEB8", "2F2F2B", "BEBEB8", "585858", "E0E0D9", "FFFFFF", "CCCCCC", "A5A5A5"];
const yellow = ["FCDE2A", "FCDE2A", "FCF0A8", "FCE454", "FCEA7E", "FCF0A8", "FCFAEE",];

const Shapes = ["ellipse", "ellipseFilled", "line", "rectangle", "rectangleFilled"];

const Seeds = ["Molly", "Molly", "Molly", "Oscar", "Oscar", "Oreo", "Charlie", "Lucy", "Cookie", "Max", "Chloe", "Jasper", "Gracie", "Mia"];

// Helper function to get a random element from an array
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Function to get 4 unique random colors from an array
function getUniqueRandomColors(arr, count) {
    const uniqueColors = new Set();
    while (uniqueColors.size < count) {
      const randomColor = getRandomElement(arr);
      uniqueColors.add(randomColor);
    }
    return Array.from(uniqueColors);
  }
  
  app.get("/random-url", (req, res) => {
    // Randomly select one color array (e.g., blue)
    const selectedColorArray = getRandomElement([blue, red, grey, yellow]);
  
    // Get 4 unique random colors from the selected color array
    const randomColors = getUniqueRandomColors(selectedColorArray, 4);
  
    const seed = getRandomElement(Seeds);
    const shape1 = getRandomElement(Shapes);
    const shape2 = getRandomElement(Shapes);
    const shape3 = getRandomElement(Shapes);
  
    // Assign the 4 random colors to the shape and background
    const [shape1Color, shape2Color, shape3Color, backgroundColor] = randomColors;
  
    const url = `https://api.dicebear.com/7.x/shapes/png?seed=${seed}&shape1=${shape1}&shape2=${shape2}&shape3=${shape3}&shape1Color=${shape1Color}&shape2Color=${shape2Color}&shape3Color=${shape3Color}&backgroundColor=${backgroundColor}&radius=50`;
  
    res.json({ url });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});