import axios from 'axios'
import {request} from "./request";

export function getSingers() {
    return request({
        url:'/top/artists?limit=300'
    })
}

export function getSingerDetail(singerId) {
    return request({
        url:`/artists?id=${singerId}`
    })
}
