<template>
  <div>
            <md-checkbox v-model="booleanCheck" @change="cambio()" class="md-primary" >{{estado}}</md-checkbox>
   
    <!-- <div>
 <md-field>
      <md-select v-model="estado" name="country" >
        <md-option value="australia">Australia</md-option>
        <md-option value="brazil">Brazil</md-option>
        <md-option value="japan">Japan</md-option>
        <md-option value="united-states">United States</md-option>
      </md-select>
    </md-field>
    </div> -->
   
    <md-snackbar :md-active.sync="userSaved">El pago fue {{accion}} exitosamente</md-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { hostname } from "os";

export default {
  name: "check-box-pago",
  props: ["cedulaInvitado", "pagoInvitado"],
  data: function() {
    return {
      booleanCheck: this.pagoInvitado == "Si" ? true : false,
      estado: "Sin pago",
      userSaved: false,
      accion: "",
      country: this.estado,
    };
  },
  methods: {
    cambio() {
      axios
        .post("http://" + hostname() + ":3000/updatePago", {
          cedula: this.cedulaInvitado,
          pago: this.booleanCheck ? "Si" : "No"
        })
        .then(() => {
          this.booleanCheck
            ? (this.estado = "Pagado")
            : (this.estado = "Pendiente");
          this.userSaved = true;
          this.booleanCheck
            ? (this.accion = "confirmado")
            : (this.accion = "cancelado");
        })
        .catch(function(error) {
          /*  (this.booleanCheck)?this.estado='Pagado':this.estado='Pendiente'; */
          console.log(error);
        });
    }
  },
  created() {
    this.booleanCheck ? (this.estado = "Pagado") : (this.estado = "Pendiente");
  }
};
</script>