<template>
  <div class="container">
    <md-card class="md-card-config">
      <md-card-header>
        <div class="md-title">Lista de Invitados Excel</div>
      </md-card-header>

      <md-card-content>
        <div class="upload-btn-wrapper">
          <md-field>
            <label>Documento</label>
            <md-input v-model="file.name"></md-input>
          </md-field>

          <label>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          </label>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button v-on:click="submitFile()" class="md-raised md-primary">Guardar</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="md-card-config">
      <md-card-header>
        <div class="md-title">Archivo Cargado</div>
      </md-card-header>

      <md-card-content>
        <md-card-media>
          <img class="imgfile" src="../assets/excel.png" alt="People" />
          <label for>Nombre del Archivo</label>
        </md-card-media>
      </md-card-content>

      <md-card-actions>
        <md-button v-on:click="submitFile()" class="md-raised md-primary">Procesar Excel</md-button>
        <md-button v-on:click="submitFile()" class="md-raised md-accent">Eliminar Base de datos</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";
import { hostname } from "os";
export default {
  /*
      Defines the data used by the component
    */
  data() {
    return {
      file: ""
    };
  },

  methods: {
    /*
        Submits the file to the server
      */
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("excel", this.file);

      /*
          Make the request to the POST /single-file URL
        */
      axios
        .post("http://"+hostname()+":3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    }
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
.container{
  text-align: center;
}
.md-title{
  text-align: left
}
</style>