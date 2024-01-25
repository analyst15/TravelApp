import Home from '@/views/Home.vue'
import { createRouter,createWebHistory } from 'vue-router'

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
            props: route => ({...route.params, id: parseInt(route.params.id)})
        }
    ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    /*linkActiveClass: 'vue-school-active-link'*/
})


export default router