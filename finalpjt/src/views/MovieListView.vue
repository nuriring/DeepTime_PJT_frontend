<template>
  <div>
    <v-container class="d-flex justify-content-center">
          <v-icon class>mdi-magnify</v-icon>
          <search-bar class="searchBar " @input-search="onInputSearch" 
          placeholder="원하는 영화를 검색해보세요" 
          
          > </search-bar>
    </v-container>
       <v-container v-if="searchMovies.length">
          <vue-glide v-if="movies.length"
            class="glide__track my-5"
            data-glide-el="track"
            ref="slider"
            type="carousel"
            :breakpoints="{3000: {perView: 7}, 1100: {perView: 5}, 600: {perView: 3}}"
          >
            <vue-glide-slide v-for="(searchmovie, idx) in searchMovies" :key="idx">

               <div>
              <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
                <router-link
                :to="{ name: 'movieDetail', params: {moviePk: searchmovie.id} }">
                  <v-card>
                    <v-img style="height:300px;" :src="`https://image.tmdb.org/t/p/w300${searchmovie.poster_path}`"></v-img>
                  </v-card>
                </router-link>
              </div>

            </vue-glide-slide>
        </vue-glide>
        
       </v-container>




  
    <v-container class="d-flex flex-column align-items-center">
      <h1>MovieList</h1>
      <br>
      <h3 class="font-weight-medium font-italic">Deeptime's Pick!</h3>
      <p>인기 영화 TOP 100</p>

    </v-container>

    <div class="container">

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
                  <v-img style="height:300px;" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"></v-img>       
                </router-link>
                <v-card>
                </v-card>
              </div>
            </vue-glide-slide>
          </vue-glide>

    </div>
      <div class="container">
        <v-container class="d-flex justify-content-center">
          <button class="font-weight-medium font-italic" @click="moviePick">
            <v-icon
            color = red
            large
            > mdi-cards-heart </v-icon>
            DoubleClick!</button>

        </v-container>
        <h3 v-if="recommends.length" class="font-weight-medium font-italic text-center my-5" >{{ currentUser.username }}'s Pick!</h3>
        <P v-if="recommends.length" class="font-weight-medium  text-center my-5" >{{ currentUser.username }}님이 선호하는 장르 기반 추천 영화</P>
      <vue-glide v-if="recommends.length"
        class="glide__track my-5"
        data-glide-el="track"
        ref="slider"
        type="carousel"
        :breakpoints="{3000: {perView: 7}, 1100: {perView: 5}, 600: {perView: 3}}"
      >
            <vue-glide-slide v-for="(recommend, idx) in recommends" :key="idx">
              <div>
              <!-- <div class="px-4 py-5" @click="toDetail(movie)"> -->
                <router-link
                :to="{ name: 'movieDetail', params: {moviePk: recommend.id} }">
                  <v-card>
                    <v-img style="height:300px;" :src="`https://image.tmdb.org/t/p/w300${recommend.poster_path}`"></v-img>
                  </v-card>
                </router-link>
              </div>
            </vue-glide-slide>
      </vue-glide>
      </div>
    <div v-if="!searchMovies.length && !search">
         <p>요청하신 영화 정보를 찾을 수 없습니다</p> 
       </div>
       <!--요청한 영화 정보 없을 때만 보여주고 싶은데 ㅜㅜ-->

    


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
        searchMovies : [],
        search : true
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
           this.search = false
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
/* Rectangle 10 */
.searchBar{

  width: 694px;
  height: 61px;
  left: 517px;
  top: 10px;

  background: #D9D9D9;
  border-radius: 16px;

}


</style>
