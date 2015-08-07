$(document).ready(function() {
  var self = this;

  // //Fluid Chart
  // $(window).resize(function() {
  //   _resize();
  // });

  var bandCount = 426;

  //Dummy Data
  var ascArr = [];
  var descArr = [];
  var ascArr2 = [];
  var descArr2 = [];
  for (var k = 0; k <= (bandCount / 2); k++) {
    ascArr.push(Math.random());
    descArr.push(Math.random());
    ascArr2.push(Math.random());
    descArr2.push(Math.random());
  }
  var gausianArr = ['Pixel 1'].concat(ascArr.sort(sortAsc)).concat(descArr.sort(sortDesc));
  var gausianArr2 = ['Pixel 2'].concat(ascArr2.sort(sortAsc)).concat(descArr2.sort(sortDesc));

  //generate x axis array
  var xAxis = ['x'];
  for (var j = 0; j <= bandCount; j++) {
    xAxis.push(j);
  }

  //generate wavelength values
  var wavelengthLookup = {};
  var wavelengthMin = 582;
  var wavelengthMax = 2511;
  for (var l = 0; l <= bandCount; l++) {
    wavelengthLookup[l] = parseInt((wavelengthMax - wavelengthMin) / bandCount * l) + wavelengthMin;
  }

  //generate chart
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      columns: [
        xAxis,
        gausianArr,
        gausianArr2
      ],
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
          count: 10//,
          // format: function(x) {
          //   var tickLabel = '';
          //   if (wavelengthLookup[x] !== undefined) {
          //     tickLabel = wavelengthLookup[x];
          //   }
          //
          //   return x;
          // }
        }
      },
      y: {
        label: {
          text: 'Reflectance',
          position: 'outer-middle'
        },
        tick: {
          values: [0, 0.2, 0.4, 0.6, 0.8, 1]
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
      start: 192,
      end: 213,
      class: 'band-1',
      tooltipText: 'Band 1 content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      axis: 'x',
      start: 282,
      end: 315,
      class: 'band-2',
      tooltipText: 'Band 2 content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }],
    grid: {
      x: {
        lines: [{
          value: 0,
          text: 'VIS',
          class: 'wavelength-line-vis'
        }, {
          value: 80,
          text: 'NIR',
          class: 'wavelength-line-nir'
        }, {
          value: 192,
          text: 'Band 1',
          class: 'band-line-1'
        }, {
          value: 282,
          text: 'Band 2',
          class: 'band-line-2'
        }]
      }
    }//,
    // onrendered: function() {
    //   _alignGridText();
    // }
  });

  function _tooltipContents(d, defaultTitleFormat, defaultValueFormat, color) {
    var $$ = this,
      config = $$.config,
      titleFormat = config.tooltip_format_title || defaultTitleFormat,
      valueFormat = config.tooltip_format_value || defaultValueFormat,
      tooltipWrapper, tooltipHeader, tooltipContent, tooltipSubtext,
      i, point, title, value, colorHex, wavelength,
      regions, region, regionText;

    //Stub tooltip blocks
    tooltipWrapper = '<table class="' + $$.CLASS.tooltip + '">';

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

      if (wavelengthLookup[point.x] !== undefined) {
        wavelength = wavelengthLookup[point.x];
      } else {
        wavelength = 'null';
      }

      value = valueFormat(point.value, point.ratio, point.id, point.index);

      tooltipContent += '<tr>';
      tooltipContent += '<td class="c3-tooltip-series-name" style="color: ' + colorHex + '">' + point.name + '</td>';
      tooltipContent += '<td class="c3-tooltip-value">' + value + '</td>';
      tooltipContent += '<td class="c3-tooltip-value">' + wavelength + ' (' + point.x + ')</td>';
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

  //util sort functions
  function sortAsc(a, b) {
    return a - b;
  }
  function sortDesc(a, b) {
    return b - a;
  }

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

});
