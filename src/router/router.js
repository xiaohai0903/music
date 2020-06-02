import Vue from 'vue'
import VueRouter from 'vue-router'


const Recommend = () => import('../components/content/recommend/Recommend.vue')
const User = () => import('../components/content/user/User')
const Search = () => import('../components/content/search/Search')
const Rank = () =>  import('../components/content/rank/Rank')
const RankDetail =() => import('../components/content/rank-detail/RankDetail')
const Singer = () => import('../components/content/singer/Singer')
const SingerDetail = () => import('../components/content/singer-detail/SingerDetail')

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/recommend'
        },
        {
            path: '/recommend',
            component:Recommend
        },
        {
            path: '/user',
            component:User
        },
        {
            path: '/search',
            component:Search
        },
        {
            path: '/rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: RankDetail
                }
            ]
        },
        {
            path: '/singer',
            component:Singer,
            children: [
                {
                    path:':id',
                    component:SingerDetail
                }
            ]
        }
    ],
    mode:'history'

})

export default router
