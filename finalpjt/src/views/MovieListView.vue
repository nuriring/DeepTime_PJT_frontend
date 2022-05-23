<template>
  <div>
    <h2>MovieList</h2>
    <br>
    {{ currentUser }} {{ genre }}
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
  </div>
</template>

<script>
  import { Glide, GlideSlide } from 'vue-glide-js'
  import { mapActions, mapGetters } from 'vuex'
  import axios from "axios"

  export default {
    name: 'MovieList',
    data() {
      return {
        genre: ''
      }
    },
    components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    },
    computed: {
      ...mapGetters(['movies','currentUser'])
    },
    methods: {
      ...mapActions(['fetchMovies']),

     getToken: function () {
    const token = localStorage.getItem('token')
    const config = {
      headers : {
        Authorization: `Token ${token}`
      },
    }
    return config
  },
  getUser: function () {
    const config = this.getToken()
    axios.get(`http://localhost:8000/deeptime/accounts/${this.currentUser.pk}`, config)
      .then((res) => {
        console.log(res)
        // console.log(this.moviePk)
        this.genre = res.data.genre
        console.log(this.genre)
      })
      .catch( (err) => {
        console.log(err)
      })   
  }
    },

    created() {
      this.fetchMovies()
      this.getUser()
    },
  }
</script>

<style>

</style>