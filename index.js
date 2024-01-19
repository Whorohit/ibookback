const express=require('express')
const  mongo= require('./db')
const cors = require('cors') 
 const athu=require('./routers/athu')
 const notes=require('./routers/notes')
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.post('/api/auth',require('./routers/athu'))
app.post('/api/login',require('./routers/athu'))
 app.get('/api/allnotes',require('./routers/notes'))
 app.post('/api/updatenote/:id',require('./routers/notes'))
 app.get('/api/deletenote/:id',require('./routers/notes'))
 app.post('/api/savenote',require('./routers/notes'))
 app.get('/api/getuser',require('./routers/athu'))

mongo()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})