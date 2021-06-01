import { fruitBowl } from "./fruitBowl.js";

const svg = d3.select("svg");
const width = +svg.attr("width");

const height = +svg.attr("height");
const svg = d3.select("svg");
const makeFruit = (type) => ({
  type,
});

const fruits = d3.range(5).map(() => makeFruit("apple"));
fruitBowl(svg, { fruits });

// 1 seconds after, eat an apple
// setTimeout(() => {
//   fruits.pop(2);
//   fruitBowl(svg, { fruits });
// }, 1000);

// 2 seconds after, replace an apple with lemon
setTimeout(() => {
  fruits[2].type = "lemon";
  fruitBowl(svg, { fruits });
  console.log(fruits);
}, 500);
