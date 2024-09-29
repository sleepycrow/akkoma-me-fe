import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import generateProfileLink from 'src/services/user_profile_link_generator/user_profile_link_generator'
import Timeline from '../timeline/timeline.vue'

library.add(faPen)

export default {
  components: {
    Timeline
  },
  data: () => ({
    loading: true,
    albumId: null,
    albumInfo: null,
    footerRef: null
  }),
  created () {
    this.albumId = this.$route.params.id
    this.loadAlbumData()
  },
  unmounted () {
    this.$store.dispatch('stopFetchingTimeline', 'album')
  },
  watch: {
    $route: function (route) {
      if (route.params.id !== this.albumId) {
        this.albumId = route.params.id

        this.loadAlbumData()
      }
    }
  },
  computed: {
    ...mapState({
      timeline: state => state.statuses.timelines.album,
      backendInteractor: state => state.api.backendInteractor,
      currentUser: state => state.users.currentUser
    }),

    authorProfileLink () {
      const restrictedNicknames = this.$store.state.instance.restrictedNicknames
      return generateProfileLink(this.albumInfo.account.id, this.albumInfo.account.acct, restrictedNicknames)
    },

    isEditable () {
      return this.currentUser && this.albumInfo && this.currentUser.screen_name === this.albumInfo.account.acct
    }
  },
  methods: {
    loadAlbumData () {
      this.loading = true
      this.albumInfo = null

      this.$store.commit('clearTimeline', { timeline: 'album' })
      this.$store.dispatch('startFetchingTimeline', { timeline: 'album', albumId: this.albumId })
      this.$store.dispatch('getAlbum', { albumId: this.albumId })
        .then(resp => this.albumInfo = resp)
        .catch(e => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
            messageArgs: [e.message],
            level: 'error'
          })
        })
        .finally(() => this.loading = false)
    },

    setFooterRef (el) {
      this.footerRef = el
    }
  }
}
