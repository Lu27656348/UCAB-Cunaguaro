<script setup>
  import { onMounted, ref } from 'vue';
  console.log('Estoy corriendo');
</script>
<template>
  <ul>
    <li><router-link to="/catalogs/estudiantes"><ion-icon name="log-out-outline"></ion-icon> Login</router-link></li>
    <li><router-link to="/catalogs/profesores"><ion-icon name="log-out-outline"></ion-icon> Login</router-link></li>
  </ul>
  <h1>Auuuuhhhhh <br>Atte: El lobo - Maroon5</h1>
  <router-view></router-view>
</template>