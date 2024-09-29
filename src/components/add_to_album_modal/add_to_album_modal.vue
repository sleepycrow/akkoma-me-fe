<template>
  <Modal
    v-if="isModalOpen"
    @backdrop-clicked="closeModal"
  >
    <div class="add-to-album-panel panel">
      <div class="panel-heading">
        <div class="title">
          {{ $t('albums.add_to_album') }}
        </div>
      </div>

      <div class="panel-body">
        <div
          v-if="loading"
          class="text-center loading-icon"
        >
          <FAIcon
            icon="circle-notch"
            spin
            size="lg"
          />
        </div>

        <ul v-else>
          <li
            v-for="album in ownAlbums"
            :key="album.id"
            class="input-wrap"
          >
            <input
              :id="album.id"
              type="checkbox"
              :checked="albumMemberships.includes(album.id)"
              @click="toggleAlbumMembership(album.id)"
            >
            <label :for="album.id">
              {{ album.name }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script src="./add_to_album_modal.js"></script>

<style lang="scss">
.add-to-album-panel ul {
  padding: 0;
}
</style>