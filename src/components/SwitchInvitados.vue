<template>

<div>
    <md-switch v-model="boolean" @change="cambio" class="md-primary" >{{(boolean)?'Confirmado':'Pendiente'}}</md-switch>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Confirmacion"
      :md-content=getTextMensaje(itemInvitado)
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-clicked-outside="closeModal(boolean)"
      @md-confirm="onConfirm(boolean)" />
</div>



  
</template>

<script>
import axios from 'axios';
import { hostname } from 'os';

  export default {
    name: 'switch-invitados',
    props:[
      'itemInvitado'
    ],
    data: function(){
      return{
              boolean: (this.itemInvitado.asistencia=='true')?true:false,
              active: false,
              value: null,
              invitado: this.itemInvitado,
              estado:'Pendiente',
      }
    },
  
    methods:{
      cambio(){
        this.active = true;
      },
      onConfirm (data) {
        var  _this= this;
        axios.post('http://'+hostname()+':3000/updateAsistencia', {
                    cedula: this.invitado.cedula,
                    asistencia: (this.invitado.asistencia=="true")?false:true
                })
                .then(function () {
                  this.$emit("setParentComponentInvitados");
                  _this.boolean=!data;
                })
                .catch(function () {
                    _this.boolean= data;
                });
      },
      onCancel () {
        this.value = 'Disagreed'
        this.boolean= (this.itemInvitado.asistencia=='true')?true:false;
      },
      getTextMensaje(invitado){
        return (invitado.asistencia == "true")?"Eliminar asistencia de "+invitado.nombre:"Confirmar asistencia de  "+invitado.nombre;
      },
      closeModal(data){
        this.boolean = !data;

      }
    },



    

  }
</script>

<style >
  .md-switch {
    display: flex;
  }

  table {
    width: 100%;
    table-layout: fixed;

  
  }
</style>