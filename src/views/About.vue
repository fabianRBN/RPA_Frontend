<template>
  <div  class="md-layout md-gutter">
    <registrar-invitado class="md-layout-item"
        :itemInvitado="null"
        :accion="false"
    
      ></registrar-invitado>

      <registrar-personal class="md-layout-item"
        :itemInvitado="null"
        :accion="false"
    
      ></registrar-personal>

  </div>
</template>
<script>
import axios from 'axios'
import { hostname } from 'os';
import RegistrarInvitado from "./../components/RegistrarInvitado.vue";
import RegistrarPersonal from "./../components/ResitrarPersonal.vue";
// @ is an alias to /src
const getInvitados  = (url)=>{
    axios.get(url).then((response) => {
    console.log(response.data)
  })
}
export default {
  name: 'home',
  components: {
    RegistrarInvitado,
    RegistrarPersonal
  },
  data:
    ()=>({
      invitados: null,
    })
  ,
  methods:{
    getallInvitados (){
      this.invitados = getInvitados('http://'+hostname()+':3000/getInvitadosDB');
    }
  }
}
</script>
