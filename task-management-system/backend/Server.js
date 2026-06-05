const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const cors=require('cors');

require('dotenv').config()
require('./config/db')()

//IMPORT
const taskRoute=require('./routes/taskRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/tasks',taskRoute)

app.get('/',(req,res)=>
{
    res.send('Hello');
})

app.listen(PORT,()=>
{
    console.log('Server is Running on PORT 3000');
})