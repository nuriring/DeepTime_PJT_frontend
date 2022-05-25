<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(watchaMovie, idx) in watchaMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${watchaMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ watchaMovie.title }}</p>
      </div>
    </div>
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

<style>

</style>