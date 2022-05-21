<template>
  <!-- template 안에는 반드시 하나의 Element만 있어야 한다..  -->
  <!--만들 때부터 div 하나 써놓기-->
  <div>
    <h1>{{ myMessage }}</h1> <!--props로 받으면 data에 안넣고도 바로 쓸 수 있음 -->
    <p>아하! div는 하나구나</p>
    <input 
      type="text"
      v-model="childInputData"
      @keyup.enter="childInputChange"
    >
  </div>

</template>

<script>
export default {
  name: 'TheAbout', //태그 이름
  props: {
    myMessage: String, //주의 넘길때는 케밥인데 받을 때는 카멜 , 자식에다가 부모님이 보내준것을 감사히 잘 받겠다고 props를 쓰네, 자료형 꼭 써주기
  },
  data: function () {
    return {
      childInputData: ''
    }
  },

  methods: {
    childInputChange: function () {
      console.log('Child!!', this.childInputData)
      // 부모 컴포넌트에게 1번인자 라는 이름의 이벤트를 발생 + 2번인자 데이터를 보냄
      this.$emit('child-input-change', this.childInputData)
      //만약에 2번인자에서 데이터 여러개 넘기고 싶으면
      const data = {
        inputData: this.inputData // 이런식으로 context 처럼 묶어서 보내기
      }
    }
  },
}
</script>

<style>

</style>
