 <template>
    <div class="filter-bar ui basic segment grid">
      <div class="ui form">
        <div class="inline field">
          <label>搜索:</label>
          <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="filter">
          <button class="btn btn-primary" @click="doFilter">走你</button>
          <button class="btn btn-danger" @click="resetFilter">重置</button>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        filterText: ''
      }
    },
    methods: {
      doFilter () {
        console.log('doFilter:', this.filterText)
      },
      resetFilter () {
        this.filterText = ''
        console.log('resetFilter')
      }
    }
  }
</script>