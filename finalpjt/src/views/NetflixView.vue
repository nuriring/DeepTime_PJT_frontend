<template>
  <div>
    <select-ott>
    </select-ott>

    

    <div v-for="(netflixMovie, idx) in netflixMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${netflixMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ netflixMovie.title }}</p>
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
  name:'NetflixView',
  components: {
    SelectOtt,
    LoadingSpinner
  },
  data() {
  	return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['netflixMovies'])
  },
  methods: {
    ...mapActions(['fetchNetflixMovies']),
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
    this.fetchNetflixMovies()
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