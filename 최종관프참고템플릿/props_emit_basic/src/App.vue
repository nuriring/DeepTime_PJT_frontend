<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 3. 보여주기 (print) 2가지방식이 있음 -->
    <!-- 카멜 케이스 -->
    <!-- <TheAbout my-message="parentData"/> -->
    <!-- 케밥 케이스 -->
    <the-about 
      :my-message="parentData" 
      @child-input-change="parentGetChange"
    ></the-about>
    <!--자식에서 보낸걸 듣는 귀라고 생각-->
  </div>
</template>

<script>
// 1. 불러오기 (import)
import TheAbout from './components/TheAbout.vue' //import 뒤에 이름은 내가 지어주는대로 as의 역할

export default {
  name: 'App',
  // 2. 등록하기 (register)
  components: {
    TheAbout,
  },
  data: function () {
    return {
      parentData: 'This is parent data to child component'
    }
  },
  methods: {
    parentGetChange: function (inputData) {
      console.log('Boss: 들리는군..', inputData) //자식에서 보낸 2번의 데이터 인자가 함수 안으로 자동으로 들어오기 때문에 인자로 추가해주면됨
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
