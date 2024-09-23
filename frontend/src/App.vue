<template>
  <div style="height: 100vh;">
    <NavbarHome />
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarHome from "../src/components/NavbarHome.vue"; // Corrigez le chemin si nécessaire

export default {
  components: {
    NavbarHome, // Déclarer le composant ici pour l'utiliser dans le template
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 800px;
}
</style>
