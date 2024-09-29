<template>
  <div class="albums-page panel panel-default">
    <div class="panel-heading">
      <div class="title">
        {{ $t('albums.albums') }}
      </div>

      <router-link
        :to="{ name: 'album-new' }"
        class="button-default btn new-album-button"
      >
        {{ $t("albums.new") }}
      </router-link>
    </div>

    <div class="panel-body">
      <AlbumCard
        v-for="album in albums"
        :key="album.id"
        :album="album"
      />
    </div>
  </div>
</template>

<script src="./albums.js"></script>

<style lang="scss">
  .new-album-button {
    padding: 0 4px;
  }
</style>