<template>
<div>
  
      <form @submit.prevent="onSubmit">
        <label for="review-title">title </label>
        <input type="text" id="review-title" v-model="title" required placeholder="제목을 입력하세요">
        <label for="review-content">content </label>
        <input type="text" id="review-content" v-model="content" required placeholder="내용을 입력하세요">
        <div class=" d-flex buttons">
        <button class="on" @click="success">create</button>
        <router-link  :to="{ name: 'movieDetail', params: {moviePk: moviePk} }" class="text-decoration-none ms-3">
          <button class="on">
            back
          </button>
        </router-link>
        </div>
      </form>



</div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewForm',
  data() {
    return {
      title: '',
      content: '',
      moviePk: this.$route.params.moviePk,
    }
  },
  computed: {
    ...mapGetters(['movie']),
  },
  methods: {
    ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ moviePk: this.movie.id, title: this.title, content: this.content, })
      console.log(this.movie)
      this.title = ''
      this.content = ''
    },
    success() {
      alert('리뷰가 성공적으로 작성되었습니다!')
    }
  },
 //새로고침했을 때 영화 정보 사라짐..억까야 억까 새로고침하지마
}
</script>

<style scoped>
  .review-list-form {
    border: 1px solid black;
    margin: 1rem;
    padding: 1rem;
    
  }
  #review-title{
    /* Rectangle 38 */
    font-size: 1.5rem;
    
    height: 94px;
    padding: 3px;
    opacity: 90%;
    background: linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;
    border-radius: 10px;
    width: 110%;

  }
  #review-content{
    /* Rectangle 36 */
  font-size: 1.5rem;
  padding: 3px;
  width: 110%;
  height: 150px;
  opacity: 90%;

  background: linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;
  border-radius: 10px;
  margin-bottom: 20px;

}
.on{
  background: #FFD60A;
      text-decoration: none;
      font-size: 1.8rem;
      display : inline-block;
      border-radius: 10px;
      padding: 5px 3px 10px 4px;
      transition: all 0.1s;
      height: 55px;
      width: 100px;
      color: #001D3D;

}
  .on:active{
      transform : translateY(3px);
  }
  .buttons {
    margin-left: 370px;
    text-align: end;
  }
input::placeholder {
  color: black;
 
}
textarea::placeholder {
  color: black;
 
}

</style>