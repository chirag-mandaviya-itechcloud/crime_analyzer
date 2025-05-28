import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DonutChart = ({ data }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 220;
    const height = 220;
    const margin = 10;
    const radius = Math.min(width, height) / 2 - margin;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    // Set up pie generator
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);
    
    // Set up arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.6) // Donut hole size
      .outerRadius(radius);
    
    // Create pie chart
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");
    
    // Add paths
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .on("mouseover", function() {
        d3.select(this)
          .style("opacity", 1)
          .attr("stroke", "#f8f9fa")
          .style("stroke-width", "3px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("opacity", 0.8)
          .attr("stroke", "white")
          .style("stroke-width", "2px");
      });
    
    // Add center text
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("font-size", "1.2em")
      .attr("font-weight", "bold")
      .text(`${data.reduce((sum, d) => sum + d.value, 0)}%`);
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("font-size", "0.9em")
      .attr("fill", "#6B7280")
      .text("Total Sentiment");
    
  }, [data]);
  
  return (
    <div className="flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DonutChart;