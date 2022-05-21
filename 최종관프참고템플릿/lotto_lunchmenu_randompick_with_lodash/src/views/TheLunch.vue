<template>
  <div>
    <h1>점심 메뉴</h1>
    <button @click="pickLunchMenu">메뉴 추천</button>
    <p>{{ selectedMenu }}</p>

    <button @click="moveToLotto">로또 페이지로 이동</button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'TheLunch',
  data() {
    return {
      lunch: ['카레', '오믈렛', '피자'],
      selectedMenu: null,
    }
  },
  methods: {
    pickLunchMenu() {
      this.selectedMenu = _.sample(this.lunch)
    },
    moveToLotto() {
      this.$router.push({ name: 'lotto', params: { lottoNum: 6 }})
    }
  }
}
</script>

<style>

</style>