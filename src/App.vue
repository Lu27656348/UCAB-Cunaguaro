<script setup>
import Navbar from "./components/navbar.vue";
import { ref } from "vue";

import { useRouter } from "vue-router";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "@firebase/auth";

const router = useRouter();
//import { firebaseApp } from "./firebaseConfig.js";

let logged = ref(false);

const provider = new GoogleAuthProvider();
//let auth = getAuth(firebaseApp);

const sesion = ref({
  user: "wladi1000",
  password: "1234",
  access_token: "dsfhysedfvsjdfgyseGFhESOIfhpo9iasEYiopdfauidsfyuirgh@@lkjhsdisaihdagd|||khsdjhasd@@",
  role: "webon",
  isSigned: true,
});

const moverRequest = ()=>{
  localStorage.setItem('usuario', JSON.stringify(sesion.value));
  router.push('/requests');
  logged.value = true;
}
const moverLogin = ()=>{
  localStorage.clear();
  router.push('/');
  logged.value = false;
  
}
 
</script>

<template>
  <Navbar
    v-show="logged"
    :cerrarSesion="moverLogin"
  />
  <router-view
    id="router"
    class="router"
    :iniciarSesion="moverRequest"
  ></router-view>
</template>