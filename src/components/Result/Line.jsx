import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const VerticalLineChart = ({ data }) => {
  const d3Container = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      const tooltip = d3.select(tooltipRef.current);

      svg.selectAll("*").remove();

      const width = 100;
      const height = 650;
      const spacing = height / (data.length + 1);

      svg.attr("width", width).attr("height", height);

      data.forEach((item, index) => {
        if (index > 0) {
          svg
            .append("line")
            .attr("x1", width / 2)
            .attr("y1", spacing * index + 11)
            .attr("x2", width / 2)
            .attr("y2", spacing * (index + 1))
            .attr("stroke", "#F2F2F2")
            .attr("stroke-width", 2)
            .transition()
            .ease(d3.easeQuadIn)
            .delay(index * 500)
            .duration(500)
            .style(
              "stroke",
              item.ipAddress === "Timeout" ? "#FEE6E6" : "#C9DEFC",
            );
        }

        const circle = svg
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", spacing * (index + 1))
          .attr("r", 10)
          .style("fill", "#F2F2F2");

        const text = svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", spacing * (index + 1) + 0.5)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("fill", "white")
          .style("opacity", 0)
          .style("font-size", "12px")
          .text(index + 1);

        circle
          .transition()
          .ease(d3.easeQuadIn)
          .delay(index * 500)
          .duration(500)
          .style("fill", item.ipAddress === "Timeout" ? "#F20505" : "#4B91F2")
          .attr("stroke", item.ipAddress === "Timeout" ? "#FEE6E6" : "#C9DEFC")
          .attr("stroke-width", 2)
          .on("end", function () {
            d3.select(text.node())
              .transition()
              .duration(500)
              .style("opacity", 1);
          });

        circle
          .on("mouseover", () => {
            const displayText = item.country
              ? `${item.ipAddress} / ${item.city}, ${item.country}`
              : `${item.ipAddress} / Location Unknown`;

            tooltip
              .style("visibility", "visible")
              .text(displayText)
              .style("font-weight", "bold");
          })
          .on("mousemove", event => {
            tooltip
              .style("top", event.pageY - 10 + "px")
              .style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
          });
      });
    }
  }, [data]);

  return (
    <>
      <svg
        className="bg-transparent transition-all duration-1000"
        ref={d3Container}
      />
      <div
        ref={tooltipRef}
        style={{ position: "absolute", visibility: "hidden" }}
      ></div>
    </>
  );
};

export default VerticalLineChart;
