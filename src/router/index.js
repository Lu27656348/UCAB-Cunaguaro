import { createRouter, createWebHistory } from 'vue-router';

import '../assets/styles/main.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: ()=> import('../views/login.vue') },
    { path: '/requests', name: 'requests', component: ()=> import('../views/requests.vue') },
    { path: '/committee', name: 'comittee', component: ()=> import('../views/committee.vue') },
    { path: '/reviewers', name: 'reviewers', component: ()=> import('../views/reviewers.vue') },
    { path: '/reviewers_evaluation', name: 'reviewers_evaluation', component: ()=> import('../views/reviewers_evaluation.vue') },
    { path: '/council', name: 'council', component: import('../views/council.vue') },
    { path: '/assignment', name: 'assignment', component: ()=> import('../views/assignment.vue') },
    { path: '/crearEmpresa', name: 'crearEmpresa', component: ()=> import('../views/z_CrearEmpresa.vue') },
    { path: '/crearConsejoEscuela', name: 'consejoEscuela', component: ()=> import('../views/z_CrearConsejoEscuela.vue') },
    { path: '/designarJurado', name: 'designarJurado', component: ()=> import('../views/jury.vue') },
    { path: '/evaluacionNotas', name: 'evaluacionNotas', component: ()=> import('../views/noteUpload.vue') },
    { path: '/catalogs', name: 'catalogs', component: ()=> import('../views/catalogs.vue') },
    { path: '/catalogs/profesores', name: 'catalogs-students', component: ()=> import('../views/catalogs-students.vue') },
    { path: '/catalogs/estudiantes', name: 'catalogs-professor', component: ()=> import('../views/catalogs-professor.vue') }
  ]
});

export default router