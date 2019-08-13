<template>
  <div id="app" class="full-height">

     <div class="page-container md-layout-column  ">
    <md-toolbar class="md-primary md-elevation-3">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">InnovaSys</span>

      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Invitados</md-button>
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Innovasys RPA</span>
      </md-toolbar>

              <menu-left  @setParentComponentDetails="setDetailsForComponent" ></menu-left>

    </md-drawer>

    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Favorites</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>

       <router-view/>
    </md-content>
  </div>



  <!--   <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

  </div>
</template>
<script>
import MenuLeft from './components/MenuLeft' 

export default {
  data: () => ({
      showNavigation: false,
      showSidepanel: false
    }),
  components:{
    MenuLeft,
  },
   methods: {  
      // Called by child component  
      setDetailsForComponent() {  
        this.showNavigation = false;
      }  
   }  
  
}
</script>

<style>

.full-height {
  height: 100%;
}
.page-container {
    min-height: 300px;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 300px !important; 
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
    min-height: 90%;
  }

 
</style>


