import axios from 'axios'
import {HOST} from "../components/common/js/config";
import {request} from "./request";

// export function getBanner1() {
//     const url =HOST +'banner'
//     return axios.get(url)
// }
export function getBanner(type) {
    return request({
        url:'/banner',
        query:{
            type
        }
    })
}
export function getRecommendList() {
    return request({
        url:'/personalized'
    })
}
export function getRecommendMusic() {
    return request({
        url:'/personalized/newsong'
    })
}
