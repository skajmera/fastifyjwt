const fastify=require('fastify')
const app = fastify();
const postRoutes=require('./routes/post')

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.register(postRoutes,{prefix:'/user'})

app.listen(5000,()=>{
    console.log("conected...http://localhost:5000");
})
