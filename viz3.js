// constants
var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// axis definition
var x = d3.scaleBand()
    .domain([10, 20, 30, 40, 50])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, 50])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10);

// 4 cylinders gasline cars
var makes = ["Acura", "Alfa Romeo", "Audi", "BMW", "Buick",
             "Cadillac", "Chevrolet", "Chrysler", "Dodge","Fiat", 
             "Ford","GMC", "Honda", "Hyundai", "Infiniti", 
             "Jaguar", "Jeep", "Kia","Land Rover", "Lexus", 
            "Lincoln",  "Mazda",   "Mercedes-Benz", "MINI", "Mitsubishi",
            "Nissan", "Porsche","Ram", "Subaru","Toyota", 
            "Volkswagen", "Volvo"];
    

var highway_mpgs = ["35", "33", "31", "32", "29",
                    "31", "32.5", "36", "25", "32", 
                    "28", "27", "38", "34", "28.5",
                    "30", "29", "33", "27","33", 
                    "29", "35", "30", "33", "31",
                    "32", "27", "28", "30", "33",
                    "30.5" ,"30.5"];

var city_mpgs = ["25", "24", "23.5","23", "21.5",
                 "22", "24", "23", "19", "24", 
                 "21.5", "20", "30", "27", "23.5",
                 "21", "22.5", "27", "20", "30.5",
                "23",  "26", "23", "24", "24",
                "26", "21", "21", "23", "29",
                "22.5", "22.5"];


var bar_tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")

var mouseout = (d, _) => {
        bar_tooltip
          .transition()
          .style("opacity", 1)
    }

async function scene3_load() {
    var scene31 = d3.select('#scene31')
    var scene32 = d3.select('#scene32')

        d3.csv("https://flunky.github.io/cars2017.csv").then(function (data) {
        // Average Highway MPG
            // axis appends
            scene31.append("g")
                .attr("transform", "translate(50,20)")
                .attr("class", "axis")
                .call(yAxis);
    
            // axis labels
            scene31.append('text')
                .attr('x', -150)
                .attr('y', 15)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('MPG')
    
            scene31.append('text')
                .attr('x', 500)
                .attr('y', 450)
                .attr('text-anchor', 'middle')
                .text('Vehicles')
            
    
            var makeScale = d3.scaleBand()
                .range([0, width])
                .domain(makes)
            var makeAxis = d3.axisBottom()
                .scale(makeScale)
                .ticks(5);
    
            scene31.append("g")
                .attr("transform", "translate(50,350)")
                .attr("class", "axis")
                .call(makeAxis)
                .selectAll("text")
                .attr("transform", "translate(-20,10) rotate(-90)")
                .style("text-anchor", "end");
    
            scene31.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")          
                .attr("x", function (d, i) { return margin.left + makeScale(makes[i]); })
                .attr("y", function (d, i) { return y(highway_mpgs[i]) + 10; })
                .attr("width", makeScale.bandwidth() - 10)
                .attr("height", function (d, i) { return height - y(highway_mpgs[i]); })
                .attr("fill", "#0099FF")
                .on("mouseover", function(index, data) {        
                    d3.select(this).transition()
                        .duration(50)
                    //    .attr('opacity', 0.9);
                    
                        bar_tooltip.transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        
                            bar_tooltip.html(
                        "Avg. Highway MPG: " + highway_mpgs[data]
                        + "<br/> Make: " + makes[data]
                        )
                            .style("left", (event.pageX+15) + "px")
                            .style("top", (event.pageY+15) + "px");
                        })               
                .on("mouseout", mouseout);
            
            scene31.append("text")
                .attr("x", 500)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .style("font-size", "26px")
                .text("Average Highway MPG");


        // Average City MPG
            // axis appends
            scene32.append("g")
                .attr("transform", "translate(50,20)")
                .attr("class", "axis")
                .call(yAxis);
    
            // axis labels
            scene32.append('text')
                .attr('x', -150)
                .attr('y', 15)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('MPG')
    
            scene32.append('text')
                .attr('x', 500)
                .attr('y', 450)
                .attr('text-anchor', 'middle')
                .text('Vehicles')
            
    
    
            scene32.append("g")
                .attr("transform", "translate(50,350)")
                .attr("class", "axis")
                .call(makeAxis)
                .selectAll("text")
                .attr("transform", "translate(-20,10) rotate(-90)")
                .style("text-anchor", "end");
    
            scene32.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")          
                .attr("x", function (d, i) { return margin.left + makeScale(makes[i]); })
                .attr("y", function (d, i) { return y(city_mpgs[i]) + 10; })
               .attr("width", makeScale.bandwidth() - 10)
                .attr("height", function (d, i) { return height - y(city_mpgs[i]); })
                .attr("fill", "#D93927")
                .on("mouseover", function(index, data) {        
                    d3.select(this).transition()
                        .duration(50)
                    //    .attr('opacity', '.9');
                    
                        bar_tooltip.transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        
                            bar_tooltip.html(
                        "Avg. City MPG: " + city_mpgs[data]
                        + "<br/> Make: " + makes[data]
                        )
                            .style("left", (event.pageX+15) + "px")
                            .style("top", (event.pageY+15) + "px");
                        })               
                .on("mouseout", mouseout);            

            
            scene32.append("text")
                .attr("x", 500)
                .attr("y", 50)
                .attr("text-anchor", "middle")
                .style("font-size", "26px")
                .text("Average City MPG");        
        })

        const annotations1 = [{
            note: {
              label: "Top choices include Chevolet, Honda, Mazda, Toyota, Hyundai",
              title: "Fuel Efficient 4-Cylinder Gasoline Cars on Highway",
              wrap: 500,  // try something smaller to see text split in several lines
              padding: 10   // More = text lower
            
           },
           color: "#606060",
           x: 250,
           y: 280,
           dy: -180,
           dx: 0,
           subject: { radius: 150 },
          }]

        const annotations2 = [{
            note: {
              label: "Top choices include Honda, Hyundai, Kia, Lexus, Toyota",
              title: "Fuel Efficient 4-Cylinder Gasoline Cars in City",
              wrap: 500,  // try something smaller to see text split in several lines
              padding: 10   // More = text lower
            
           },
           color: "#606060",
           x: 380,
           y: 320,
           dy: -180,
           dx: 0,
           subject: { radius: 150 },
          }]          
      
        const makeAnnotations1 = d3.annotation()
        .annotations(annotations1)
        scene31.append("g")
        .call(makeAnnotations1)

        const makeAnnotations2 = d3.annotation()
        .annotations(annotations2)
        scene32.append("g")
        .call(makeAnnotations2)        

    }
