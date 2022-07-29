// constants
var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 425 - margin.top - margin.bottom;

    // Define the div for the tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);    
    
async function scene1_load() {

    var scene1 = d3.select('#scene1')

    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data) {
        const cylinders = [0,2,3,4,6,8,10,12]
    
    var scatter_x = d3.scaleLinear().domain([10,150]).range([0,900])
    var scatter_y = d3.scaleLinear().domain([10,150]).range([350,0])
    var fuel_scale = d3.scaleOrdinal().domain(["Gasoline", "Electricity", "Diesel"]).range(["red", "green", "blue"])


    scene1.append("g")
        .attr("transform","translate(70,10)")
        .call(d3.axisLeft(scatter_y).tickFormat(d3.format("~s")));
        
    scene1.append("g")
        .attr("transform","translate(70,350)")
        .call(d3.axisBottom(scatter_x).tickFormat(d3.format("~s")));

    scene1.append("text")
        .attr("text-anchor", "end")
        .attr("x", 600)
        .attr("y", 400)
        .style('fill', 'Black')
        .style('font-weight', 'bold')
        .text("Average City MPG")

    scene1.append("text")
        .attr("text-anchor", "end")
        .attr("x", -100)
        .attr("y", 20)
        .attr("dy", ".25em")
        .style('fill', 'Black')
        .style('font-weight', 'bold')
        .attr("transform", "rotate(-90)")
        .text("Average Highway MPG");


    scene1.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d,i) {return scatter_x(d.AverageCityMPG) + 80;})
        .attr('cy', function(d,i) {return scatter_y(d.AverageHighwayMPG);})
        .attr('r', function(d,i) { return Number(d.EngineCylinders) + 5;})
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
            + "<br/> Avg. Highway MPG: " + data.AverageHighwayMPG 
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

    })

    const annotations1 = [{
        note: {
          label: "Top choices include Hyunda, BMW, Chevolet, Fiat, Mitsubishi",
          title: "Electric cars have higher MPGs",
          wrap: 500,  // try something smaller to see text split in several lines
          padding: 10   // More = text lower
        
       },
       color: "#606060",
       x: 500,
       y: 100,
       dy: -30,
       dx: 0,
       subject: { radius: 50 },
      }]     
  
    const makeAnnotations1 = d3.annotation()
    .annotations(annotations1)
    scene1.append("g")
    .call(makeAnnotations1)

  // Legend
  scene1.append("circle").attr("cx", 800).attr("cy", 300).attr("r", 5).style("fill", "red")
  scene1.append("circle").attr("cx", 800).attr("cy", 320).attr("r", 5).style("fill", "green")
  scene1.append("circle").attr("cx", 800).attr("cy", 340).attr("r", 5).style("fill", "blue")
  scene1.append("text").attr("x", 820).attr("y", 300).text("Gasoline").style("font-size", "15px").attr("alignment-baseline", "middle")
  scene1.append("text").attr("x", 820).attr("y", 320).text("Electric").style("font-size", "15px").attr("alignment-baseline", "middle")
  scene1.append("text").attr("x", 820).attr("y", 340).text("Diesel").style("font-size", "15px").attr("alignment-baseline", "middle")   
}
