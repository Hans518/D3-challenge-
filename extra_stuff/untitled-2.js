 // // Create Circles
    // var circlesgroup = chartGroup.selectAll("circle")
    // .data(CSVdata)
    // .enter()
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.poverty))
    // .attr("cy", d => yLinearScale(d.healthcare))
    // .attr("r", "15")
    // .attr("fill", "blue")
    // .attr("opacity", ".5")
  
  
    var theCircles = svg.selectAll("g theCircles").data(CSVdata).enter();

// var theCircles = svg.selectAll("g theCircles").data(CSVdata).enter();

  // We append the circles for each row of data (or each state, in this case).
  theCircles
    .append("circle")
    // These attr's specify location, size and class.
    .attr("cx", function(d) {
      return xLinearScale(d.poverty);
    })
    .attr("cy", function(d) {
      return yLinearScale(d.healthcare);
    })
    .attr("r", "15")
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })
    // Hover rules
    .on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d, this);
      // Highlight the state circle's border
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // Remove the tooltip
      toolTip.hide(d);
      // Remove highlight
      d3.select(this).style("stroke", "#e3e3e3");
    });

    theCircles.append("text")
    .text(function(d) {
        console.log(d.abbr);
        return d.abbr;
      })
      .attr("dx", function(d) {
        console.log("dx");
        return xLinearScale(d.poverty);
      })
      .attr("dy", function(d) {
          console.log("dy")
        // When the size of the text is the radius,
        // adding a third of the radius to the height
        // pushes it into the middle of the circle.
        return yLinearScale(d.healthcare) + 15 / 2.5;
      })
      .attr("font-size", 15)
      .attr("class", "stateText")
      .attr("class", function(d) {
        return "stateCircle " + d.abbr;
      })


      text-anchor: middle;