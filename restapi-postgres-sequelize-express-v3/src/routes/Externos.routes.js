import { Router } from 'express';
import { actualizarExternos, buscarExterno, crearExternos, eliminarExternos, obtenerExternos } 
from '../controllers/Externos.controller.js'
const router = Router();
router.get('/Externos',obtenerExternos);
router.post('/Externos',crearExternos);
router.put('/Externos/:id',actualizarExternos);
router.delete('/Externos/:id',eliminarExternos);
router.get('/Externos/:id',buscarExterno);


export default router;