<template>
  <div id="app">
    <header>
      <h1>My First Youtube Project</h1>
      <the-search-bar @input-search="onInputSearch" :videosLength="videos.length"></the-search-bar>
    </header>

    <section>
      <!-- 상세 영상 정보 -->
      <video-detail :video="selectedVideo"></video-detail>

      <!-- 영상 목록 -->
      <video-list
        :videos="videos"
        @select-video="onSelectVideo"
      ></video-list>
    </section>
  </div>
</template>

<script>
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
const API_URL = 'https://www.googleapis.com/youtube/v3/search'


import axios from 'axios'
import TheSearchBar from './components/TheSearchBar.vue'
import VideoList from './components/VideoList.vue'
import VideoDetail from './components/VideoDetail.vue'

export default {
  name: 'App',
  components: {
    TheSearchBar,
    VideoList,
    VideoDetail
  },
  data() {
    return {
      searchKeyword: null,
      videos: [],
      selectedVideo: null,
    }
  },
  methods: {
    onInputSearch(keyword) {
      this.searchKeyword = keyword
      const params = {
        part: 'snippet',
        type: 'video',
        key: API_KEY,
        q: this.searchKeyword
      }
      axios.get(API_URL,{params})
        .then(res => {
          // console.log(res.data)

          this.videos = res.data.items
          this.selectedVideo = this.videos[0]
          // console.log(this.videos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSelectVideo(video) {
      this.selectedVideo = video
    }
  }
}
</script>

<style>
header,
section {
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
}

section {
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
