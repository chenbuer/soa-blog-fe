<template>
  <div id="indexNav">
    
  <!--Navigator部分-->
  <nav class="navbar navbar-default">
    <div class="container container-fluid">
      <!-- 这部分不要删掉。当手机上看的时候显示下拉的按钮 -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><router-link to="/" active-class="">陈不二的首页</router-link></li>
          <li><router-link to="/aboutMe">关于我</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="text-right"><router-link to="/Login">登录</router-link></li>
        </ul>
      </div>
    </div>
  </nav>

  </div>

</template>

<script>
export default {
  name: 'IndexNav'
}
</script>

<style scoped>
#login{
  text-align: right;
}
</style>
