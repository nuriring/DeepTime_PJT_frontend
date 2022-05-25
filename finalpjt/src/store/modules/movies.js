import router from '@/router'

import drf from "@/api/drf"
import axios from "axios"



export default {

  state: {
    movies: [],
    movie: {},
    // ott
    netflixMovies: [],
    disneyPlusMovies: [],
    amazonMovies: [],
    watchaMovies: [],
    wavveMovies: [],
    appleMovies: [],
  },
  getters: {
   movies: state => state.movies,
   genre_movies: state => state.genre_movies,
   movie: state => state.movie,

   // ott
   netflixMovies: state => state.netflixMovies,
   disneyPlusMovies: state => state.disneyPlusMovies,
   amazonMovies: state => state.amazonMovies,
   watchaMovies: state => state.watchaMovies,
   wavveMovies: state => state.wavveMovies,
   appleMovies: state => state.appleMovies,


  },
  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_GENRE_MOVIES: (state, genre_movies) => state.genre_movies = genre_movies,
    SET_MOVIE: (state, movie) => state.movie = movie,


    // ott
    SET_NETFLIX: (state, netflixMovies) => state.netflixMovies = netflixMovies,
    SET_DISNEYPLUS: (state, disneyPlusMovies) => state.disneyPlusMovies = disneyPlusMovies,
    SET_AMAZON: (state, amazonMovies) => state.amazonMovies = amazonMovies,
    SET_WATCHA: (state, watchaMovies) => state.watchaMovies = watchaMovies,
    SET_WAVVE: (state, wavveMovies) => state.wavveMovies = wavveMovies,
    SET_APPLE: (state, appleMovies) => state.appleMovies = appleMovies,


    SET_MOVIE_REVIEWS: (state, reviews) => (state.movie.reviews = reviews),
    SET_MOVIE_REVIEW: (state, review) => (state.movie.review = review),


  },
  actions: {
    fetchMovies({commit,getters}) {
      console.log(4)
      axios({
        url: drf.movies.movies(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_MOVIES', res.data))
      .catch(err => console.error(err.response))
    },
    fetchGenreMovies({commit,getters}, a) {
      console.log(3)
      axios({
        url: drf.movies.genre_movies(a),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_GENRE_MOVIES', res.data))
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



    // ott
    fetchNetflixMovies({commit,getters}) {
      axios({
        url: drf.otts.netflix(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_NETFLIX', res.data))
      .catch(err => console.error(err.response))
    },
    fetchDisneyPlusMovies({commit,getters}) {
      axios({
        url: drf.otts.disneyPlus(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_DISNEYPLUS', res.data))
      .catch(err => console.error(err.response))
    },
    fetchAmazonMovies({commit,getters}) {
      axios({
        url: drf.otts.amazon(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_AMAZON', res.data))
      .catch(err => console.error(err.response))
    },
    fetchWatchaMovies({commit,getters}) {
      axios({
        url: drf.otts.watcha(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_WATCHA', res.data))
      .catch(err => console.error(err.response))
    },
    fetchWavveMovies({commit,getters}) {
      axios({
        url: drf.otts.wavve(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_WAVVE', res.data))
      .catch(err => console.error(err.response))
    },
    fetchAppleMovies({commit,getters}) {
      axios({
        url: drf.otts.apple(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_APPLE', res.data))
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
        console.log(moviePk)
        const review = { title, content, moviePk }
        console.log(review)
        axios({
          url: drf.movies.reviews(moviePk),
          method: 'post',
          data: review,
          headers: getters.authHeader,
        })
          .then(res => {
            commit('SET_MOVIE_REVIEW', res.data)
            router.push({
              name: 'movieDetail',
              params: { moviePk: moviePk }
            })
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
              alert('리뷰가 성공적으로 삭제되었습니다.')
              router.push({
                name: 'movieDetail',
                params: { moviePk: moviePk }
              })
            })
            .catch(err => console.error(err.response))
        }
      },

  
  }
}
