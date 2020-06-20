// Build the plot

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

 // Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(CSVdata) {
    
    // Parse Data/Cast as numbers
    //===========================
    CSVdata.forEach(function(data) {
        data.poverty = +data.poverty
        data.healthcare = +data.healthcare
        //console.log(data.state);
        //console.log(data.abbr);
        //console.log(data.poverty);
        //console.log(data.healthcare);
    });

     // Create scale functions
     var xLinearScale = d3.scaleLinear()
     .domain([8, d3.max(CSVdata, d => d.poverty)])
     .range([0, width]);

     var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(CSVdata, d => d.healthcare)])
     .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    var theCircles = svg.selectAll("g theCircles").data(CSVdata).enter();
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
        return "stateCircle ";
  })


  theCircles.append("text")
  .text(function(d) {
      //console.log(d.abbr);
      return d.abbr;
    })
    .attr("dx", function(d) {
      //console.log("dx");
      return xLinearScale(d.poverty) - 1;
    })
    .attr("dy", function(d) {
        //console.log("dy")
      // When the size of the text is the radius,
      // adding a third of the radius to the height
      // pushes it into the middle of the circle.
      return yLinearScale(d.healthcare) + 5 ;
    })
    .attr("font-size", 15)
    .attr("class", "stateText")
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })
    var circlesGroup = chartGroup.selectAll("g theCircles")
    // Step 1: Append tooltip div
    var toolTip = d3.select("svg")
    .append("div")
    .classed("tooltip", true);

  // Step 2: Create "mouseover" event listener to display tooltip
  circlesGroup.on("mouseover", function(d) {
    toolTip.style("display", "block")
        .html(
        `<div> ${d.state} </div>`);

  })
    // Step 3: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });


    

    // Create tooltip in the chart
    //circlesGroup.call(toolTip);


    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", ".5em")
        .attr("class", "axisText")
        .text("Percent lacking healthcare");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Percent Living in Poverty");
    }).catch(function(error) {
      console.log(error);
    });
