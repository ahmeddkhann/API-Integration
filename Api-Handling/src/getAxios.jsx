import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetAxios = () => {
  const [userData, setUserData] = useState([]);
  const [inputData, setInputData] = useState({
    id: "",
    theName: "",
    username: "",
    email: "",
    phone: ""
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: inputData.theName,
      username: inputData.username,
      email: inputData.email,
      phone: inputData.phone
    };

    if (editingId) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${editingId}`, newUser)
        .then((response) => {
          setUserData(userData.map(user => user.id === editingId ? response.data : user));
          setInputData({
            id: "",
            theName: "",
            username: "",
            email: "",
            phone: ""
          });
          setEditingId(null);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      axios.post("https://jsonplaceholder.typicode.com/users", newUser)
        .then((response) => {
          setUserData([...userData, response.data]);
          setInputData({
            id: "",
            theName: "",
            username: "",
            email: "",
            phone: ""
          });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const handleEdit = (user) => {
    setInputData({
      id: user.id,
      theName: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email
    });
    setEditingId(user.id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUserData(userData.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="p-10">
      <h1 className="text-green-700 mb-10 text-4xl font-bold">Student Dashboard</h1>
      <table className="border-separate border-spacing-0 border border-black w-full">
        <thead>
          <tr>
            <th className="border border-black p-2">#</th>
            <th className="border border-black p-2 text-blue-600">Name</th>
            <th className="border border-black p-2 text-green-700">Email</th>
            <th className="border border-black p-2 text-blue-400">Username</th>
            <th className="border border-black p-2 text-orange-400">Phone</th>
            <th className="border border-black p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((info, index) => (
            <tr key={info.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-300'}>
              <td className="border border-black p-2">{info.id}</td>
              <td className="border border-black p-2">{info.name}</td>
              <td className="border border-black p-2">{info.email}</td>
              <td className="border border-black p-2">{info.username}</td>
              <td className="border border-black p-2">{info.phone}</td>
              <td className="border border-black p-2">
                <div>
                  <button className="bg-blue-700 p-2 text-white rounded mr-2" onClick={() => handleEdit(info)}>Edit</button>
                  <button className="bg-red-600 p-2 text-white rounded mr-2" onClick={() => handleDelete(info.id)}>Delete</button>
                  <button className="bg-blue-400 p-2 text-white rounded" onClick={() => handleView(info.id)}>View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-20 text-white bg-gray-600 py-20">
        <h1 className="text-center text-4xl mb-5">
          {editingId ? 'Update Your Data' : 'Add Your Data'}
        </h1>
        <div className="flex space-x-20 ml-10">
          <div className="mb-2">
            <label className="block">ID</label>
            <input
              type="number"
              name="id"
              value={inputData.id}
              onChange={handleData}
              className="border text-black border-gray-300 p-1"
              placeholder="Enter ID..."
              disabled={editingId !== null}
            />
          </div>

          <div className="mb-2">
            <label className="block">Name:</label>
            <input
              type="text"
              name="theName"
              value={inputData.theName}
              onChange={handleData}
              className="border text-black border-gray-300 p-1"
              placeholder="Enter Name..."
            />
          </div>

          <div className="mb-2">
            <label className="block">Username:</label>
            <input
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleData}
              className="border text-black border-gray-300 p-1"
              placeholder="Enter Username..."
            />
          </div>
        </div>

        <div className="flex space-x-20 ml-10">
          <div className="mb-2">
            <label className="block">Email:</label>
            <input
              type="text"
              name="email"
              value={inputData.email}
              onChange={handleData}
              className="border text-black border-gray-300 p-1"
              placeholder="Enter Email..."
            />
          </div>

          <div className="mb-2">
            <label className="block">Phone:</label>
            <input
              type="text"
              name="phone"
              value={inputData.phone}
              onChange={handleData}
              className="border text-black border-gray-300 p-1"
              placeholder="Enter Phone Number..."
            />
          </div>

          <div className="mt-5">
            <button className="bg-green-400 p-2 rounded-2xl text-white" onClick={handleSubmit}>
              {editingId ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAxios;
