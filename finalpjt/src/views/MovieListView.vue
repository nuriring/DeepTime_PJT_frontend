<template>
  <div>
    <search-bar @input-search="onInputSearch"></search-bar>
    <h2>MovieList</h2>
    <br>
    <p>가로로 스와이프하여 더 많은 영화를 즐겨보세요!</p>

    <div class="m-5">
      <vue-glide v-if="movies.length">
        <vue-glide-slide v-for="(movie, idx) in movies" :key="idx">
          <div>
          <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
            <router-link
             :to="{ name: 'movieDetail', params: {moviePk: movie.id} }">

              <b-card class="text-dark font-weight-bold" :title="movie.title" :img-src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" img-alt="Image" img-top>
              <b-card-text id="overview" class="text-dark">
              </b-card-text>
              <template #footer>
                <small class="text-muted">평점 : {{ movie.vote_average }}</small>
              </template>
            </b-card>
            </router-link>
          </div>
        </vue-glide-slide>
      </vue-glide>
    </div>
      <div>
        <div v-for="recommend in recommends" :key="recommend.id">
          {{ recommend.genres }}
          {{ recommend.title }}
          {{ recommend }}
        </div>
      {{ profile.genre }}
      <button @click="moviePick">recommend</button>
      </div>

  </div>
</template>

<script>
  const API_URL = "https://api.themoviedb.org/3/search/movie"
  import { Glide, GlideSlide } from 'vue-glide-js'
  import { mapActions, mapGetters } from 'vuex'
  import SearchBar from '@/components/SearchBar'
  import axios from "axios"
  export default {
    name: 'MovieList',
    components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    SearchBar
    },
    data() {
      return {
        recommends: Array,
        searchKeword: null
      }
    },
    computed: {
      ...mapGetters(['movies','currentUser','profile'])
    },
    methods: {
      ...mapActions(['fetchMovies','fetchProfile']),

      getToken: function () {
        const token = localStorage.getItem('token')
        const config = {
          headers : {
            Authorization: `Token ${token}`
          },
        }
        return config
       },
    
      moviePick: function () {
        const config = this.getToken()
        const payload = { username: this.currentUser.username  }
        this.fetchProfile(payload)
        axios.get(`http://localhost:8000/deeptime/movies/genre/${this.profile.genre}`, config)
          .then((res) => {
            console.log(res)
            this.recommends = res.data

          })
          .catch( (err) => {
            console.log(err)
          })   
    },
      onInputSearch: function (keyword) {
      // const config = this.getToken()
        this.searchKeyword = keyword
        const params = {
          "api_key": "e6149bf41aaefec295f3595be639b5c7",
          "language": "ko",
          "page":"1",
          "query": this.searchKeyword,
          "include_adult":"true",
        }
         axios.get(API_URL,{params})
          .then((res) => {
           console.log(res)
          })
          .catch( (err) => {
           console.log(err)
          })   

    },
  
  },

    created() {
      this.fetchMovies()
    },
  }
  
</script>

<style>

</style>
