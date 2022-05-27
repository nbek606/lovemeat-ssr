<template>
<div>
  <div class="search">
    <input
      placeholder="Поиск"
      class="search_input"
      v-model="searchText"
    />
    <span
      class="search_icon material-icons"
      @click="sendSearchPage"
    >
      search
    </span>
  </div>
  <SearchList key="desktop"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '@/router/utils'
import SearchList from './SearchList.vue'

export default {
  components: { SearchList },
  name: 'Search',
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters({
      loader: 'getSearchLoader'
    })
  },
  watch: {
    searchText: {
      handler (val){
        if (val) {
          this.$store.dispatch('search/searchText', this.searchText)
        }
      }
    }
  },
  methods: {
    sendSearchPage () {
      if (this.$route.name != RouteName.Search) { 
        this.$router.push({
          name: RouteName.Search
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .search {
    position: relative;

    &_input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #dadada;
      width: 450px;
      color: #6b6b6b;
      font-size: 16px;
      box-sizing: border-box;
      outline: none;
    }

    &_icon {
      position: absolute;
      margin-left: -40px;
      color: #6b6b6b;
      font-size: 30px;
      line-height: 42px;
      cursor: pointer;
    }
 }
</style>