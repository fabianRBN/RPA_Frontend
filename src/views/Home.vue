<template>
  <div class>
    <md-table
      v-model="searched"
      md-sort="nombre"
      @md-selected="onSelect"
      md-sort-order="asc"
      md-card
      md-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Invitados</h1>
        </div>

        <div class="md-layout-item md-layout md-gutter">
          <div class="md-layout-item">
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input
                placeholder="Busqueda por apellido..."
                v-model="apellido"
                @input="searchOnTable"
              />
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input
                placeholder="Busqueda por correo "
                v-model="searchCorreo"
                @input="searchOnTableCorreo"
              />
            </md-field>
          </div>
        </div>
      </md-table-toolbar>

      <md-table-empty-state md-label="Invitado no encontrado">
        <br />
        <md-button class="md-primary md-raised" @click="crearInvitado()">Crear nuevo Usuario</md-button>
      </md-table-empty-state>

      <md-table-row
        slot="md-table-row"
        @click="showDialogInvitado(item)"
        slot-scope="{ item }"
        md-selectable="single"
      >
<!--         <md-table-cell md-label="Cedula" md-sort-by="cedula" md-numeric>{{ item.cedula }}</md-table-cell>
 -->
        <md-table-cell md-label="Apellido" md-sort-by="apellido">{{ item.apellido }}</md-table-cell>
        <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.nombre }}</md-table-cell>
        <md-table-cell
          md-label="Correo"
          md-sort-by="correo"
          v-html="correoSaltodeLinea(item.correo)"
        ></md-table-cell>
        <md-table-cell md-label="Movil" md-sort-by="movil">{{item.movil}}</md-table-cell>
        <md-table-cell md-label="Cargo" md-sort-by="cargo">{{ item.cargo }}</md-table-cell>
        <md-table-cell md-label="Empresa" md-sort-by="empresa">{{item.empresa}}</md-table-cell>
        <md-table-cell md-label="Personal" md-sort-by="personal">{{(item.personal)?item.personal:'Sin personal'}}</md-table-cell>

        <md-table-cell md-label="Asistencia" md-sort-by="asistencia">
          <switch-invitados :itemInvitado="item" @setParentComponentInvitados="setInvitadosData"></switch-invitados>
        </md-table-cell>

        <md-table-cell md-label="Pago" md-sort-by="Pago">
          <check-box-pago :cedulaInvitado="item.cedula" :pagoInvitado="item.pago" :descuentoInvitado="item.descuento"></check-box-pago>
        </md-table-cell>

     
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <registrar-invitado
        @setDataInvitados="getInvitados"
        :itemInvitado="this.itemSelect"
        :accion="this.accion"
    
      ></registrar-invitado>
    </md-dialog>
  </div>
</template>

<script>
import axios from "axios";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.apellido).includes(toLower(term)));
  }

  return items;
};

const searchByCorreo = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.correo).includes(toLower(term)));
  }

  return items;
};
import SwitchInvitados from "./../components/SwitchInvitados.vue";
import RegistrarInvitado from "./../components/RegistrarInvitado.vue";
import CheckBoxPago from "./../components/CheckBoxPago.vue";
import { hostname } from "os";

export default {
  name: "home",
  data: () => ({
    apellido: null,
    searchCorreo: null,
    searched: [],
    invitados: [],
    boolean: false,
    showDialog: false,
    clicksItem: 0,
    itemSelect: null,
    accion: true, // vALIDA PARA SABER SI ES EDICION O CREACION DE INVITADO
    radio: false,
    accionInvitado: ""
  }),
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.invitados, this.apellido);
    },
    searchOnTableCorreo() {
      this.searched = searchByCorreo(this.invitados, this.searchCorreo);
    },
    switchInvitado() {
      return "true";
    },
    // Called by child component
    setInvitadosData() {
      axios
        .get("http://" + hostname() + ":3000/getInvitadosDB")
        .then(response => {
          this.invitados = response.data.data.response;
          this.searched = this.invitados;
        });
    },
    correoSaltodeLinea(texto) {
      return texto ? texto.replace("@", "@<br>") : "";
    },
    onSelect(item) {
      item ? (this.itemSelect = item) : console.log("error");
    },
    showDialogInvitado(item) {
      if (this.itemSelect == item) {
        this.showDialog = true;
        this.accion=true;
        this.accionInvitado ='Editar'
      } else {
        this.itemSelect = item;
      }
    },
    crearInvitado() {
      this.accion = false;
      this.showDialog = true;
      this.accionInvitado ='Crear';
    },
    getInvitados(){
      axios
      .get("http://" + hostname() + ":3000/getInvitadosDB")
      .then(response => {
        console.log(response)
        this.invitados = response.data.data.response;
        this.searched = this.invitados;
      });
    }
  },
  created() {
    this.getInvitados();
  },
  components: {
    SwitchInvitados,
    RegistrarInvitado,
    CheckBoxPago
  }
};
</script>

