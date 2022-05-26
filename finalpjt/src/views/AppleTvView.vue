<template>
  <div class="total">
    <div class="wrap">
      <v-icon class="apple" large color=red>mdi-map-marker-radius</v-icon>
    </div>
    <select-ott class="p-5">
    </select-ott>
    <h1 class="text-white text-center">현재 위치는 Apple TV 입니다</h1>
        <v-container style="margin-left:235px;">
    <div v-for="(appleMovie, idx) in appleMovies" :key="idx" class="card mx-2 my-2" style="width: 18rem;">
      <router-link :to="{ name: 'movieDetail', params: {moviePk: appleMovie.id} }">
      <img id="id1" :src="`https://image.tmdb.org/t/p/w300${appleMovie.poster_path}`" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <p class="card-text">{{ appleMovie.title }}</p>
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
  name:"AppleTvView",
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
    ...mapGetters(['appleMovies'])
  },
  methods: {
    ...mapActions(['fetchAppleMovies']),
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
    this.fetchAppleMovies()
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
  float: left;
  width: 600px;
  height: 460px;
  text-align: center;
  color: black;
   border: none;
}
#id1 {
  height : 400px;
}
.apple {
  position: absolute;
  left: 1113px;
}
  .total {
  background: #001D3D;
  min-height: 100vh;
  color: black;
  }
</style>