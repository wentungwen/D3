import { fruitBowl } from "./fruitBowl.js";
const svg = d3.select("svg");

const makeFruit = (type) => ({ type, id: Math.random() });
let fruits = d3.range(5).map(() => makeFruit("apple"));

const render = () => {
  fruitBowl(svg, {
    fruits,
    height: +svg.attr("height"),
  });
};
render();

// 1 seconds after, eat an apple
setTimeout(() => {
  fruits.pop();
  render();
}, 1000);

// 2 seconds after, replace an apple with lemon
setTimeout(() => {
  fruits[2].type = "lemon";
  render();
}, 500);

// 1 seconds after, eat an apple
setTimeout(() => {
  fruits = fruits.filter((d, i) => i !== 1);
  render();
}, 2000);
