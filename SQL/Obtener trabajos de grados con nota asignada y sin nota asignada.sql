SELECT T.* 
FROM TG AS T, Jurados AS J, Realiza_tg AS RT
WHERE T.id_tg = J.id_tg
AND RT.id_tg = T.id_tg
AND RT.nota IS NULL
GROUP BY T.id_tg

SELECT T.* 
FROM TG AS T, Jurados AS J, Realiza_tg AS RT
WHERE T.id_tg = J.id_tg
AND RT.id_tg = T.id_tg
AND RT.nota IS NOT NULL
GROUP BY T.id_tg

SELECT T.*
FROM Realiza_tg AS R, TG AS T
WHERE R.id_tg = T.id_tg
GROUP BY T.id_tg