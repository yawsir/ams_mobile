const Grade = () => import('../views/Teacher/Grade.vue')
const Personal = () => import('../views/Teacher/Personal.vue')
export default [
    {
        path: '',
        component: Grade
    },
    {
        path: 'grade',
        component: Grade
    },
    {
        path: 'personal',
        component: Personal
    }
]