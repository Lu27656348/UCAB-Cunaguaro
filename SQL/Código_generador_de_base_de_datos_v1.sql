/* Lista para limpieza en la base de datos */
DROP TABLE IF EXISTS realiza_TG;
DROP TABLE IF EXISTS Administradores;
DROP TABLE IF EXISTS Jurados;
DROP TABLE IF EXISTS TG;
DROP TABLE IF EXISTS Estudiantes;
DROP TABLE IF EXISTS Profesores;
DROP TABLE IF EXISTS Externos;
DROP TABLE IF EXISTS Empresas;
DROP TABLE IF EXISTS CDE;
DROP TABLE IF EXISTS Especialidades;
DROP TABLE IF EXISTS Areas;
DROP TABLE IF EXISTS Controladores;

/* Entidades sin claves foraneas */
CREATE TABLE IF NOT EXISTS Estudiantes (
	cedula VARCHAR(10) NOT NULL,
	nombres TEXT NOT NULL,
	apellidos TEXT NOT NULL,
	email TEXT NOT NULL,
	telefono TEXT DEFAULT NULL,
	oficina TEXT DEFAULT NULL,
	habitacion TEXT DEFAULT NULL,
	PRIMARY KEY (cedula)
);

CREATE TABLE IF NOT EXISTS Profesores (
	cedula VARCHAR(10) NOT NULL,
	nombres TEXT NOT NULL,
	apellidos TEXT NOT NULL,
	email TEXT NOT NULL,
	telefono TEXT DEFAULT NULL,
	oficina TEXT DEFAULT NULL,
	experiencia INTEGER DEFAULT NULL,
	habitacion TEXT DEFAULT NULL,
	graduado INTEGER DEFAULT NULL,
	cargo TEXT DEFAULT NULL,
	PRIMARY KEY (cedula)
);

CREATE TABLE IF NOT EXISTS Externos (
	id_externo SERIAL NOT NULL,
	nombres TEXT NOT NULL,
	apellidos TEXT NOT NULL,
	cedula VARCHAR(10) DEFAULT NULL,
	email TEXT DEFAULT NULL,
	telefono TEXT DEFAULT NULL,
	oficina TEXT DEFAULT NULL,
	experiencia INTEGER DEFAULT NULL,
	habitacion TEXT DEFAULT NULL,
	graduado INTEGER DEFAULT NULL,
	cargo TEXT DEFAULT NULL,
	PRIMARY KEY (id_externo)
);

CREATE TABLE IF NOT EXISTS Empresas (
	id_empresa SERIAL NOT NULL,
	nombre TEXT NOT NULL,
	direccion TEXT NOT NULL,
	telefono TEXT NOT NULL,
	PRIMARY KEY (id_empresa)
);

CREATE TABLE IF NOT EXISTS CDE (
	id_cde TEXT NOT NULL,
	fecha_conformacion DATE DEFAULT CURRENT_DATE,
	PRIMARY KEY (id_cde)
);

CREATE TABLE IF NOT EXISTS Areas (
	nombre_area TEXT NOT NULL,
	PRIMARY KEY (nombre_area)
);
/* Entidades con claves foraneas - Relaciones uno a muchos */
--CREATE SEQUENCE secuencia_tg;
CREATE TABLE IF NOT EXISTS TG (
	id_tg SERIAL PRIMARY KEY,
	id_tg_formateado TEXT GENERATED ALWAYS AS ( formato_de_id_tg(id_tg)) STORED,
	titulo VARCHAR(200) NOT NULL,
	modalidad CHAR NOT NULL DEFAULT 'E' CHECK (modalidad IN('E','I')),
	estatus TEXT NOT NULL DEFAULT 'PC' CHECK (estatus IN ('PA','PC','PR','R','PE','A')),
	fecha_solicitud DATE DEFAULT CURRENT_DATE,
	fecha_ctg DATE DEFAULT NULL,
	fecha_cde DATE DEFAULT NULL,
	fecha_revision DATE DEFAULT NULL,
	fecha_defensa DATE DEFAULT NULL,
	id_profesor_revisor VARCHAR(10) DEFAULT NULL,
	id_tutor_academico VARCHAR(10) DEFAULT NULL,
	id_tutor_empresarial INTEGER DEFAULT NULL,
	id_cde TEXT DEFAULT NULL,
	FOREIGN KEY (id_profesor_revisor) REFERENCES Profesores(cedula)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT,
	FOREIGN KEY (id_tutor_academico) REFERENCES Profesores(cedula)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT,
	FOREIGN KEY (id_tutor_empresarial) REFERENCES Externos(id_externo)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT,
	FOREIGN KEY (id_cde) REFERENCES CDE(id_cde)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Especialidades (
	nombre_especialidad TEXT NOT NULL,
	area TEXT NOT NULL,
	PRIMARY KEY (nombre_especialidad),
	FOREIGN KEY (area) REFERENCES Areas(nombre_area) 
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);
/* Entidades con claves foraneas - Relaciones muchos a muchos */
CREATE TABLE IF NOT EXISTS Jurados (
	cedula_profesor VARCHAR(10) NOT NULL,
	id_tg INTEGER NOT NULL,
	fecha_designacion DATE DEFAULT CURRENT_DATE,
	tipo CHAR NOT NULL CHECK( tipo IN ('S','J')),
	PRIMARY KEY (cedula_profesor,id_tg),
	FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula) 
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	FOREIGN KEY (id_tg) REFERENCES TG(id_tg) 
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);
/* Entidades particulares */
CREATE TABLE IF NOT EXISTS Administradores (
	id_usuario SERIAL,
	cedula_administrador TEXT NOT NULL,
	nombres TEXT NOT NULL,
	apellidos TEXT NOT NULL,
	contrasena TEXT NOT NULL,
	PRIMARY KEY (id_usuario),
	FOREIGN KEY (cedula_Administrador) REFERENCES Profesores(cedula)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS Controladores (
	id_controlador INTEGER NOT NULL,
	fecha_inicio_entrega_solicitud DATE NOT NULL,
	fecha_fin_entrega_solicitud DATE NOT NULL,
	estatus CHAR(1) DEFAULT ('D'),
	PRIMARY KEY (id_controlador)
);

CREATE TABLE IF NOT EXISTS realiza_TG (
	cedula_estudiante TEXT,
	id_tg INTEGER,
	fecha_entrega_informe DATE DEFAULT NULL,
	PRIMARY KEY(cedula_estudiante,id_tg),
	FOREIGN KEY (cedula_estudiante) REFERENCES Estudiantes(cedula)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT,
	FOREIGN KEY (id_tg) REFERENCES TG(id_tg)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
