const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const projection = d3.geoConicEqualArea();
const pathGenerator = d3.geoPath().projection(projection);

d3.tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then((data) =>
  console.log(data)
);

svg
  .append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
  const countries = topojson.feature(data, data.objects.countries);
  // console.log(countries.features);
  // console.log(countries);

  svg
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", (d) => pathGenerator(d))
    .attr("class", "country")
    .append("title")
    .text((d) => console.log(1));
});
