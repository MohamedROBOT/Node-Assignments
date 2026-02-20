import {Sequelize} from 'sequelize';

const sequelize = new Sequelize("sequelize", "root", "muhammetevil", {
    host: "localhost",
    dialect: "mysql"
});


 const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
}


export {sequelize, connectDB};