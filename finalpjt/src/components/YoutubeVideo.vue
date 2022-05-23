<template>
  <div class="video-detail" v-if="video">
    <div class="video-container">
      <iframe :src="videoURI" frameborder="0"></iframe>
    </div>

    <div class="detail">
      <h2>{{ video.snippet.title | unEscapeString }}</h2>
      <p>{{ video.snippet.description | unEscapeString }}</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "YoutubeVideo",
  props: {
    video: Object
  },
   computed: {
    videoURI() {
      // const videoId = this.video.id.videoId
      const { videoId } = this.video.id
      return `https://www.youtube.com/embed/${videoId}`
    }
  },
  filters: {
    unEscapeString(rawText) {
      return _.unescape(rawText)
    }
  },

}
</script>

<style>

</style>