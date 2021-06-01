const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["red", "green"]);

export const fruitBowl = (selection, props) => {
  const { fruits } = props;
  // console.log( props )
  // 0: {type: "apple"}
  // 1: {type: "apple"}
  // 2: {type: "lemon"}
  // 3: {type: "apple"}
  // 4: {type: "apple"}
  const circles = selection.selectAll("circle").data(fruits);
  circles
    .enter()
    .append("circle")
    .attr("cx", (d, i) => i * 100 + 60)
    .attr("cy", height / 2)
    .attr("r", 30)
    .merge(circles)
    .attr("fill", (d) => colorScale(d.type));
  // circles.attr("fill", (d) => colorScale(d.type));
  circles.exit().remove();
};
