import axios from 'axios'
import {request} from "./request";

export function getSearchHot(id) {
    return request({
        url:'/search/hot'
    })
}
export function getSearchSinger(name) {
    return request({
        url:`/search?keywords=${name}&type=100`
    })
}
export function getSearchSuggest(name) {
    return request({
        url:`/search/suggest?keywords=${name}`
    })
}

export function getSearchSongs(name ,page) {
    return request({
        url:`/search?keywords=${name}&offset=${page}`
    })
}

export function getSongDetail(id) {
    return request({
        url:`/song/detail?ids=${id}`
    })
}
