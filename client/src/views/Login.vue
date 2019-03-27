<template>
   <div class="d-flex justify-content-center pt-3 pb-2 mb-3 w-80">
    <div class="head--title pt-5">
      <div class="title-head">
        <h5
          style="text-align: center;"
        >Join with Vueverflow now!</h5>
      </div>
      <div class="container d-flex justify-content-center">
        <div class="login--form-container mt-3">
          <div class="form p-4 h-100 d-flex flex-column flex-wrap">
            <form @submit.prevent="login">
              <div class="form-group mt-5">
                <label for="email">Email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                >
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="password">
              </div>
              <button type="submit" class="btn btn-primary mt-3">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.axios({
        method: 'post',
        url: '/users/login',
        data,
      })
        .then(({ data }) => {
          this.email = '';
          this.password = '';
          this.$router.replace('/');
          localStorage.setItem('token', data.token);
          this.$store.dispatch('SET_USER');
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          const error = err.response.data.message;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: error,
          });
        });
    },
  },
};
</script>

<style>

</style>
