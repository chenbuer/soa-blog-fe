<template>
<div>
  <!--<search></search>-->

  <vuetable ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    :muti-sort="true"
    :item-actions="itemActions"
    pagination-path="" 
    @vuetable:pagination-data="onPaginationData"
  ></vuetable>

<div class="vuetable-pagination ui basic segment grid">
  <vuetable-pagination-info ref="paginationInfoTop"
    ></vuetable-pagination-info>
    <vuetable-pagination ref="paginationTop"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
 </div>
  <!--<vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage">
  </vuetable-pagination>-->
</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import config from '../../../config'
import {prettyDate} from '../../../filters'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Search from './forVueTable/Search'
import Crud from './forVueTable/Crud'

Vue.component('custom-actions',Crud)

export default {
  components: {
    Vuetable,VuetablePagination,VuetablePaginationInfo,Search
  },
  data(){
    return {
      fields:[
      // {
      //   name: '__checkbox',   // <----
      //   titleClass: 'center aligned',
      //   dataClass: 'center aligned'
      // },
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
        sortField: 'releaseDate',
        callback: 'prettyDate'
      },
      {
        name: '__component:custom-actions',   
        title: 'Actions',
        titleClass: 'center aligned',
        dataClass: 'center aligned'
      }],
      apiUrl:config.serverURI+"/admin/blogsWithPage",
      itemActions: [
	                { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
	                { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
	    ]
    }
  },
  methods: {
      viewProfile: function(id) {
          console.log('view profile with id:', id)
      },
      onPaginationData (paginationData) {
        // this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationTop.setPaginationData(paginationData)
        this.$refs.paginationInfoTop.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      prettyDate(time){
        return prettyDate(time)
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

<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>