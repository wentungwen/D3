const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

svg.style("background", "rgb(241, 241, 241)");
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
  const yAxisG = g.append("g").call(yAxis).attr("class", "axis-label");
  yAxisG.selectAll(".domain, .tick line").remove();

  // x 軸，
  const xAxisFormaCustom = (num) => d3.format(".3s")(num).replace("G", "B");
  // xAxis為設定，必須call之後才可設定屬性
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(xAxisFormaCustom)
    .tickSize(-height + (margin.top + margin.bottom + 2));

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
    .text("Population")
    .attr("fill", "steelblue")
    .attr("x", width - 130)
    .attr("y", "30");

  // rectangle
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", (d, i) => yScale.bandwidth())
    .attr("y", (d, i) => yScale(yValue(d)));

  // title
  g.append("text").text("The country population").attr("class", "title");
};
d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });

  render(data);
});
