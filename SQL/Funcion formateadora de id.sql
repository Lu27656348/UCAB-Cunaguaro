CREATE FUNCTION formato_de_id_tg(id INT)
RETURNS TEXT
AS
$$
  SELECT 'TG' || '-' || TO_CHAR(id,'FM000');
$$
LANGUAGE SQL
IMMUTABLE;