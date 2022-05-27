<template>
  <div>
    Favorite
    <button
      @click="create"
    >
      create
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PersonalAccountPageFavorite',
  inject: ['favoriteApiService'],
  computed: {
    ...mapGetters({
      token: 'account/getAccountToken'
    })
  },
  methods: {
    create () {
      this.favoriteApiService.create({
        title: 'test',
        user_id: 3,
        status: 'shared'
      }, this.token)
    }
  }
}
</script>