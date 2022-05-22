<template>
  <div>

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
  </div>
</template>

<script>
  import { Glide, GlideSlide } from 'vue-glide-js'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MovieList',
    components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    },
    computed: {
      ...mapGetters(['movies'])
    },
    methods: {
      ...mapActions(['fetchMovies']),

      // toDetail: function (movie) {
      // this.$router.push({name: 'MovieDetail', query: {movie: movie}})
      // // this.$router.push({name: 'MovieDetail', params: {movie: `${movie}`}})

    },

    created() {
      this.fetchMovies()
    },
  }
</script>

<style>

</style>