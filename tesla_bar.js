function plotPieChart(data) {
    d3.select('svg').remove();
    
    // svg width and height
    const width = 1500;
    const height = 600;
    const radius = height / 3;

    // Create svg element
    const svg = d3.select('#chart')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
        
    const color = d3.scaleOrdinal().domain(data).range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]);
    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    // Generate the pie
    const pie = d3.pie()
                .value(function(d) {
                    return Math.round(d.percentage * 100).toFixed(2);
                });

    // Generate the arcs
    const arc = d3.arc()
                .innerRadius(radius - 180)
                .outerRadius(radius + 75);

    const arcData = d3.nest()
                .key(function(d) {
                    return d.time;
                 })
                .rollup(function(d) {
                    return d[0].sales;
                }).entries(data);
    
    
    var totalSales = 0;
    data.map(function(result) {
        totalSales = totalSales + result.sales;
    });

    const percentageArray = [];

    arcData.forEach(function(d) {
        d.percentage = parseFloat(d.value / totalSales).toFixed(2) * 100;
        percentageArray.push(d.percentage);
    });

    var g = svg.selectAll(".arc")
                .data(pie(arcData))
                .enter().append("g")
                .attr("class", "arc")
                .attr('id', function(d) {
                    return "pie" + d.data.key;
                })
                .on('mouseover', function() {
                    var current = this;  
                    var others = svg.selectAll(".arc").filter(function(el) {
                        return this != current
                    });
                    others.selectAll("path").style('opacity', 0.8);
                })
                .on("mousemove", function(d){
                    tooltip
                      .style("left", d3.event.pageX - 50 + "px")
                      .style("top", d3.event.pageY - 70 + "px")
                      .style("display", "inline-block")
                      .html("In " + (d.data.key) + ", <br>" + "Total Sales: " + (d.data.value) + " cars");
                })
                .on('mouseout', function() {
                    var current = this;
                    d3.select(this)
                    .style('opacity', 1);
                    var others = svg.selectAll(".arc").filter(function(el) {
                        return this != current
                    });
                    others.selectAll("path").style('opacity', 1);
                    tooltip.style("display", "none");
                })
                .on('click', function() {
                    tooltip.style("display", "none")
                })

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            if(d.data != null && d.data.key.length !== 0) {
                return color(d.data.key);
            }
        })

    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.percentage.toFixed(0) + '%';
        });
    
    const legendRectSize = 18;
    const legendSpacing = 4;

    const legend = svg.selectAll('.legend')
                    .data(color.domain().splice(1))
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        const h = legendRectSize + legendSpacing;
                        const offset = h * color.domain().length / 2;
                        const horz = legendRectSize * 20;
                        const vert = i * h - offset;
                        return 'translate(' + horz + ',' + vert + ')';    
                    });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
            return d; 
        });
    
    d3.select('#pie2015').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2015); 
                                    });
    d3.select('#pie2016').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2016) 
                                    });
    d3.select('#pie2017').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2017) 
                                    });

    d3.select('#pie2018').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2018) 
                                    });
    d3.select('#pie2019').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2019) 
                                    });

    d3.select('#pie2020').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2020) 
                                    });
    d3.select('#pie2021').on('click', () => { 
                                        tooltip.remove();
                                        plotPieChart(year2021) 
                                    });
};


function plotBarChart(data) {
    d3.select('svg').remove();

    // svg width and height
    const width = 1500;
    const height = 600;
    const margin = { top: 50, bottom: 50, left: 50, right: 50 };

    // Create svg element
    let svg = d3.select('#chart')
        .append('svg')
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewBox', [0, 0, width, height]);
    
    svg.append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('x', width - 50)
        .attr('y', height - 7)
        .attr("font-size" , "20px")
        .attr("font-family" , "sans-serif")
        .text('Year');
    
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr('x', -100)
        .attr("y", -75)
        .attr("dy", ".95em")
        .attr("transform", "rotate(-90)")
        .attr("font-size" , "20px")
        .attr("font-family" , "sans-serif")
        .text("Car sales volume (unit) ");

    // x scale
    const xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    // y scale
    const yScale = d3.scaleLinear()
        .domain([0, Math.max(...data.map(ele =>  ele.sales))])
        .range([height - margin.bottom, margin.top]);

    const yAxis = d3.axisLeft().scale(yScale).ticks(null, data.format);
    const xAxis = d3.axisBottom().scale(xScale).tickFormat(i => data[i].time);

    // Chart
    const chart = svg.append('g')
                    .attr('tranform', 'translate(${margin}, ${margin})');

    svg.append('g').attr('transform', 'translate(' + margin.left + ',' + 0 + ')').call(yAxis).attr('font-size', '20px');
    svg.append('g').attr('transform', 'translate(' + 0 + ',' + (height - margin.bottom) + ')').call(xAxis).attr('font-size', '20px');
    svg.node();

    const color = d3.scaleOrdinal().domain(data).range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]);

    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    // Create bars
    let bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('g');

    bars.append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d) => yScale(d.sales))
        .attr('height', d => yScale(0) - yScale(d.sales))
        .attr('width', xScale.bandwidth())       
        .attr('id', function(d) {
            return "bar" + d.time;
        })
        .attr('fill', function(d, i) {
            return color(i);
        })
        .on('mouseover', function() {
            var current = this;  
            var others = svg.selectAll(".rect").filter(function(el) {
                return this != current
            });
            others.selectAll("rect").style('opacity', 0.8);
        })
        .on("mousemove", function(d){
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("In " + (d.time) + ", <br>" + "Total Sales: " + (d.sales) + " cars");
        })
        .on('mouseout', function() {
            var current = this;
            d3.select(this)
            .style('opacity', 1);
            var others = svg.selectAll(".rect").filter(function(el) {
                return this != current
            });
            others.selectAll("rect").style('opacity', 1);
            tooltip.style("display", "none");
        })
        
    bars.append('text')
        .text(function(d) {
            return d.sales;
        })
        .attr("x", function(d, i){
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d){
            return yScale(d.sales) - 5;
        })
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "17px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle");

    d3.select('#bar2015').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2015) 
                                        });
    d3.select('#bar2016').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2016) 
                                        });
    d3.select('#bar2017').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2017) 
                                        });
    d3.select('#bar2018').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2018) 
                                        });
    d3.select('#bar2019').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2019) 
                                        });
    d3.select('#bar2020').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2020) 
                                        });
    d3.select('#bar2021').on('click', () => { 
                                            tooltip.remove();
                                            plotBarChart(year2021) 
                                        });
};

