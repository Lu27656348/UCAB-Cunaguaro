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
const sesion = ref({
  user: "",
  password: "",
  access_token: "",
  role: "",
  isSigned: false,
});

const handleSignInGoogle = () => {
  sesion.value.isSigned = true;
  localStorage.setItem("usuario", JSON.stringify(sesion.value));
  emit('usuarioLoggeado', true);
  emit('emitAuth', auth);
  router.push("/requests");

  /*
  signInWithPopup(auth, provider)
    .then((result) => {

      sesion.value.user = result.user.displayName;
      sesion.value.access_token = result.user.accessToken;
      sesion.value.isSigned = true;

      console.log(result);
    })
    .catch((error) => {
      console.log("Error en la autenticación de google");
      console.log(error);
    });
  */

  console.log("sesion.value");
  console.log(sesion.value);
  
};
/*
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      sesion.value.user = "";
      sesion.value.isSigned = false;
      sesion.value.access_token = "";
      sesion.value.role = "";
      localStorage.clear();
      emit('usuarioLoggeado', false);
      console.log("Gracias por usar nuestra aplicación");
      router.push("/");
    })
    .catch((error) => {
      console.log("No se pudo cerrar la sesión");
    });
};
*/
const register = async () => {
  console.log(`Usuario Registrado: ${email.value} \n ${password.value}`);
  await api.encriptarContrasena(password.value);
};

const signIn = async () => {
  console.log(`Usuario acedido: ${email.value} \n ${password.value}`);
  const respuesta = await api.buscarAdministradores(email.value.toString());
  console.log("respuesta");
  console.log(respuesta);
  if (respuesta != null) {
    router.push("/requests");
  }
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
        <div class="login__form__mail">
          <input type="number" placeholder="Cédula" v-model="email">
        </div>
        <div class="login__form__password">
          <input type="password" placeholder="Contraseña" v-model="password">
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
<!--
        <button class="login__form__btn" @click="props.iniciarSesion()">
          Google
        </button>
-->
        <div class="login__form__action">
          <button class="login__form__btn cancel">Limpiar</button>
          <button class="login__form__btn succes" @click="iniciarSesion()">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>