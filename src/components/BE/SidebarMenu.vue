<template>
  <ul class="sidebar-menu">
    
    <li class="header">陈不二的博客</li>
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/~"><i class="icon ion-monitor"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/~/blogs"><i class="icon ion-clipboard"></i>
        <span class="page">博客列表管理</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/~/addBlog"><i class="icon ion-plus"></i>
        <span class="page">新增文章</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/~/editAboutMe"><i class="icon ion-person"></i>
        <span class="page">个人信息管理</span>
      </router-link>
    </li>
    <li class="header">登录登出</li>
    <li class="pageLink" v-on:click="logout">
      <router-link to="/~/Logout"><i class="icon ion-log-out"></i>
        <span class="page">登出</span>
      </router-link>
    </li>
 

 </ul>
    
</template>
<script>
export default {
  name: 'SidebarName',
  methods: {
    toggleMenu (event) {
      // remove active from li
      var active = document.querySelector('li.pageLink.active')

      if (active) {
        active.classList.remove('active')
      }
      // window.$('li.pageLink.active').removeClass('active')
      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    },
    logout(){
      window.sessionStorage.setItem("user",null);
      window.sessionStorage.setItem('token',null);
      this.$router.push("/");//动态设置跳转，其实用history对象也可以实现
    }
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
