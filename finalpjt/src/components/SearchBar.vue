<template>
  <input 
    class="search-bar"
    type="text" @keyup.enter="onInputSearch"
  >
</template>

<script>
export default {
  name: 'TheSearchBar',
  methods: {
    onInputSearch(event) {
      console.log(event.target.value)
      this.$emit('input-search', event.target.value)
    }
  }
}
</script>

<style>

  input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
    padding: 0.5rem;
    font-size: 2rem;
  }
</style>