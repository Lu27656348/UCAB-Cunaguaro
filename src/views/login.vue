<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "@firebase/auth";
import * as api from "../modules/apiTools.js";
import { firebaseApp } from "../firebaseConfig.js";

const emit = defineEmits(['usuarioLoggeado', 'emitAuth']);

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
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const handleSignInGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      /*
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        */
      sesion.value.user = result.user.displayName;
      sesion.value.access_token = result.user.accessToken;
      sesion.value.isSigned = true;
      localStorage.setItem("usuario", JSON.stringify(sesion.value));
      //Aquí buscamos el rol de usuario en el sistema
      /*{

        }*/
      //
      emit('usuarioLoggeado', true);
      emit('emitAuth', auth);
      router.push("/requests");
      console.log(result);
    })
    .catch((error) => {
      console.log("Error en la autenticación de google");
      console.log(error);
    });

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

const limpiar = () => {
  console.log("Campos limpios");
  email.value = "";
  password.value = "";
};
const isLogged = () => {
  console.log("Usuario logeado");
};
onMounted(() => {
  let router = document.getElementById("router");
  router.classList.toggle("router");
  console.log(router);
});

//  console.log(router[0].nodeName);
</script>

<template>
  <div class="login">
    <div class="login-bc">
      <div class="login__form" action="">
        <h2 class="login__form--msg">Ingresar a la aplicación</h2>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="login__form__btn" @click="handleSignInGoogle()">
          Google
        </button>
      </div>
    </div>
  </div>
</template>