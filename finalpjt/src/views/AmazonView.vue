<template>
  <div class="total">
    <div class="wrap">
      <v-icon class="Amazone" large color=red>mdi-map-marker-radius</v-icon>
    </div>
    <select-ott>
    </select-ott>
    <h1 class="text-white mt-5 text-center">현재 위치는<a href="https://www.primevideo.com/ref=atv_nb_logo?_encoding=UTF8&language=ko_KR" class="text-decoration-none"> Amazone Prime Video</a>입니다</h1>
      <v-container style="margin-left:330px;">
    <div v-for="(amazonMovie, idx) in amazonMovies" :key="idx" class="card mx-2 my-2" style="width: 18rem;">
      <router-link :to="{ name: 'movieDetail', params: {moviePk: amazonMovie.id} }">
      <img id="id1" :src="`https://image.tmdb.org/t/p/w300${amazonMovie.poster_path}`" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <p class="card-text">{{ amazonMovie.title }}</p>
      </div>
    </div>
    </v-container>
    <loading-spinner></loading-spinner>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import axios from 'axios'
export default {
  name:"AmazonView",
  components : {
    SelectOtt,
    LoadingSpinner
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['amazonMovies'])
  },
  methods: {
    ...mapActions(['fetchAmazonMovies']),
    setLoading(isLoading) {
        if (isLoading) {
          this.isLoading = true;

        }
        if (!isLoading) {
          this.isLoading = false;
          
        }
      }

  },

  created() {
    this.fetchAmazonMovies()
    axios.interceptors.request.use(
      config => {
        this.setLoading(false);
        return config;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    ),
    axios.interceptors.response.use(
      response => {
        this.setLoading(true);
        return response;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  },
  
}
</script>

<style scoped>
.card {
  text-align: center;
  color: black;
  float: left;
  width: 600px;
  height: 460px;
   border: none;
}
#id1 {
  height : 400px;
}
.Amazone {
  position:apsolute;
  left:870px;
}
  .total {
  background: #001D3D;
  min-height: 100vh;
  color: black;
  }
div {
  font-family: 'Gowun Batang', serif;
}  
</style>
