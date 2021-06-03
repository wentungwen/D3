const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["red", "green"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([30, 50]);

export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  const bowl = selection
    .selectAll("rect")
    .data([null])
    .enter()
    .append("rect")
    .attr("y", 110)
    .attr("width", 920)
    .attr("height", 300)
    .attr("rx", 150);

  // group
  const groups = selection.selectAll("g").data(fruits, (d) => d.id);
  const groupEnter = groups.enter().append("g");

  console.log(groups);
  console.log(groupEnter);

  groupEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${i * 100 + 80},${height / 2})`);

  groups.exit().remove();

  //circle
  groupEnter
    .append("circle")
    .merge(groups.select("circle"))
    .transition()
    .duration(500)
    .attr("r", (d) => radiusScale(d.type))
    .attr("fill", (d) => colorScale(d.type));

  // text
  groupEnter
    .append("text")
    .merge(groups.select("text"))
    .text((d) => d.type)
    .attr("fill", (d) => colorScale(d.type));
};
