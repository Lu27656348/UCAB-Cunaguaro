import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js';
import { TG } from "./TG.js";

export const Empresas = sequelize.define('empresas', {
    id_empresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telefono: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps:false
});

Empresas.hasOne(TG, {
    foreignKey: 'id_empresa',
    sourceKey: 'id_empresa'
});

TG.belongsTo(Empresas, {
    foreignKey: 'id_empresa',
    targetId: 'id_empresa'
});