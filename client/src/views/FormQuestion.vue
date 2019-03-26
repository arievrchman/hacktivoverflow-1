<template>
  <div class="mt-5 w-75">
    <h3 class="mb-5">Ask a Question</h3>
    <div class="d-flex flex-column">
      <label for="title" class="title">Title</label>
      <input v-model="title" placeholder="Title" type="text" class="mb-4">
      <label for="tags">Tags</label>
      <InputTag v-model="tags" placeholder="Tags" class="mb-4"/>
      <label for="title" class="title">Body</label>
      <wysiwyg v-model="description"/>
      <div class="custom-btn d-flex">
        <button @click.prevent="askQuestion" class="btn btn-sm btn-primary my-4">Post Question</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag';

export default {
  components: {
    InputTag,
  },
  data() {
    return {
      title: '',
      description: '',
      tags: []
    };
  },
  methods: {
    askQuestion() {
      this.axios({
        method: 'post',
        url: '/questions',
        data: {
          title: this.title,
          tags: this.tags,
          description: this.description
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.title = '';
          this.tags = [];
          this.description = '';
          Swal.fire({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.btn-sm {
  border-radius: 0px;
}
input[type="text"] {
  font-size: 15px;
}

</style>

