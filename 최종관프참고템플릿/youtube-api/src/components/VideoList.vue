<template>
  <div class="col">
    <ul class="list-group">
      <video-list-item 
        v-for="(video, idx) in videos" 
        :key="idx"
        :video="video"
        @select-video="onSelectViedo"
        >
      </video-list-item>
    </ul>
  </div>
</template>

<script>
import VideoListItem from './VideoListItem.vue'

export default {
  name: 'VideoList',
  components: {
    VideoListItem,
  },
  props: {
    videos: Array
  },
  methods: {
    onSelectViedo(video) {
      this.$emit('select-video', video)
    }
  }

}
</script>

<style>

</style>