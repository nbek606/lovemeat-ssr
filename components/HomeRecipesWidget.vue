<template>
  <div class="content_layout">
    <h1 
      class="recipes_title global_title"
      v-if="parent"
    >
      {{ parent.title.rendered }}
    </h1>

    <RecipesList
      v-if="recipesList"
      :list="recipesList"
      :max="3"
    />
  </div>
</template>
<script>

/* import components */
import RecipesList from './RecipesList.vue'

export default {
  name: 'Recipes',
  components: {
    RecipesList
  },
  data () {
    return {
      recipesList: false,
      parent: false
    }
  },
  mounted() {
    this.getParent('receipes')
  },
  computed: {
    sortList () {
      return this.list.slice(0, 3)
    }
  },
  methods: {
    getParent(slug) {
      this.$pageApiService.getParentBySlug(slug).then((response) => {
        this.parent = response.data.find(item => item.slug == slug)
    
        if (!this.parent) {
          return false
        }
        this.getList(this.parent.id)
      })
    },
    getList (parentId) {
      this.$pageApiService.getPagesByParentId(parentId, 3).then((response) => {
        this.recipesList = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .recipes {
    display: flex;
    width: 100%;
    padding-bottom: 40px;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    &_item {
      width: calc(33% - 30px);
      border: 1px solid #6b6b6b;

      @media (min-width: 1024px) {

        &:nth-child(1n) {
          margin-right:45px;
        }

        &:nth-child(3n) {
          margin-right:0;
        }
      }

      @media (max-width: 1024px) {
        margin-top: 45px;
        width: 100%;

        &:nth-child(1) {
            margin-top: 0px;
        }
      }

      &-title {
        padding: 13px 0;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        color: #000000;
        transition: all 0.5s;

        &:hover {
          color: #810c0c;
        }
      }
      

      &-img{
       
      }
    }
  }

  img {
    width: 100%;
  }
</style>