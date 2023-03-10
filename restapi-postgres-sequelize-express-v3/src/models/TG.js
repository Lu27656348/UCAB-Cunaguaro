import { DataTypes, TEXT } from "sequelize";
import { sequelize } from '../database/database.js';
import { Realiza_tg } from "./realiza_PT.js";

export const TG = sequelize.define('tg', {
    id_tg: {
        type: DataTypes.TEXT,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    modalidad: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: 'E'
    },
    estatus: {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: 'PA'
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    fecha_ctg: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    fecha_cde: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    fecha_revision: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    fecha_defensa: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    id_profesor_revisor: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null
    },
    id_tutor_academico: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null
    },
    id_tutor_empresarial: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
},{
    timestamps:false
});

TG.hasOne(Jurados, {
    foreignKey: 'id_tg',
    sourceKey: 'id_tg'
});

id_tg.belongsTo(TG, {
    foreignKey: 'id_tg',
    targetId: 'id_tg'
});

TG.hasOne(Realiza_tg, {
    foreignKey: 'id_tg',
    sourceKey: 'id_tg'
});

Realiza_tg.belongsTo(TG, {
    foreignKey: 'id_tg',
    targetId: 'id_tg'
});