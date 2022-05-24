<template>
<div>
    <!-- <review-detail-view>

    </review-detail-view> -->
  <!-- Using modifiers -->
  <div class="d-flex">
  <b-button v-b-toggle.collapse-2 class=" togglebar text-start ">바쁜 당신을 위한 결말요약 컨텐츠를 만나보세요!</b-button>
  <v-icon large >mdi-chevron-down</v-icon>

  </div>
  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>
      <div class="review-list">
        <button @click="videoOn" >결말요약영상보기</button>
        <youtube-video
        :video="video"
        ></youtube-video>
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
      </b-card>
  </b-collapse>

 
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
      video:{} ,
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
  border: 1px solid blue;
}
.togglebar {
  /* Rectangle 37 */

  width: 100%;
  height: 50px;

  background: linear-gradient(0deg, #003566, #003566),linear-gradient(0deg, #003566, #003566), #003566;
  border-radius: 21px;

}
</style>