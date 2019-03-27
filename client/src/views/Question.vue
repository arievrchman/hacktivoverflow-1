<template>
  <div class="w-75">
    <div class="question--head border-bottom">
      <h4 class="my-3">{{ question.title }}</h4>
    </div>
    <div class="container">
      <!-- Question Section -->
      <div class="d-flex border-bottom">
        <div class="question-votes py-3">
          <button @click.prevent="upQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center py-3">
            <span>{{ countQ }}</span>
          </div>
          <button @click.prevent="downQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>
        <div class="question-description p-3 w-100">
          <span v-html="question.description"></span>
          <div v-if="question.owner == currentUser.id" class="mt-4 align-self-end">
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
            <input v-model="question.title" type="text" class="form-control mb-3" placeholder="Title">
            <label for="tags">
              <span>Tags</span>
            </label>
            <InputTag v-model="tags" placeholder="Tags" class="mb-3"/>
            <label for="description">
              <span>Body</span>
            </label>
            <div class="d-flex flex-row">
              <wysiwyg v-model="question.description"/>
            </div>

            <div class="btn-answer mt-4 border-top">
              <button
                @click.prevent="updateQuestion(question)"
                class="btn btn-sm btn-primary my-4"
              >Edit Question</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Question Section -->

      <div class="subheader--answer mt-3 border-bottom">
        <h6 class="totalAnswer text-muted">{{ countAnswer(answerOfQuestions) }} Answer</h6>
      </div>

      <!-- Answer Section -->
      <div
        v-for="(answer, index) in answerOfQuestions"
        :key="index"
        class="d-flex border-bottom"
      >

        <div class="question-votes py-3">
          <button @click.prevent="upAnswer(answer)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>{{ answer.upvotes.length - answer.downvotes.length }}</span>
          </div>
          <button @click.prevent="downAnswer(answer)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="answer-description p-3 w-100">
          <span v-html="answer.description"></span>
          <div v-if="answer.owner == currentUser.id" class="mt-4 align-self-end">
            <button
              class="btn btn-sm btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#updateAnswer"
              aria-expanded="false"
              aria-controls="updateAnswer"
            >
              <span class="text-muted">edit</span>
            </button>
            <button @click.prevent="deleteAnswer(answer)" class="btn btn-sm btn-link">
              <span class="text-muted">delete</span>
            </button>
          </div>

          <div class="collapse mt-3" id="updateAnswer">
            <label for="description">
              <span>Editing Answer</span>
            </label>
            <div class="d-flex flex-row">
              <wysiwyg v-model="answer.description"/>
            </div>

            <div class="btn-answer mt-4 border-top">
              <button
                @click.prevent="updateAnswer(answer)"
                class="btn btn-sm btn-primary my-4"
              >Edit Question</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Answer Section -->

      <!-- Post Answer -->
      <div class="w-100">
        <h5 class="my-3">Your Answer</h5>
        <wysiwyg v-model="answer_desc"/>
        <div class="btn-answer mt-4 border-top">
          <button @click.prevent="postAnswer" class="btn btn-sm btn-primary my-4">Post Your Answer</button>
        </div>
      </div>
      <!-- Post Answer -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputTag from 'vue-input-tag';

export default {
  components: {
    InputTag,
  },
  created() {
  },
  data() {
    return {
      title: '',
      tags: [],
      description: '',
      answer_desc: '',
      upQ: [],
      downQ: [],
    };
  },
  mounted() {
    this.$store.dispatch('SET_QUESTION', this.$route.params.id);
  },
  methods: {
    countAnswer(val) {
      if (!val) {
        return 0;
      }
      return val.length;
    },
    postAnswer() {
      const { isLogin } = this.$store.state;
      if (!isLogin) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'You must Login first',
        });
        this.$router.push('/users/login');
      }
      this.axios({
        method: 'post',
        url: '/answers',
        data: {
          description: this.answer_desc,
          questionId: this.$route.params.id,
        },
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          this.answer_desc = '';
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAnswer(a) {
      this.axios({
        method: 'patch',
        url: `/answers/${a._id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: a.description,
        },
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAnswer(a) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            return this.axios({
              method: 'delete',
              url: `/answers/${a._id}`,
              headers: { token: localStorage.getItem('token') },
              data: { questionId: this.$route.params.id },
            });
          }
        })
        .then(({ data }) => {
          this.$store.commit('GET_ANSWERS');
          Swal.fire(
            'Deleted!',
            data.message,
            'success',
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upAnswer(a) {
      if (a.owner === this.currentUser.id) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot vote your own question',
        });
      } else {
        this.axios({
          method: 'patch',
          url: `/answers/${a._id}/upvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then(({ data }) => {
            this.$store.dispatch('SET_QUESTION', this.$route.params.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    downAnswer(a) {
      if (a.owner === this.currentUser.id) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot vote your own question',
        });
      } else {
        this.axios({
          method: 'patch',
          url: `/answers/${a._id}/downvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then(({ data }) => {
            this.$store.dispatch('SET_QUESTION', this.$route.params.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    updateQuestion(q) {
      const { id } = this.$route.params;
      const data = {
        title: q.title,
        tags: this.tags,
        description: q.description,
      };
      this.axios({
        method: 'patch',
        url: `/questions/${id}`,
        headers: { token: localStorage.getItem('token') },
        data,
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }).catch((err) => {
          console.log(err);
        });
    },
    deleteQuestion() {
      const { id } = this.$route.params;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            return this.axios({
              method: 'delete',
              url: `/questions/${id}`,
              headers: { token: localStorage.getItem('token') },
            });
          }
        })
        .then(({ data }) => {
          this.$router.replace('/');
          Swal.fire(
            'Deleted!',
            data.message,
            'success',
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upQuestion() {
      if (this.question.owner === this.currentUser.id) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot vote your own question',
        });
      } else {
        this.axios({
          method: 'patch',
          url: `/questions/${this.$route.params.id}/upvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then(({ data }) => {
            this.upQ = data.upvotes;
            this.downQ = data.downvotes;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    downQuestion() {
      if (this.question.owner === this.currentUser.id) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot vote your own question',
        });
      } else {
        this.axios({
          method: 'patch',
          url: `/questions/${this.$route.params.id}/downvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then(({ data }) => {
            this.upQ = data.upvotes;
            this.downQ = data.downvotes;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    ...mapState(['question', 'currentUser', 'answerOfQuestions']),
    countQ() {
      return this.upQ.length - this.downQ.length;
    },
  },
  watch: {
    'question.tags': function (val) {
      const getTags = this.question.tags.map(elm => elm.name);
      this.tags = getTags;
    },
    question(val) {
      this.upQ = val.upvotes;
      this.downQ = val.downvotes;
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.totalAnswer {
  font-weight: 400;
  font-size: 20px;
}


.editr {
  width: 100%;
  height: 300px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 4px;
}

</style>
