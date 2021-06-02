const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["red", "green"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([30, 50]);

const xPosition = (d, i) => i * 100 + 60;
export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  // group
  const groups = selection.selectAll("g").data(fruits, (d) => d.id);
  const groupEnter = groups.enter().append("g");
  groupEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate${i * 100 + 60},${height / 2}`);
  groups.exit().remove();

  //circle
  const circles = groups.select("circle");
  groupEnter
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .merge(circles)
    .transition()
    .duration(500)
    .attr("r", (d) => radiusScale(d.type))
    .attr("cx", xPosition)
    .attr("fill", (d) => colorScale(d.type));
  circles.exit().transition().duration(500).attr("r", 0).remove();

  // text
  const texts = groups.selectAll("text").data(fruits, (d) => d.id);
  texts
    .enter()
    .append("text")
    .attr("x", xPosition)
    .attr("y", height / 2)
    .merge(texts)
    .text((d) => d.type);
  texts.exit().attr("r", 0).remove();
};
