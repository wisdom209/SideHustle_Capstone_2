const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/UserRouter')
const fileUpload = require('express-fileupload')
const app = express();
const fileUpload = require('express-fileupload')
const port = 4000;

app.use(fileUpload({
    useTempFiles : true
}))
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',userRoutes)


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})











