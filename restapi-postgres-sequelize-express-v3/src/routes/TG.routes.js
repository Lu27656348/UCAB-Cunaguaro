import { Router } from 'express';
import { actualizarTG, anexarPlanilla, asignarRevisor, asignarTutorAcademico, asignarTutorEmpresarial, buscarTG, buscarTGByEstatus, buscarTGByModalidad, crearTG, descargarPlanilla, eliminarTG, evaluacionCDE, evaluacionComite, evaluacionRevisor, obtenerEstudiantesDeTG, obtenerTG, obtenerTGConRevisor, obtenerTGSinRevisor } 
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
router.put('/asignarRevisor/:id',asignarRevisor);

router.get('/TG/estatus/:id',buscarTGByEstatus);
router.get('/sin_revisor',obtenerTGSinRevisor);
router.get('/con_revisor',obtenerTGConRevisor);
router.get('/alumnosTG/:id',obtenerEstudiantesDeTG);

router.post('/anexarPlanilla',anexarPlanilla);
router.put('/descargarPlanilla',descargarPlanilla);


export default router;