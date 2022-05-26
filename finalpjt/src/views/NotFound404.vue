<template>
  <div class="wrapper">
    <!-- <img class="not-found" src="@/assets/404.jpg" alt="not-found"> -->
    <div class="content text-white text-center">
      <h1>404 Not Found</h1>
      <h3>'해당 페이지는 찾을 수 없습니다'</h3>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound404',
  }
</script>

<style>
  img.not-found {
    width: 100%;
  }
      .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #001D3D;
  }


  .content {
    font-size: 2rem; 
    padding: 3rem;
    border-radius: 1rem;
    background: #001D3D;
  }
</style>
