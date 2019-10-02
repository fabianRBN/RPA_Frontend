<template>
  <div class="container">
    <div class="md-layout-item">
      <md-field>
        <label for="movies">Invitados</label>
        <md-select v-model="selectedInvitados" name="movies" id="movies" multiple>
          <!-- <md-option value="fight-club">Fight Club</md-option>
          <md-option value="godfather">Godfather</md-option>
          <md-option value="godfather-ii">Godfather II</md-option>
          <md-option value="godfather-iii">Godfather III</md-option>
          <md-option value="godfellas">Godfellas</md-option>
          <md-option value="pulp-fiction">Pulp Fiction</md-option>
          <md-option value="scarface">Scarface</md-option> -->
          <md-option
                  v-for="item in invitados"
                  :key="item.cedula"
                  :value="item.movil"
                >{{item.nombre + '' + item.apellido}}</md-option>
        </md-select>
      </md-field>
    </div>

    <md-field :class="messageClass">
      <label>Ingrese mensaje</label>
      <md-textarea v-model="mensaje" required></md-textarea>
      <span class="md-helper-text">Contenido del Mensaje</span>
      <span class="md-error">There is an error</span>
    </md-field>
    <md-button class="md-raised md-accent" @click="enviar(mensaje)">Accent</md-button>
  </div>
</template>

<script>
import axios from "axios";
import { hostname } from "os";
export default {
  /*
      Defines the data used by the component
    */
  data: () => ({
    file: "",
    nombreExcel: "",
    activeDialog: false,
    activeDialogCargarData: false,
    mensaje: "",
    selectedInvitados: [],
    invitados: []
  }),

  methods: {
    enviar(data) {

        let array = this.selectedInvitados;
        array.forEach((element )=>{
          
     
          axios
                  .post(
                    "https://eu51.chat-api.com/instance68162/sendMessage?token=5vqbfzqau02govzv",
                    { phone: "593"+element.substring(1,10) , body: data }
                  )
                  .then((data)=> {
                    console.log(data)
            
                  })
                  .catch(function() {

                  }); 
         
        
    });

    },
    messageClass() {},
    getInvitados() {
      axios
        .get("http://" + hostname() + ":3000/getInvitadosDB")
        .then(response => {
          console.log(response);
          this.invitados = response.data.data.response;
       
        });
    }
  },
  created() {
      this.getInvitados();
  }
};
</script>
<style >
.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.md-card-media img {
  width: 10% !important;
  margin: 10px;
}

.md-card-content {
  text-align: center;
}
.md-card-config {
  width: 48%;
  height: 225px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.container {
  text-align: center;
}
.md-title {
  text-align: left;
}
</style>