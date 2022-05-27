<template>
  <div class="review">
    <BasePage>
      <div class="content_layout">
        <h1 class="global_title">Отзывы</h1>
        
        <div class="review_block">
          <div 
            class="review_block-item"
            v-for="item in sortList"
            :key="item.id"
          >
            <div class="review_block-item-icon">
              <img :src="require(`@/assets/icons/png/quote.png`)" />
            </div>

            <div class="review_block-item-text">
              <div class="header">
                {{ item.header }}
              </div>
              <div class="text">
                {{ shortText(item.content) }}..
                <span 
                  class="review_url"
                  @click="sendPage"
                >
                  Подробнее
                </span>
              </div>

              <div class="create_data">
                <div class="name">
                  {{ item.name }}
                </div>

                <div class="date">
                  {{ item.created_date }}
                </div>
              </div>

            </div>
          </div>
        </div>

      <div 
        class="review_all-link"
        @click="sendPage"
      >
        Все отзывы
      </div>
      </div>
    </BasePage>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { RouteName } from '../router/utils'

/* import components */
import BasePage from './BasePage.vue'

export default {
  name: 'HomeReviewWidget',
  components: {
    BasePage
  },
  data () {
    return {
      list: [],
      slug: 'reviews'
    }
  },

  mounted () {
    this.getList()
  },

  computed: {
    ...mapGetters({
      getReviewList: 'review/getReviewList'
    }),

    sortList() {
      if (this.list.length == 0) {
        return false
      }

      return this.list.slice(0, 2)
    },
  },
  methods: {
    getList () {
      
      if (this.getReviewList.length > 1) {
        this.list = this.getReviewList
      }

      this.$pageApiService.getParentBySlug(this.slug).then((response) => {
        const review = response.data.find(item => item.slug == this.slug)
        this.list = this.$reviewService.getReviews(review)
        this.$store.dispatch('review/reviewList', this.list)
      })
    },

    shortText (text) {
      return text.slice(0, 200)
    },
    sendPage () {
      this.$productService.scrollPageTop('scroll_top')
      this.$router.push({
        name: RouteName.Reviews
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .review {
    background-color: #e8e6e6;
    width: 100%;
    padding: 30px 0;
    box-sizing: border-box;

    &_all-link {
      text-decoration: underline;
      padding: 20px 0px;
      cursor: pointer;
      font-weight: 600;
      color: #6b6b6b;
      box-sizing: border-box;

      transition: all 0.5s;

      &:hover {
        color: #810c0c;
      }
    }

    &_block {
      width: 100%;
      display: flex;
       box-sizing: border-box;

      @media (max-width: 600px) {
        flex-direction: column;
      }


      &-item {
        width: calc(50% - 22.5px);
        background-color: #fff;
        padding: 40px 30px;
        position: relative;
        display: flex;
        box-sizing: border-box;

        @media (max-width: 600px) {
          width: 100%;
          margin-top: 45px;

          &:nth-child(1) {
            margin-top: 0px;
          }
        }


        @media (min-width: 600px) {
          &:nth-child(1) {
            margin-right:45px;
          }
        }

        &-icon {
          width: 20px;
          min-width: 20px;
          transform: translate(-90deg);
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          margin-right: 5px;
          position: relative;
          margin-top: -15px;
        }

        .name {
          margin-top: 30px;
          font-weight: 600;
          color: #1f1f1f;
        }

        .date {
          margin-top: 10px;
          color: #6b6b6b;
        }

        .text {
          min-height: 100px;
          margin-bottom: 60px;
        }

        .header {
          font-weight: 600;
          padding-bottom: 20px;
        }

        .create_data {
          position: absolute;
          bottom: 40px;
        }

        .review_url {
          text-decoration: underline;
          color: #000000;
          cursor: pointer;

          transition: all 0.5s;

          &:hover {
            color: #810c0c;
          }
        }
      }
    }
  }

  img {
    width: 100%;
  }
</style>