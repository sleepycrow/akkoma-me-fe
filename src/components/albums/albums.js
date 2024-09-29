import { mapState } from 'vuex'
import AlbumCard from '../album_card/album_card.vue'

export default {
  components: {
    AlbumCard
  },
  created () {
    this.$store.dispatch('startFetchingAlbums')
  },
  computed: {
    ...mapState({
      albums: state => state.albums.ownAlbums
    })
  },
  methods: {
    
  }
}
