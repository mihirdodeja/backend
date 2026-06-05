//Insert
const Task=require('../models/taskModel');
const store=(req,res)=>
{
    // console.log("store")
    const {title,description,date}=req.body
    console.log(req.body)
    Task.create({title,description,date})
    .then(()=>
    {
        res.json(
            {
                success:true,
                message:"Task Added"
            }
        )
    })
    .catch(err=>console.log(err));

}

//GET
const index =async(req,res)=>
{
    const records=await Task.find()
    .then((records)=>
    {
        res.json(
            {
                success:true,
                message:"Tasks Fetched Successfully",
                records
            }
        )

    })
    .catch(err=>console.log(err))
}

// DELETE
const trash= async(req,res)=>
{
    const deletedTask=await Task.findByIdAndDelete(req.params.id)
    .then(()=>
    {
        res.json(
            {
                success:true,
                message:"Task Deleted Successfully"
            }
        )
    })
    .catch(err=>console.log(err))
}

// UPDATE
const update=async(req,res)=>
{
    const {id}=req.params;
    const{title,description,date}=req.body;

    await Task.findByIdAndUpdate(
        id,
        {title,description,date}
    )
    .then
    (
        res.json(
            {
                success:true,
                message:"Task Updated Successfully"
            }
        )
    )
    .catch(err=>console.log(err));
    
}


module.exports={store,index,trash,update};