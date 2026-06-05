import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react"; 
import DateFormat from "./utils/DateFormat";

const App = () => {
  const { register, handleSubmit, reset,setValue} = useForm();
  const [tasks, setTasks] = useState([]);
  const [editID,setEditID]=useState(null);

  async function showApi() {
    await axios.get(`${import.meta.env.VITE_API_URL}/tasks`).then((res) => {
      console.log(res.data.records);
      setTasks(res.data.records);
    });
  }

  useEffect(() => {
    showApi();
  }, []);

      async function addTask(data) {
      try {
        if (editID) {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/tasks/${editID}`,
            data
          );

          alert("Task Updated Successfully");
          setEditID(null);
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/tasks`,
            data
          );

          alert("Task Added Successfully");
        }

        reset();
        showApi();
      } catch (err) {
        console.log(err);
      }
    }

  async function deleteTask (id)  
  {
    if (!window.confirm("Do you want to delete this task?")) return;

    try{
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );

      // Remove task from UI instantly
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const editTask=(task)=>
  {
      setValue("title",task.title);
      setValue("description",task.description);
      setValue("date",task.date.split("T")[0]);

      setEditID(task._id);
  }

  // async function updateTask(id,data)
  // { 
  //     try {
  //     await axios.put(
  //       `${import.meta.env.VITE_API_URL}/tasks/${id}`,
  //       data
  //     );

  //     alert("Task Updated Successfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <div>
      <div className="col-lg-6 mx-auto p-5 my-5 shadow">
        <h1 className="text-center">Task Management System</h1>
        <form action="" onSubmit={handleSubmit(addTask)}>
          <input type="text" {...register("title")} placeholder="Enter Title" className="form-control mb-3"/>
          <input
            type="text"
            {...register("description")}
            placeholder="Enter Description"
          className="form-control mb-3"/>
          <input type="date" {...register("date")} className="form-control mb-3"/>
          <button className={`btn ${editID ? "btn-warning" : "btn-success"}`}>
            {editID ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      <div className="my-5 container">
        <div className="row g-4">
          {tasks.map((task, index) => {

            return (
              <div className="col-lg-4" key={index}>
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>{DateFormat(task.date)}</p>
                    {/* <p>Created Date: {task.createdAt}</p> */}
                    <p>Updated Date: {DateFormat(task.updatedAt)}</p>
                    <div className="btn-group">
                      <button className="btn btn-danger" onClick={()=>deleteTask(task._id)}>Delete</button>
                      <button className="btn btn-warning" onClick={()=>editTask(task)}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
