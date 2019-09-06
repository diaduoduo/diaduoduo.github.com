import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let router=new Router({
    routes: [
        {
            path: '/article',
            name: 'article',
            component: () => import('./views/article.vue'),
            meta:{
                title:"文章详情"
            }
        },
        {
            path: '/play',
            name: 'play',
            component: () => import('./views/play.vue')
        },
        {
            path: '/tcDetail',
            name: 'tcDetail',
            component: () => import('./views/tcDetail.vue'),
            meta:{
                title:"套餐详情"
            }
        },
        {
            path: '/txDetail',
            name: 'txDetail',
            component: () => import('./views/txDetail.vue'),
            meta:{
                title:"套系详情"
            }
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: () => import('./views/schedule.vue'),
            meta:{
                title:"档期查询"
            }
        },
        {
            path: '/success',
            name: 'success',
            component: () => import('./views/success.vue'),
            meta:{
                title:"预约成功"
            }
        },
        {
            path: '/car',
            name: 'car',
            component: () => import('./views/car.vue'),
            meta:{
                title:""
            }
        },
        {
            path: '/weddingPlan',
            name: 'weddingPlan',
            component: () => import('./views/weddingPlan.vue')
        },
        {
            path: '/businessBanquet',
            name: 'businessBanquet',
            component: () => import('./views/businessBanquet.vue')
        },
        {
            path: '/Album',
            name: 'Album',
            component: () => import('./views/Album.vue')
        },
        {
            path: '/Makeup',
            name: 'Makeup',
            component: () => import('./views/Makeup.vue')
        },
        {
            path: '/diamond',
            name: 'diamond',
            component: () => import('./views/diamond.vue')
        },
        {
            path: '/caseList',
            name: 'caseList',
            component: () => import('./views/caseList.vue')
        },
        {
            path: '/download',
            name: 'download',
            component: () => import('./views/download.vue')
        },
        {
            path: '/starList',
            name: 'starList',
            component: () => import('./views/starList.vue')
        },
        {
            path: '/starChoiceList',
            name: 'starChoiceList',
            component: () => import('./views/starChoiceList.vue')
        },
        {
            path: '/caseDetail',
            name: 'caseDetail',
            component: () => import('./views/caseDetail.vue')
        },
        {
            path: '/weddingPhotography',
            name: 'weddingPhotography',
            component: () => import('./views/weddingPhotography.vue'),
            meta:{
                title:"婚纱摄影"
            }
        },
        {
            path: '/weddingDress',
            name: 'weddingDress',
            component: () => import('./views/weddingDress.vue')
        },
        {
            path: '/weddingBanquet',
            name: 'weddingBanquet',
            component: () => import('./views/weddingBanquet.vue')
        },
        {
            path: '/suit',
            name: 'suit',
            component: () => import('./views/suit.vue')
        },
        {
            path: '/weddingDreammaker',
            name: 'weddingDreammaker',
            component: () => import('./views/weddingDreammaker.vue')
        },
        {
            path: '/customWeddingDress',
            name: 'customWeddingDress',
            component: () => import('./views/customWeddingDress.vue')
        },
        {
            path: '/banquet',
            name: 'banquet',
            component: () => import('./views/banquet.vue')
        },
        {
            path: '/activity',
            name: 'activity',
            component: () => import('./views/activity.vue')
        },
        {
            path: '/pay',
            name: 'pay',
            component: () => import('./views/pay.vue')
        }
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        document.title=to.meta.title;
    }else{
        document.title="韩国艺匠婚尚";
    }
    next()
})
export default router;
