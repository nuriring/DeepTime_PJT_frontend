<template>
<div class="d-flex justify-content-center mt-3">
  <div class="video-detail" v-if="video">
    <div class="video-container">
      <iframe :src="videoURI" frameborder="0"></iframe>
    </div>

    <div class="detail">
      <h5>{{ video.snippet.title | unEscapeString }}</h5>
      <!-- <p>{{ video.snippet.description | unEscapeString }}</p> -->
      By " {{ video.snippet.channelTitle }} "
      <!-- <p>{{ video.statistics.viewCount }}</p> -->
      <p>
      </p>
    </div>
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

<style scoped>
 .video-detail {
    width: 100%;
    padding-right: 1rem;
  }

  .video-container {
    position: relative;
    padding-top: 56.25%;
  }

  .video-container > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .detail {
    margin-top: 20px;
    padding: 20px;
    border: solid 1px lightgray;
    border-radius: 10px;
  }
</style>