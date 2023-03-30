CREATE OR REPLACE FUNCTION encriptarClave(clave TEXT)
RETURNS TEXT
AS
$$
	SELECT crypt(clave, gen_salt('bf', 4));
$$
LANGUAGE SQL
IMMUTABLE;

SELECT encriptarClave('HolaMundo');

