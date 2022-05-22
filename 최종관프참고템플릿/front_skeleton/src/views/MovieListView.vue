<template>
  <div>

    <movie-list-item :movies="movies"></movie-list-item>
  </div>
</template>

<script>
  // import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
// import _ from 'lodash'
import MovieListItem from '@/components/MovieListItem.vue'

const SERVER_URL = 'http://localhost:8000/deeptime'

  export default {
    name: 'MovieListView',
    data: function() {
      return {
        movies:[],
        movie: '',
        user: '',
      }
    },
    components: {
      MovieListItem,
    },
    methods: {
      getToken: function () {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Token ${token}`
          },
        }
        return config
      },
      getMovieList: function () {
        const config = this.getToken()
        axios.get(`${SERVER_URL}/movies/`, config)
        .then((res) => {
          console.log(res.data)
          this.movies = res.data

        })
        .catch( (err) => {
        console.log(err)
        })
      }

    
    },
    created: function() {
      this.getMovieList()
    }

  }
</script>

<style>

</style>