<template>
<div>
  <search></search>
  <vuetable ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    :muti-sort="true"
    :item-actions="itemActions"
  ></vuetable>
   <vuetable-pagination ref="pagination"></vuetable-pagination>
   </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import config from '../../../config'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import Search from './forVueTable/Search'
import Crud from './forVueTable/Crud'

Vue.component('custom-actions',Crud)

export default {
  components: {
    Vuetable,VuetablePagination,Search
  },
  data(){
    return {
      fields:[
      {
        name: '__checkbox',   // <----
        titleClass: 'center aligned',
        dataClass: 'center aligned'
      },
      {
        name:"title",
        sortField: 'title',
      },
      {
        name:"summary",
        sortField: 'summary'
      },
      {
        name: 'blogType.typeName',
        sortField: 'blogType',
        title: 'blogType'
      },
      {
        title: 'releaseDate',
        name:"releaseDate",
        sortField: 'releaseDate'
      },
      {
        name: '__component:custom-actions',   // <----
        title: 'Actions',
        titleClass: 'center aligned',
        dataClass: 'center aligned'
      }],
      apiUrl:config.serverURI+"/admin/blogsWithPage?pageId=2",
      itemActions: [
	                { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
	                { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
	                { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
	    ]
    }
  },
  methods: {
      viewProfile: function(id) {
          console.log('view profile with id:', id)
      }
  },
  events: {
      'vuetable:action': function(action, data) {
          console.log('vuetable:action', action, data)
          if (action == 'view-item') {
              this.viewProfile(data.id)
          }
      },
      'vuetable:load-error': function(response) {
          console.log('Load Error: ', response)
      }
  }
}
</script>