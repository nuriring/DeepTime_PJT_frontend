<template>
  <input 
    class="search-bar"
    :style="{ margin: videosLength ? '0': '40vh 0'}"
    type="text" @keyup.enter="onInputSearch"
  >
</template>

<script>
export default {
  name: 'TheSearchBar',
  props: {
    videosLength: Number
  },
  methods: {
    onInputSearch(event) {
      // console.log(event.target.value)
      this.$emit('input-search', event.target.value)
    }
  }
}
</script>

<style>
  .search-bar {
    transition: margin 5s;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
  }
</style>