var i;
var barOffset = 10;
var barWidth = 10;
var barSpacing = 20;


d3.json('personalData.json', function (data) {
	console.table(data)

  for(var i=0; i<data.length; i++)
  {
    // console.log("Op een dag heb ik " + data[i].werk + " uur gewerkt en " + data[i].studie + " gestudeerd.");
		d3.select('svg')
    .append('rect')
    .attr('x', barOffset * (i * 2))
    .attr('y', 150 - 10 * data[i].werk)
    .attr('width', barWidth)
    .attr('height', 10 * data[i].werk)
    .attr('class', 'werk');

		d3.select('svg')
    .append('rect')
    .attr('x', barWidth + barOffset * (i * 2))
    .attr('y', 150 - 10 * data[i].studie)
    .attr('width', barWidth)
    .attr('height', 10 * data[i].studie)
    .attr('class', 'studie');
  }
});
