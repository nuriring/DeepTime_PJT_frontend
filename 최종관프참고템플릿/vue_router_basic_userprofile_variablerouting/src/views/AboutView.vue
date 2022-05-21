<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="moveToHome">To Home</button>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  methods: {
    moveToHome() {
      // this.$router.push({ name: 'home' }) //프로그래밍으로 움직일 수 있음 버튼을 눌렀을 때 home으로 이동

    }
  }
}
</script>

<style>

</style>
