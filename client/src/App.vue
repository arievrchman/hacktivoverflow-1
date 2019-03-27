<template>
  <div id="app">
    <Navbar :is-login="login"/>
    <div class="row">
      <div class="col-2">
        <Sidebar/>
      </div>
      <div class="col-10">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('SET_USER');
    }
  },
  computed: {
    login() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato");
</style>
