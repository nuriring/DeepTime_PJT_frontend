<template>
  <li class="list-group-item" @click="selectedVideo">
    <img :src="imgSrc" alt="thumbnail">
    <!-- <span>{{ unEscapeString }}</span> -->
    <span>{{ video.snippet.title | unEscapeString }}</span>
  </li>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'VideoListItem',
  props: {
    video: Object
  },
  methods: {
    selectedVideo() {
      this.$emit('select-video', this.video)
    }
  },
  // data() {
  //   return {
  //     imgSrc: this.video.snippet.thumbnails.default.url
  //   }
  // },
  filters: {
    unEscapeString(rawText) {
      return _.unescape(rawText)
    }
  },
  computed: {
    imgSrc() {
      return this.video.snippet.thumbnails.default.url
    },
    // unEscapeString() {
    //   return _.unescape(this.video.snippet.title)
    // }
  }
}
</script>

<style>
.list-group-item {
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
  align-items: center;
}

.list-group-item:hover {
  background: #eee;
}

.list-group-item img {
  height: fit-content;
  margin-right: 0.5rem;
}

</style>