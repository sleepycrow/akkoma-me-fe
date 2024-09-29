import { mapState } from 'vuex'
import Modal from '../modal/modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      loading: false,
      albumMemberships: []
    }
  },
  computed: {
    ...mapState({
      backendInteractor: state => state.api.backendInteractor,
      ownAlbums: state => state.albums.ownAlbums,
      statusId: state => state.albums.addToAlbumModalStatusId,
      isModalOpen: state => !!state.albums.addToAlbumModalStatusId
    })
  },
  watch: {
    statusId () {
      if (this.statusId) {
        this.$store.dispatch('startFetchingAlbums')
        this.updateStatusMemberships()
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.dispatch('closeAddToAlbumModal')
    },

    updateStatusMemberships () {
      this.loading = true
      this.albumMemberships = []

      this.backendInteractor.fetchOwnAlbumsForStatus({ statusId: this.statusId })
        .then(albums => this.albumMemberships = albums.map(album => album.id))
        .catch(this._displayErrorAsGlobalNotice)
        .finally(() => this.loading = false)
    },

    toggleAlbumMembership (albumId) {
      return !this.albumMemberships.includes(albumId)
        ? this.addToAlbum(albumId)
        : this.removeFromAlbum(albumId)
    },

    addToAlbum (albumId) {
      this.loading = true
      this.backendInteractor.addStatusToAlbum({ albumId, statusId: this.statusId })
        .then(() => this.albumMemberships.push(albumId))
        .catch(this._displayErrorAsGlobalNotice)
        .finally(() => this.loading = false)
    },

    removeFromAlbum (albumId) {
      this.loading = true
      this.backendInteractor.removeStatusFromAlbum({ albumId, statusId: this.statusId })
        .then(() => this.albumMemberships = this.albumMemberships.filter(id => id != albumId))
        .catch(this._displayErrorAsGlobalNotice)
        .finally(() => this.loading = false)
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