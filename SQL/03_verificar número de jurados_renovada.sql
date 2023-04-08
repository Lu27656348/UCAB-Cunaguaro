DROP FUNCTION IF EXISTS verificar_jurados;
CREATE OR REPLACE FUNCTION verificar_jurados()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
	max_jurados_principales INTEGER;
	conteo_principales INTEGER;
BEGIN
	max_jurados_principales := 4;
	conteo_principales := 0;
	SELECT INTO conteo_principales COUNT(*)
	FROM Jurados
	WHERE Jurados.id_tg = NEW.id_tg
	AND NEW.tipo = Jurados.tipo;
	
	IF conteo_principales >= 2 AND NEW.tipo = 'J' THEN
		RAISE EXCEPTION 'Ya ha alcanzado el maximo numero de jurados principales';
	END IF;
	
	IF conteo_principales >= 2 AND NEW.tipo = 'S' THEN
		RAISE EXCEPTION 'Ya ha alcanzado el maximo numero de jurados suplentes';
	END IF;
	
	RETURN NEW;
END;
$$
;

DROP TRIGGER IF EXISTS verificar_jurado_trigger ON Jurados
CREATE TRIGGER verificar_jurado_trigger 
    BEFORE INSERT OR UPDATE ON Jurados
    FOR EACH ROW EXECUTE PROCEDURE verificar_jurados();