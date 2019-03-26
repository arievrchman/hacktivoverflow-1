<template>
  <div class="w-75">
    <div class="question--head border-bottom">
      <h4 class="my-3">{{ currentQuestion.title }}</h4>
    </div>
    <div class="container">
      <div class="d-flex border-bottom">
        <div class="question-votes py-3">
          <button @click.prevent="upQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center py-3">
            <span>0</span>
          </div>
          <button @click.prevent="downQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="question-description p-3 w-100">
          <span v-html="currentQuestion.description"></span>
          <div v-if="currentQuestion.owner == currentUser.id" class="mt-4 align-self-end">
            <button
              class="btn btn-sm btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#updateQuestion"
              aria-expanded="false"
              aria-controls="updateQuestion"
            >
              <span class="text-muted">edit</span>
            </button>
            <button @click.prevent="deleteQuestion" class="btn btn-sm btn-link">
              <span class="text-muted">delete</span>
            </button>
          </div>

          <div class="collapse mt-3" id="updateQuestion">
            <label for="title">
              <span>Title</span>
            </label>
            <input v-model="title" type="text" class="form-control mb-3" placeholder="Title">
            <label for="description">
              <span>Body</span>
            </label>
            <div class="d-flex flex-row">
              <wysiwyg v-model="description"/>
            </div>

            <div class="btn-answer mt-4 border-top">
              <button
                @click.prevent="updateQuestion"
                class="btn btn-sm btn-primary my-4"
              >Edit Question</button>
            </div>
          </div>
        </div>
      </div>

      <div class="subheader--answer mt-3 border-bottom">
        <h6 class="totalAnswer text-muted">{{ countAnswer(currentQuestion.answer) }} Answer</h6>
      </div>

      <div
        v-for="(answer, index) in currentQuestion.answer"
        :key="index"
        class="d-flex border-bottom"
      >
        <div class="question-votes py-3">
          <button @click.prevent="upAnswer(answer._id)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>0</span>
          </div>
          <button @click.prevent="downAnswer(answer._id)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="answer-description p-3 w-100">
          <span v-html="answer.description"></span>
        </div>
      </div>

      <div class="w-75">
        <h5 class="my-3">Your Answer</h5>
        <wysiwyg v-model="answer_desc"/>
        <div class="btn-answer mt-4 border-top">
          <button @click.prevent="postAnswer" class="btn btn-sm btn-primary my-4">Post Your Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      answer_desc: ""
    };
  },
  mounted() {
    this.$store.dispatch("SET_QUESTION", this.$route.params.id);
  },
  methods: {
    countAnswer(val) {
      if (!val) {
        return 0;
      } else {
        return val.length;
      }
    },
    postAnswer() {
      let isLogin = this.$store.state.isLogin;
      if (!isLogin) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "You must Login first"
        });
        this.$router.push("/users/login");
      }
      this.axios({
        method: "post",
        url: "/answers",
        data: {
          description: this.answer_desc,
          questionId: this.$route.params.id
        },
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.answer_desc = "";
          Swal.fire({
            type: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    upAnswer() {},
    downAnswer() {}
  },
  computed: {
    ...mapState(["currentQuestion", "currentUser"])
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.totalAnswer {
  font-weight: 400;
  font-size: 20px;
}
</style>
