<template>
    <div class="custom-actions">
      <button class="ui basic button" @click="editBlog(rowData, rowIndex)"><i class="icon ion-edit"></i></button>
      <button class="ui basic button" @click="delBlog(rowData, rowIndex)"><i class="icon ion-trash-a"></i></button>


      <!-- Modal 模态框开始！！！！！！！！！！！！！ -->
      <modal title="Large Modal" large v-model="largeModal" @ok="largeModal = ok()">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title">修改文章</h4>
        </div>         
            <div class="modal-body text-left">
              <div class="form-group">
                <label>文章标题：</label>
                <input class="form-control" type="text" placeholder="请输入文章标题" v-model="title">
              </div>

              <div>
                <label>文章类型：</label>
                <br/>
                <b-form-select v-model="selected"
                              :options="blogTypes"
                              class="mb-3"
                ></b-form-select>
              </div>

              <label>正文：</label>
              <div class="quill-editor-example">
                <!-- quill-editor -->
                <quill-editor ref="myTextEditor"
                              v-model="content"
                              :options="editorOption"
                              id="quill">
                </quill-editor>
              </div>
            </div>

        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click="largeModal = false">取消</button>
          <button type="button" class="btn btn-success" @click="onUpdate()">保存</button>
        </div>
      </modal>
      <!-- Modal 模态框结束！！！！！！！！！！！！！ -->

    </div>
    
    
     
</template>

  <script>
  import { quillEditor } from 'vue-quill-editor'
  import api from '../../../../api'
import modal from 'vue-strap/src/Modal.vue'

  export default {
      components:{
        quillEditor,modal
      },
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    data() {
      return {
        largeModal: false,//上面三个是弹窗的时候用的
        selected: null,//这个是类型选择的时候用的
        blogId:0,
        name: 'base-example',
        editorOption: {
          placeholder: '请输入...'
        },
        title:'',
        content:'',
        blogTypes:[]
      }
    },
    methods: {
      ok () {
        return !confirm("Ok event.\nClose Modal?")
      },
      editBlog:function(rowData, rowIndex){
        var _this=this;
        this.blogId=rowData.id;
        api.request('get', '/article/'+this.blogId, null)
          .then(response => {
            // console.log(response.data.result);
            _this.title=response.data.result.title;
            _this.content=response.data.result.content;
            _this.selected=response.data.result.blogType.id;
          })
          .catch(error => {
            console.log(error);
          });
          this.largeModal  = true;
      },
      delBlog(rowData, rowIndex){
        var id=rowData.id;
        api.request('get', '/admin/blog/'+id+'/del',)
          .then(response => {
            console.log("del blog"+rowData.title+"SUCCESS");
            // this.$refs.vuetable.refresh();
            // this.$parent.refresh();
            console.log(this.$parent);
            this.$parent.reload();//在vutable-2项目中提的issue中有答案。
          })
          .catch(error => {
            console.log(error);
            alert("error");
          })
      },
      onUpdate(){
        var summary=this.$children[0].$children[1].quill.getText().substr(0, 155);      
        api.request('post', '/admin/save',{
          'id':this.blogId,
          'title':this.title,
          'content':this.content,
          'summary':summary,
          'typeId':this.selected,
          'keyWord':''
          })
        .then(response => {
          if(response.data.retCode==0){
            this.largeModal = false;
            alert("修改文章成功");
            this.$parent.reload();//在vutable-2项目中提的issue中有答案。
          }else{
            this.largeModal = false;
            alert("修改失败，内部错误。联系不二。");
          }
        })
        .catch(error => {
          this.largeModal = false;
          console.log(error);
          alert(error);
        });
        // showCustomModal = ok()
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted() {
      api.request('get', '/admin/blogsTypes',)
        .then(response => {
          this.blogTypes=response.data.result;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
  </script>

  <style scoped>
    .custom-actions button.ui.button {
      padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
      margin: auto !important;
    }
  </style>