const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true });
const {Book} = require('./model/books')

const {Store} = require('./model/stores')


// __dirname will give current location of the file 'server.js'
app.use(express.static(__dirname+'/../public'))
app.use(bodyParser.json())
app.post('/api/add/store',(req, res)=>{
    const store = new Store({
        name:req.body.name,
        phone:req.body.phone,
        address:req.body.address,

    })
    store.save((err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send();
    
    
    })
})

app.get('/api/stores',(req, res)=>{
    Store.find((err,doc)=>{
        if(err) res.status(400).send(err)
        //console.log(doc);
        res.send(doc);
     })
    
 })

 app.post('/api/add/book',(req, res)=>{
    const book = new Book({
     
        name:req.body.name,
        author:req.body.author,
        pages:req.body.pages,
        price:req.body.price,
        stores:req.body.stores,

    })
    book.save((err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send();
    
    
    })
})

app.get('/api/books',(req, res)=>{
    Book.find((err,doc)=>{
        if(err) res.status(400).send(err)
        //console.log(doc);
        res.send(doc);
     })
    
 })

 
 app.get('/api/books/:id',(req, res)=>{
     let bookId = req.params.id;

    Book.findById(bookId,(err,doc)=>{
        if(err) res.status(400).send(err)
        //console.log(err);
        res.send(doc);
     })
    
 })

 app.patch('/api/books/:id',(req, res)=>{
    // Book.findOneAndUpdate({_id:req.params.id},{$set:req.body },
    //     {new:true},
    //     (err,doc)=>{
    //     if(err) res.status(400).send(err)
    //     res.status(200).send(doc); 
    // })
    Book.findByIdAndUpdate(req.params.id,{$set:req.body },
        {new:true},
        (err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(doc); 
    })

})


app.delete('/api/books/:id',(req, res)=>{
    let bookId = req.params.id;

   Book.findByIdAndRemove(bookId,(err,doc)=>{
       if(err) res.status(400).send(err)
       //console.log(err);
       res.redirect(index.html);
    })
   
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is running ${port}`);
})
