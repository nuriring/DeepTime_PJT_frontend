<template>
  <div class="wrapper total">
    <div class="content">
      <div class="d-flex justify-content-center display-1 fw-bold text-white">
        {{ review.movie.title }}

      </div>
      <div class="d-flex justify-content-center my-5">
    
        <b-card class="review-card">
          <b-card-text>
            <h3 class="fw-bold float-left">{{review.title}}</h3>

            <h5 class="float-right"><v-icon>mdi-account-circle</v-icon>{{review.user.username }}</h5>

          </b-card-text>
          <br>
          <hr>
          <b-card-text class="text fs-5">
            {{ review.content }}
          </b-card-text>
            <div class="d-flex justify-content-end align-items-baseline">
              <v-btn @click="deleteReview(payload)">delete</v-btn>
            
              <router-link :to="{ name: 'movieDetail', params: { moviePk } }" class="text-decoration-none ms-3">
                <v-btn>back</v-btn>
              </router-link>
            </div>
        </b-card>
      </div>

    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      review: {},
      payload: {
        moviePk: this.$route.params.moviePk,
        reviewPk: this.$route.params.reviewPk,
      }
      }

    },
//   computed: {
//   ...mapGetters(['movie']),},
methods: {
  ...mapActions(['fetchReview','deleteReview']),
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
computed: {
  ...mapGetters(['currentUser']),
},
created() {
  // this.fetchReview(this.moviePk, this.reviewPk)
  this.getReviewDetail()
}

}

</script>

<style scoped>
 .review-card {

    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 50%;

    border-radius: 10px;
  }
      .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

  }

  
  .content {
    font-size: 2rem; 
    padding: 3rem;
    border-radius: 1rem;
    
  }
  .total {
  background: #001D3D;
  min-height: 100vh;
  color: black;
  }
</style>