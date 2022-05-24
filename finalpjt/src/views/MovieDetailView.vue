<template>
  <div>
    <p v-if="movie.overview">
      {{ movie.title }}<br>   
      {{ movie.overview }}
      {{ movie.id }}
    </p>
    <iframe :src="`https://www.youtube.com/embed/${movieVideo}`" frameborder="0"></iframe>
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
import axios from 'axios'



  export default {
    name: 'MovieDetail',
    components: { ReviewList },
    data() {
      return {
        moviePk: this.$route.params.moviePk,
        searchKeyword: null,
        videos: [],
        selectedVideo: null,
        movieVideo: null
      
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
      getVideo() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.moviePk}/videos?api_key=5908342b45ef31ecdbea2e9687fbbcd8&language=ko-KR`)
        .then((res) => {
          console.log(res.data.results[0].key)
          this.movieVideo = (res.data.results[0].key)
        })
        .catch((err) => {
          console.log(err)
        })
      }

        

      },
    created() {

      this.fetchMovie(this.moviePk)  
      this.getVideo()  
        
    },
  }
</script>

<style></style>