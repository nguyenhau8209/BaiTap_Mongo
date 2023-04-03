const express = require('express');
const productModel = require('../model/product');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb+srv://hauncph23182:KDCmBivkwk8nWTJI@mydatabase.inj6nec.mongodb.net/product?retryWrites=true&w=majority';


app.get('/', (req, res) => {
    res.render('product/addOrEdit.hbs', {
        viewTitle: "Insert Product"
    });
});

// add data
app.post('/add', async (req, res) =>{
    await mongoose.connect(uri).then(console.log('ket noi db thanh cong'));

    console.log(req.body);
    if (req.body.id == '') {
        //add user
        addRecord(req, res);
    }else{
        //update user
        updateRecord(req, res);
    }
    
});
function addRecord(req, res){
    const u = new productModel(req.body);
    try {
        u.save();
        res.render('product/addOrEdit.hbs', {
            viewTitle: "Insert product successfully"
        })
    } catch (error) {
        res.status(500).send(error);
    }
};
function updateRecord(req, res){
    
    productModel.findOneAndUpdate({_id:req.body.id}, req.body, {useFindAndModify: false})
    .then(data =>{
        if(!data){
            console.log(`${data} not found`);
            res.render('product/addOrEdit.hbs', {
                viewTitle: "Update False",
            })
        }else{
            res.redirect('/product/list');
        }
    })
};

// app.get('/list', (req, res) =>{
//     res.render('user/view-users.hbs', {
//         viewTitle: "List User"
//     })
// });
app.get('/list',  async (req, res) =>{
    await mongoose.connect(uri).then(console.log('ket noi db thanh cong'));

    productModel.find({}).then(products =>{
        res.render('product/view-products.hbs', {
            viewTitle: "List product",
            products: products.map(product => product.toJSON())
        });
    });
    
});

//edit

app.get('/edit/:id', async (req, res) =>{
    await mongoose.connect(uri).then(console.log('ket noi db thanh cong'));
    const id = req.params.id;
    productModel.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `cannot update user with id ${id}. maybe user not found`});
        }else {
            res.render('product/addOrEdit.hbs', {
                viewTitle: "Update product",
                data: data.toJSON()
            })
            console.log(data);
        }
    })
})
//delete
app.get('/delete/:id', async (req, res) =>{
    await mongoose.connect(uri).then(console.log('ket noi db thanh cong'));
    const id = req.params.id;
    productModel.findByIdAndDelete(id, req.body, {useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `cannot delete user with id ${id}. maybe user not found`});
        }else {
            res.redirect('/product/list');
            console.log(data);
        }
    })
})
module.exports = app;