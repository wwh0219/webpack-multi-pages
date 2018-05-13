const express=require('express')
const app=express();
app.use('/boe',express.static('./dist'));
app.listen(3000)