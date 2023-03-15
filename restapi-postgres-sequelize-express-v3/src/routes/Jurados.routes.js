import { Router } from 'express';
import { actualizarJurados, crearJurados, eliminarJurados, obtenerJurados } 
from '../controllers/Jurados.controller.js'
const router = Router();
router.get('/Jurado/obtener/',obtenerJurados);
router.post('/crearJurado',crearJurados);
router.put('/Jurado/actualizar/',actualizarJurados);
router.delete('/Jurado/eliminar/',eliminarJurados);



export default router;