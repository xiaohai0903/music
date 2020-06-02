import {request} from "./request";

export function getTop(id) {
    return request({
        url:`/top/list?idx=${id}`,
    })
}
