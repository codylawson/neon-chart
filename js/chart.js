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
    tooltipHeader += '<th class="c3-tooltip-title">Band</th>';
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
      tooltipContent += '<td class="c3-tooltip-value">' + Math.round(point.x * 0.25) + '</td>'; // TODO: Replace Band calculation with real data
      tooltipContent += '</tr>';
    }

    //Get subtext
    tooltipSubtext = '';
    //Check if point is within a region
    regions = config.regions;
    for (var j = 0; j < regions.length; j++) {
      region = regions[j];

      if ((point.x >= region.start) && (point.x <= region.end) && !regionText) {
        regionText = region.tooltipText;
      }
    }

    if (regionText) {
      tooltipSubtext += '<tr>';
      tooltipSubtext += '<td class="c3-tooltip-note" colspan="4">' + regionText + '</td>';
      tooltipSubtext += '</tr>';
    }

    //Wrap tooltip elem
    tooltipWrapper += tooltipHeader + tooltipContent + tooltipSubtext;
    tooltipWrapper += '</tbody></table>';

    return tooltipWrapper;
  }

  function _generateXAxisRanges() {
    //Clean up previous renders
    d3.selectAll('.c3-axis-ranges').remove();

    //Create graphic that all ranges and text will be placed in
    var rangeContainer = d3.select('.c3-axis-x').append('g')
      .attr('class', 'c3-axis-x-ranges c3-axis-ranges')[0][0];

    //Move axis label down to make room for other elements
    d3.select('.c3-axis-x-label')
      .attr('dy', '6em');

    //Place regions with the 'range' class in the xaxis ranges graphic
    var regions = d3.selectAll('.c3-regions [class*="c3-axis-range"]')[0];

    //Loop through regions and place them in x axis
    for (var i = 0; i < regions.length; i++) {
      var region = regions[i];
      var rect = region.firstElementChild;

      //Set range defaults
      var rangeElHeight = 20; //Height of range in axis
      var rangeElYOffset = 30; //Distance from axis top
      var textOffset = 20; //Base off text height

      //Get range size and position values
      var rangeWidth = d3.select(rect)[0][0].width.baseVal.value; //Width of the range
      var rectXOffset = d3.select(rect)[0][0].x.baseVal.value; //Distance from chart left

      //resize region
      d3.select(rect)
        .attr('y', rangeElYOffset)
        .attr('height', rangeElHeight)
        .attr('stroke-dasharray', '0,' + rangeWidth + ',' + (rangeElHeight + rangeWidth + rangeElHeight))
        .attr('stroke-width', 1);

      //move to the axis node
      rangeContainer.appendChild(region);

      //get range text
      var rangeText = '';
      d3.select(rect)
        .attr('rangeName', function(val) {
          rangeText = val.rangeName;

          return val.rangeName;
        });

      //place range text
      d3.select(rangeContainer).append('text')
        .text(rangeText)
        .attr('text-anchor', 'middle')
        .attr('x', function(val) {
          var middleOffset = rangeWidth * 0.5;
          var rangeX = rectXOffset;

          return rangeX += middleOffset;
        })
        .attr('class', 'range-text')
        .attr('y', (rangeElYOffset + rangeElHeight + textOffset));

      //transform ranges to give the elements space
      var translateCalc = rangeWidth * 0.03;
      d3.select(region)
        .attr('transform', 'scale(.98, 1), translate(' + translateCalc + ', 0)');
    }
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
        'Pixel 1': '#3D9EE0'//,
        //'Pixel 2': '#f05050'
      }
    },
    title: {
      text: 'Spectral Profile'
    },
    padding: {
      top: 20,
      right: 100,
      bottom: 100,
      left: 100,
    },
    axis: {
      x: {
        label: {
          text: 'Wavelength (nm)',
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
        },
        min: 0
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
      start: 1350,
      end: 1450,
      class: 'band-1',
      tooltipText: 'Atmospheric Window: content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      axis: 'x',
      start: 1800,
      end: 1950,
      class: 'band-2',
      tooltipText: 'Atmospheric Window: content Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      axis: 'x',
      start: 350,
      end: 700,
      class: 'c3-axis-range range-vis',
      rangeName: 'Visible'
    }, {
      axis: 'x',
      start: 700,
      end: 1400,
      class: 'c3-axis-range range-nir',
      rangeName: 'NIR'
    }, {
      axis: 'x',
      start: 1400,
      end: 2500,
      class: 'c3-axis-range range-swir',
      rangeName: 'SWIR'
    }],
    grid: {
      // x: {
      //   lines: [{
      //     value: 350,
      //     text: 'VIS',
      //     class: 'wavelength-line-vis'
      //   }, {
      //     value: 430,
      //     text: 'NIR',
      //     class: 'wavelength-line-nir'
      //   }]
      // }
    },
    onrendered: function() {
      _generateXAxisRanges();
    }
  });

  return chart;
});
