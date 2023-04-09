<script setup>
  import Navbar from './components/navbar.vue';
  //import { firebaseApp } from "./firebaseConfig.js";
</script>

<template>
  <Navbar />
  <router-view id="router" class="router"></router-view>
</template>