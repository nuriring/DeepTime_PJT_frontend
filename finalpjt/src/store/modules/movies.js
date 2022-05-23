import router from '@/router'

import drf from "@/api/drf"
import axios from "axios"



export default {
  state: {
    movies: [],
    movie: {}
  },
  getters: {
   movies: state => state.movies,
   movie: state => state.movie,

  },
  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_MOVIE_REVIEWS: (state, reviews) => (state.movie.reviews = reviews),
    SET_MOVIE_REVIEW: (state, review) => (state.movie.review = review),
  },
  actions: {
    fetchMovies({commit,getters}) {
      axios({
        url: drf.movies.movies(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_MOVIES', res.data))
      .catch(err => console.error(err.response))
    },
    fetchMovie({ commit, getters }, moviePk) {

      axios({
        url: drf.movies.movie(moviePk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    likeMovie({ commit, getters }, moviePk) {
      /* 좋아요
      POST: likeArticle URL(token)
        성공하면
          state.article 갱신
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.likeMovie(moviePk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => console.error(err.response))
    },
    fetchReview({ commit, getters }, { moviePk, reviewPk }) {

      axios({
        url: drf.movies.movie(moviePk).reviews.review(reviewPk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE_REVIEW', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
      },
    createReview({ commit, getters }, { moviePk, title, content}) {
      const review = { title, content }
      axios({
        url: drf.movies.reviews(moviePk),
        method: 'post',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_REVIEW', res.data)
        })
        .catch(err => console.error(err.response))

    },
    
    updateReview({ commit, getters }, { moviePk, reviewPk, title, content }) {

      const review = { title, content }

      axios({
        url: drf.movies.review(moviePk, reviewPk),
        method: 'put',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_REVIEW', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteReview({ commit, getters }, { moviePk, reviewPk }) {
        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.movies.review(moviePk, reviewPk),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_MOVIE_REVIEW', res.data)
            })
            .catch(err => console.error(err.response))
        }
      },
  
  }
}
