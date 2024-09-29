<template>
  <div class="album-edit-page panel panel-default">
    <div class="panel-heading album-edit-heading">
      <button
        class="button-unstyled go-back-button"
        @click="$router.back"
      >
        <FAIcon
          size="lg"
          icon="chevron-left"
        />
      </button>
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

      <div v-else>
        <div class="input-wrap">
          <label for="album-edit-name">{{ $t('albums.name') }}</label>
          {{ ' ' }}
          <input
            id="album-edit-name"
            ref="name"
            v-model="name"
          >
        </div>

        <div class="input-wrap album-edit-description-wrap">
          <label for="album-edit-description">{{ $t('albums.description') }}</label>
          <br>
          <textarea
            id="album-edit-description"
            ref="description"
            v-model="description"
            class="description-textarea"
          />
        </div>

        <div class="input-wrap">
          <input
            id="album-edit-is-public"
            ref="isPublic"
            v-model="isPublic"
            type="checkbox"
          >
          <label for="album-edit-is-public">
            {{ $t('albums.public_album') }}
          </label>
        </div>
      </div>
    </div>

    <div
      v-if="!loading"
      class="panel-footer"
    >
      <span class="spacer" />
      <template v-if="editingAlbumId && isTryingToDelete">
        {{ $t('albums.delete_confirm') }}
        <button
          class="btn button-default footer-button"
          @click="deleteAlbum"
        >
          {{ $t('general.confirm') }}
        </button>
        <button
          class="btn button-default footer-button"
          @click="isTryingToDelete = false"
        >
          {{ $t('general.cancel') }}
        </button>
      </template>
      
      <template v-else-if="editingAlbumId">
        <button
          class="btn button-default footer-button"
          @click="saveAlbum"
        >
          {{ $t('albums.save') }}
        </button>
        <button
          class="btn button-default footer-button"
          @click="isTryingToDelete = true"
        >
          {{ $t('albums.delete') }}
        </button>
      </template>

      <template v-else>
        <button
          class="btn button-default footer-button"
          @click="saveAlbum"
        >
          {{ $t('albums.save') }}
        </button>
      </template>
    </div>
  </div>
</template>

<script src="./album_edit.js"></script>

<style lang="scss">
.album-edit-page {
  .input-wrap {
    align-items: center;

    label {
      margin-right: 0.5em;
    }
  }

  .album-edit-description-wrap {
    display: block;

    textarea {
      min-width: 100%;
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>