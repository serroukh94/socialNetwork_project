
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RegisterView',
    data() {
      return {
        user: {
          nick: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:3800/api/register', this.user);
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          this.$router.push('/login');
        } catch (error) {
          console.error(error);
          alert("Une erreur s'est produite lors de l'inscription.");
        }
      },
    },
  };
  </script>
  
  <template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
            <p class="text-center text-bold mb-4">INSCRIPTION</p>
            <form @submit.prevent="register">
              <div class="form-group mb-3">
                <label for="nick" class="form-label">Pseudo</label>
                <input
                  type="text"
                  id="nick"
                  v-model="user.nick"
                  class="form-control"
                  placeholder="Entrez votre pseudo"
                  required
                />
              </div>
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
              <div class="mb-4">
                <i>Déjà inscrit ? Cliquer <router-link to="/login">ici</router-link> pour vous connecter</i> 
              </div>
              <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>
</template>

<style>
  p {
    font-weight: 600;
    font-size: 2rem;
  }

  .form-label {
    font-weight: 600;
  }
</style>
  
  