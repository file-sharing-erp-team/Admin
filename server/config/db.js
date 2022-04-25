const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME,            //Название базы данных
    process.env.DB_USER,            //Имя пользователя
    process.env.DB_PASSWORD,        //Пароль
    {
        dialect:"postgres",         //Драйвер
        host:process.env.DB_HOST,   //Хост
        port:process.env.DB_PORT,   //Порт
    }
);
