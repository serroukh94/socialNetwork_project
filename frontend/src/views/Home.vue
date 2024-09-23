<template>
  <div class="container mt-5 text-center">
    <h1 class="display-4">Bienvenue sur l'application</h1>
    <div class="appname">
      <i style="font-weight: bold"
        ><span style="color: #0d6efd">Social </span
        ><span style="color: #ffc107">NetWork</span></i
      >
    </div>
    <div class="buttons">
      <div>
        <button class="btn btn-primary mr-3" @click="$router.push('/login')">
          Connexion
        </button>
      </div>
      <div>
        <button class="btn btn-success ml-3" @click="$router.push('/register')">
          Inscription
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
  .container {
    margin: 0 auto;
    margin-top: 80px;
  }

.appname {
  font-size: 46px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>
