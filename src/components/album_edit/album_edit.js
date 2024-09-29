import { mapState } from 'vuex'

export default {
  data: () => ({
    isTryingToDelete: false,
    loading: false,

    editingAlbumId: null,
    name: '',
    description: '',
    isPublic: true
  }),
  created () {
    if (this.$route.params.id) {
      this.loadAlbumInfo(this.$route.params.id)
    }
  },
  watch: {
    $route: function (route) {
      if (route.params.id !== this.albumId) {
        this.loadAlbumInfo(this.$route.params.id)
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      backendInteractor: state => state.api.backendInteractor
    }),
  },
  methods: {
    loadAlbumInfo (albumId) {
      this.loading = true
      this.resetAlbumInfo()

      this.backendInteractor.fetchAlbumInfo({ albumId })
        .then(resp => {
          if (this.currentUser && this.currentUser.screen_name !== resp.account.acct) {
            throw this.$t('albums.not_permitted_to_edit_album')
          }

          console.log('asd', resp)

          this.editingAlbumId = resp.id
          this.name = resp.name
          this.description = resp.description
          this.isPublic = resp.is_public
        })
        .catch(this._displayErrorAsGlobalNotice)
        .finally(() => this.loading = false)
    },

    resetAlbumInfo () {
      this.editingAlbumId = null
      this.name = ''
      this.description = ''
      this.isPublic = true
    },

    saveAlbum () {
      this.loading = true

      const action = this.editingAlbumId ? 'updateAlbum' : 'createAlbum'
      const payload = {
        name: this.name,
        description: this.description,
        isPublic: this.isPublic,
        ...(this.editingAlbumId && { albumId: this.editingAlbumId })
      }

      this.$store.dispatch(action, payload)
        .then(({ id }) => this.$router.push({ name: 'album-timeline', params: { id } }))
        .catch(this._displayErrorAsGlobalNotice)
        .finally(() => this.loading = false)
    },

    deleteAlbum () {
      this.$store.dispatch('deleteAlbum', { albumId: this.editingAlbumId })
      this.$router.push({ name: 'albums' })
    },

    _displayErrorAsGlobalNotice (e) {
      this.$store.dispatch('pushGlobalNotice', {
        messageKey: 'general.generic_error_message',
        messageArgs: [e.message],
        level: 'error'
      })
    }
  }
}
