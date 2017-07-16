<template>
<div class="container-fluid">

  <div class="panel panel-default" style="border: none;">
  <div class="panel-heading" style="height:10em;border:none;background-color:#ffffff" ></div>
  <div class="panel-body">
    <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">登录</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
  </div>
</div>


          
</div>
</template>

<script>
import api from '../api'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      const {username, password} = this

      this.toggleLoading()
      this.resetResponse()
      // this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api.request('post', '/login', {'userName':username, 'password':password})
      .then(response => {
        this.toggleLoading()

        var data = response.data


        /* Checking if error object was returned from the server */
        // if (data.error) { // 收到响应了，但是相应结果是不对的
        //   var errorName = data.error.name
        //   if (errorName) {
        //     this.response = errorName === 'InvalidCredentialsError'
        //     ? 'Username/Password incorrect. Please try again.'
        //     : errorName
        //   } else {
        //     this.response = data.error
        //   }

        //   return
        // }

        /* Setting user in the state and caching record to the localStorage */
        // if (data.user) { // 鉴权成功，存到vuex和localstorage
        //   var token = 'Bearer ' + data.token

        //   this.$store.commit('SET_USER', data.user)
        //   this.$store.commit('SET_TOKEN', token)

        //   if (window.localStorage) {
        //     window.localStorage.setItem('user', JSON.stringify(data.user))
        //     window.localStorage.setItem('token', token)
        //   }

        //   this.$router.push(data.redirect)
        // }
        if(0==data.retCode){//表示登录成功
          var token = 'Bearer ' + data.result.password;//将'Bearer ' 加上用户加密之后的密码作为的token

          // this.$store.commit('SET_USER', data.result.userName)
          // this.$store.commit('SET_TOKEN', token)

          if (window.localStorage) {
            // window.localStorage.setItem('user', data.result.userName)
            // window.localStorage.setItem('token', token)
            window.sessionStorage.setItem('user', data.result.userName)
            window.sessionStorage.setItem('token', token)
          }

          this.$router.push('/~') // 登录成功之后跳转到后台界面

        }else{//表示登录失败
            this.response = '用户名或密码错误，请重新登录.'
        }
        console.log(data);
      })
      .catch(error => {
        // this.$store.commit('TOGGLE_LOADING')
        console.log(error)

        this.response = '服务器似乎不在线'
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? '正在登录...' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>