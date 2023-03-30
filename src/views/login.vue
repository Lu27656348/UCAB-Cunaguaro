<script setup>
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router';

import * as api from '../modules/apiTools.js'
const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref(''); //Mensaje de error

const register = async () =>{
  console.log(`Usuario Registrado: ${email.value} \n ${password.value}`);
  await api.encriptarContrasena(password.value);
};

const signIn = async () => {
  console.log(`Usuario acedido: ${email.value} \n ${password.value}`);
  const respuesta = await api.buscarAdministradores(email.value.toString());
  console.log("respuesta")
  console.log(respuesta)
  if(respuesta != null) {
    router.push('/requets');
  }
 
};

const limpiar = ()=>{
  console.log('Campos limpios');
  email.value = '';
  password.value = '';
}

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
        <div class="login__form__mail">
          <!--<h3>Cédula</h3>-->
          <input type="number" placeholder="cédula" v-model="email"/>
        </div>
        <div class="login__form__password">
          <!--<h3>Contraseña</h3>-->
          <input type="password" placeholder="Contraseña" v-model="password"/>
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="login__form__btn succes" @click="signIn()">Iniciar Sesión</button>
        <button class="login__form__btn cancel" @click="limpiar()">Cancelar</button>
        <button class="login__form__btn" @click="register()">Registrarse</button>
        <a class="login__form--forget" ref="/council"
          >Se me olvidó la contraseña</a
        >
      </div>
    </div>
  </div>
</template>