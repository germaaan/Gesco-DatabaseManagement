// Márgenes de encuadre del gráfico
var margin = {
  top: 50,
  right: 100,
  bottom: 50,
  left: 100
};

// Ancho y alto del gráfico
var width = 1200 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Mapeamos los dominios de los ejes X e Y para obtener valores válidos
var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1);
var y = d3.scale.linear()
  .range([height, 0]);

// El eje X está orientado al fondo de la página
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

// El eje Y estará orientado a la zona izquierda de la página
// Además, indicamos el número de marcas que va a tener dicho eje
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(20, "%");

// Seleccionamos la zona donde vamos a añadir el gráfico
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parseamos el archivo TSV con los valores del gráfico
d3.tsv("data/data.tsv", type, function(error, data) {
  if (error) throw error;

  // Los valores correspondientes al eje X
  x.domain(data.map(function(d) {
    return d.letter;
  }));
  // Los valores correspondientes al eje Y
  // (calculando además el valor máximo)
  y.domain([0, d3.max(data, function(d) {
    return d.frequency;
  })]);

  // Agregamos a nuestro gráfico el eje X
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Agregamos a nuestro gráfico el eje Y
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

  // Seleccinamos todas las barras del gráfico y las vamos añadiendo
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.letter);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
      return y(d.frequency);
    })
    .attr("height", function(d) {
      return height - y(d.frequency);
    });
});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}