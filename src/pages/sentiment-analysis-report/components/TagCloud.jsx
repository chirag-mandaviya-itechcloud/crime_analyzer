import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TagCloud = ({ topics, onSelectTopic, selectedTopic }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!topics || !topics.length || !svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    // Set up color scale based on sentiment
    const colorScale = d3.scaleLinear()
      .domain([-1, 0, 1])
      .range(["#DC2626", "#6B7280", "#059669"]);
    
    // Set up size scale based on weight
    const sizeScale = d3.scaleLinear()
      .domain([d3.min(topics, d => d.weight), d3.max(topics, d => d.weight)])
      .range([12, 28]);
    
    // Create simulation
    const simulation = d3.forceSimulation(topics)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius(d => sizeScale(d.weight) + 5))
      .stop();
    
    // Run simulation
    for (let i = 0; i < 300; ++i) simulation.tick();
    
    // Create text elements
    const texts = svg.selectAll("text")
      .data(topics)
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", d => `${sizeScale(d.weight)}px`)
      .attr("fill", d => colorScale(d.sentiment))
      .attr("opacity", d => selectedTopic === null || selectedTopic === d.id ? 1 : 0.3)
      .attr("font-weight", d => selectedTopic === d.id ? "bold" : "normal")
      .text(d => d.name)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        onSelectTopic(d.id);
      })
      .on("mouseover", function() {
        d3.select(this)
          .attr("font-weight", "bold")
          .attr("opacity", 1);
      })
      .on("mouseout", function(event, d) {
        if (selectedTopic !== d.id) {
          d3.select(this)
            .attr("font-weight", "normal")
            .attr("opacity", selectedTopic === null ? 1 : 0.3);
        }
      });
    
  }, [topics, selectedTopic, onSelectTopic]);
  
  return (
    <div className="w-full h-full">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default TagCloud;