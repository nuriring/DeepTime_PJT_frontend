<template>
  <div>
    <h1>user profile</h1>
    <p>
      당신의 id는 {{ user.userId }} <!--route로 url에 있던 userid 정보를 뽑아왔으니까 이렇게 쓸수있음-->
      당신의 이름은 {{ user.username }}
      전공은 {{ user.major }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data: function () {
    return {
      user: this.$route.params,
    }
  }
}
</script>

<style>

</style>
