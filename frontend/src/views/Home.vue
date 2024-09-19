<template>
  <div class="container mt-5 text-center">
    <h1 class="display-4">Bienvenue sur l'application</h1>
    <div class="mt-4">
      <button class="btn btn-primary" @click="$router.push('/login')">Connexion</button>
      <button class="btn btn-success ml-3" @click="$router.push('/register')">Inscription</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
