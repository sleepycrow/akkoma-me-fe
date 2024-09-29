<template>
  <div class="album-card">
    <router-link
      :to="{ name: 'album-timeline', params: { id: album.id } }"
      class="album-info"
    >
      <div class="album-name">
        {{ album.name }}
      </div>
      <div
        v-if="album.description"
        class="album-description"
      >
        {{ album.description }}
      </div>
    </router-link>

    <router-link
      v-if="isEditable"
      :to="{ name: 'album-edit', params: { id: album.id } }"
      class="button-album-edit"
    >
      <FAIcon
        :to="{ name: 'lists' }"
        class="fa-scale-110 fa-old-padding"
        icon="pen"
      />
    </router-link>
  </div>
</template>

<script src="./album_card.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.album-card {
  display: flex;

  .album-info {
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;

    .album-name,
    .album-description {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .album-name {
      font-size: 1.2em;
      color: var(--link, $fallback--link);
    }

    .album-description {
      color: $fallback--lightText;
      margin-top: 0.2em;
    }
  }

  .button-album-edit {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--link, $fallback--link);
  }

  .album-info,
  .button-album-edit {
    margin: 0;
    padding: 1em;

    &:hover {
      background-color: $fallback--lightBg;
      background-color: var(--selectedMenu, $fallback--lightBg);
      color: $fallback--link;
      color: var(--selectedMenuText, $fallback--link);
      --faint: var(--selectedMenuFaintText, $fallback--faint);
      --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
      --lightText: var(--selectedMenuLightText, $fallback--lightText);
    }
  }
}
</style>
