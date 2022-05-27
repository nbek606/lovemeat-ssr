<template>
  <transition name="fade">
    <div 
      class="mail_sent"
    >
      <span class="material-icons mail_sent-icon">
        check_circle
      </span>
      <div class="mail_sent-title">
        {{ message }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'NoticeForm',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .mail_sent {
      padding: 30px;
      background-color: #fff;
      border-radius: 10px;
      text-align: center;

      &-icon {
        font-size: 80px;
        color: #4c8af6;
      }

      &-title {
          font-size: 20px;
          max-width: 300px;
      }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

