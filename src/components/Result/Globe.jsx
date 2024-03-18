import * as d3 from "d3";
import { feature } from "topojson-client";
import { useRef, useEffect } from "react";

export default function Globe({ markers }) {
  const svgRef = useRef();
  const dragPosition = useRef({ startX: 0, startY: 0 });

  useEffect(() => {
    if (markers.length < 2) {
      const svg = d3.select(svgRef.current);
      const width = Number(svg.attr("width"));
      const height = Number(svg.attr("height"));
      const projection = d3
        .geoOrthographic()
        .translate([width / 2, height / 2]);
      const path = d3.geoPath().projection(projection);

      async function drawSolidMap() {
        try {
          const response = await fetch("https://d3js.org/world-110m.v1.json");
          const data = await response.json();
          const countries = feature(data, data.objects.countries).features;

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
        } catch (error) {
          console.error(error);
        }
      }
      drawSolidMap();

      return;
    }

    const svg = d3.select(svgRef.current);
    const width = Number(svg.attr("width"));
    const height = Number(svg.attr("height"));
    const initialRotation = [-markers[0].lon, -markers[0].lat, 0];
    const projection = d3
      .geoOrthographic()
      .rotate(initialRotation)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);
    let currentRotation = initialRotation;

    async function drawMap() {
      try {
        const response = await fetch("https://d3js.org/world-110m.v1.json");
        const data = await response.json();
        const countries = feature(data, data.objects.countries).features;

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

        drawMarkersAndLines(svg, markers, projection);
        return () => {
          svg.selectAll("*").remove();
        };
      } catch (error) {
        console.error(error);
      }
    }

    const drag = d3
      .drag()
      .on("start", event => {
        dragPosition.current = [d3.pointer(event, svg.node()), currentRotation];
      })
      .on("drag", event => {
        const [dx, dy] = d3.pointer(event, svg.node());
        const [x, y] = dragPosition.current[0];
        const [startLon, startLat] = dragPosition.current[1];
        const sensitivity = 0.5;
        const diffX = dx - x;
        const diffY = dy - y;

        currentRotation = [
          startLon + diffX * sensitivity,
          startLat - diffY * sensitivity,
          0,
        ];

        projection.rotate(currentRotation);
        svg.selectAll("path").attr("d", path);

        drawMarkersAndLines(svg, markers, projection);
      });

    svg.call(drag);

    function drawMarkersAndLines(svg, markers, projection) {
      svg.selectAll(".marker").remove();
      svg.selectAll(".line").remove();

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("text-align", "center");

      markers.forEach((marker, index) => {
        if (
          d3.geoDistance(
            [marker.lon, marker.lat],
            projection.invert([width / 2, height / 2]),
          ) >
          Math.PI / 2
        ) {
          return;
        }

        let fillColor;
        if (index === 0) {
          fillColor = "#7BF277";
        } else if (marker === undefined) {
          fillColor = "#8C8C8C";
        } else if (index === markers.length - 1) {
          fillColor = "#0D0D0D";
        } else {
          fillColor = "#4B91F2";
        }

        const markerId = `marker-${index}`;

        if (!svg.select(`#${markerId}`).empty()) {
          return;
        }

        svg
          .append("circle")
          .attr("class", "marker")
          .attr("cx", projection([marker.lon, marker.lat])[0])
          .attr("cy", projection([marker.lon, marker.lat])[1])
          .attr("r", 0)
          .style("fill", fillColor)
          .on("mouseover", event => {
            tooltip
              .style("visibility", "visible")
              .text(`${marker.city}, ${marker.country}`)
              .style("top", event.pageY - 10 + "px")
              .style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
          })
          .transition()
          .duration(index * 1000)
          .attr("r", 5);
      });

      markers.forEach((marker, index) => {
        const lineId = `line-${index}`;

        if (!svg.select(`#${lineId}`).empty()) {
          return;
        }

        const nextMarker = markers[index + 1];

        if (!nextMarker) {
          return;
        }

        if (
          d3.geoDistance(
            [marker.lon, marker.lat],
            projection.invert([width / 2, height / 2]),
          ) >
            Math.PI / 2 ||
          d3.geoDistance(
            [nextMarker.lon, nextMarker.lat],
            projection.invert([width / 2, height / 2]),
          ) >
            Math.PI / 2
        ) {
          return;
        }

        setTimeout(
          () => {
            svg
              .append("line")
              .attr("class", "line")
              .attr("x1", projection([marker.lon, marker.lat])[0])
              .attr("y1", projection([marker.lon, marker.lat])[1])
              .attr("x2", projection([marker.lon, marker.lat])[0])
              .attr("y2", projection([marker.lon, marker.lat])[1])
              .attr("stroke", "#0D0D0D")
              .attr("stroke-width", 1)
              .transition()
              .duration(700)
              .attr("x2", projection([nextMarker.lon, nextMarker.lat])[0])
              .attr("y2", projection([nextMarker.lon, nextMarker.lat])[1]);
          },
          index * 670 + 200,
        );
      });
    }

    drawMap();
  }, []);

  return <svg ref={svgRef} width={500} height={600} />;
}
