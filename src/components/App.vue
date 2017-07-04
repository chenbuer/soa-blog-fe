<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.push('/login')
      }
    }
  }
</script>

<style>

.list-group-item {
  border: 0;
  margin: 0;
  padding: 0;
}
.panel-heading{
  text-align: center;
  font-size: 250%;
}
.panel-footer{
  text-align: center;
  
}
</style>
