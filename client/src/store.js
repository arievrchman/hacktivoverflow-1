import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

let baseUrl = 'http://localhost:3000'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUser: {},
    questions: [],
    currentQuestion: {},
    answerOfQuestions: [],
  },
  mutations: {
    GET_USER(state, payload) {
      state.isLogin = payload.status;
      state.currentUser = {
        id: payload.userId,
        name: payload.name
      };
    },
    GET_ALLQUESTIONS(state, payload) {
      state.questions = payload;
    },
    GET_QUESTION(state, payload) {
      state.currentQuestion = payload;
    },
    // GET_ANSWER()
  },
  actions: {
    SET_USER({ commit }) {
      axios({
        method: 'get',
        url: baseUrl + '/users/auth',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('GET_USER', {
            status: true,
            userId: data._id,
            name: data.name
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SET_ALLQUESTIONS({ commit }) {
      axios({
        method: 'get',
        url: baseUrl + '/questions'
      })
      .then(({ data }) => {
        commit('GET_ALLQUESTIONS', data);
      })
      .catch((err) => {
        console.log(err);  
      });
    },
    SET_QUESTION({commit}, id) {
      axios({
        method: 'get',
        url: baseUrl + '/questions/' + id
      })
      .then(({ data }) => {
        console.log(data);
        commit('GET_QUESTION', data);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
});
