// Variabelen
var margin = {top: 20, right: 30, bottom: 130, left: 39};
var height = 500 - margin.top - margin.bottom;

// Inladen JSON bestand
d3.json("personalData.json", draw);

// Draw functie aanmaken
function draw(err, data) {
  if (err) throw err;

  // Selecteer input en output element uit de HTML
  var input = document.getElementsByTagName("input")[0];
  var output = document.getElementsByTagName("output")[0];

  // Breedte van de svg
  var width = data.length * 40;

  // y en x scale
  var y = d3.scale.linear().range([height, 0]);
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0);

  // Aanmaken chart
  var chart = d3.select('svg')
    .attr('class', 'chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Definiëren x en y domein
  x.domain(data.map(function(d) {return d.Datum}));
  y.domain([0, 24]);

  // Tekenen van de y as
  chart.append('g')
    .attr('class', 'y axis')
    .call(d3.svg.axis().scale(y).orient('left'))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3.5em")
      .style("text-anchor", "end")
      .text("Aantal uren in een dag");

  // Update functie aanroepen
  update();

  // Update functie aanmaken
  function update() {
    var min = Number(input.value);
    var subset = data.filter(function(d) {
      return d.Studie >= min;
    });

    // Alle bars selecteren
    var bar = chart.selectAll('rect')
      .data(subset);

    // Toevoegen/Verwijderen van bars
    bar.enter().append('rect');
    bar.exit().remove();

    // Tekenen van de bars
    bar
      .attr('width', x.rangeBand() - 1)
      .attr('x', function(d, i) {
        return i * x.rangeBand();
      })
      .attr('y', function(d) {
        return y(d.Studie);
      })
      .attr('height', function(d) {
        return height - y(d.Studie);
      })
      .attr('class', 'studie');

  }

  // EventListener zetten op de slider die een nieuwe waarde doorgeeft voor de var min
  // Daarna wordt de update functie weer aangeroepen
  input.addEventListener('input', function() {
    output.value = input.value;
    update();
  });
}
