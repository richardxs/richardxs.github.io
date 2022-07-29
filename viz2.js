var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 375 - margin.top - margin.bottom;

var x = d3.scaleLinear().domain([0, 14]).range([0, width])
var y = d3.scaleLog().base(10).domain([10, 150]).range([height, 0])
var fuel_scale = d3.scaleOrdinal().domain(["Gasoline", "Electricity", "Diesel"]).range(["red", "green", "blue"])

var tooltip = d3.select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")


async function scene2_load() {
    
    const data = await d3.csv("https://flunky.github.io/cars2017.csv")

   // Average City MPG    
   var scene21 = d3.select('#scene2_1')

    scene21.append("g")
        .attr("transform",  "translate(70,35)")
        .call(d3.axisLeft(y)
        .tickValues([10, 20, 50, 100])
        .tickFormat((d, _) => d3.format("~s")(d)));


    scene21.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", -100)
        .style("text-anchor", "end")
        .text("Average City MPG")
        .style('fill', 'Black')
        .style('font-weight', 'bold')  

    scene21.append("g")
        .attr("transform",  "translate(70,350)")
        .call(d3.axisBottom(x)
        .tickValues([0, 2, 4, 6, 8, 10, 12])
        .tickFormat((d, _) => d3.format("~s")(d)));
    

    scene21.append("text")
        .attr('x', 600)
        .attr('y', 400)
        .attr('text-anchor', 'end')
        .text("Number of Cylinders")
        .style('fill', 'Black')
        .style('font-weight', 'bold')
    

    scene21.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', (d, _) => d.Fuel.toLowerCase())
        // 50 is add the left margin
        .attr('cx', (d, _) => x(d.EngineCylinders) + 70)
        .attr('cy', (d, _) => y(d.AverageCityMPG) + 35 )
        .attr('r', (d, _) => parseInt(d.EngineCylinders) + 5)
        .style('fill', function(d,i) { return fuel_scale(d.Fuel);})        
        .on("mouseover", function(index, data) {
        
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.5');
            
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                
                    tooltip.html(
                "Avg. City MPG: " + data.AverageCityMPG
                + "<br/> Fuel Type: " + data.Fuel
                + "<br/> Cylinders: " + data.EngineCylinders
                + "<br/> Make: " + data.Make
                )
                    .style("left", (event.pageX+15) + "px")
                    .style("top", (event.pageY+15) + "px");
                })
            .on("mouseout", function(d) {
        
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
        
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                    });
 
  // Legend
  scene21.append("circle").attr("cx", 800).attr("cy", 100).attr("r", 5).style("fill", "red")
  scene21.append("circle").attr("cx", 800).attr("cy", 120).attr("r", 5).style("fill", "green")
  scene21.append("circle").attr("cx", 800).attr("cy", 140).attr("r", 5).style("fill", "blue")
  scene21.append("text").attr("x", 820).attr("y", 100).text("Gasoline").style("font-size", "15px").attr("alignment-baseline", "middle")
  scene21.append("text").attr("x", 820).attr("y", 120).text("Electric").style("font-size", "15px").attr("alignment-baseline", "middle")
  scene21.append("text").attr("x", 820).attr("y", 140).text("Diesel").style("font-size", "15px").attr("alignment-baseline", "middle")   

  scene21.append("text")
  .attr("x", 500)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "26px")
  .text("Average City MPG");


  // Average Highway MPG
  var scene22 = d3.select('#scene2_2')

  scene22.append("g")
      .attr("transform",  "translate(70,35)")
      .call(d3.axisLeft(y)
      .tickValues([10, 20, 50, 100])
      .tickFormat((d, _) => d3.format("~s")(d)));


  scene22.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x", -100)
      .style("text-anchor", "end")
      .text("Average Highway MPG")
      .style('fill', 'Black')
      .style('font-weight', 'bold')  

  scene22.append("g")
      .attr("transform",  "translate(70,350)")
      .call(d3.axisBottom(x)
      .tickValues([0, 2, 4, 6, 8, 10, 12])
      .tickFormat((d, _) => d3.format("~s")(d)));
  

  scene22.append("text")
      .attr('x', 600)
      .attr('y', 400)
      .attr('text-anchor', 'end')
      .text("Number of Cylinders")
      .style('fill', 'Black')
      .style('font-weight', 'bold')
  

  scene22.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', (d, _) => d.Fuel.toLowerCase())
      // 50 is add the left margin
      .attr('cx', (d, _) => x(d.EngineCylinders) + 70)
      .attr('cy', (d, _) => y(d.AverageHighwayMPG) + 50 )
      .attr('r', (d, _) => parseInt(d.EngineCylinders) + 5)
      .style('fill', function(d,i) { return fuel_scale(d.Fuel);})        
      .on("mouseover", function(index, data) {
      
          d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.5');
          
              tooltip.transition()
                  .duration(200)
                  .style("opacity", 0.9);
              
                  tooltip.html(
              "Avg. Highway MPG: " + data.AverageHighwayMPG
              + "<br/> Fuel Type: " + data.Fuel
              + "<br/> Cylinders: " + data.EngineCylinders
              + "<br/> Make: " + data.Make
              )
                  .style("left", (event.pageX+15) + "px")
                  .style("top", (event.pageY+15) + "px");
              })
        .on("mouseout", function(d) {
        
            d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
    
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
                });

// Legend
scene22.append("circle").attr("cx", 800).attr("cy", 100).attr("r", 5).style("fill", "red")
scene22.append("circle").attr("cx", 800).attr("cy", 120).attr("r", 5).style("fill", "green")
scene22.append("circle").attr("cx", 800).attr("cy", 140).attr("r", 5).style("fill", "blue")
scene22.append("text").attr("x", 820).attr("y", 100).text("Gasoline").style("font-size", "15px").attr("alignment-baseline", "middle")
scene22.append("text").attr("x", 820).attr("y", 120).text("Electric").style("font-size", "15px").attr("alignment-baseline", "middle")
scene22.append("text").attr("x", 820).attr("y", 140).text("Diesel").style("font-size", "15px").attr("alignment-baseline", "middle")   

scene22.append("text")
.attr("x", 500)
.attr("y", 20)
.attr("text-anchor", "middle")
.style("font-size", "26px")
.text("Average Highway MPG");

// Annotations
const annotations1 = [{
    note: {
      label: "",
      title: "Average City MPG decreses with a rising number of cylinders",
      wrap: 500,  // try something smaller to see text split in several lines
      padding: 10   // More = text lower
    
   },
   color: "#606060",
   x: 150,
   y: 180,
   dy: -30,
   dx: 0,
   subject: { radius: 150 },
  }]

const annotations2 = [{
    note: {
        label: "",
        title: "Average Highway MPG decreses with a rising number of cylinders",
      wrap: 500,  // try something smaller to see text split in several lines
      padding: 10   // More = text lower
    
   },
   color: "#606060",
   x: 150,
   y: 180,
   dy: -30,
   dx: 0,
   subject: { radius: 150 },
  }]          

const makeAnnotations1 = d3.annotation()
.annotations(annotations1)
scene21.append("g")
.call(makeAnnotations1)

const makeAnnotations2 = d3.annotation()
.annotations(annotations2)
scene22.append("g")
.call(makeAnnotations2)       


}
