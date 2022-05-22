<template>
  <div>
    <h1>Signup</h1>

    <account-error-list v-if="authError"></account-error-list>

    <form @submit.prevent="signup(credentials)">
      <div>
        <label for="username">Username: </label>
        <input  v-model="credentials.username" type="text" id="username" required/>
      </div>
      <div>
        <label for="password1">Password: </label>
        <input v-model="credentials.password1" type="password" id="password1" required />
      </div>
      <div>
        <label for="password2">Password Confirmation:</label>
        <input v-model="credentials.password2" type="password" id="password2" required />
      </div>
      <div>
        선호하는 장르 :
        <select v-model="credentials.genre" name="genre" id="">           
          <option value="">장르선택</option>
          <option value="12">모험</option>
          <option value="28">액션</option>
          <option value="16">애니메이션</option>
          <option value="35">코미디</option>
          <option value="80">범죄</option>
          <option value="99">다큐멘터리</option>
          <option value="18">드라마</option>
          <option value="10751">가족</option>
          <option value="14">판타지</option>
          <option value="36">역사</option>
          <option value="27">공포</option>
          <option value="10402">음악</option>
          <option value="9648">미스터리</option>
          <option value="10749">로맨스</option>
          <option value="878">SF</option>
          <option value="10770">TV영화</option>
          <option value="53">스릴러</option>
          <option value="10752">전쟁</option>
          <option value="37">서부</option>
        </select>
      </div>
      <div>
        <button>Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'SignupView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password1: '',
          password2: '',
          genre: ''
        }
      }
    },
    computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['signup'])
    },
  }
</script>

<style></style>
