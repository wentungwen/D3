const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

svg.style("background", "#ddd");
const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = {
    top: 50,
    right: 30,
    bottom: 40,
    left: 90,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // x,y scale
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);
  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // y 軸
  const yAxis = d3.axisLeft(yScale);
  const yAxisG = g
    .append("g")
    .call(yAxis)
    .selectAll(".domain, .tick line")
    .remove();

  // y 軸說明
  yAxisG
    .append("text")
    .text("title")
    .attr("fill", "#000")
    .attr("x", "10")
    .attr("y", "30");

  // x 軸(將G取代為B)
  const xAxisFormaCustom = (num) => d3.format(".3s")(num).replace("G", "B");
  const xAxis = d3.axisBottom(xScale).tickFormat(xAxisFormaCustom);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr(
      "transform",
      "translate(" + 0 + ", " + (height - margin.top - margin.bottom) + ")"
    );
  //  x軸說明
  xAxisG.select(".domain").remove();
  xAxisG
    .append("text")
    .text("Population")
    .attr("fill", "#000")
    .attr("x", "10")
    .attr("y", "30");

  // rectangle
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", (d, i) => yScale.bandwidth())
    .attr("y", (d, i) => yScale(yValue(d)));

  // text
  g.append("text").text("The country population").style("font-size", "2rem");
};
d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  //   console.log(data[0].population);
  render(data);
});
