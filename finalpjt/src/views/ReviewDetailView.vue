<template>
  <div>

     {{ review }} 

  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import axios from "axios"
export default {
  name: "ReviewDetailView",
  // props: {
  //   reviews: Object,
  //   movie: Object
  // },
  data() {
    return {
      moviePk: this.$route.params.moviePk,
      reviewPk: this.$route.params.reviewPk,
      review: {}

    }
  },
//   computed: {
//   ...mapGetters(['movie']),},
methods: {
//   ...mapActions(['fetchReview']),
  getToken: function () {
    const token = localStorage.getItem('token')
    const config = {
      headers : {
        Authorization: `Token ${token}`
      },
    }
    return config
  },
  getReviewDetail: function () {
    const config = this.getToken()
    axios.get(`http://localhost:8000/deeptime/movies/${this.moviePk}/reviews/${this.reviewPk}`, config)
      .then((res) => {
        // console.log(res)
        // console.log(this.moviePk)
        this.review = res.data
      })
      .catch( (err) => {
        console.log(err)
      })   
  }

},
created() {
  // this.fetchReview(this.moviePk, this.reviewPk)
  this.getReviewDetail()
}

}

</script>

<style>

</style>