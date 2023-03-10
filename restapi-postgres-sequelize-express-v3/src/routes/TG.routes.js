import { Router } from 'express';
import { actualizarTG, asignarRevisor, asignarTutorAcademico, asignarTutorEmpresarial, buscarTG, buscarTGByModalidad, crearTG, eliminarTG, evaluacionCDE, evaluacionComite, evaluacionRevisor, obtenerTG } 
from '../controllers/TG.controller.js'
const router = Router();
router.get('/TG',obtenerTG);
router.post('/TG',crearTG);
router.put('/TG/:id',actualizarTG);
router.delete('/TG/:id',eliminarTG);
router.get('/TG/:id',buscarTG);

router.get('/TG/modalidad/:id',buscarTGByModalidad);

router.put('/TG/evaluacionComite/:id',evaluacionComite);
router.put('/TG/evaluacionRevisor/:id',evaluacionRevisor);
router.put('/TG/evaluacionCDE/:id',evaluacionCDE);

router.put('/TG/asignarTutorAcademico/:id',asignarTutorAcademico);
router.put('/TG/asignarTutorEmpresarial/:id',asignarTutorEmpresarial);
router.put('/TG/asignarRevisor/:id',asignarRevisor);


export default router;