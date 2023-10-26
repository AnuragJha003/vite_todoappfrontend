import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  //use state as the state of these variables changes and the default initial value is ""
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  //usestate variable name and setvar_name this is the norm 
  const [refresh, setRefresh] = useState(false);
  //refresh and setrefresh usestate to get value like update/delete shown asap
  //all these created in here for usestate and all 
  const { isAuthenticated } = useContext(Context);
  //and for a functiion we do usecontext with teh context object(import it)

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);//setrefresh prev ka opp value
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //update task function written and the url routing is done in here
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      //routing done in here 

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
//delete handler function written self explainable
  const submitHandler = async (e) => {
    //creating the function 
    e.preventDefault();
    try {
      setLoading(true);//setload true
      const { data } = await axios.post(// get the api from axios
        `${server}/task/new`,//and the url is /task/new route for new task data created
        {
          title,
          description,
        },//the data given 
        {//to be sure it is json form api
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);//set the title description 
      //loading to false and toast 
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }//add something in the catch block for error handling 
  };

  useEffect(() => {//useeffect to get all the task whcih r being added
    axios
      .get(`${server}/task/my`, { //get route
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);//settasks response data .tasks
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  //if authenticated not then navigate/redirect  to the login 
//navigate is a part of the react router dom no need to write anything abt it 
  return ( //the structure ctreated and all sections and all added
  //forms given with functions like settitle submithandler
  //inputs taken with placeholder and onchange given to it with functions assigned to it 
  //buttons added to it 

    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (//create a new section and we r mapping over the tasks we get
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted} //title descriptuon completed the props of i 
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id} //update and delted task function added along with ids and all
            // todoitem created for better display of the tasks 
          />
        ))}  
      </section>
    </div>
  );
};

export default Home;
