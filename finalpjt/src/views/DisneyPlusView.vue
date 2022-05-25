<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(disneyPlusMovie, idx) in disneyPlusMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${disneyPlusMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ disneyPlusMovie.title }}</p>
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
  name:"DisneyPlusView",
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
    ...mapGetters(['disneyPlusMovies'])
  },
  methods: {
    ...mapActions(['fetchDisneyPlusMovies']),
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
    this.fetchDisneyPlusMovies()
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