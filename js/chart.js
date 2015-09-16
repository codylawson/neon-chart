$(document).ready(function() {
  //Fluid Chart
  $(window).resize(function() {
    chart.resize({
      height: chart.element.parentNode.clientHeight * 0.95
    });
  });

  $('.btn-edit-series-names').on('click', function() {
    //show div
    $('.rename-series-container').removeClass('hidden');

    //get data series
    var dataSeries = chart.data();
    var dataSeriesNames = chart.data.names();

    //destroy data series inputs if some already exist
    $('.rename-series-input').remove();

    //populate input for each data series
    for (var i = 0; i < dataSeries.length; i++) {
      var theSeries = dataSeries[i];
      var theSeriesName = dataSeriesNames[theSeries.id] || theSeries.id;

      var seriesInput = $('<input type="text" value="' + theSeriesName + '">')
        .attr('class', 'rename-series-input')
        .data('seriesId', theSeries.id);

      $('.rename-series-inputs').append(seriesInput);
    }
  });

  $('.btn-rename-series-cancel').on('click', function() {
    //hide div
    $('.rename-series-container').addClass('hidden');
  });

  $('.btn-rename-series-apply').on('click', function() {
    //hide div
    $('.rename-series-container').addClass('hidden');

    //apply new values
    var renameSeriesInputs = $('.rename-series-input');
    var renameObj = {};

    for (var i = 0; i < renameSeriesInputs.length; i++) {
      var seriesInput = renameSeriesInputs[i];
      var seriesInputData = $(seriesInput).data();
      renameObj[seriesInputData.seriesId] = seriesInput.value;
    }

    chart.data.names(renameObj);
  });

  /*
  * CONSTANTS
  * atmosphericWindows: array of regions to be displayed as dark vertical blocks on the chart
  * spectrumRanges: array of regions to be displayed under the x axis, representing light spectrums
  * bandLookup: array of band numbers corresponding to data wavelength values
  * xAxisLabels: array of labels to be used as the x axis
  */

  var chartConfig = {
    hideAtmosphericWindowData: true,
    atmosphericWindows: [
      {
        start: {
          value: 1340,
          index: 193
        },
        end: {
          value: 1439,
          index: 211
        },
        class: 'atmospheric-window-1',
        tooltipText: 'Region of high light absorption / scatter'
      }, {
        start: {
          value: 1815,
          index: 288
        },
        end: {
          value: 1935,
          index: 310
        },
        class: 'atmospheric-window-2',
        tooltipText: 'Region of high light absorption / scatter'
      }
    ],
    spectrumRanges: [
      {
        start: 382,
        end: 700,
        class: 'c3-axis-range range-vis',
        displayName: 'Visible',
        displayNameTooltip: 'Visible spectrum'
      }, {
        start: 700,
        end: 1400,
        class: 'c3-axis-range range-nir',
        displayName: 'NIR',
        displayNameTooltip: 'Near Infrared'
      }, {
        start: 1400,
        end: 2511,
        class: 'c3-axis-range range-swir',
        displayName: 'SWIR',
        displayNameTooltip: 'Short Wave Infrared'
      }
    ],
    xAxisLabels: [
      382.27,387.28,392.29,397.3,402.31,407.32,412.33,417.34,422.35,427.35,432.36,437.37,442.38,447.39,452.4,457.41,462.42,467.43,472.44,477.45,482.46,487.47,492.48,497.49,502.49,507.5,512.51,517.52,522.53,527.54,532.55,537.56,542.57,547.58,552.59,557.6,562.61,567.62,572.63,577.63,582.64,587.65,592.66,597.67,602.68,607.69,612.7,617.71,622.72,627.73,632.74,637.75,642.76,647.76,652.77,657.78,662.79,667.8,672.81,677.82,682.83,687.84,692.85,697.86,702.87,707.88,712.89,717.9,722.91,727.91,732.92,737.93,742.94,747.95,752.96,757.97,762.98,767.99,773,778.01,783.02,788.03,793.04,798.04,803.05,808.06,813.07,818.08,823.09,828.1,833.11,838.12,843.13,848.14,853.15,858.16,863.17,868.18,873.18,878.19,883.2,888.21,893.22,898.23,903.24,908.25,913.26,918.27,923.28,928.29,933.3,938.31,943.32,948.32,953.33,958.34,963.35,968.36,973.37,978.38,983.39,988.4,993.41,998.42,1003.43,1008.44,1013.45,1018.46,1023.47,1028.48,1033.48,1038.49,1043.5,1048.51,1053.52,1058.53,1063.54,1068.55,1073.56,1078.57,1083.58,1088.59,1093.6,1098.61,1103.62,1108.63,1113.63,1118.64,1123.65,1128.66,1133.67,1138.68,1143.69,1148.7,1153.71,1158.72,1163.73,1168.74,1173.75,1178.76,1183.76,1188.77,1193.78,1198.79,1203.8,1208.81,1213.82,1218.83,1223.84,1228.85,1233.86,1238.87,1243.88,1248.89,1253.9,1258.9,1263.91,1268.92,1273.93,1278.94,1283.95,1288.96,1293.97,1298.98,1303.99,1309,1314.01,1319.02,1324.03,1329.03,1334.04,1339.05,1344.06,1349.07,1354.08,1359.09,1364.1,1369.11,1374.12,1379.13,1384.14,1389.15,1394.16,1399.17,1404.18,1409.18,1414.19,1419.2,1424.21,1429.22,1434.23,1439.24,1444.25,1449.26,1454.27,1459.28,1464.29,1469.3,1474.31,1479.32,1484.32,1489.33,1494.34,1499.35,1504.36,1509.37,1514.38,1519.39,1524.4,1529.41,1534.42,1539.43,1544.44,1549.45,1554.46,1559.47,1564.48,1569.48,1574.49,1579.5,1584.51,1589.52,1594.53,1599.54,1604.55,1609.56,1614.57,1619.58,1624.59,1629.6,1634.6,1639.61,1644.62,1649.63,1654.64,1659.65,1664.66,1669.67,1674.68,1679.69,1684.7,1689.71,1694.72,1699.73,1704.74,1709.74,1714.75,1719.76,1724.77,1729.78,1734.79,1739.8,1744.81,1749.82,1754.83,1759.84,1764.85,1769.86,1774.87,1779.88,1784.88,1789.89,1794.9,1799.91,1804.92,1809.93,1814.94,1819.95,1824.96,1829.97,1834.98,1839.99,1845,1850.01,1855.01,1860.02,1865.03,1870.04,1875.05,1880.06,1885.07,1890.08,1895.09,1900.1,1905.11,1910.12,1915.13,1920.14,1925.15,1930.15,1935.16,1940.17,1945.18,1950.19,1955.2,1960.21,1965.22,1970.23,1975.24,1980.25,1985.26,1990.27,1995.28,2000.29,2005.3,2010.3,2015.31,2020.32,2025.33,2030.34,2035.35,2040.36,2045.37,2050.38,2055.39,2060.4,2065.41,2070.42,2075.42,2080.44,2085.44,2090.45,2095.46,2100.47,2105.48,2110.49,2115.5,2120.51,2125.52,2130.53,2135.54,2140.55,2145.56,2150.57,2155.58,2160.58,2165.59,2170.6,2175.61,2180.62,2185.63,2190.64,2195.65,2200.66,2205.67,2210.68,2215.69,2220.7,2225.7,2230.72,2235.72,2240.73,2245.74,2250.75,2255.76,2260.77,2265.78,2270.79,2275.8,2280.81,2285.82,2290.83,2295.84,2300.84,2305.86,2310.86,2315.87,2320.88,2325.89,2330.9,2335.91,2340.92,2345.93,2350.94,2355.95,2360.96,2365.97,2370.98,2375.99,2381,2386,2391.01,2396.02,2401.03,2406.04,2411.05,2416.06,2421.07,2426.08,2431.09,2436.1,2441.11,2446.12,2451.12,2456.14,2461.14,2466.15,2471.16,2476.17,2481.18,2486.19,2491.2,2496.21,2501.22,2506.23,2511.24
    ]
  };

  //Create band arr
  var bandLookup = [];
  for (var i = 1; i <= 426; i++) {
    bandLookup.push(i);
  }

  function _tooltipContents(d, defaultTitleFormat, defaultValueFormat, color) {
    var self = this;
    var config = self.config;
    var valueFormat = config.tooltip_format_value || defaultValueFormat;
    var tooltipWrapper;
    var tooltipHeader;
    var tooltipContent;
    var tooltipSubtext = '';
    var i;
    var point;
    var value;
    var colorHex;
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
      tooltipContent += '<td class="c3-tooltip-value">' + bandLookup[point.index] + '</td>';
      tooltipContent += '</tr>';
    }

    if (chartConfig.hideAtmosphericWindowData === false) {
      //Get subtext
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

    //Place regions with the 'range' class in the xaxis ranges graphic
    var regions = d3.selectAll('.c3-regions [class*="c3-axis-range"]')[0];

    //Loop through regions and place them in x axis
    for (var i = 0; i < regions.length; i++) {
      var region = regions[i];
      var rect = region.firstElementChild;

      //Set range defaults
      var rangeElHeight = 15; //Height of range in axis
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
      rangeContainer.appendChild(region.cloneNode(true));

      //get range text
      var rangeText = '';
      var displayNameTooltip = '';
      d3.select(rect)
        .attr('displayName', function(val) {
          rangeText = val.displayName;

          return val.displayName;
        })
        .attr('displayNameTooltip', function(val) {
          displayNameTooltip = val.displayNameTooltip;

          return val.displayNameTooltip;
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
        .attr('y', (rangeElYOffset + rangeElHeight + textOffset))
        .datum({
          rangeTooltip: displayNameTooltip
        });

      //transform ranges to give the elements space
      var translateCalc = rangeWidth * 0.03;
      d3.select(region)
        .attr('transform', 'scale(.98, 1), translate(' + translateCalc + ', 0)');
    }

    //Spectrum tooltip
    var c3TooltipContainer = d3.select('.c3-tooltip-container');
    d3.selectAll('.c3-axis-ranges .range-text').on('mousemove', function(evt) {
      //Generate content
      c3TooltipContainer.html('<table class="c3-tooltip"><tbody><tr><td class="hint">' + evt.rangeTooltip + '</td></tr></tbody></table>');

      //Show and position tooltip
      var chartSvg = d3.select('#chart svg')[0][0];
      c3TooltipContainer.style('display', 'block')
        .style('left', (Math.round(d3.mouse(chartSvg)[0] + 30) + 'px'))
        .style('top', (Math.round(d3.mouse(chartSvg)[1] - 10) + 'px'));
    })
    .on('mouseout', function(evt) {
      //Hide tooltip
      c3TooltipContainer.style('display', 'none');
    });
  }

  function _wireAtmWinTooltip() {
    //Add atmospheric window tooltip
    $.each(chartConfig.atmosphericWindows, function(atmoWin, atmItem) {
      var atmWinRangeCount = atmItem.end.index - atmItem.start.index;
      for (var i = 0; i <= atmWinRangeCount; i++) {
        //add mouseover event
        d3.select('.c3-event-rect-' + ((atmItem.start.index + i) - 1)).on('mousemove', function(evt) {
          //Generate content
          $('.c3-tooltip-container').html('<table class="c3-tooltip"><tbody><tr><td class="hint danger">Region of high light absorption</td></tr></tbody></table>');

          //Position tooltip
          d3.select('.c3-tooltip-container')
            .style('display', 'block')
            .style('left', (Math.round(d3.mouse(this)[0] + 80) + 'px'))
            .style('top', (Math.round(d3.mouse(this)[1] + 40) + 'px'));
        });
      }
    });
  }

  function _nullAtmWinVals(dataArr) {
    //transform data array, removing values in the atmospheric window
    $.each(chartConfig.atmosphericWindows, function(atmoWin, atmItem) {
      var atmWinRangeCount = atmItem.end.index - atmItem.start.index;
      for (var i = 0; i <= atmWinRangeCount; i++) {
        //null the values
        dataArr.splice(((atmItem.start.index + i) - 1), 1, null);
      }
    });

    return dataArr;
  }

  //generate chart
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      columns: [
        ['x'].concat(chartConfig.xAxisLabels)
      ],
      type: 'spline',
    },
    point: {
      r: 0,
      focus: {
        expand: {
          enabled: true,
          r: 6
        }
      }
    },
    zoom: {
      enabled: true
    },
    colors: {
      pattern: ['#3D9EE0', '#f05050']
    },
    title: {
      text: 'Spectral Profile'
    },
    padding: {
      top: 20,
      right: 100,
      bottom: 20,
      left: 50,
    },
    axis: {
      x: {
        label: {
          text: 'Wavelength (nm)',
          position: 'outer-center'
        },
        tick: {
          count: 5,
          format: function(x) {
            return Math.round(x);
          }
        },
        height: (chartConfig.spectrumRanges ? 100 : '')
      },
      y: {
        label: {
          text: 'Reflectance',
          position: 'outer-middle'
        },
        tick: {
          values: [0, 0.2, 0.4, 0.6, 0.8, 1]
        },
        max: 1
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
    onrendered: function() {
      _generateXAxisRanges();

      if (chartConfig.hideAtmosphericWindowData && chartConfig.atmosphericWindows) {
        _wireAtmWinTooltip();
      }

      // _editableSeriesName();
    }
  });

  //Add atmospheric regions to chart
  if (chartConfig.atmosphericWindows) {
    $.each(chartConfig.atmosphericWindows, function(index, item) {
      chart.regions.add({
        axis: 'x',
        start: item.start.value,
        end: item.end.value,
        class: item.class,
        tooltipText: item.tooltipText || null
      });
    });
  }

  //Add spectrum ranges to chart
  if (chartConfig.spectrumRanges) {
    $.each(chartConfig.spectrumRanges, function(index, item) {
      chart.regions.add({
        axis: 'x',
        start: item.start,
        end: item.end,
        class: item.class,
        displayName: item.displayName,
        displayNameTooltip: item.displayNameTooltip
      });
    });
  }

  //Get data from json
  $.getJSON('js/dataBands.json', function(data) {
    //Loop through and load data for each json row
    $.each(data, function(index, item) {
      chart.load({
        columns: [
          ['x'].concat(chartConfig.xAxisLabels),
          [index].concat((chartConfig.hideAtmosphericWindowData && chartConfig.atmosphericWindows) ? _nullAtmWinVals(item) : item)
        ],
        type: 'spline'
      });
    });

    //Delayed rerender of chart to fix issues // TODO: better way to do this?
    setTimeout(function() {
      chart.flush();
    }, chart.internal.config.transition_duration);
    console.log(chart);
  });

  return chart;
});
