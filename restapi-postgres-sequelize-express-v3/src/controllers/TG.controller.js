import { TG } from '../models/TG.js';
import { Op } from 'sequelize'
import { Realiza_tg } from '../models/realiza_PT.js';
import { Estudiantes } from '../models/Estudiantes.js';
export const obtenerTG = async (req,res) => {
    const tg = await TG.findAll();
    res.json(tg);
};
export const crearTG = async (req,res) => {
    console.log("crearTG")
    try {
        const {titulo,modalidad,id_tutor_academico,id_tutor_empresarial } = req.body;
        console.log(titulo)
        console.log(modalidad)
        const nuevo = await TG.create({
            titulo,
            modalidad,
            id_tutor_academico,
            id_tutor_empresarial
        },
        {
            fields: ["titulo","modalidad","id_tutor_academico","id_tutor_empresarial"]
        });
        res.json(nuevo);
    } catch (error) {
        return res.status(500).json( { mensaje: "Error en creación de TG", error: error })
    }
};
export const actualizarTG = async (req,res) => {
    const {
        titulo,
        modalidad,

    } = req.body;
    const id = req.params.id;
    try {
        const buscar = await TG.findByPk(id);

        buscar.titulo = titulo;
        buscar.modalidad = modalidad;
        const actualizar = await buscar.save();
        
        res.json( { mensaje: "TG actualizado correctamente", TG: buscar });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar TG", error: error.message});
    }
}

export const eliminarTG = async (req,res) => {
    const id = req.params.id;
    try {
        const eliminar = await TG.destroy({
            where: {
                id_tg: id
            }
        });
        res.status(204).json('El TG fue eliminado con exito ');
    } catch (error) {
        return res.status(500).json( { mensaje: "Error en eliminación de TG", error: error.message })
    }
}

export const buscarTG = async (req, res) => {
    const id = req.params.id;
    try {
        const buscar = await TG.findByPk(id);
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("TG no encontrado");
    }
}

export const buscarTGByModalidad = async (req, res) => {
    const id = req.params.id;
    
    try {
        const buscar = await TG.findAll({
            where: {
                modalidad: id
            }
        });
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("TG no encontrado");
    }
}

export const evaluacionComite = async (req, res) => {
    const id = req.params.id;
    const { desicion_comite } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.estatus = desicion_comite;
        buscar.fecha_ctg = new Date()
        const actualizar = await buscar.save();
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en evaluación de comite");
    }
}

export const evaluacionRevisor = async (req, res) => {
    const id = req.params.id;
    const { desicion_revisor } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.estatus = desicion_revisor;
        buscar.fecha_revision = new Date()
        const actualizar = await buscar.save();
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en evaluación de revisor");
    }
}

export const evaluacionCDE = async (req, res) => {
    const id = req.params.id;
    const { desicion_cde } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.estatus = desicion_cde;
        buscar.fecha_cde = new Date()
        const actualizar = await buscar.save();
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en evaluación de consejo de escuela");
    }
}

export const asignarTutorAcademico = async (req, res) => {
    const id = req.params.id;
    const { id_tutor_academico } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.id_tutor_academico = id_tutor_academico;

        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en asignacion de tutor academico");
    }
}

export const asignarRevisor = async (req, res) => {
    const id = req.params.id;
    const { id_profesor_revisor } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.id_profesor_revisor = id_profesor_revisor;
        const actualizar = await buscar.save();
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en asignacion de revisor");
    }
}

export const asignarTutorEmpresarial = async (req, res) => {
    const id = req.params.id;
    const { id_tutor_empresarial } = req.body;

    try {
        const buscar = await TG.findOne({
            where: {
                id_tg: id
            }
        });

        buscar.id_tutor_empresarial = id_tutor_empresarial;

        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en asignacion de tutor empresarial");
    }
}

export const buscarTGByEstatus = async (req, res) => {
    const id = req.params.id;

    try {
        const buscar = await TG.findAll({
            where: {
                estatus: id
            }
        });
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en busqueda por estatus");
    }
}

export const obtenerTGSinRevisor = async (req, res) => {
    try {
        const buscar = await TG.findAll({
            where: {
                estatus: 'PR',
                id_profesor_revisor: {
                    [Op.eq]: null
                }
            }
        });
        console.log(buscar)
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en busqueda por estatus");
    }
}

export const obtenerTGConRevisor = async (req, res) => {
    try {
        const buscar = await TG.findAll({
            where: {
                estatus: 'PR',
                id_profesor_revisor: {
                    [Op.ne]: null
                }
            }
        });
        console.log(buscar)
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en busqueda por estatus");
    }
}

export const obtenerEstudiantesDeTG = async (req, res) => {
    const id = req.params.id
    try {
        const buscar = await TG.findAll({
            include: {
                model: Realiza_tg,
                include: {
                    model: Estudiantes
                },
    
            },
            where: {
                id_tg: id
            }
        });
        console.log(buscar)
        return res.json(buscar);
    } catch (error) {
        return res.status(404).json("Error en busqueda por estatus");
    }
}