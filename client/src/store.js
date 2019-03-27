import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUser: {},
    questions: [],
    question: {},
    answerOfQuestions: [],
  },
  mutations: {
    GET_USER(state, payload) {
      state.isLogin = payload.status;
      state.currentUser = {
        id: payload.userId,
        name: payload.name,
      };
    },
    GET_ALLQUESTIONS(state, payload) {
      const countAll = payload.map((elm) => {
        elm.total = elm.upvotes.length - elm.downvotes.length;
        return elm;
      });
      state.questions = countAll;
    },
    GET_QUESTION(state, payload) {
      const down = payload.downvotes.length;
      const up = payload.upvotes.length;
      state.question = payload;
      state.question.totalCount = up - down;
    },
    GET_ANSWERS(state, payload) {
      state.answerOfQuestions = payload;
    },
  },
  actions: {
    SET_USER({ commit }) {
      axios({
        method: 'get',
        url: `${baseUrl}/users/auth`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('GET_USER', {
            status: true,
            userId: data._id,
            name: data.name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SET_ALLQUESTIONS({ commit }) {
      axios({
        method: 'get',
        url: `${baseUrl}/questions`,
      })
        .then(({ data }) => {
          commit('GET_ALLQUESTIONS', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SET_QUESTION({ commit }, id) {
      axios({
        method: 'get',
        url: `${baseUrl}/questions/${id}`,
      })
        .then(({ data }) => {
          commit('GET_QUESTION', data);
          commit('GET_ANSWERS', data.answer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
