import * as d3 from "d3";
import axios from "axios";
import { feature } from "topojson-client";
import { useRef, useEffect } from "react";

export default function Globe({ markers }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = Number(svg.attr("width"));
    const height = Number(svg.attr("height"));
    const projection = d3
      .geoMercator()
      .translate([width / 2, height / 2])
      .scale(100);

    const path = d3.geoPath().projection(projection);

    async function drawMap() {
      const response = await axios("https://d3js.org/world-110m.v1.json");
      const countries = feature(
        response.data,
        response.data.objects.countries,
      ).features;

      svg
        .selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", "#ccc")
        .style("stroke", "#fff");

      const markerData = markers.map(marker => ({
        ...marker,
        x: projection([marker.lon, marker.lat])[0],
        y: projection([marker.lon, marker.lat])[1],
      }));

      const lineGenerator = d3
        .line()
        .x(d => d.x)
        .y(d => d.y);

      const linePath = svg
        .append("path")
        .datum(markerData)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.2)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

      // 선의 총 길이를 계산합니다.
      const totalLength = linePath.node().getTotalLength();

      // 애니메이션을 위한 stroke-dasharray와 stroke-dashoffset을 설정합니다.
      linePath
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // 애니메이션 시작
        .duration(4000) // 4초 동안 진행
        .attr("stroke-dashoffset", 0);

      // 위치 데이터를 기반으로 마커 추가
      svg
        .selectAll(".marker")
        .data(markerData)
        .enter()
        .append("circle")
        .attr("class", "marker")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 3)
        .style("fill", "red");
    }

    drawMap();
  }, [markers]);
  return <svg ref={svgRef} width={600} height={400} className="mx-auto" />;
}
