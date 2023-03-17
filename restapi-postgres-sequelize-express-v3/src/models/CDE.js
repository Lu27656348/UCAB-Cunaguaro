import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js';

export const CDE = sequelize.define('cde', {
    id_cde: {
        type: DataTypes.TEXT,
        primaryKey: true,
    },
    id_cde_formateado: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
    },
    resumen_cde: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
    },
    fecha_conformacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
},{
    timestamps:false
});