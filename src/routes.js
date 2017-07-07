import DashView from './components/BE/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// 后台DashBoard的view
import EditAboutMe from './components/BE/views/EditAboutMe.vue'
import BlogTable from './components/BE/views/BlogTable.vue'
import BlogDashBoard from './components/BE/views/BlogDashboard.vue'
// import BlogEditor from './components/BE/views/Editor.vue'


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
        meta: {description: '博客网站的dashboard'}
      }, {
        path: 'blogs',
        component: BlogTable,
        name: 'BlogTable',
        meta: {description: '博文列表'}
      }, {
        path: 'editAboutMe',
        component: EditAboutMe,
        name: 'EditAboutMe',
        meta: {description: '修改博主信息'}
      }, 
      // {
      //   path: 'editor',
      //   component: BlogEditor,
      //   name: 'BlogEditor',
      //   meta: {description: 'Edit Blog'}
      // }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
