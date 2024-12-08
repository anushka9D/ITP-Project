import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';


function ViewUserDetails() {
    const { id } = useParams(); 
    const [userDetails, setUserDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(false); // For the dialog box
    const [updatedUser, setUpdatedUser] = useState({}); // For the updated user details

    const [status, setStatus] = useState('active');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Fetch user details based on the id
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/userRegistration/userRegistration/${id}`);
            setUserDetails(response.data);
            setUpdatedUser(response.data); // Initialize updatedUser with existing user details
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails(); 
    }, [id]);

    // Handle dialog open
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle dialog close
    const handleClose = () => {
        setOpen(false);
    };

    // Handle input change in the dialog form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };


    const handleEmailValidation = () => {
        if (!updatedUser.email.includes('@')) {
            setEmailError('Email must contain @');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneValidation = () => {
        if (updatedUser.phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits long');
        } else {
            setPhoneError('');
        }
    };

    // Handle update submission
    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`http://localhost:8070/userRegistration/update-userRegistration/${id}`, updatedUser);
            alert('User updated successfully');
            setOpen(false); // Close the dialog after update
            fetchUserDetails();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle delete functionality
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8070/userRegistration/delete-userRegistration/${id}`);
            alert('User deleted successfully');
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //change user status
    const updateStatus = async () => {
        updatedUser.userStatus = "Inactive"
    };
    

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (!userDetails) {
        return <p>No details found for this user.</p>;
    }

    return (
        <div className="user-details-container">

        <h1 style={{ textAlign: 'center', color: '#74512D' }}>User Details</h1>
            <table className="table">
                <tbody>
                <tr>
                        <td><strong>User ID:</strong></td>
                        <td>{userDetails.userId}</td>
                    </tr>
                    <tr>
                        <td><strong>First Name:</strong></td>
                        <td>{userDetails.fName}</td>
                    </tr>
                    <tr>
                        <td><strong>Last Name:</strong></td>
                        <td>{userDetails.lName}</td>
                    </tr>
                    <tr>
                        <td><strong>NIC:</strong></td>
                        <td>{userDetails.nic}</td>
                    </tr>
                    <tr>
                        <td><strong>Address:</strong></td>
                        <td>{userDetails.address}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{userDetails.email}</td>
                    </tr>
                    <tr>
                        <td><strong>User Type:</strong></td>
                        <td>{userDetails.userType}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone Number:</strong></td>
                        <td>{userDetails.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td><strong>Education:</strong></td>
                        <td>{userDetails.education}</td>
                    </tr>
                    <tr>
                        <td><strong>Password:</strong></td>
                        <td>{userDetails.password}</td>
                    </tr>
                    <tr>
                        <td><strong>Create Date:</strong></td>
                        <td>{userDetails.createDate}</td>
                    </tr>
                    <tr>
                        <td><strong>User Status:</strong></td>
                        <td>{userDetails.userStatus}</td>
                    </tr>

                </tbody>
            </table>
            <div className="action-buttons">
            <Button 
                variant="contained" 
                style={{ backgroundColor: 'green', color: 'white' }} 
                onClick={handleClickOpen}
>
                Update
            </Button>

            <Button
                    variant="contained"
                    sx={{ backgroundColor: 'red', marginLeft: '10px', '&:hover': { backgroundColor: 'darkred' } }}
                    onClick={handleDelete}>
                    Delete
            </Button>
            
            <Button 
                variant="contained" 
                className="inactive-button"
                onClick={updateStatus}>
                Inactive
            </Button>


            </div>

            {/* Dialog for updating user details */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User Details</DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        label="User ID"
                        name="userId"
                        value={updatedUser.userId || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="First Name"
                        name="fName"
                        value={updatedUser.fName || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                      <TextField
                        margin="dense"
                        label="Last Name"
                        name="lName"
                        value={updatedUser.lName || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="NIC"
                        name="nic"
                        value={updatedUser.nic || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="address"
                        value={updatedUser.address || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={updatedUser.email || ''}
                        onBlur={handleEmailValidation}
                        error={!!emailError}
                        helperText={emailError}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="User Type"
                        name="userType"
                        value={updatedUser.userType || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        name="phoneNumber"
                        value={updatedUser.phoneNumber || ''}
                        onBlur={handlePhoneValidation}
                        error={!!phoneError}
                        helperText={phoneError}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Education"
                        name="education"
                        value={updatedUser.education || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                     <TextField
                        margin="dense"
                        label="Create Date"
                        name="createDate"
                        value={updatedUser.createDate || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                    margin="dense"
                    label="User Status"
                    name="userStatus"
                    value={updatedUser.userStatus || ''}
                    onChange={handleInputChange}
                    fullWidth
                    disabled // This makes the field uneditable
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateSubmit} className="green-button">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ViewUserDetails;