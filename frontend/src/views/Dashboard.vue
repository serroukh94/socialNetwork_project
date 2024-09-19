<template>
    <div>
      <h2>Tableau de bord</h2>
      <p>Bienvenue, vous êtes connecté.</p>
      <button @click="logout">Se déconnecter</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardView',
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
    },
  };
  </script>
  