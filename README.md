--------------------------------------------------------------------

para iniciar el back
cd Database
npm install
npm run migrate-dev up
npm start
--------------------------------------------------------------------


para iniciar el front

cd CentroMedico
npm install
npm run dev
-------------------------------------------------------------------


la aplicacion corre con 2 usuarios (vienen en las migraciones)

User: a@a.com
Password: 1234
es el usuario que trabaja en secretaria
-----------------------------------
User: m@m.com
Password: 1234
es un medico
----------------------------------

la aplicacion tiene cargado tambien un usuario de rol paciente para realizar 
la prueba de carga de turno.



-----------------------------------------------------------------------------

archivo .env en raiz de Database


ENV=development
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/
MONGO_URL_AUTH_ENABLED=mongodb://user:password@127.0.0.1:27017/
MONGO_DB=consultorio2

-----------------------------------------------------------------------------

