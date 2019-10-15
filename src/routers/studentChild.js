const Elective = () => import('../views/Student/Elective.vue')
const Grade = () => import('../views/Student/Grade.vue')
const Personal = () => import('../views/Student/Personal.vue')
export default [
    {
        path: '',
        component: Elective
    },
    {
        path: 'elective',
        component: Elective
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