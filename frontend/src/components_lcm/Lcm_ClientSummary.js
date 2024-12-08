import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Lcm_Footer";
import NavBar from "./Lcm_NavBar";

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

function AllClients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getClients() {
      axios
        .get("http://localhost:8070/client/getallclients") // Update with your API endpoint
        .then((res) => {
          console.log(res.data);
          setClients(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getClients();
  }, []);

  const deleteClient = (id) => {
    axios
      .delete(`http://localhost:8070/client/delete/${id}`) // Update with your API endpoint
      .then(() => {
        alert("Client deleted successfully");
        setClients(clients.filter((client) => client._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const goToUpdateClientPage = (id) => {
    navigate(`/Lcm_ClientUpdate/${id}`);
  };

  const goToClientDetailsPage = (client) => {
    navigate(`/Lcm_ClientDetails`, { state: { client } });
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="welcome-container">
          <h1 className="headline">Client Summary</h1>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn"
            onClick={() => navigate("/AddClient")} // Update the path as needed
          >
            Add New Client
          </button>
        </div>
        
        <h3 className="subhead">Current Clients</h3>
        <br />

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Client ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">NIC</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.clientId}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>{client.nic}</td>
               
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => goToClientDetailsPage(client)}
                  >
                    <VisibilityIcon /> View
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => goToUpdateClientPage(client._id)}
                  >
                    <EditIcon /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteClient(client._id)}
                  >
                    <DeleteIcon /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default AllClients;
