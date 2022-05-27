<template>
  <div 
    class="slider"
  >
      <div 
        class="slider_image"
        v-for="(item, index) in images"
        :class="{'slider_active': item.name == activeSlide}"
        :key="index"
      >
        <div 
            class="slider_arrows"
        >
          <div 
            class="slider_arrows_prev"
            @click="changePrevNext(index, 'prev')"
          >
            <span class="material-icons">
              arrow_forward_ios
            </span>
          </div>
          <div 
            class="slider_arrows_next"
            @click="changePrevNext(index, 'next')"
          >
            <span class="material-icons">
              arrow_forward_ios
            </span>
          </div>
        </div>

          <img 
            :src="require(`@/assets/images/${item.src.desktop}`)" 
            class="slider_image-desktop"
            v-if="!displayMobileSize"
          />
          
          <img 
            :src="require(`@/assets/images/${item.src.mobile}`)" 
            class="slider_image-mobile"
            v-else
          />

          <!--title-->
          <div 
            class="slider_title"
            v-if="item.isTitle"
          >
            <div class="slider_image-title-top">
              {{ item.title.top }}
            </div>

            <div class="slider_image-title-bottom">
              {{ item.title.bottom }}
            </div>
          </div>

          <!---list-->
          <div 
            class="slider_list"
          >
            <div 
              class="slider_list-item"
              :class="{ 'slider_list-item-active': item.name == activeSlide}"
              v-for="(item, index) in images"
              :key="index"
              @click="changeImage(item.name)"
            >
              
            </div>
          </div>
        </div>
       
        <!--картинка бонуса--->
        <div 
          class="slider_bonus"
        >
          <img
            :src="require(`@/assets/images/${images[0].src.desktop}`)"
            class="slider_image-desktop"
          >
        </div>
  </div>
</template>
<script>
export default {
  name: 'SliderTest',
  data () {
    return {
      activeSlide: 'bonus',
      activeIndex: 0,
      first: 0,
      displayMobileSize: false,
    }
  },
  props: {
    images: {
      type: [Object, Array, Boolean],
      required: true
    },
    effect: {
      type: String,
      default: 'fade'
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    size () {
      return this.images.length
    }
  },

  mounted () {
    this.changeImageInterval()
    this.examinationSizeDisplay()
    this.activeSlide = this.images[0]?.name
  },

  methods: {
    changeImageInterval () {
        setInterval(() => {
          this.changePrevNext(this.activeIndex, 'next')
        }, 10000);
    },
    
    changeImage (name) {
      this.activeSlide = name
    },

    changePrevNext (index, direct) {

      if (direct == 'next') {
        let item = this.images[index + 1]
        this.activeIndex = index + 1
        
        if (item == undefined) {
          item = this.images[0]
          this.activeIndex = 0
        }

        this.activeSlide = item.name
      } else {
        let item = this.images[index - 1]
        this.activeIndex = index - 1
        
        if (item == undefined) {
          item = this.images[this.size - 1]
          this.activeIndex = this.size - 1
        }

        this.activeSlide = item.name
      }
    },

    examinationSizeDisplay () {
      var maxWidth = window.matchMedia("(max-width: 500px)")
      
      this.displayMobileSize = maxWidth.matches ? true : false
    }
  }
}
</script>
<style lang="scss" scoped>
  .slider {
    width: 100%;
    position: relative;
    height: 100%;
    min-height: 200px;

    &_image-mobile {
      @media(min-width: 500px) {
        display: none;
      }
    }

    &_image-desktop {
      @media(max-width: 500px) {
        display: none;
      }
    }


    @media (min-width: 1650px) {
      min-width:900px;
    }

    &_bonus-active {

      @media(max-width: 750px) {
        min-height: 200px;
      }
    }
    
    &_title {
      height: 100%;
      position: absolute;
      top: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &_arrows {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: #fff;
      font-size: 30px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      align-items: center;
      z-index: 2;
      
      @media (max-width: 500px) {
        margin-top: 45px;
      }


      &_prev, &_next {
        background-color: rgba(51, 51, 51, 0.7);
        padding: 20px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: -50px;
        transition: all 0.5s;
       
        &:hover {
           background-color: rgba(255, 255, 255, 0.8);
           color: #b12a2f;
        }

        span {
          font-weight: 500;
          font-size: 25px;
          max-width: 30px;
        }
      }

      &_prev {
        transform: rotate(180deg);
      }
    }
    
    &_active {
      opacity: 1 !important;
    }

    &_bonus {
      opacity: 0;
      height: 100%;
    }
    &_image {
      position: absolute;
      transition: opacity 1s;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      height: 100%;
      opacity: 0;

      &-title-top {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 8px 20px;
          text-align: center;
          font-style: italic;
          margin-top: 25px;
          width: 100%;
          box-sizing: border-box;
          display: inline-block;
      }

      &-title-bottom {
        background-color: rgba(51, 51, 51, 0.7);
        padding: 40px 30%;
        text-align: center;
        color: #fff;
        font-size: 25px;
        margin-bottom: 60px;

        @media (max-width: 950px){ 
          padding: 20px 0;
        }

        @media (max-width: 700px) {
          font-size: 20px;
        }
        @media (max-width: 600px) {
          display: none;
        }
      }
    }

    &_list{
      width: 100%;
      display: flex;
      z-index: 5;
      position: absolute;
      bottom: 20px;
      justify-content: center;
      align-items: center;

      &-item {
        width: 15px;
        height: 15px;
        border: 2px solid #fff;
        border-radius: 10px;
        margin: 0 3px;
        cursor: pointer;

        @media (max-width: 850px) {
          border: 2px solid #7e7e7e;
        }

        &-active {
          background-color: #b12a2f;
        }
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>