<script setup>
  import Navbar from './components/navbar.vue';
  //import { firebaseApp } from "./firebaseConfig.js";
  import { ref } from "vue";

  let logged = ref(false);

  const onSignInHandler = () => {
    console.log("onSignInHandler()")
    emit('isLogged',true)
  }
  const userExists = (isLogged) => {
    console.log("El usuario se ha logeado")
    logged = isLogged;
    return localStorage.getItem('usuario') === null
  }
</script>

<template>
  <Navbar v-show="logged" @isLogged = "userExists($event)"/>
  <router-view id="router" class="router"></router-view>
</template>