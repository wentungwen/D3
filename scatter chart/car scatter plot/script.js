const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// d.acceleration = +d.acceleration;
// d.cylinders = +d.cylinders;
// d.displacement = +d.displacement;
// d.horsepower = +d.horsepower;
// d.mpg = +d.mpg;
// d.weight = +d.weight;
// d.year = +d.year;

svg.style("background", "rgb(241, 241, 241)");
const render = (data) => {
  const title = "Car displacement vs horsepower";

  //value
  let xValue = (d) => d.displacement;
  const xAxisLabel = "displacement";
  let yValue = (d) => d.horsepower;
  const yAxisLabel = "horsepower";
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // x,y scale
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // y 軸
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-height + (margin.left + margin.right));
  const yAxisG = g.append("g").call(yAxis).attr("class", "axis-label");
  yAxisG.select(".domain").attr("stroke", "rgba(0, 0, 0, 0.1)");

  //  y軸說明
  yAxisG.select(".domain").remove();
  yAxisG
    .append("text")
    .text(`${yAxisLabel}`)
    .attr("fill", "steelblue")
    .attr("x", 0)
    .attr("y", -20)
    .attr("transform", "rotate(-90)")
    .attr("class", "intro-title");

  // x 軸 xAxis為設定
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(-height + (margin.top + margin.bottom));
  // call之後才可設定屬性
  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("class", "axis-label")
    .attr(
      "transform",
      "translate(" + 0 + ", " + (height - margin.top - margin.bottom) + ")"
    );

  //  x軸說明
  xAxisG.select(".domain").remove();
  xAxisG
    .append("text")
    .text(`${xAxisLabel}`)
    .attr("fill", "steelblue")
    .attr("x", width - 130)
    .attr("y", "30")
    .attr("class", "intro-title");

  // circle
  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", 10);

  // title
  g.append("text").text(`${title}`).attr("class", "title");
};

// clear svg
const clearsvg = () => {
  svg.select("g").remove();
};

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.acceleration = +d.acceleration;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.mpg = +d.mpg;
    d.weight = +d.weight;
    d.year = +d.year;
  });

  render(data);

  //btn
  const btns = document.querySelectorAll("button");
  const btnArr = [];

  btns.forEach((e) => {
    btnArr.push(data);
    e.addEventListener("click", (e) => {
      xValue = (data) => {
        const xAxisId = e.target.id;
        data.xAxisId;
      };
      clearsvg();
      render(data);
    });
  });
  // console.log(data);
});
function xValue(data) {
  return data;
}
