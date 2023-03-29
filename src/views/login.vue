<script setup>
import { ref, onMounted } from "vue";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import {useRouter} from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref(''); //Mensaje de error
const register = ()=>{
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      console.log('registrado con exito!');
      router.push('/request'); //redirige a propuestas
    })
    .catch(error => {
      console.log(error.code);;
      alert(error.message);
    });
};

const signIn = () =>{
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      console.log('Acceso con exito!');
      router.push('/request'); //redirige a propuestas
    })
    .catch(error => {
      console.log(error.code);;
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Email invalido'
          break;
        case 'auth/user-not-found':
          errMsg.value = 'Usuario no encontrado'
          break;
        case 'auth/wrong-password':
          errMsg.value = 'Contraseña Incorrecta'
          break;
        default:
          errMsg.value = 'Email o Contraseña incorrectas'
          break;
      
      };
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) =>{
    console.log(result.user);
    router.push('/feed');
  })
  .catch((error) =>{
    alert('Error al iniciar sesion');
  })
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
        <div class="login__form__mail">
          <!--<h3>Cédula</h3>-->
          <input type="email" placeholder="email" v-model="email"/>
        </div>
        <div class="login__form__password">
          <!--<h3>Contraseña</h3>-->
          <input type="password" placeholder="Contraseña" v-model="password"/>
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="login__form__btn succes" @click="signIn()">Iniciar Sesión</button>
        <button class="login__form__btn cancel" @click="register()">Cancelar</button>
        <button class="login__form__btn cancel" @click="signInWithGoogle()">Iniciar sesion con Google</button>
        <a class="login__form--forget" ref="/council"
          >Se me olvidó la contraseña</a
        >
      </div>
    </div>
  </div>
</template>