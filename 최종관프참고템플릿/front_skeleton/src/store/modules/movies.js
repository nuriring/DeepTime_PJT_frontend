import router from '@/router'

import drf from "@/api/drf"
import axios from "axios"


export default {
  state: {
    movies: []
  },
  getters: {
   movies: state => state.movies,
   movie: state => state.movie,
  },
  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_MOVIE: (state, movie) => state.movie = movie,
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
  
  }
}