let sel = "Bar";
function mainPage(next) {
    if (next) {
        sel = next;
    };

    if (sel == "Pie") {
        document.getElementById("header").innerHTML = "Tesla Sales Records Pie Chart";
        plotPieChart(totalSalesData);
    } else if (sel == "Bar") {
        document.getElementById("header").innerHTML = "Tesla Sales Records Bar Chart";
        plotBarChart(totalSalesData);
    } else {
        return;
    };
};

const totalSalesData = [
    {time: '2015', sales: 87412 },
    {time: '2016', sales: 26725 },
    {time: '2017', sales: 50067 },
    {time: '2018', sales: 197517 },
    {time: '2019', sales: 195125 },
    {time: '2020', sales: 292902 },
    {time: '2021', sales: 139302 },
];

const year2015 = [
    { time: 'January', sales: 0 },
    { time: 'Febuary', sales: 2000 },
    { time: 'March', sales: 1200 },
    { time: 'April', sales: 1700 },
    { time: 'May', sales: 1700 },
    { time: 'June', sales: 1700 },
    { time: 'July', sales: 1700 },
    { time: 'August', sales: 1700 },
    { time: 'September', sales: 1700 },
    { time: 'October', sales: 1730 },
    { time: 'November', sales: 1712 },
    { time: 'December', sales: 1900 },
];

const year2016 = [
    { time: 'January', sales: 2075 },
    { time: 'Febuary', sales: 2150 },
    { time: 'March', sales: 2250 },
    { time: 'April', sales: 2250 },
    { time: 'May', sales: 2250 },
    { time: 'June', sales: 2250 },
    { time: 'July', sales: 2250 },
    { time: 'August', sales: 2250 },
    { time: 'September', sales: 2250 },
    { time: 'October', sales: 2250 },
    { time: 'November', sales: 2250 },
    { time: 'December', sales: 2250 },
];

const year2017 = [
    { time: 'January', sales: 2800 },
    { time: 'Febuary', sales: 3000 },
    { time: 'March', sales: 3000 },
    { time: 'April', sales: 4400 },
    { time: 'May', sales: 4400 },
    { time: 'June', sales: 4400 },
    { time: 'July', sales: 4400 },
    { time: 'August', sales: 4400 },
    { time: 'September', sales: 4517 },
    { time: 'October', sales: 4545 },
    { time: 'November', sales: 4745 },
    { time: 'December', sales: 5460 },
];

const year2018 = [
    { time: 'January', sales: 6875 },
    { time: 'Febuary', sales: 7485 },
    { time: 'March', sales: 8820 },
    { time: 'April', sales: 6150 },
    { time: 'May', sales: 11250 },
    { time: 'June', sales: 11062 },
    { time: 'July', sales: 16675 },
    { time: 'August', sales: 21700 },
    { time: 'September', sales: 29975 },
    { time: 'October', sales: 20325 },
    { time: 'November', sales: 24600 },
    { time: 'December', sales: 32600 },
];

const year2019 = [
    { time: 'January', sales: 8325 },
    { time: 'Febuary', sales: 7650 },
    { time: 'March', sales: 14625 },
    { time: 'April', sales: 11925 },
    { time: 'May', sales: 16350 },
    { time: 'June', sales: 25025 },
    { time: 'July', sales: 15650 },
    { time: 'August', sales: 16025 },
    { time: 'September', sales: 23025 },
    { time: 'October', sales: 18612 },
    { time: 'November', sales: 19301 },
    { time: 'December', sales: 18612 },
];

const year2020 = [
    { time: 'January', sales: 22350 },
    { time: 'Febuary', sales: 20450 },
    { time: 'March', sales: 10000 },
    { time: 'April', sales: 6624 },
    { time: 'May', sales: 14720 },
    { time: 'June', sales: 15456 },
    { time: 'July', sales: 48846 },
    { time: 'August', sales: 43418 },
    { time: 'September', sales: 47036 },
    { time: 'October', sales: 21591 },
    { time: 'November', sales: 17736 },
    { time: 'December', sales: 24675 },
];

const year2021 = [
    { time: 'January', sales: 21120 },
    { time: 'Febuary', sales: 21120 },
    { time: 'March', sales: 23760 },
    { time: 'April', sales: 24751 },
    { time: 'May', sales: 23799 },
    { time: 'June', sales: 24751 },
    { time: 'July', sales: 0 },
    { time: 'August', sales: 0 },
    { time: 'September', sales: 0 },
    { time: 'October', sales: 0 },
    { time: 'November', sales: 0 },
    { time: 'December', sales: 0 },
];