<template>

  <div class="total">
    
    <select-ott></select-ott>
    
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import SelectOtt from '@/components/SelectOtt.vue'

  export default {
    name: 'OttListView',
    components: {
      SelectOtt
    },
    computed: {
      ...mapGetters(['ottMovies'])
    },
    methods: {
      ...mapActions(['fetchOttMovies']),

    },

    created() {
      this.fetchOttMovies()
      console.log(this.ottMovies.poster_path)
    },
  }
</script>

<style>
.total{
  background: #001D3D;
  min-height: 100vh;
  color: white;
}

</style>