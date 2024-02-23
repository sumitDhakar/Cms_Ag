export class HChartBar {

    chartOptions = {
        series: [
          {
            name: "Total Income",
            data: [44, 55, 57, 56, 61]
          },
          {
            name: "Total Outcome",
            data: [76, 85, 101, 98, 87]
          },
        
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
          
          ]
        },
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return "$ " + val + " thousands";
            }
          }
        }
      };


      chartOptions2 = {
        series: [
          {
            name: "Total Income",
            data: [45, 52, 38, 24, 33]
          },
          {
            name: "Total Outcome",
            data: [35, 41, 62, 42, 13]
          },
  
        ],
        chart: {
          height: 350,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "straight",
          dashArray: [0, 8, 5]
        },
        title: {
          text: "Page Statistics",
          align: "left"
        },
        legend: {
          tooltipHoverFormatter: function (val: any, opts: any) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: [
           
          ]
        },
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: any) {
                  return val + " (Thousands)";
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val + " Thousands";
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      };
}
