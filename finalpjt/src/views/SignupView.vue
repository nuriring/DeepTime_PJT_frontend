<template>
  <div>
    
    <v-container>
      <h1>Signup</h1>
      <account-error-list v-if="authError"></account-error-list>
      <v-form
        @submit.prevent="signup(credentials)"
      >
        <v-text-field
          v-model="credentials.username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="credentials.password1"
          type="password"
          label="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="credentials.password2"
          type="password"
          label="password"
          required
        ></v-text-field>

        <v-select
          v-model="credentials.genre"
          :items="genreList"
          item-text="cont"
          item-value="sub"
          label="Genre"
          required
        ></v-select>
        <!-- <button class="mr-4 is-elevated has-bg theme--light v-size--default success">Signup</button> -->
        <b-button type="submit" class="success">SIGNUP</b-button>

        

      

      
      </v-form>
    </v-container>
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
          genre: null,
          },
        genreList : [
          {sub: "12", cont: "모험"},
          {sub: "28", cont: "액션"},
          {sub: "16", cont: "애니메이션"},
          {sub: "35", cont: "코미디"},
          {sub: "80", cont: "범죄"},
          {sub: "99", cont: "다큐멘터리"},
          {sub: "18", cont: "드라마"},
          {sub: "10751", cont: "가족"},
          {sub: "14", cont: "판타지"},
          {sub: "36", cont: "역사"},
          {sub: "27", cont: "공포"},
          {sub: "10402", cont: "음악"},
          {sub: "9648", cont: "미스터리"},
          {sub: "10749", cont: "로맨스"},
          {sub: "878", cont: "SF"},
          {sub: "10770", cont: "TV영화"},
          {sub: "53", cont: "스릴러"},
          {sub: "10752", cont: "전쟁"},
          {sub: "37", cont: "서부"}
          ]
        
      }
    },
    computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['signup'])
    },
    created() {
    }
  }
  
</script>


<style></style>
