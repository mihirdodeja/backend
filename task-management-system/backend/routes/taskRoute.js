const { store, index, trash, update } = require('../controllers/taskController')

const express=require('express')
const app=express();

app.post('/',store);
app.get('/',index);
app.delete('/:id',trash);
app.put('/:id',update);

module.exports=app
