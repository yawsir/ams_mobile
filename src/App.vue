<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 12px;
}
</style>
<script>
export default {
  created(){
    let dpr = window.devicePixelRatio
    let meta = document.querySelector('meta[name=viewport]')
    meta.setAttribute('content', `width=device-width,inital-scale=${1/dpr},user-scalable=no`)
    //document.documentElement.style.fontSize = window.innerWidth / 1080 * 100 + 'px'
    document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px'
  }
}
</script>
