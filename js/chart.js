$(document).ready(function() {
  //var self = this;

  // //Fluid Chart
  // $(window).resize(function() {
  //   _resize();
  // });

  function _tooltipContents(d, defaultTitleFormat, defaultValueFormat, color) {
    var self = this;
    var config = self.config;
    var valueFormat = config.tooltip_format_value || defaultValueFormat;
    var tooltipWrapper;
    var tooltipHeader;
    var tooltipContent;
    var tooltipSubtext;
    var i;
    var point;
    var value;
    var colorHex;
    // var wavelength;
    var regions;
    var region;
    var regionText;

    //Stub tooltip blocks
    tooltipWrapper = '<table class="' + self.CLASS.tooltip + '">';

    tooltipHeader = '<thead><tr><th></th>';
    tooltipHeader += '<th class="c3-tooltip-title">' + config.axis_y_label.text + '</th>';
    tooltipHeader += '<th class="c3-tooltip-title">' + config.axis_x_label.text + '</th>';
    tooltipHeader += '</tr></thead>';

    tooltipContent = '<tbody>';

    //Add tooltip content row for each datapoint at this position
    for (i = 0; i < d.length; i++) {
      point = d[i];

      if (!(point && (point.value || point.value === 0))) {
        continue;
      }

      colorHex = config.data_colors[point.name];

      value = valueFormat(point.value, point.ratio, point.id, point.index);

      tooltipContent += '<tr>';
      tooltipContent += '<td class="c3-tooltip-series-name" style="color: ' + colorHex + '">' + point.name + '</td>';
      tooltipContent += '<td class="c3-tooltip-value">' + value + '</td>';
      tooltipContent += '<td class="c3-tooltip-value">' + point.x + '</td>';
      tooltipContent += '</tr>';
    }

    //Get subtext
    tooltipSubtext = '';
    //Check if point is within a region
    regions = config.regions;
    for (var j = 0; j < regions.length; j++) {
      region = regions[j];

      if ((point.x >= region.start) && (point.x <= region.end)) {
        regionText = region.tooltipText;
      }
    }

    if (regionText) {
      tooltipSubtext += '<tr>';
      tooltipSubtext += '<td class="c3-tooltip-note" colspan="3">' + regionText + '</td>';
      tooltipSubtext += '</tr>';
    }

    //Wrap tooltip elem
    tooltipWrapper += tooltipHeader + tooltipContent + tooltipSubtext;
    tooltipWrapper += '</tbody></table>';

    return tooltipWrapper;
  }

  //generate chart
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      url: 'js/data.json',
      mimeType: 'json',
      min: 350,
      max: 2500,
      type: 'spline',
      colors: {
        'Pixel 1': '#3D9EE0',
        'Pixel 2': '#f05050'
      }
    },
    title: {
      text: 'Spectral Profile'
    },
    padding: {
      top: 20,
      right: 100,
      bottom: 40,
      left: 100,
    },
    axis: {
      x: {
        label: {
          text: 'Wavelength',
          position: 'outer-center'
        },
        tick: {
          count: 10,
          format: function(x) {
            return Math.round(x);
          }
        }
      },
      y: {
        label: {
          text: 'Reflectance',
          position: 'outer-middle'
        }
      }
    },
    tooltip: {
      format: {
        value: function(value, ratio, id) {
          return Math.round(value * 100) / 100;
        }
      },
      contents: _tooltipContents
    },
    legend: {
      position: 'right'
    },
    regions: [{
      axis: 'x',
      start: 692,
      end: 713,
      class: 'band-1',
      tooltipText: 'Band 1 content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      axis: 'x',
      start: 782,
      end: 815,
      class: 'band-2',
      tooltipText: 'Band 2 content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }],
    grid: {
      x: {
        lines: [{
          value: 350,
          text: 'VIS',
          class: 'wavelength-line-vis'
        }, {
          value: 430,
          text: 'NIR',
          class: 'wavelength-line-nir'
        }, {
          value: 692,
          text: 'Band 1',
          class: 'band-line-1'
        }, {
          value: 782,
          text: 'Band 2',
          class: 'band-line-2'
        }]
      }
    }//,
    // onrendered: function() {
    //   _alignGridText();
    // }
  });

  // function _alignGridText() {
  //   d3.selectAll('.c3-xgrid-line text')
  //     .attr('transform', 'rotate(0)')
  //     .attr('y', 19)
  //     .attr('text-anchor', 'start')
  //     .attr('x', function(val) {
  //       //get parent dom element
  //       var lineX = d3.select('.' + val.class + ' line').attr('x1');
  //
  //       return parseInt(lineX) + 8;
  //     });
  // }

  return chart;
});
