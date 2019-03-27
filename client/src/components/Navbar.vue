<template>
  <nav class="navbar navbar-expand-md navbar-light border-bottom">
    <div class="navbar-brand mx-3">
      <router-link to="/">
        <h5>Vueverflow</h5>
      </router-link>
    </div>
    <div class="w-100 d-flex justify-content-center">
      <input class="form-control w-75" type="search" placeholder="Search..." aria-label="Search">
    </div>
    <ul class="navbar-nav">
      <div class="d-flex" v-if="!isLogin">
        <li class="nav-item active p-1 my-1">
          <router-link to="/users/login">
            <a class="btn btn-sm btn-login">
              <span>LogIn</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item p-1 my-1">
          <router-link to="/users/register">
            <button class="btn btn-sm btn-signup btn-primary">
              <span>SignUp</span>
            </button>
          </router-link>
        </li>
      </div>
      <div v-else>
        <button @click.prevent="logout" class="btn btn-sm btn-signup btn-primary">
          <span>SignOut</span>
        </button>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['isLogin'],
  methods: {
    logout() {
      const payload = {
        status: false,
        userId: null,
        name: '',
      };
      this.$store.commit('GET_USER', payload);
      localStorage.removeItem('token');
    },
  },
};
</script>


<style scoped>
.navbar {
  border-top: 3px solid #17cc17;
}

.navbar a {
  text-decoration: none !important;
  color: black;
}

.navbar h5 {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 0px;
}

input[type="search"] {
  font-size: 13px;
  border-radius: 2px;
}

.btn-sm {
  border-radius: 0px;
  font-size: 13px;
}

.btn-login {
  border: 1px solid #f2f2f2;
}

.btn-login span {
  color: #348fff;
}
</style>
