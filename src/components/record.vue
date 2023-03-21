<script setup>

    const props = defineProps({
        id_tg: Number,
        titulo: String,
        modalidad: String,
        fechaenvio: String,
        estatus: String,
        id_ta: Number,
        id_admin_evaluador: Number
    });

</script>
<template>
    <div>
        <p>Codigo: {{ props.id_tg }}</p>
        <p>Titulo de propuesta: {{ props.titulo }}</p>
        <p>Modalidad: {{ props.modalidad == 'E'?'Experimental' : 'Instrumental' }}</p>
        <p>Fecha envio: {{ props.fechaenvio }}</p>
    </div>
</template>