<template>
  <div class="home">
    <md-table v-model="searched" md-sort="nombre" md-sort-order="asc" md-card md-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Invitados</h1>
        </div>

      <div class="md-layout-item md-layout md-gutter">
        <div class="md-layout-item">
           <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Busqueda por nombre..." v-model="search" @input="searchOnTable" />
        </md-field>
        </div>
        <div class="md-layout-item">
          <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Busqueda por cedula " v-model="searchID" @input="searchOnTableID" />
        </md-field>
        </div>
      </div>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="Invitado no encontrado"
        >
        <br>
        <md-button class="md-primary md-raised" @click="newUser">Crear nuevo Usuario</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Cedula" md-sort-by="cedula" md-numeric>{{ item.cedula }}</md-table-cell>
        <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.nombre }} {{ item.apellido }}</md-table-cell>
        <md-table-cell md-label="Cargo" md-sort-by="cargo">{{ item.cargo }}</md-table-cell>
        <md-table-cell md-label="Correo" md-sort-by="correo"> {{item.correo}} </md-table-cell>
        <md-table-cell md-label="Movil" md-sort-by="movil">{{item.movil}}</md-table-cell>
        <md-table-cell md-label="Empresa" md-sort-by="empresa">{{item.empresa}}</md-table-cell>


        <md-table-cell md-label="Asistencia" md-sort-by="asistencia">
          <switch-invitados  :itemInvitado="item"  @setParentComponentInvitados="setInvitadosData" ></switch-invitados>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios';


  
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.nombre).includes(toLower(term)))
    }

    return items
  }

  const searchByID = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.cedula).includes(toLower(term)))
    }

    return items
  }
  import SwitchInvitados from './../components/SwitchInvitados.vue';
import { hostname } from 'os';


  
  export default {
    name: 'home',
    data: () => ({
      search: null,
      searchID: null,
      searched: [],
      invitados: [],
      boolean: false,

    }),
    methods: {
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        console.log(this.searched)
        this.searched = searchByName(this.invitados, this.search)
      },
      searchOnTableID () {
        this.searched = searchByID(this.invitados, this.searchID)
        console.log('buscando')
      },
      cambio(item){
        console.log(item.nombre)
      },
      switchInvitado(){
        return "true";
      },
       // Called by child component  
      setInvitadosData() {  
        axios.get('http://'+hostname()+':3000/getInvitadosDB').then((response) => {
          this.invitados = response.data.data.response;
                this.searched = this.invitados;

        });
      },
      correoSaltodeLinea (texto){
        return texto.replace("@", "@<br>");
      }  
    },
    created () {
      axios.get('http://'+hostname()+':3000/getInvitadosDB').then((response) => {
        this.invitados = response.data.data.response;
              this.searched = this.invitados;

      });
    },
    components:{
      SwitchInvitados
    }
 
  }
</script>

<style >

  .home {
    min-height: 100%;
  }
.md-table table {
    width: 100% !important;
    
}


.md-table-cell-container {
    width: 100% !important;
  }
  .md-table-head-label {
    width: 100% !important;
  }
</style>