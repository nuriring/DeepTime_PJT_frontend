<template>
  <div class="total">
        <div class="wrap">
      <v-icon class="watcha" large color=red>mdi-map-marker-radius</v-icon>
      </div>
    <select-ott class="p-5">
    </select-ott>
    <h1 class="text-white text-center">현재 위치는 Watcha 입니다</h1>
    <v-container style="margin-left:235px;">
    <div v-for="(watchaMovie, idx) in watchaMovies" :key="idx" class="card mx-2 my-2" style="width: 18rem;">
      <router-link :to="{ name: 'movieDetail', params: {moviePk: watchaMovie.id} }">
      <img id="id1" :src="`https://image.tmdb.org/t/p/w300${watchaMovie.poster_path}`" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <p class="card-text">{{ watchaMovie.title }}</p>
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
  name:"WatchaView",
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
    ...mapGetters(['watchaMovies'])
  },
  methods: {
    ...mapActions(['fetchWatchaMovies']),
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
    this.fetchWatchaMovies()
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
}
#id1 {
  height : 400px;
}
.watcha{
  position: absolute;
  left: 900px;
}
</style>