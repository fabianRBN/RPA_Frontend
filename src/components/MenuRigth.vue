<template>
  <div>
    <md-card class="card-chart">
      <md-card-header>
        <div class="md-title">Asistencia</div>
      </md-card-header>

      <md-card-content>
        <div class="small">
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
      </md-card-content>

      <md-card-actions></md-card-actions>
    </md-card>

    <md-card class="card-chart">
      <md-card-header>
        <div class="md-title">Pagos</div>
      </md-card-header>

      <md-card-content>
        <div class="small">
          <line-chart :chart-data="datacollectionPagos"></line-chart>
        </div>
      </md-card-content>

      <md-card-actions></md-card-actions>
    </md-card>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import axios from 'axios';
import { hostname } from 'os';
export default {
  components: {
    LineChart
  },
  data: function() {
    return {
      datacollection: null,
      datacollectionPagos: null,
      total : null,
      pago : null,
      asistencia : null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    fillData(total,asistencia,pago) {
      this.datacollection = {
        labels: ["Confirmados", "Faltantes"],
        datasets: [
          {
            label: ["Data One", "ONE"],
            backgroundColor: ["#f87979", "#448aff"],
            data: [asistencia, total - asistencia]
          }
        ]
      };
      this.datacollectionPagos = {
        labels: ["Confirmados", "Faltantes"],
        datasets: [
          {
            label: ["Data One", "ONE"],
            backgroundColor: ["#f87979", "#448aff"],
            data: [pago, total - pago]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    getData(){
       axios.get('http://'+hostname()+':3000/getDataEstadistica')
                .then( (data) =>{
         
                  this.fillData(data.data.total[0].total, data.data.asistencia[0].asistencia,data.data.pago[0].pago);

                })
                .catch(function (error) {
                   console.log(error)
                });
    }
  },
  created(){
  }
};
</script>

<style>

.card-chart {
  margin: 10px;
}
</style>
