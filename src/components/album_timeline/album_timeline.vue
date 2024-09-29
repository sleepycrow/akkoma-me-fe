<template>
  <div class="album-timeline-page panel panel-default">
    <div class="album-timeline-heading timeline-heading panel-heading">
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
      
      <div v-else-if="albumInfo">
        <div class="top-line">
          <span class="title">
            {{ albumInfo.name }}
          </span>
          
          <router-link
            v-if="isEditable"
            :to="{ name: 'album-edit', params: { id: albumInfo.id } }"
            class="button-unstyled button-album-edit"
          >
            <FAIcon
              :to="{ name: 'lists' }"
              class="fa-scale-110 fa-old-padding"
              icon="pen"
            />
          </router-link>
        </div>

        <router-link
          :to="authorProfileLink"
          class="album-author-link"
        >
          <img
            :src="albumInfo.account.avatar"
            :alt="albumInfo.account.acct"
          >
          {{ ' ' }}
          {{ albumInfo.account.acct }}
        </router-link>

        <div v-if="albumInfo.description">
          {{ albumInfo.description }}
        </div>
      </div>
    </div>

    <div class="timeline-body panel-body">
      <Timeline
        v-if="!loading && albumInfo"
        :timeline="timeline"
        :album-id="albumId"
        :embedded="true"
        timeline-name="album"
        :footer-slipgate="footerRef"
      />
    </div>

    <div
      :ref="setFooterRef"
      class="panel-footer"
    />
  </div>
</template>

<script src="./album_timeline.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.album-timeline-heading {
  height: auto;
  display: block;
  align-items: flex-start;
  justify-content: flex-start;

  .top-line {
    display: flex;
    grid-template-columns: auto 2.5rem;
    max-width: 100%;
    overflow: hidden;

    .title {
      font-weight: bold;
      flex: 1;
    }

    .button-album-edit {
      flex: 0 0 auto;
      height: 2rem;
      width: 2rem;
      text-align: center;
    }
  }

  .album-author-link img {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>