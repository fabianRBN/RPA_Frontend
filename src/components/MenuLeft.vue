<template>
  <md-list>
    <md-list-item @click="callingParentComponentMethod" to="/">
      <md-icon>home</md-icon>
      <span class="md-list-item-text">Inicio</span>
    </md-list-item>

    <md-list-item @click="callingParentComponentMethod" to="/about">
      <md-icon>group</md-icon>
      <span class="md-list-item-text">Registrar</span>
    </md-list-item>

    <md-list-item @click="callingParentComponentMethod" to="/whatsapp">
      <md-icon>person</md-icon>
      <span class="md-list-item-text">Whatsapp</span>
    </md-list-item>
    <md-list-item @click="callingParentComponentMethod" to="/sorteo">
      <md-icon>person</md-icon>
      <span class="md-list-item-text">Sorteo</span>
    </md-list-item>

    <md-list-item @click="callingParentComponentMethod" to="/configuracion">
      <md-icon>settings</md-icon>
      <span class="md-list-item-text">Configuracion</span>
    </md-list-item>

  </md-list>
</template>
<script>
export default {
  name: "menu-left",
  methods: {
    callingParentComponentMethod() {
      // emit the event and call the parent component
      this.$emit("setParentComponentDetails");
    }
  }
};
</script>
<style>
</style>


