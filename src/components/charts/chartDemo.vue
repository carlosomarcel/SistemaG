<template>
  <div>
    <q-page padding>
      <div class="dv1">
        <apexchart class="chart" type="donut" height="400" width="400" :options="chartOptionsA" :series="seriesA">
        </apexchart>
      </div>
      <div class="dv1"><apexchart class="chart" type="bar" height="300" width="1000" :options="chartOptions" :series="series"></apexchart></div>
      <apexchart class="chart" type="area" height="350" width="1000" :options="chartOptions" :series="series"></apexchart>
    </q-page>
  </div>
  <footerPage></footerPage>
</template>

<script>
import { colors } from 'quasar'
import { defineComponent, defineAsyncComponent } from 'vue'

const chartPage = defineAsyncComponent(() =>
  import('src/components/charts/chartDemo.vue')
)
const footerPage = defineAsyncComponent(() =>
  import('src/components/footerPage')
)

export default defineComponent({
  name: 'ChartPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    chartPage,
    footerPage
  },
  data: function () {
    return {

      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 6.0, 6.1, 4.0, 8.6, 3.2, 2.3, 1.4, 8, 0.5, 0.2]
      }],
      seriesA: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['red']
          }
        },

        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: true
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: true
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + '%'
            }
          }

        },
        title: {
          text: 'Inflação Mensal Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
      chartOptionsA: {
        chart: {
          type: 'donut'
        },
        responsive: [{
          breakpoint: 200,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }

    }
  },
  pizza: function () {
    return {

      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }],
      chartOptionsA: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colorA: colors,
        plotOptions: {
          bar: {
            columnWidth: '20%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxisA: {
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts']
          ],
          labelsA: {

          }
        }
      }

    }
  }
})
</script>
<style scoped>
.chart {
  padding: auto;
  border: 1px solid rgb(80, 80, 168) transparent;
  border-radius: 5px;
  margin-top: 20px;
  background-color: rgb(223, 236, 245);
  height:"200";
  width:"200" ;
  margin-top: 10px;
  padding: 0px;
}

</style>
