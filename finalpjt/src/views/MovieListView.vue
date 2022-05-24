<template>
  <div>
    

    <h2>MovieList</h2>
    <br>
    <p>가로로 스와이프하여 더 많은 영화를 즐겨보세요!</p>

    <div class="container">
      <v-hover style="margin-bottom:10px">
        <vue-glide v-if="movies.length"
            class="glide__track"
            data-glide-el="track"
            ref="slider"
            type="carousel"
            :breakpoints="{3000: {perView: 7}, 1100: {perView: 5}, 600: {perView: 3}}"
        >
          
          <vue-glide-slide v-for="(movie, idx) in movies" :key="idx">
            <div>
            <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
              <router-link
              :to="{ name: 'movieDetail', params: {moviePk: movie.id} }">
              </router-link>
              <v-card>
                <v-img style="height:300px;" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"></v-img>
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                    >
                    </v-overlay>
                  </v-fade-transition>
              </v-card>

                <!-- <b-card class="text-dark font-weight-bold" :title="movie.title" :img-src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" img-alt="Image" img-top>
                <b-card-text id="overview" class="text-dark">
                </b-card-text>
                <template #footer>
                  <small class="text-muted">평점 : {{ movie.vote_average }}</small>
                </template> 
              </b-card> -->
            </div>
          </vue-glide-slide>
        </vue-glide>
      </v-hover>
    </div>
      <div>
      <button @click="moviePick">recommend</button>
      <vue-glide v-if="recommends.length">
            <vue-glide-slide v-for="(recommend, idx) in recommends" :key="idx">
              <div>
              <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
                <router-link
                :to="{ name: 'movieDetail', params: {moviePk: recommend.id} }">

                  <b-card class="text-dark font-weight-bold" :title="recommend.title" :img-src="`https://image.tmdb.org/t/p/w300${recommend.poster_path}`" img-alt="Image" img-top>
                  <b-card-text id="overview" class="text-dark">
                  </b-card-text>
                  <template #footer>
                    <small class="text-muted">평점 : {{ recommend.vote_average }}</small>
                  </template>
                </b-card>
                </router-link>
              </div>
            </vue-glide-slide>
      </vue-glide>
      </div>

      <search-bar @input-search="onInputSearch"></search-bar>
       <div v-if="searchMovies.length > 2">
          <vue-glide v-if="movies.length">
            <vue-glide-slide v-for="(searchmovie, idx) in searchMovies" :key="idx">
              <div>
              <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
                <router-link
                :to="{ name: 'movieDetail', params: {moviePk: searchmovie.id} }">

                  <b-card class="text-dark font-weight-bold" :title="searchmovie.title" :img-src="`https://image.tmdb.org/t/p/w300${searchmovie.poster_path}`" img-alt="Image" img-top>
                  <b-card-text id="overview" class="text-dark">
                  </b-card-text>
                  <template #footer>
                    <small class="text-muted">평점 : {{ searchmovie.vote_average }}</small>
                  </template>
                </b-card>
                </router-link>
              </div>
            </vue-glide-slide>
        </vue-glide>
       </div>
       <!--요청한 영화 정보 없을 때만 보여주고 싶은데 ㅜㅜ-->
       <!-- <div v-if="0 < searchMovies.length && searchMovies.length < 2">
         <p>요청하신 영화 정보를 찾을 수 없습니다</p> 
       </div> -->
    


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
        recommends: [],
        searchKeword: null,
        searchMovies : []
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
           this.searchMovies = res.data.results
           console.log(this.searchMovies)
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
