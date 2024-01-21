const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const methodOverrider = require('method-override');


const app = express();

const port = 8080;

let posts = [
    {
        id: uuidv4(),
        username: 'Awanish Kumar',
        content: 'I am good at coding.'
    },
    {
        id: uuidv4(),
        username: 'Anshu Raj',
        content: 'I am good at GYM.'
    },
    {
        id: uuidv4(),
        username: 'Nitin Shivam',
        content: 'I am good at sleeping.'
    }

];


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverrider('_method'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




app.get('/',(req,res)=>{
    res.send("Server is working.");
});

app.get('/posts',(req, res)=>{
    res.render('index.ejs', {posts});
});

app.get('/posts/new', (req,res)=>{
    res.render('new.ejs');
});

app.get('/posts/:id', (req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> post.id===id);
    if(post){
        res.render('show.ejs', {post});
    }
    else{
        res.send('ID not found.');
    }
});

app.get('/posts/:id/edit', (req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> post.id===id);
    if(post){
        res.render('edit.ejs', {post});
    }
    else{
        res.send('ID not found.');
    }
});

app.patch('/posts/:id', (req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> post.id===id);
    if(post){
        post.content = req.body.content;
        res.redirect('http://localhost:8080/posts');
    }
    else{
        res.send('ID not found.');
    }
});

app.delete('/posts/:id', (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((post)=> post.id!==id);
    res.redirect('http://localhost:8080/posts');
});

app.post('/posts', (req,res)=>{
    let {username, content}=req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect('http://localhost:8080/posts');
});


app.listen(port, ()=>{
    console.log('App is listening '+port);
});