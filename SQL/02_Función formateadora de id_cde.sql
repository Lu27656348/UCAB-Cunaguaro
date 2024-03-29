CREATE FUNCTION formato_de_id_cde(id INT)
RETURNS TEXT
AS
$$
  SELECT TO_CHAR(id,'FM000') || '-' || EXTRACT('Year' FROM CURRENT_DATE) || '-' || EXTRACT ( 'Year' FROM (CURRENT_DATE + 365) );
$$
LANGUAGE SQL
IMMUTABLE;