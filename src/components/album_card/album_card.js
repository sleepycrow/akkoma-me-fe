import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'

library.add(faPen)

export default {
  props: [
    'album'
  ],
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    }),

    isEditable () {
      return this.currentUser && this.currentUser.screen_name === this.album.account.acct
    }
  }
}