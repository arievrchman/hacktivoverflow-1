<template>
  <div class="container-fluid">
    <div class="py-5 sticky-top flex-grow-1">
      <div class="nav flex-sm-column">
        <span class="nav-link pub">Public</span>
        <router-link to="/questions" class="nav-link txt">
          <i class="fab fa-vimeo-v"></i>
          <span class="font-size: 10px;">ueverflow</span>
        </router-link>
        <router-link to="/tags" class="nav-link txt">
          <i class="fas fa-tags"></i>
          <span>Tags</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  font-size: 14px;
  color: rgb(80, 80, 80);
}

.fas,
.fab {
  font-size: 13px;
  margin-right: 3px;
}

.pub {
  text-transform: uppercase;
  font-size: 13px;
  font-family: "Lato", sans-serif;
  color: gray;
}

.txt {
  font-size: 14px;
  color: gray;
  font-family: "Lato", sans-serif;
}
</style>
