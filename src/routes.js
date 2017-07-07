import DashView from './components/BE/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// 后台DashBoard的view
// import DashboardView from './components/BE/views/Dashboard.vue'
// import TablesView from './components/BE/views/Tables.vue'
// import TasksView from './components/BE/views/Tasks.vue'
// import SettingView from './components/BE/views/Setting.vue'
// import AccessView from './components/BE/views/Access.vue'
import ServerView from './components/BE/views/Server.vue'
// import ReposView from './components/BE/views/Repos.vue'
import BlogTable from './components/BE/views/BlogTable.vue'
import BlogDashBoard from './components/BE/views/BlogDashboard.vue'


// 前台的View
import BlogIndex from '@/components/FE/BlogIndex'
import AboutMe from '@/components/FE/AboutMe'
import Article from '@/components/FE/Article'
import BlogType from '@/components/FE/BlogType'

// Routes
const routes = [
  {
    path: '/',
    name: 'BlogIndex',
    component: BlogIndex
  },
  {
    path: '/aboutMe',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/page/:pageId',
    name:'blogIndex',
    component: BlogIndex
  },
  {
    path: '/article/:articleId',
    name:'article',
    component: Article
  },
  {
    path: '/type/:typeName',
    name:'blogType',
    component: BlogType
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/~',
    component: DashView,
    alias: '/zy',
    beforeEnter:(to,from,next)=>{
      if(window.sessionStorage.getItem('user')==="chenbuer"){//此处的权限控制写死，其实不合理
        next();
      }else{
        next('/Login');
      }      
    },
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: BlogDashBoard,
        name: 'BlogDashBoard',
        meta: {description: 'blog dashboard'}
      }, {
        path: 'blogs',
        component: BlogTable,
        name: 'BlogTable',
        meta: {description: 'List of My Blogs'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
