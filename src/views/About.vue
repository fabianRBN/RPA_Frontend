<template>
  <div  >
    <h1>This is an about page</h1>
    <md-button class="md-raised md-primary" @click="getallInvitados">Primary</md-button>

  </div>
</template>
<script>
import axios from 'axios'
import { hostname } from 'os';
// @ is an alias to /src
const getInvitados  = (url)=>{
    axios.get(url).then((response) => {
    console.log(response.data)
  })
}
export default {
  name: 'home',
  components: {
    
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
