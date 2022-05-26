<template>
  <div class="total">
    <div class="wrap">
      <v-icon class="wavve" large color=red>mdi-map-marker-radius</v-icon>
    </div>
    <div>
      <select-ott class="p-5">
      </select-ott>

    </div>
    <h1 class="text-white  text-center">현재 위치는 Wavve 입니다</h1>
    
    <v-container  style="margin-left:235px;">
    <div v-for="(wavveMovie, idx) in wavveMovies" :key="idx" class="card mx-2 my-2" style="width: 18rem;">
      <router-link :to="{ name: 'movieDetail', params: {moviePk: wavveMovie.id} }">
      <img id="id1" :src="`https://image.tmdb.org/t/p/w300${wavveMovie.poster_path}`" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <p class="card-text">{{ wavveMovie.title }}</p>
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
  name:"WavveView",
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
    ...mapGetters(['wavveMovies'])
  },
  methods: {
    ...mapActions(['fetchWavveMovies']),
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
    this.fetchWavveMovies()
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
  color: black;
  text-align: center;
   border: none;
}
#id1 {
  height : 400px;
}
.wavve{
  position: absolute;
  left: 1010px;
}
  .total {
  background: #001D3D;
  min-height: 100vh;
  color: black;
  }

</style>