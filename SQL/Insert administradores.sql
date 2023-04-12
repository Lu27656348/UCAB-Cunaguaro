INSERT INTO Profesores(cedula,nombres,apellidos,email) VALUES ('11111111', 'Luz Esperanza','Medina','lemedinac@ucab.edu.ve');
INSERT INTO Administradores(cedula_administrador, nombres,apellidos,contrasena) VALUES ('11111111', 'Luz Esperanza','Medina','admin');
INSERT INTO Administradores(cedula_administrador, nombres,apellidos,contrasena) VALUES ('1', 'Franklin','Bello',encriptarClave('admin'));

SELECT crypt('admin', gen_salt('bf', 4));
SELECT crypt('admin', gen_salt('bf', 4));