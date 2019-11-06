const express = require('express');
const app = express(),
PORT = process.env.PORT || 3000,
mongodb = require("./db/mongodb.connection"),
todoRoutes = require('./routes/todo.route');

mongodb.connect(),

app.use(express.json());
app.use('/todos',todoRoutes);

/*
error Handling
*/
app.use((error,req,res,next) => {
    res.status(500).json( {message : error.message});
});
app.listen(PORT,() => {
    console.log(`Server is listening at PORT ${PORT} `);
});

module.exports = app;
