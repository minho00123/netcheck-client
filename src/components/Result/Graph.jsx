import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const RealTimeGraph = () => {
  const [data, setData] = useState([]);
  const d3Container = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = event => {
      const newData = JSON.parse(event.data);
      setData(currentData => [...currentData.slice(-50), newData]);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const svg = d3.select(d3Container.current);
      const width = svg.attr("width");
      const height = svg.attr("height");
      const margin = { top: 20, right: 20, bottom: 60, left: 30 };
      const x = d3.scaleTime().range([margin.left, width - margin.right]);
      const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

      x.domain(d3.extent(data, d => new Date(d.timestamp)));
      y.domain([0, d3.max(data, d => d.dataSize / 1024) * 1.5]);
      svg.selectAll("*").remove();

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`);

      g.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      g.append("g").call(d3.axisLeft(y));

      svg
        .append("text")
        .attr("transform", `translate(${width - 130}, ${height - 30})`)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Time (seconds)");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("x", 10 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Data Size (KB)");

      const line = d3
        .line()
        .x(d => x(new Date(d.timestamp)))
        .y(d => y(d.dataSize / 1024));

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  }, [data]);

  return (
    <svg
      ref={d3Container}
      width="330"
      height="180"
      className="mt-5 p-3 border-2 border-blue rounded-xl bg-blue-light"
    />
  );
};

export default RealTimeGraph;
