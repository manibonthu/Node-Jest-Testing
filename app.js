const express = require('express');
const app = express(),
PORT = process.env.PORT || 3000,
mongodb = require("./db/mongodb.connection"),
todoRoutes = require('./Routes/todo.route');

mongodb.connect(),

app.use(express.json());
app.use('/todos',todoRoutes);
app.get('/',(req,res) => {
    res.json("Hello world");
})
app.listen(PORT,() => {
    console.log(`Server is listening at PORT ${PORT} `);
});

module.exports = app;
