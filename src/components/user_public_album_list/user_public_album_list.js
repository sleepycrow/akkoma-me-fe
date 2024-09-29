import { mapState } from 'vuex'
import AlbumCard from '../album_card/album_card.vue'

export default {
  components: {
    AlbumCard
  },
  props: [
    'userId'
  ],
  data: () => ({
    loading: false,
    loadedUserId: null,
    albums: []
  }),
  computed: {
    ...mapState({
      backendInteractor: state => state.api.backendInteractor
    })
  },
  watch: {
    userId: function (userId) {
      if (userId !== this.loadedUserId) {
        this.updateData(userId)
      }
    }
  },
  created () {
    this.updateData(this.userId)
  },
  methods: {
    updateData (userId) {
      this.loading = true
      this.loadedUserId = null
      this.albums = []

      this.backendInteractor.fetchPublicAlbumsByUser({ userId })
        .then(albums => {
          this.loadedUserId = userId
          this.albums = albums
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
            messageArgs: [e.message],
            level: 'error'
          })
        })
        .finally(() => this.loading = false)
    }
  }
}