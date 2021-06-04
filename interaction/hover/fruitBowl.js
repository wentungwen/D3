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
  const { fruits, height, setSelectedFruit, selectedFruit } = props;
  const circles = selection.selectAll("circle").data(fruits, (d) => d.id);

  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .merge(circles)
    .on("mouseover", (d) => setSelectedFruit(d.id))
    .on("mouseout", (d) => setSelectedFruit(null))
    .transition()
    .duration(500)
    .attr("stroke-width", (d) => (d.id === selectedFruit ? "5" : "none"))
    .attr("stroke", (d) => (d.id === selectedFruit ? "black" : "none"))
    .attr("r", (d) => radiusScale(d.type))
    .attr("cx", xPosition)
    .attr("fill", (d) => colorScale(d.type));

  circles.exit().transition().duration(500).attr("r", 0).remove();
};
