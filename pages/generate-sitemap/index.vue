<template>
  <div class="generate_sitemap">
    <PageNotFound />

    <div class="get_xml">
      <button 
        class="get_xml-button"
        @click="sitemap = !sitemap"
      >
        Получить карту сайта
      </button>
    </div>
    <b-textarea
      v-model="data"
      v-if="sitemap"
    >
      
    </b-textarea>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PageNotFound from '@/components/PageNotFound.vue'

export default {
  name: 'GenerateSitemap',
  components: {
    PageNotFound
  },
  data () {
    return {
      data: '',
      sitemap: false
    }
  },
  mounted () {
    this.generate()
  },

  computed: {
    ...mapGetters({
      getCategories: 'product/getCategories'
    })
  },
  methods: {
    generate () {
      this.$siteMapService.getXmlFile('https://back.lovemeat.ru/sitemap.xml', this.getCategories).then(response => {
        this.data = response
      })

    }
  }
}
</script>
<style lang="scss" scoped>
  .generate_sitemap {
    textarea {
       width: 100%;
      height: 500px;
    }
  }
  
  .get_xml {
    width: 100%;
    display: flex;
    padding: 40px 0;
  }

  .get_xml-button {
    padding: 10px 20px;
    border:none;
    color: #fff;
    background-color: #7e7e7e;
    border-radius: 10px;
    margin: auto;
    cursor: pointer;
  }
</style>