<template>
<div>
    <!-- <review-detail-view>

    </review-detail-view> -->
  <!-- Using modifiers -->

  <!-- Element to collapse -->

      <v-expansion-panels>
      <v-expansion-panel class=" togglebar text-start text-white " >
        <v-expansion-panel-header >
          바쁜 당신을 위한 결말요약 컨텐츠를 만나보세요!
        </v-expansion-panel-header >
        <v-expansion-panel-content class="review-list d-flex align-items-center" >
            <div class="m-3">
              <button @click="[videoOn(),toggle()]" class="fs-5 fw-bold" ><v-icon color=white >mdi-youtube</v-icon>
                Video Play Button</button>
              <div v-if="show">
              <youtube-video
              :video="video"
              ></youtube-video>
              </div>
              
                <div class="d-flex align-items-baseline">
                  <v-icon color=white>mdi-comment-account</v-icon><h5 class="fw-bold">본자들's 코멘트</h5>
                </div>

              
                <v-card
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
                       <router-link :to="{ name: 'movieReview', params: { moviePk: review.movie.id, reviewPk: review.id }}">
                      <v-list-item-content>
                        <v-list-item-title v-text="review.title"></v-list-item-title>
                        <p>By {{ review.user.username }}</p>
                      </v-list-item-content>
                           </router-link>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <div v-for="review in reviews" :key="review.pk">
                작성자: {{ review.user.username }}<br>
                <router-link :to="{ name: 'movieReview', params: { moviePk: review.movie.id, reviewPk: review.id }}">
                  제목: {{ review.title }}<br>
                </router-link>
                내용: {{ review.content }}
                {{ review.pk }}

              </div>
                <router-link :to="{ name: 'reviewCreate', params: { moviePk } }">New</router-link>
            </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>


 

 
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
       axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword} 결말포함&key=AIzaSyDrXj_IsXttED3r_OhxpC6BgLfLw_9yLgc`)
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

<style>
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
</style>