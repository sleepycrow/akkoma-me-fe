<template>
  <div class="user-public-album-list">
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
  
    <AlbumCard
      v-for="album in albums"
      :key="album.id"
      :album="album"
    />
  </div>
</template>
  
<script src="./user_public_album_list.js"></script>