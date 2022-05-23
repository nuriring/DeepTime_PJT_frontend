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
      // async movieSearch() {
      //   console.log(this.movie.title)
      //   console.log(`${this.movie.title}결말포함`)
      //   // const params = {
      //   //   part: 'snippet',
      //   //   type: 'video',
      //   //   key: API_KEY,
      //   //   q: this.movie.title
      //   // }
      
      //   const keyword = this.movie.title
      //   await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword} 결말포함&key=AIzaSyDrXj_IsXttED3r_OhxpC6BgLfLw_9yLgc`)
      //   .then(res => {
      //     console.log(res.data)

      //     this.videos = res.data.items
      //     this.selectedVideo = this.videos[0]
      //     // console.log(this.videos)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
        

      },
    created() {

      this.fetchMovie(this.moviePk)      
    },
  }
</script>

<style></style>