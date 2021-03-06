const myData = [];
const DataCount = 40;

for (i = 0; i < DataCount; i++) {
  myData.push(Math.round(Math.random() * 1000));
}
myData.sort(function (a, b) {
  return a - b;
});

// 調整圖表位置
const margin = {
  top: 30,
  right: 30,
  bottom: 40,
  left: 50,
};
const height = 500 - margin.top - margin.bottom;
const width = 500 - margin.right - margin.left;
const animateDuration = 700;
const delay = 30;

const yScale = d3.scale
  .linear()
  .domain([0, d3.max(myData)])
  .range([0, height]);

const xScale = d3.scale
  .ordinal()
  .domain(d3.range(0, myData.length))
  .rangeBands([0, width]);

const colors = d3.scale
  .linear()
  .domain([0, myData.length])
  .range(["#dac", "#000"]);

const svg = d3
  .select("#chart")
  .append("svg")
  .attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom,
  })
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .style("background", "#ddd");

const tooltip = d3.select("body").append("div").style({
  position: "absolute",
  background: "#f4f4f4",
  padding: "5 15px",
  border: "1px #00000023 solid",
  opacity: "0",
});

//rect
const rects = svg.selectAll("rect").data(myData).enter().append("rect");

//rect attr and style
const myChart = rects
  .style("fill", function (d, i) {
    return colors(i);
  })
  .attr({
    width: xScale.rangeBand(),
    height: 0,
    x: function (d, i) {
      return xScale(i);
    },
    y: function (d) {
      return height;
    },
  })
  .on("mouseover", function (d) {
    tooltip.transition().style("opacity", 1);
    tooltip
      .html(d)
      .style({ left: d3.event.pageX + "px", top: d3.event.pageY + "px" });
    d3.select(this).style("opacity", 0.5);
  })
  .on("mouseleave", function (d) {
    tooltip.transition().style("opacity", 0);
    d3.select(this).style("opacity", 1);
  });

// 動畫
myChart
  .transition()
  .attr({
    height: function (d) {
      return yScale(d);
    },
    y: function (d) {
      return height - yScale(d);
    },
  })
  .duration(animateDuration)
  .delay(function (d, i) {
    return i * delay;
  })
  .ease("elastic");

//
// 縱軸開始
//

const vScale = d3.scale
  .linear()
  .domain([0, d3.max(myData)])
  .range([height, 0]);

// 縱軸 外觀
const vAxis = d3.svg
  .axis()
  .scale(vScale)
  .orient("left")
  .ticks(5)
  .tickPadding(12);

// 縱軸 位置
const vGuide = d3.select("svg").append("g");

// 先使用再定義attr
vAxis(vGuide);

vGuide.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

vGuide.selectAll("path").style({ fill: "none", stroke: "green" });
vGuide.selectAll("line").style("stroke", "red");

// --
// 橫軸
// --

const hScale = d3.scale
  .ordinal()
  .domain(d3.range(0, myData.length))
  .rangeBands([0, width]);

const hAxis = d3.svg
  .axis()
  .scale(hScale)
  .orient("bottom")
  .tickValues(
    hScale.domain().filter(function (d, i) {
      return !(i % (myData.length / 8));
    })
  );
const hGuide = d3.select("svg").append("g");
hAxis(hGuide);

hGuide.attr(
  "transform",
  "translate(" + margin.left + "," + (height + margin.top) + ")"
);

hGuide.selectAll("path").style({ fill: "none", stroke: "green" });
hGuide.selectAll("line").style("stroke", "red");
