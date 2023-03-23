import { DataTypes, TEXT } from "sequelize";
import { sequelize } from '../database/database.js';
import { Realiza_tg } from "./realiza_PT.js";
import { Jurados } from "./Jurados.js";
import { Planillas } from "./Planillas.js";

export const TG = sequelize.define('tg', {
    id_tg: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_tg_formateado: {
        type: DataTypes.TEXT,
        defaultValue: null
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
        defaultValue: 'PC'
    },
    fecha_solicitud: {
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

Jurados.belongsTo(TG, {
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

TG.hasOne(Planillas, {
    foreignKey: 'id_tg',
    sourceKey: 'id_tg'
});

Planillas.belongsTo(TG, {
    foreignKey: 'id_tg',
    targetId: 'id_tg'
});