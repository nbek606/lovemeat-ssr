<template>
  <div class="blog_list">
      <BlogListItem
        v-for="item in sortList"
        :key="item.id"
        :blog="item"
      />
  </div>
</template>
<script>

/* import components */
import BlogListItem from '@/components/BlogListItem.vue'

export default {
  name: 'BlogList',
  components: {
    BlogListItem
  },
  props: {
    list: {
      type: [Object, Array, Boolean],
      required: true
    },
    max: {
      type: [Number, String],
      default: 'all'
    }
  },
  mounted () {
    
  },
  computed: {
    sortList () {
      if (this.max == 'all') {
        return this.list
      }
      
      return this.list.slice(0, this.max)
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .blog_list {
    display: flex;
    margin-bottom: 45px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
</style>