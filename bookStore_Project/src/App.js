const express=require("express");
const app=express();

const bookStore=[];

app.use(express.json());

app.get("/new", (req, res) => 
{
    const index = req.params.index;

    console.log(req.body);

    res.status(200).json({
        book: bookStore[index]
    });
});

app.post("/new",(req,res)=>
{
    console.log(req.body);
    res.send("Book Added Successfully");
});

app.delete("/new/:index",(req,res)=>
{
    const index=req.params.index;
  
    bookStore.splice(index, 1);

    console.log(req.body);

    res.status(200).json(
        {
            "message":"Book Deleted Successfully",
            books:bookStore
        }
    )
})
app.patch("/new/:index",(req,res)=>
{
    const index=req.params.index;
    
    const {name,genre}=req.body;

    bookStore[index].name=name;
    bookStore[index].genre=genre;
    
    res.status(200).json(
        {
            "message":"Book Updated Successfully",
            book:bookStore[index]
        }
    )
})

module.exports=app;