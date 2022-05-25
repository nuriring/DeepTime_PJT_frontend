<template>
<div>

      <div class="mb-5">
    <div class="accordion" role="tablist">
    <div no-body class="mb-1">
      <div header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 class="togglebar text-start">바쁜 당신을 위한 결말요약 컨텐츠를 만나보세요! <v-icon>mdi-chevron-down</v-icon></b-button>
      </div>
      <b-collapse id="accordion-1" invisible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card class="review-list d-flex align-items-center text-white" >
              <div>
                <button @click="[videoOn(),toggle()]" class="fs-5 fw-bold mb-5 text-white" ><v-icon color=white >mdi-youtube</v-icon>
                  Video Play Button</button>
                <div v-if="show">
                <youtube-video
                :video="video"
                ></youtube-video>
                </div>
    
              </div>
              <div class="d-flex align-items-baseline mt-5">
                <v-icon color=white>mdi-comment-account</v-icon><h5 class="fw-bold">본자들's 코멘트</h5>
              </div>

              
                <v-card v-if="reviews.length"
                class="mx-auto"
                max-width="100%"
                tile
              >
                <v-list rounded>
                  <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(review, i) in reviews"
                      :key="i"
                    >
                      <!-- <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon> -->
                      <router-link class="text-decoration-none" :to="{ name: 'movieReview', params: { moviePk: review.movie.id, reviewPk: review.id }}">
                      <v-list-item-content>
                        <v-list-item-title v-text="review.title"></v-list-item-title>
                        <p>By {{ review.user.username }}</p>
                      </v-list-item-content>
                      </router-link>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <div v-else>' 지금은 리뷰가 없어요 '</div>

              <div class="d-flex justify-content-center">

                <router-link class="text-decoration-none" :to="{ name: 'reviewCreate', params: { moviePk } }">
                  <v-btn class="create-button">
                    
                  코멘트 작성하기
                  </v-btn>
                  </router-link>
              </div>
          </b-card>
        </b-card-body>
      </b-collapse>
    </div>
  </div>
</div>


  
  </div>
</template>

<script>
import YoutubeVideo from '@/components/YoutubeVideo.vue'
// const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
// const API_URL = 'https://www.googleapis.com/youtube/v3/search'

import axios from 'axios'
// import { mapGetters, mapActions } from 'vuex'
import { mapGetters } from 'vuex'


export default {
  name: 'ReviewList',
  components: { YoutubeVideo },
  // components: {ReviewDetailView},
  props: { reviews: Array,
           moviePk: Number,
           movie: Object },
  data() {
    return{
      show: true,
      video:{} ,
      selectedItem : 1
    }
  },
  methods:{
    videoOn() {
      const keyword = this.movie.title
       axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword} 결말포함&key=AIzaSyBDyQg-WIAdEM2CN0xBLWoMhSPzl_gtEOY`)
        .then(res => {
          console.log(res.data)

          // this.videos = res.data.items
          this.video = res.data.items[0]
          // console.log(this.videos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggle() {
      this.show = !this.show;
    }

  },
  // methods:{
  //   videoOn() {
  //     console.log(this.movie.title)

  //   }
  // },

  computed: {
    ...mapGetters(['movie']),
    },

  }

</script>

<style scoped>
.review-list {
  /* Rectangle 31 */

width: 100%;
height: auto;


background: linear-gradient(0deg, rgba(0, 53, 102, 0.6), rgba(0, 53, 102, 0.6)), linear-gradient(0deg, #003566, #003566), #003566;
border-radius: 27px;

 
}
.togglebar {
  /* Rectangle 37 */

  width: 100%;
  height: 50px;

  background: linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;
  border-radius: 21px;

}
.create-button {
  width: 600px;
}
</style>