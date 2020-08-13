<template>
    <v-app>
      <v-list-item-title class="mt-16 text-h1" >欢迎来到测试课堂</v-list-item-title>
    </v-app>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'home',
    data() {
      return {

      }
    },
    methods: {
      click () {
        let self = this
        self.$router.push({name: 'statistics'})
      },
      click1 () {
        let self = this
        self.$notify.success("你好")
        Vue.prototype.$notify.success("你好")
      }

    }
  }
</script>

<style scoped>
  .box {
    width: 90%;
  }
</style>
