var barOffset = 10;
var barWidth = 10;
var barSpacing = 20;
var svg = d3.select("#mondelingDataOne");

var width = 400,
    height = 320,
    padding = 40;


var yScale = d3.scale.linear()
	.domain([0, 24])
  .range([height - padding, padding]);

var xScale = d3.scale.ordinal()
    .domain([])
    .range([padding, width - padding * 2]);


var yAxis = d3.svg.axis()
		.orient("left")
		.scale(yScale);

var xAxis = d3.svg.axis()
    .orient("bottom")
    .scale(xScale);


d3.json('personalData.json', function (data) {
	console.table(data);

  svg.append("g")
			.attr("class", "yaxis")
  		.attr("transform", "translate("+padding+",0)")
  		.call(yAxis);

  svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis);

  for(var i=0; i<data.length; i++)
  {
    // console.log("Op deze dag heb ik " + data[i].werk + " uur gewerkt en " + data[i].studie + " gestudeerd.");
		d3.select('svg')
    .append('rect')
    .attr('x', padding + barWidth + barOffset * (i * 2))
    .attr('y', yScale(data[i].werk))
    .attr('width', barWidth)
    .attr('height', 10 * data[i].werk)
    .attr('class', 'werk');

		d3.select('svg')
    .append('rect')
    .attr('x', padding + barWidth + barOffset * (i * 2))
    .attr('y', 280 - 10 * data[i].studie)
    .attr('width', barWidth)
    .attr('height', 10 * data[i].studie)
    .attr('class', 'studie');
  }
});
