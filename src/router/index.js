import Home from '@/views/Home.vue'
import { createRouter,createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [
    {path:'/', name: 'Home', component: Home},
    {
    path:'/destination/:id/:slug',
    name: 'destination.show', 
    component: ()=> import('@/views/DestinationShow.vue'),
    props: route => ({...route.params, id: parseInt(route.params.id)}),
    children: [
        {
            path: ':experienceSlug',
            name: 'experience.show',
            component: () => import('@/views/ExperienceShow.vue'),
            props: route => ({...route.params, id: parseInt(route.params.id)}),
            beforeEnter(to, from){
                const exists = sourceData.destinations.find(
                    destination => destination.id === parseInt(to.params.id)
                )
                if(!exists) return {
                    name: 'Not Found',
                
                    params: {pathMatch: to.path.split('/').slice(1)},
                    query: to.query,
                    hash: to.hash,
                }
            }
        }
    ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=> import('@/views/NotFound.vue')
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition){
        return savedPosition || new Promise((resolve) => {
            setTimeout(()=> resolve({ top: 0, behaviour: 'smooth'}), 300)
        })
    }
    /*linkActiveClass: 'vue-school-active-link'*/
})


export default router