<template>
  <div class="total">
    <div class="wrap">
      <v-icon class="netflix" large color=red>mdi-map-marker-radius</v-icon>
    </div>
    <select-ott>
    </select-ott>
    <h1 class="text-white mt-5">현재 위치는<a href="https://www.netflix.com/kr/" class="text-decoration-none"> Netflix </a>입니다</h1>
      
    
    <v-container style="margin-left:330px;">
    <div v-for="(netflixMovie, idx) in netflixMovies" :key="idx" class="card mx-2 my-2" style="width: 18rem;">
      <router-link :to="{ name: 'movieDetail', params: {moviePk: netflixMovie.id} }">
      <img id="id1" :src="`https://image.tmdb.org/t/p/w300${netflixMovie.poster_path}`" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <p class="card-text fw-bold">{{ netflixMovie.title }}</p>
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

<style scoped>
.card {
  float: left;
  width: 600px;
  height: 460px;
   border: none;
}
#id1 {
  height : 400px;
}
.select-ott::v-deep .netflix {
  width: 500px; 
}
  .total{
  background: #001D3D;
  min-height: 100vh;
  color: black;
  text-align: center;
}
.netflix{
  display: absolute;
  right: 280px;
}
div {
  font-family: 'Gowun Batang', serif;
}


</style>