const expess = require('express');
const app = expess();
const port = 3000;
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.engine('.hbs', expressHbs.engine({
    extname: "hbs"
}));

app.set('view engine', '.hbs');
app.use('/product', productController);

app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
});