<template>
  <div id="app">
      {{num}}
      {{x}}
      99999999999
      <div @click="open">
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
  },
  methods:{
      open(){
          api.openWin({
            name: 'page1',
            url: '../pageExample/index.html',
            pageParam: {
                name: 'test'
            },
            animation:{
                type:"movein",                //动画类型（详见动画类型常量）
                subType:"from_right",       //动画子类型（详见动画子类型常量）
                duration:1000                //动画过渡时间，默认300毫秒
            }
        })
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
