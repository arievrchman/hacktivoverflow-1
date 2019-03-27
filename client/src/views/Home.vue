<template>
  <div id="home">
    <div class="container w-75">
      <div class="border-bottom my-3">
        <h3 class="title">Top Questions</h3>
        <router-link to="/questions/ask">
          <button class="btn btn-md btn-primary btn-text my-3">
            <span>Ask Question</span>
          </button>
        </router-link>
      </div>

      <div v-for="(question, index) in questions" :key="index" class="card mt-3">
        <div class="card-body d-flex">
          <div class="cp mr-3">
            <div class="votes">
              <h6>{{ question.total }}</h6>votes
            </div>
            <div class="answer">
              <h6>{{ question.answer.length }}</h6>answer
            </div>
          </div>
          <div>
            <router-link :to="{ name: 'Questions', params: {id: question._id }}">
              <h6>{{question.title}}</h6>
            </router-link>
            <div class="d-inline" v-for="(tag, index) in question.tags" :key="index">
              <router-link class="rmv" :to="'/tags/' + tag.name">
                <small class="tags mx-1">{{ tag.name }}</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("SET_ALLQUESTIONS");
  },
  computed: {
    ...mapState(['questions'])
  }
};
</script>

<style>
.title {
  font-family: "Lato", sans-serif;
}

.btn-md {
  border-radius: 0px;
}

.votes,
.answer {
  display: inline-block;
  min-width: 38px;
  margin: 0 10px 0 0;
  color: #848d95;
  padding: 7px 6px;
  text-align: center;
  font-size: 12px;
}

.tags {
  color: #93aac4;
  background-color: #d2e2f4;
  padding: 5px;
  
}

.rmv {
  text-decoration: none !important;
}
</style>
