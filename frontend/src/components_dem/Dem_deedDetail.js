import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import './deed_details.css';
import NavBar from "./Dem_NavBar.js";
import Footer from "./Dem_Footer.js";
import { PDFDocument, rgb } from 'pdf-lib';


function DemDeedDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deed, setDeed] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedDeed, setUpdatedDeed] = useState({
    deedType: '',
    title: '',
    considerationValue: ''
  });

  useEffect(() => {
    const fetchDeedAndLawyers = async () => {
      try {
        const deedResponse = await axios.get(`http://localhost:8070/deeds/get/${id}`);
        const lawyersResponse = await axios.get("http://localhost:8070/deeds/all_Lawyers");

        setDeed(deedResponse.data.deed);
        setLawyers(lawyersResponse.data);
        setUpdatedDeed({
          deedType: deedResponse.data.deed.deedType,
          title: deedResponse.data.deed.title,
          considerationValue: deedResponse.data.deed.considerationValue
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDeedAndLawyers();
  }, [id]);

  const getLawyerNameById = (lawyerId) => {
    const lawyer = lawyers.find(lawyer => lawyer._id === lawyerId);
    return lawyer ? `${lawyer.firstName} ${lawyer.lastName}` : "No Lawyer";
  };

  const handleUpdateClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDeed({ ...updatedDeed, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8070/deeds/update/${id}`, updatedDeed);
      setOpenDialog(false);
      navigate(0); 
    } catch (error) {
      console.error("Error updating deed:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deed?")) {
      try {
        await axios.delete(`http://localhost:8070/deeds/delete/${id}`);
        navigate("/read_all_deeds"); 
      } catch (error) {
        console.error("Error deleting deed:", error);
      }
    }
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
  
    // Add title centered
    const titleFontSize = 24;
    const titleX = (page.getWidth() - titleFontSize * 8) / 2;
    page.drawText(`Deed Details`, { x: titleX, y: 700, size: titleFontSize, color: rgb(0, 0, 0) });
  
    
    const fontSize = 12;
    let yPosition = 660; 
  
    const addSection = (title, content) => {
      page.drawText(title, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      
      page.drawText(String(content), { x: 200, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      yPosition -= 20; 
    };
  
    // Deed ID and other details
    addSection("Deed No:", deed.deedNo);
    addSection("Lawyer:", lawyers.find(lawyer => lawyer._id === deed.assignedLawyer)?.firstName || "No Lawyer");
    addSection("Deed Type:", deed.deedType);
    addSection("Title:", deed.title);
    addSection("Consideration Value:", deed.considerationValue);
  
    yPosition -= 20; 
  
    // Grantor details
    addSection("Grantor:", deed.grantor ? `${deed.grantor.fname} ${deed.grantor.lname}` : "No Grantor");
    addSection("Grantor Phone:", deed.grantor ? deed.grantor.phone : "N/A");
    addSection("Grantor NIC:", deed.grantor ? deed.grantor.nic : "N/A");
    addSection("Grantor Address:", deed.grantor ? deed.grantor.address : "N/A");
  
    yPosition -= 20; 
  
    // Grantee details
    addSection("Grantee:", deed.grantee ? `${deed.grantee.fname} ${deed.grantee.lname}` : "No Grantee");
    addSection("Grantee Phone:", deed.grantee ? deed.grantee.phone : "N/A");
    addSection("Grantee NIC:", deed.grantee ? deed.grantee.nic : "N/A");
    addSection("Grantee Address:", deed.grantee ? deed.grantee.address : "N/A");
  
    yPosition -= 20; 
  
    // Fees
    addSection("Lawyer Fee:", deed.lawyerFee);
    addSection("Tax Fee:", deed.taxFee);
    addSection("Total Fee:", deed.totalFee);
  
    // Save the document
    const pdfBytes = await pdfDoc.save();
  
    // Trigger download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `deed_${deed._id}.pdf`;
    link.click();
  };
  
  

  if (!deed) return <p>Loading...</p>;

  return (
    <div className="deed-details-css">
      <NavBar/>
      <div className="deed-detail-container">
      <div>

        <h2>Deed Details</h2><br/>
        <p><strong>Deed No:</strong> {deed.deedNo}</p>

        <div className="section-spacing">
          <p><strong>Lawyer:</strong> {getLawyerNameById(deed.assignedLawyer)}</p>
          <p><strong>Deed Type:</strong> {deed.deedType}</p>
          <p><strong>Title:</strong> {deed.title}</p>
          <p><strong>Consideration Value:</strong> {deed.considerationValue}</p>
        </div>

        <div className="section-spacing">
          <p><strong>Grantor:</strong> {deed.grantor ? `${deed.grantor.fname} ${deed.grantor.lname}` : "No Grantor"}</p>
          <p><strong>Grantor Phone:</strong> {deed.grantor ? deed.grantor.phone : "N/A"}</p>
          <p><strong>Grantor NIC:</strong> {deed.grantor ? deed.grantor.nic : "N/A"}</p>
          <p><strong>Grantor Address:</strong> {deed.grantor ? deed.grantor.address : "N/A"}</p>
        </div>

        <div className="section-spacing">
          <p><strong>Grantee:</strong> {deed.grantee ? `${deed.grantee.fname} ${deed.grantee.lname}` : "No Grantee"}</p>
          <p><strong>Grantee Phone:</strong> {deed.grantee ? deed.grantee.phone : "N/A"}</p>
          <p><strong>Grantee NIC:</strong> {deed.grantee ? deed.grantee.nic : "N/A"}</p>
          <p><strong>Grantee Address:</strong> {deed.grantee ? deed.grantee.address : "N/A"}</p>
        </div>

        <div className="section-spacing">
          <p><strong>Lawyer Fee:</strong> {deed.lawyerFee}</p>
          <p><strong>Tax Fee:</strong> {deed.taxFee}</p>
          <p><strong>Total Fee:</strong> {deed.totalFee}</p>
        </div>

      
      </div>
        <div className="button-group">
          <button onClick={handleUpdateClick}>Update</button><br/><br/>
          <button onClick={handleDelete} >Delete</button><br/><br/>
          <button onClick={generatePDF}>Download Deed Details</button>
        </div>
                  
       
        <Dialog open={openDialog} onClose={handleCloseDialog}
        sx={{ 
          '& .MuiDialog-paper': { 
          backgroundColor: '#f5f5f5', 
          width: '400px', 
          maxWidth: '100%', 
          }
          }}>
          <DialogTitle
          sx={{ 
            backgroundColor: '#74512D', 
            color: 'white' 
            
            }}
          >Edit Deed Details</DialogTitle>

          <DialogContent><br/>
          <select 
            id="deedType" 
            name="deedType" 
            onChange={handleUpdateChange}
            placeholder="Nature of the deed">
                        <option value="" disabled>Select a deed type</option>
                        <option value="Deed of Transfer (Sale Deed)">Deed of Transfer (Sale Deed)</option>
                        <option value="Deed of Gift">Deed of Gift</option>
                        <option value="Deed of Lease">Deed of Lease</option>
                        <option value="Deed of Mortgage">Deed of Mortgage</option>
                        <option value="Power of Attorney (POA)">Power of Attorney (POA)</option>
                        <option value="Deed of Partition">Deed of Partition</option>
                        <option value="Deed of Agreement">Deed of Agreement</option>
                        <option value="Deed of Declaration">Deed of Declaration</option>
                        <option value="Deed of Exchange">Deed of Exchange</option>
                    </select>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        onChange={handleUpdateChange}
                        placeholder="Name of the property"                        
                    />
                    <input 
                        type="number" 
                        id="considerationValue" 
                        name="considerationValue"
                        placeholder="Value of the property"
                        onChange={handleUpdateChange}  
                    />
          </DialogContent>

          <DialogActions>
            <button onClick={handleCloseDialog} 
            sx={{
              backgroundColor: '#74512D', 
              color: 'white',
              '&:hover': {
                  backgroundColor: '#5a3d23' 
              }
          }}>
              Cancel
            </button>
            <button onClick={handleUpdateSubmit} 
            sx={{
              backgroundColor: '#74512D', 
              color: 'white',
              '&:hover': {
                  backgroundColor: '#5a3d23' 
              }
          }}>Update</button>

          </DialogActions>
        </Dialog>
        
      </div>
      <Footer/>
    </div>
  );
}

export default DemDeedDetail;
