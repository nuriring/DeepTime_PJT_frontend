<template>
  <div class="total">
    <v-container d-flex flex-column style="width:50%" my-5>
        <b-img class="still fluid rounded" :src="`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`"></b-img> 
        <b-img class="poster fluid rounded" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"></b-img> 
      <div class="moviecard">
      <div class="d-flex flex-column align-items-end moviehead">
        <h3 class="fw-bold ">{{ movie.title }}</h3>
        <h5 class="fw-bold ">{{ movie.release_date }}</h5>
        <h5><v-icon color=orange>mdi-star</v-icon>{{ movie.vote_average }}</h5>
        <h5><v-icon color=red>mdi-heart</v-icon>{{ likeCount }}</h5>
      </div>
      <div class="d-flex justify-content-center">
        <div class="heartbox d-flex justify-content-center">
          <div>
            <button
            @click="likeMovie(moviePk)"
            ><v-icon class="ms-3" color=red>mdi-heart</v-icon></button>
            <p class="text-center text-white">좋아요</p>
          </div>
        </div>
      </div>
      <div class="mt-5" v-if="movie.overview">
        <h3 class=" fw-bold">작품정보</h3>
        <p class="fs-5">{{ movie.overview }}</p>
      </div>

        <iframe :src="`https://www.youtube.com/embed/${movieVideo}`" frameborder="0" width="100%" height="350px"></iframe>
        {{ selectedVideo }}
        <hr>
        <!-- Review UI -->
      <div class="d-flex align-items-baseline">
        <v-icon color=red>mdi-alert-circle</v-icon><h3 class="fw-bold">스포주의</h3>
      </div>
        <review-list
        :reviews="movie.reviews"
        :moviePk="movie.id"
        :movie="movie"
        >
        </review-list>

      </div>
    </v-container>

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
        movieVideo: null,
        genres: []
      
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

<style scoped>
.poster {
  position: absolute;
  top:470px;
  width: 230px;
  height: auto;
}
.still {
  max-width: 100%;
  height: auto;
  filter: brightness(60%); 
  object-fit: cover;
}
.moviecard {
  position: relative;
  top:200px;
}
.moviehead {
  position: absolute;
  top: -190px;
  left: 410px;
  width:500px;
}
.heartbox {
  /* Rectangle 24 */
margin-top: 100px;
width: 95%;
height: 50px;

background: linear-gradient(0deg, #003566, #003566),linear-gradient(0deg, #003566, #003566), #003566;
border-radius: 27px;

}
.total{
  background: #001D3D;
  height: 100%;
  color: white;
  
}
div {
  font-family: 'Gowun Batang', serif;
}
</style>