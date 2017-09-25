<template>
  <div id="app">
      {{num}}
      {{x}}
      99999999999
      <div>
          asdasdasd
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){

  },
  computed:{
      num(){
          return 888
      },
      x(){
          return 'svgsdfbs'
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
