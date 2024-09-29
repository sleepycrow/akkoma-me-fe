import { remove, findIndex } from 'lodash'

export const defaultState = {
  ownAlbums: [],
  lastAlbum: null,
  addToAlbumModalStatusId: null
}

export const mutations = {
  setAddToAlbumModalStatusId (state, statusId) {
    state.addToAlbumModalStatusId = statusId
  },

  setOwnAlbums (state, albums) {
    state.ownAlbums = albums
  },

  setOwnAlbum (state, value) {
    const albumIndex = findIndex(state.ownAlbums, album => album.id === value.id)

    if (albumIndex > -1) {
      state.ownAlbums[albumIndex] = value
    } else {
      state.ownAlbums.push(value)
    }
  },

  deleteOwnAlbum (state, albumId) {
    remove(state.ownAlbums, album => album.id === albumId)
  },

  setLastAlbum (state, album) {
    state.lastAlbum = album
  }
}

export const actions = {
  openAddToAlbumModal ({ commit }, statusId) {
    commit('setAddToAlbumModalStatusId', statusId)
  },

  closeAddToAlbumModal ({ commit }) {
    commit('setAddToAlbumModalStatusId', null)
  },

  createAlbum ({ rootState, commit }, payload) {
    return rootState.api.backendInteractor.createAlbum(payload)
      .then(album => {
        commit('setOwnAlbum', album)
        return album
      })
  },

  updateAlbum ({ rootState, commit }, payload) {
    return rootState.api.backendInteractor.updateAlbum(payload)
      .then(album => {
        commit('setOwnAlbum', album)
        return album
      })
  },

  deleteAlbum ({ rootState, commit }, { albumId }) {
    return rootState.api.backendInteractor.deleteAlbum({ albumId })
      .then(() => commit('deleteOwnAlbum', albumId))
  },

  getAlbum ({ state, rootState, commit }, { albumId }) {
    if (state.lastAlbum && state.lastAlbum.id === albumId) {
      return new Promise((resolve) => resolve(state.lastAlbum))
    }

    return rootState.api.backendInteractor.fetchAlbumInfo({ albumId })
      .then(album => {
        commit('setLastAlbum', album)
        return album
      })
  }
}

export const getters = {

}

export default {
  state: defaultState,
  mutations,
  actions,
  getters
}