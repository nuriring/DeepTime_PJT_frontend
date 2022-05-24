<template>
  <div>
    <p v-if="movie.overview">
      {{ movie.title }}<br>   
      {{ movie.overview }}
      {{ movie.id }}
    </p>
    {{ selectedVideo }}

    <!-- Movie Like UI -->
    <div>
      Likeit:
      <button
        @click="likeMovie(moviePk)"
      >{{ likeCount }}</button>
    </div>

    <hr />
    <!-- Review UI -->
    <review-list
    :reviews="movie.reviews"
    :moviePk="movie.id"
    :movie="movie"
    >
    </review-list>

  </div>
</template>

<script>
  // const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
  // const API_URL = 'https://www.googleapis.com/youtube/v3/search'
  // import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'
  import ReviewList from '@/components/ReviewList.vue'



  export default {
    name: 'MovieDetail',
    components: { ReviewList },
    data() {
      return {
        moviePk: this.$route.params.moviePk,
        searchKeyword: null,
        videos: [],
        selectedVideo: null,
      }
    },
    computed: {
      ...mapGetters(['movie',]),
      likeCount() {
        return this.movie.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchMovie',
        'likeMovie',
      ]),

        

      },
    created() {

      this.fetchMovie(this.moviePk)      
    },
  }
</script>

<style></style>