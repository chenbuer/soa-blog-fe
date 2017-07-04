import DashView from './components/BE/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/BE/views/Dashboard.vue'
import TablesView from './components/BE/views/Tables.vue'
import TasksView from './components/BE/views/Tasks.vue'
import SettingView from './components/BE/views/Setting.vue'
import AccessView from './components/BE/views/Access.vue'
import ServerView from './components/BE/views/Server.vue'
import ReposView from './components/BE/views/Repos.vue'

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
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers'}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
