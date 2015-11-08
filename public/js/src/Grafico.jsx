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

// Dependencias
var React = require('react');

// Creación del gráfico
function createChart(dom, props) {
  // Altura y anchura
  var width = props.width;
  var height = props.height;
  width = width + 200;

  // Nombres y recuento
  var data = props.data;
  var sum = data.reduce(function(memo, num) {
    return memo + num.count;
  }, 0);

  // Selecciona el elemento que contendrá la gráfica
  var chart = d3.select(dom)
    .append('svg')
    .attr('class', 'd3')
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("transform", "translate(" + (props.width / 2) + "," + (height / 2) + ")");

  // Radio exterior, interior y creación del arco
  var outerRadius = props.width / 2.2;
  var innerRadius = props.width / 8;
  var arc = d3.svg
    .arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  // Colores
  var colors = [
    '#FD9827', '#DA3B21', '#3669C9', '#1D9524', '#971497'
  ];

  // Layout para colocación de los elementos
  var pie = d3.layout
    .pie()
    .value(function(d) {
      return d.count;
    });

  // Comportamiento de cada uno de los sectores
  var g = chart.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")
    // Cuando se hace clic sobre un sector muestra un mensaje
    .on("click", function(d) {
      alert('Seleccionado: ' + d.data.name)
    })
    // Cuando el puntero pasa por encima del sector lo resalta e indica su porcentaje
    .on('mouseover', function(d, i) {
      d3.select(this)
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('transform', function(d) {
          var dist = 10;
          d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
          var x = Math.sin(d.midAngle) * dist;
          var y = -Math.cos(d.midAngle) * dist;
          return 'translate(' + x + ',' + y + ')';
        });
      d3.select(this)
        .append("text")
        .style("fill", function(d) {
          return colors[i];
        })
        .attr("id", "percent")
        .attr('transform', "translate(0,-5)")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .style("font", "bold 15px Arial")
        .text(function(d) {
          return (((d.value / sum) * 100).toFixed(1) + " %");
        });
      g.filter(function(e) {
        return e.value != d.value;
      }).style('opacity', 0.5);
    })
    // Cuando el puntero sale del sector, este vuelve a su estado original
    .on('mouseout', function(d, i) {
      d3.select(this)
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('transform', 'translate(0,0)');
      d3.select("#percent")
        .remove();
      g.filter(function(e) {
        return e.value != d.value;
      }).style('opacity', 1)
    });

  // Comportamiento de cada uno de los sectores de la selección
  g
    .append("path")
    .style("fill", function(d, i) {
      return colors[i];
    })
    .transition()
    .delay(function(d, i) {
      return i * 400;
    })
    .duration(500)
    .attrTween('d', function(d) {
      var i = d3.interpolate(d.startAngle, d.endAngle);
      return function(t) {
        d.endAngle = i(t);
        return arc(d);
      }
    });

  // Filtro de los sectores para obtener el centro
  var center = g.filter(function(d) {
    return d.endAngle - d.startAngle > .1;
  }).append("text")
    .style("fill", "white")
    .attr('transform', function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.value;
    });

  // Leyenda del gráfico
  var legend = chart.selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(150," + (-i * 20) + ")";
    });

  // Cuadrados de la leyenda
  var rect = legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {
      return colors[i];
    })
    .style('opacity', 0);

  // Nombres de la leyenda
  var name = legend.append("text")
    .attr("x", 24)
    .attr("y", 12)
    .text(function(d) {
      var text = d.name;
      if (text.length > 30) {
        text = text.substring(0, 26);
        text = text + '...';
      }
      return text;
    })
    .style('opacity', 0);

  // Aplica transición del cuadro del elemento de la leyenda
  rect
    .transition()
    .delay(function(d, i) {
      return i * 400;
    })
    .duration(1000)
    .style('opacity', 1);

  // Aplica transición del nombre del elemento de la leyenda
  name
    .transition()
    .delay(function(d, i) {
      return i * 400;
    })
    .duration(1000)
    .style('opacity', 1);
};

// Componente del gráfico
module.exports = React.createClass({
  // Propiedades
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired
  },

  // Valores por defecto
  getDefaultProps: function() {
    return {width: 300, height: 350, title: '', Legend: true};
  },

  // Renderización del componente a HTML
  render: function() {
    return (
      <div>
        <h4>
          {this.props.title}
        </h4>
      </div>
    );
  },
  // Recupera los datos y los almacena en el estado del gráfico
  componentDidMount: function() {
    var dom = this.getDOMNode();
    createChart(dom, this.props);
  },
  // Los datos no cambian, así que no es necesario actualizar el gráfico
  shouldComponentUpdate: function() {
    var dom = this.getDOMNode();
    createChart(dom, this.props);
    return false;
  }
});
