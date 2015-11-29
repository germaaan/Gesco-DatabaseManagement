/*
Gesco-DatabaseManagement. Módulo para la gestión de la información de la base
de datos de la aplicación Gesco. Copyright (C) 2015 Germán Martínez Maldonado

This file is part of Gesco-DatabaseManagement.

Gesco-DatabaseManagement is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

Gesco-DatabaseManagement is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


// Márgenes de encuadre del gráfico
var margin = {
  top: 0,
  right: 100,
  bottom: 50,
  left: 100
};

// Ancho y alto del gráfico
var width = 1200 - margin.left - margin.right;
var height = 525 - margin.top - margin.bottom;

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
    return d.nombre;
  }));
  // Los valores correspondientes al eje Y
  // (calculando además el valor máximo)
  y.domain([0, d3.max(data, function(d) {
    return d.frecuencia;
  })]);

  // Agregamos a nuestro gráfico el eje X
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("transform", "rotate(0)")
    .attr("x", 6)
    .attr("dx", "48.5em")
    .attr("dy", "3.5em")
    .style("text-anchor", "end")
    .text("Nombre");

  // Agregamos a nuestro gráfico el eje Y
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5em")
    .attr("dx", "-23em")
    .style("text-anchor", "end")
    .text("Frecuencia");

  // Seleccinamos todas las barras del gráfico y las vamos añadiendo
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.nombre);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
      return y(d.frecuencia);
    })
    .attr("height", function(d) {
      return height - y(d.frecuencia);
    });
});

function type(d) {
  d.frecuencia = +d.frecuencia;
  return d;
}
