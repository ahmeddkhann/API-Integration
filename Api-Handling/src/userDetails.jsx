import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("https:jsonplaceholder.typicode.com/users/${id}")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);
   
  if (!user) return <p>Loading...</p>

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-5">Student Profile</h1>
      <div className="bg-gray-800 p-5 text-white rounded-lg shadow-md">
        
        <h1 className="text-3xl ">Name:{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  );
};

export default UserDetails;