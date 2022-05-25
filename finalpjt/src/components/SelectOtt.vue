<template>
  <div>
    <div id="id1">
    <router-link :to="{ name: 'netflix' }">
      <img src="https://image.tmdb.org/t/p/w300/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg" alt="">
    </router-link>
    </div>
    <router-link :to="{ name: 'disneyPlus' }">
      <img src="https://image.tmdb.org/t/p/w300/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg" alt="">
    </router-link>
    <router-link :to="{ name: 'amazon' }">
      <img src="https://image.tmdb.org/t/p/w300/emthp39XA2YScoYL1p0sdbAH2WA.jpg" alt="">
    </router-link>
    <router-link :to="{ name: 'watcha' }">
      <img src="https://image.tmdb.org/t/p/w300/vXXZx0aWQtDv2klvObNugm4dQMN.jpg" alt="">
    </router-link>
    <router-link :to="{ name: 'wavve' }">
      <img src="https://image.tmdb.org/t/p/w300/2ioan5BX5L9tz4fIGU93blTeFhv.jpg" alt="">
    </router-link>
    <router-link :to="{ name: 'apple' }">
      <img src="https://image.tmdb.org/t/p/w300/6uhKBfmtzFqOcLousHwZuzcrScK.jpg" alt="">
    </router-link>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>