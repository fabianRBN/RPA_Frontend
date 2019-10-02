<template>
  <div class="container">
    <vue-winwheel :segments="dataCollection" />
  </div>
</template>

<script>
import axios from "axios";
import { hostname } from "os";
import VueWinwheel from "vue-winwheel/vue-winwheel";
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
    invitados: [],
    dataCollection: [],
    options:[]
  }),

  methods: {
    enviar() {

        console.log(this.invitados)
     /*  axios
        .post(
          "https://eu51.chat-api.com/instance68162/sendMessage?token=5vqbfzqau02govzv",
          { phone: "593995793156", body: "app web" }
        )
        .then(function() {
          alert("SUCCESS!!");
        })
        .catch(function() {
          alert("FAILURE!!");
        }); */
    },
    setData(data){
        this.dataCollection = data;
    },
    messageClass() {},
    getInvitados() {
      axios
        .get("http://" + hostname() + ":3000/getInvitadosSorteo")
        .then(response => {
         
          this.setData(response.data.listaSorteo);

          console.log(this.dataCollection);
       
        });
    }
  },
  created() {
      
  },
  mounted(){
    this.getInvitados();
  },
  components:{
      VueWinwheel
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