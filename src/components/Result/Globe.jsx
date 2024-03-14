import * as d3 from "d3";
import { feature } from "topojson-client";
import { useRef, useEffect } from "react";

export default function Globe({ markers }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = Number(svg.attr("width"));
    const height = Number(svg.attr("height"));

    async function drawMap() {
      try {
        const response = await fetch("https://d3js.org/world-110m.v1.json");
        const data = await response.json();
        const countries = feature(data, data.objects.countries).features;
        const projection = d3
          .geoOrthographic()
          .rotate([-markers[0].lon, -markers[0].lat])
          .translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);

        svg
          .selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .style("fill", "#CCCCCC")
          .style("stroke", "#F2F2F2");

        svg
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("r", width / 2)
          .style("fill", "none")
          .style("stroke", "black")
          .style("stroke-width", "1px");

        markers.forEach(marker => {
          svg
            .append("circle")
            .attr("class", "marker")
            .attr("cx", projection([marker.lon, marker.lat])[0])
            .attr("cy", projection([marker.lon, marker.lat])[1])
            .style("fill", "red")
            .attr("r", 5);
        });
      } catch (error) {
        console.error(error);
      }
    }

    drawMap();
  }, []);

  return <svg ref={svgRef} width={500} height={600} />;
}
