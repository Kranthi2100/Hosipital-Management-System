const path = require('path');
const express = require('express');
const port = 3000;
app = express();
const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));

app.get('*', (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})
app.listen(port, ()=>{
    console.log('server is up and running!');
})