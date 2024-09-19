<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Connexion</h2>
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Se connecter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3800/api/login', {
            email: this.user.email,
            password: this.user.password,
            gettoken: true,
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          alert('Connexion réussie !');
          this.$router.push('/dashboard');
        } catch (error) {
          console.error(error);
          alert("Une erreur s'est produite lors de la connexion.");
        }
      },
    },
  };
  </script>
  