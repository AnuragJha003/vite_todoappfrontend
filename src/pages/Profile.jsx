import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  //accessing the details using the user and usecontext directlly 
  return loading ? (//if loading true call the loader componeent
    <Loader />
  ) : ( //else just print the name and email u have got from the user profile in a good UI fashion 
    <div> 
      <h1>{user?.name}</h1>  
      <p>{user?.email}</p>
    </div>
  );//accessing the user.name and user.email
};

export default Profile;