const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

svg.style("background", "rgb(241, 241, 241)");
const render = (data) => {
  const title = "Southern Rockies";

  //value
  let xValue = (d) => d.Year;
  const xAxisLabel = "Year";
  let yValue = (d) => d.Population;
  const yAxisLabel = "Population";
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 60,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // x,y scale
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // area：面積圖
  const areaGenerator = d3
    .area()
    .curve(d3.curveBasis)
    .x((d) => xScale(xValue(d)))
    .y1((d) => yScale(yValue(d)))
    .y0(innerHeight);
  g.append("path").attr("class", "area-path").attr("d", areaGenerator(data));

  // y 軸
  const yAxisFormatCustom = (num) => d3.format(".2s")(num).replace("G", " B");

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-height + (margin.left + margin.right))
    .ticks(8)
    .tickFormat(yAxisFormatCustom);
  const yAxisG = g.append("g").call(yAxis).attr("class", "axis-label");
  yAxisG.select(".domain").attr("stroke", "rgba(0, 0, 0, 0.1)");

  //  y軸說明
  yAxisG.select(".domain").remove();
  yAxisG
    .append("text")
    .text(`${yAxisLabel}`)
    .attr("fill", "steelblue")
    .attr("x", -innerHeight / 2)
    .attr("y", -40)
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
    .attr("x", innerWidth / 2)
    .attr("y", "35")
    .attr("class", "intro-title");

  // title
  svg
    .append("text")
    .text(`${title}`)
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", "40");
};

// clear svg
const clearsvg = () => {
  svg.select("g").remove();
};

d3.csv("world_population.csv").then((data) => {
  console.log(data);

  data.forEach((d) => {
    d.Population = +d.Population;
    d.Year = new Date(d.Year);
  });
  // Fri Aug 15 2042 08:00:00 GMT+0800 (台北標準時間)
  render(data);
});
