<template>
  <div>
    <h1>{{ profile.username }}</h1>

    <h2>{{ profile.username }} 님이 쓴 게시글</h2>
    <ul>
      <li v-for="article in profile.articles" :key="article.pk">
        <router-link :to="{ name: 'article', params: { articlePk: article.pk } }">
          {{ article.title }}
        </router-link>
      </li>
    </ul>

    <h2>{{ profile.username }} 님이 쓴 댓글</h2>
    <ul>
      <li v-for="comment in profile.commnets" :key="comment.pk">
        <router-link :to="{ name: 'article', params: { articlePk: comment.article.pk } }">
          {{ comment.content }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>
