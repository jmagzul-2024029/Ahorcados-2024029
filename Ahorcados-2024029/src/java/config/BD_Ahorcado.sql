Drop database if exists DB_Ahorcado;
create database DB_Ahorcado;
Use DB_Ahorcado;

Create table Palabras(
	idPalabra int auto_increment,
    textoPalabra varchar(255) not null,
    pista1 varchar(255) not null,
    pista2 varchar(255) not null,
    pista3 varchar(255) not null,
	primary key PK_idPalabra(idPalabra)
);

CREATE TABLE Usuarios (
    idUsuario int auto_increment,
    correoUsuario varchar(255) not null,
    contrasena varchar(255) not null,
    primary key PK_idUsuario(idUsuario)
);

Delimiter $$
Create procedure sp_AgregarPalabra(in p_textoPalabra varchar(255), 
	in p_pista1 varchar(255), 
    in p_pista2 varchar(255), 
	in p_pista3 varchar(255)
	)
    Begin
    Insert into Palabras(textoPalabra, pista1, pista2, pista3)
    Values(p_textoPalabra, p_pista1, p_pista2, p_pista3);
End$$
Delimiter ;
call sp_AgregarPalabra('DRAGONBALL','Es una historia donde luchadores buscan esferas mágicas.','El protagonista es un guerrero de gran poder que puede cambiar su color de pelo.','La amistad, el entrenamiento y la superación personal son temas centrales de esta aventura.');
call sp_AgregarPalabra('MARIPOSA','Es un insecto que sufre metamorfosis.','Tiene alas coloridas y vuela de flor en flor.','Antes fue una oruga que se envolvió en un capullo.');
call sp_AgregarPalabra('DINOSAURIO','Reptiles que dominaron la Tierra hace millones de años.','Se extinguieron hace aprocimadamente 65 millones de años.','Hay unos carnívoros y otros herbívoros, algunos volaban.');
call sp_AgregarPalabra('MEDICINA','Ciencia que estudia enfermedades y su tratamiendo.','Los profesionales de esra área salvan vidas.','Incluye especualidades como cardiología y pediatría');
call sp_AgregarPalabra('AVENTURA','Palabra que significa una experiencia emocionante','Los exploradores y viajeros la buscan constantemente.','Puede involucrar riesgos y descubrimientos nuevos');
call sp_AgregarPalabra('BIBLIOTECA','Es un lugar donde se guardan libros','Suele ser un lugar silecioso.','Se puede estudiar o investigar en ese lugar');
call sp_AgregarPalabra('PASAPORTE','Documento necesario para viajar a otro país','Contiene fotografía y datos personales.','Lo revisan en migración');

Delimiter $$
create procedure sp_ListarPalabras()
begin
	select * from Palabras;
end$$
Delimiter ;
call sp_ListarPalabras();

Delimiter $$
create procedure sp_AgregarUsuario(
    IN p_correoUsuario VARCHAR(255),
    IN p_contrasena VARCHAR(255)
)
begin
    insert into Usuarios(correoUsuario, contrasena)
    values(p_correoUsuario, p_contrasena);
end$$
Delimiter ;

CALL sp_AgregarUsuario('juan.perez@email.com', '1234pass');
CALL sp_AgregarUsuario('maria.lopez@email.com', 'abcD!2022');
CALL sp_AgregarUsuario('carlos.mendoza@email.com', 'miContraseñaSegura');
CALL sp_AgregarUsuario('laura.gomez@email.com', 'qwerty123');
CALL sp_AgregarUsuario('admin@juegoahorcado.com', 'admin2025');

Delimiter $$
create procedure sp_ListarUsuarios()
begin
    select * from Usuarios;
end$$
Delimiter ;

CALL sp_ListarUsuarios();
