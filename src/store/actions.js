import * as types from './mutation-types'
import {playMode} from "../components/common/js/config";
import {shuffle} from "../components/common/js/utl";
import {saveSearch ,deleteSearch} from "../components/common/js/cache";


function findIndex(list, song) {
    return list.findIndex((item) =>{
        return item.id ===song.id
    })
}
export const selectPlay = function ({commit,state},{list,index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST ,randomList)
        index =findIndex(randomList,list[index])
    }else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const sequencePlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.sequence)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}
