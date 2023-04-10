<script setup>
  import Navbar from './components/navbar.vue';
  //import { firebaseApp } from "./firebaseConfig.js";
  import { ref } from "vue";

  let logged = ref(false);

  let funcionCerrar = ref(()=>{});

  let authLogin = ref({});

  const userExists = (isLogged) => {
    console.log("El usuario se ha logeado")
    logged = isLogged;
    return localStorage.getItem('usuario') === null
  }
</script>

<template>
  <Navbar 
    v-show="logged" 
    @usuarioLoggeado = "(sesion) => logged = sesion"
    :auth = "authLogin"
  />
  <router-view 
    id="router" 
    class="router"
    @usuarioLoggeado = "(sesion) => logged = sesion"
    @funcionCerrarSesion = "(funcion) => funcionCerrar = funcion"
  ></router-view>
</template>