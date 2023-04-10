<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  iniciarSesion: Function
});

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref(""); //Mensaje de error


const limpiar = () => {
  console.log("Campos limpios");
  email.value = "";
  password.value = "";
};

onMounted(() => {
  let router = document.getElementById("router");
  router.classList.toggle("router");
  console.log(router);
});

</script>

<template>
  <div class="login">
    <div class="login-bc">
      <div class="login__form" action="">
        <h2 class="login__form--msg">Ingresar a la aplicación</h2>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="login__form__btn" @click="props.iniciarSesion()">
          Google
        </button>
      </div>
    </div>
  </div>
</template>