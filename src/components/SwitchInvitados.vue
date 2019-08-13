<template>

<div>
    <md-switch v-model="boolean" @change="cambio" ></md-switch>
    


  
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Confirmacion"
      :md-content=getTextMensaje(itemInvitado)
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
 
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
              invitado: this.itemInvitado
      }
    },
  
    methods:{
      cambio(){
        this.active = true;
      },
      onConfirm () {
        axios.post('http://'+hostname()+':3000/updateAsistencia', {
                    cedula: this.invitado.cedula,
                    asistencia: (this.invitado.asistencia=="true")?false:true
                })
                .then(function () {
                    console.log('actualizado')
                    this.$emit("setParentComponentInvitados");

                })
                .catch(function () {
                                      console.log('error')

                });
      },
      onCancel () {
        this.value = 'Disagreed'
      },
      getTextMensaje(invitado){
        return (invitado.asistencia == "true")?"Confirmar asistencia de "+invitado.nombre:"Eliminar asistencia de  "+invitado.nombre;
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