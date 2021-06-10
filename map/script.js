const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const projection = d3.geoStereographic();
// console.log(countries.features);
const pathGenerator = d3.geoPath().projection(projection);

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
  (data) => {
    const countries = topojson.feature(data, data.objects.countries);
    console.log(countries.features);
    console.log(countries);

    svg
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", (d) => pathGenerator(d));
  }
);
