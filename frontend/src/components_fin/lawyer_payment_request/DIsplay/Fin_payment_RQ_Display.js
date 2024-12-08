import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import './Fin_Payment_RQ_Display.css';
import Nav from "../Fin_payment_RQ_navBar";

function Fin_Payment_RQ_Display() {
    const [users, setUsers] = useState([]);

    // Fetch data from the backend
    const fetchHandler = async () => {
        const url = 'http://localhost:8070/paymentRQ/paymentRQ';
        const response = await axios.get(url);
        return response.data;
    };

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data));
    }, []);

    return (
        <div className="FIN-payment-rq-display-container">
            <Nav />
            <h1>Payment Request Details</h1>

            <table className="FIN-user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Request ID</th>
                        <th>Request Date</th>
                        <th>Lawyer ID</th>
                        <th>Client ID</th> {/* Added new column for Client ID */}
                        <th>Service ID</th>
                        <th>Amount (RS.)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, i) => (
                            <tr key={i}>
                                <td>{user._id}</td>
                                <td>{user.RequestId}</td>
                                <td>{user.RequestDate}</td>
                                <td>{user.lawyerId}</td> {/* Changed `LawyerId` to `lawyerId` */}
                                <td>{user.ClientId}</td> {/* Added `ClientId` */}
                                <td>{user.ServiceID}</td>
                                <td>{user.Amount}</td>
                                <td>
                                    <Link to={`/user_details/${user._id}`}>
                                        <Button variant="contained" color="primary">Update</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/delete_payment_rq/${user._id}`}>
                                        <Button variant="contained" color="secondary">Delete</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No users found</td> {/* Updated colspan to match the number of columns */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Fin_Payment_RQ_Display;