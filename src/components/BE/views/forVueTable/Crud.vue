<template>
    <div class="custom-actions">
      <button class="ui basic button" @click="editBlog(rowData, rowIndex)"><i class="icon ion-edit"></i></button>
      <button class="ui basic button" @click="delBlog(rowData, rowIndex)"><i class="icon ion-trash-a"></i></button>
    </div>
  </template>

  <script>
  import api from '../../../../api'
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      editBlog:function(){

      },
      delBlog(rowData, rowIndex){
        var id=rowData.id;
        api.request('get', '/admin/blog/'+id+'/del',)
          .then(response => {
            console.log("del blog"+rowData.title+"SUCCESS");
            // this.$refs.vuetable.refresh();
            this.$parent.refresh();
          })
          .catch(error => {
            console.log(error);
            alert("error");
          })
      }
    }
  }
  </script>

  <style>
    .custom-actions button.ui.button {
      padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
      margin: auto !important;
    }
  </style>