<template>
  <v-container>
    <div class="d-flex justify-content-center">

      <router-link :to="{ name: 'netflix' }">
        <img class="netflix" id="id2" src="https://image.tmdb.org/t/p/w300/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg" alt="">
      </router-link>
      
      <router-link :to="{ name: 'disneyPlus' }">
        <img class="disneyplus" id="id2" src="https://image.tmdb.org/t/p/w300/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg" alt="">
      </router-link>
      <router-link :to="{ name: 'amazon' }">
        <img class="amazon" id="id2" src="https://image.tmdb.org/t/p/w300/emthp39XA2YScoYL1p0sdbAH2WA.jpg" alt="">
      </router-link>
      <router-link :to="{ name: 'watcha' }">
        <img class="watcha" id="id2" src="https://play-lh.googleusercontent.com/vAkKvTtE8kdb0MWWxOVaqYVf0_suB-WMnfCR1MslBsGjhI49dAfF1IxcnhtpL3PnjVY" alt="">
      </router-link>
      <router-link :to="{ name: 'wavve' }">
        <img class="wavve" id="id2" src="https://image.tmdb.org/t/p/w300/2ioan5BX5L9tz4fIGU93blTeFhv.jpg" alt="">
      </router-link>
      <router-link :to="{ name: 'apple' }">
        <img class="apple" id="id2" src="https://image.tmdb.org/t/p/w300/6uhKBfmtzFqOcLousHwZuzcrScK.jpg" alt="">
      </router-link>
    </div>

  </v-container>

  
</template>

<script>
export default {

}
</script>

<style scoped>
#id1 {
  max-height: 900px;
  max-width: 100px;
}
#id2 {
  max-height: 100px;
  max-width: 100px;
  object-fit: cover;
  border-radius: 30%;
  margin-right: 10px;
}
.netflix:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
.disneyplus:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
.amazon:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
.watcha:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
.wavve:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
.apple:hover {
  transform: scale(1.1);
  transition: 100ms ease-in;
}
div {
  font-family: 'Gowun Batang', serif;
}


</style>
