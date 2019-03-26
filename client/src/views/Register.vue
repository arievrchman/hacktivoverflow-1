<template>
  <div class="d-flex justify-content-center pt-3 pb-2 mb-3 w-80">
    <div class="pt-5">
      <div class="title--signup">
        <h5
          style="text-align: center;"
        >Create your Vueverflow account now. It's free and only takes a minute.</h5>
      </div>
      <div class="container d-flex justify-content-center">
        <div class="signup--form-container mt-3">
          <div class="form p-4 h-100 d-flex flex-column flex-wrap">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Display Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Your name"
                >
              </div>
              <div class="form-group">
                <label for="email">Email (required, but never shown)</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                >
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                >
              </div>
              <button type="submit" class="btn btn-primary mt-3">SignUp</button>
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
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.axios({
        method: 'post',
        url: '/users/register',
        data
      })
        .then(({ data }) => {
          this.name = '';
          this.email = '';
          this.password = '';
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          let error = err.response.data;
          let arrError = [];
          for (const key in error) {
            arrError.push(error[key]);
          }
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: arrError.join(', '),
          });
        });
    }
  }
};
</script>

<style scoped>
.signup--form-container {
  border: 1px solid #e0e0ea;
  width: 350px;
  height: 400px;
  border-radius: 3px;
}
.form-group label {
  font-size: 13px;
  font-weight: 700;
}

.error-text {
  /* margin-bottom: 0px !important; */
  font-size: 13px;
  color: red;
}
.error-message {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  padding: 10px 10px;
  width: 80%;
}
</style>
