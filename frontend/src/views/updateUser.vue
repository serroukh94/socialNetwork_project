<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
            <h2 class="card-title text-center mb-4">
              MISE À JOUR DE VOS INFORMATIONS
            </h2>
            <form @submit.prevent="updateUser">
              <div class="form-group mb-3">
                <label for="nick" class="form-label">Pseudo</label>
                <input
                  type="text"
                  id="nick"
                  class="form-control"
                  v-model="user.nick"
                  placeholder="Entrez votre pseudo"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="user.email"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3 mt-2">
                Mettre à jour
              </button>
              <button @click="logout" class="btn btn-danger w-100">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import { getUserIdFromToken } from "@/utils/auth";

export default {
  name: "UpdateUser",
  data() {
    return {
      userId: null,
      user: {
        nick: "",
        email: "",
      },
    };
  },
  async mounted() {
    this.userId = getUserIdFromToken();
    if (!this.userId) {
      alert("Vous devez être connecté pour accéder à cette page.");
      this.$router.push("/login");
    } else {
      try {
        const response = await axios.get(`/user/${this.userId}`);
        this.user.nick = response.data.user.nick;
        this.user.email = response.data.user.email;
      } catch (error) {
        console.error(error);
        alert(
          "Une erreur s'est produite lors de la récupération des informations."
        );
      }
    }
  },
  methods: {
    async updateUser() {
      try {
        await axios.put(`/update-user/${this.userId}`, this.user);
        alert("Vos informations ont été mises à jour avec succès !");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert("Une erreur s'est produite lors de la mise à jour.");
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
