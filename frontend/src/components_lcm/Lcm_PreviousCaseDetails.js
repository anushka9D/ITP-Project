import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./Lcm_NavBar";
import Footer from "./Lcm_Footer";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useRef, useState ,useEffect} from "react"; 
import { useReactToPrint } from "react-to-print";
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Import Bookmark Icon

function PreviousCaseDetails() {
  const { state } = useLocation();
  const { caseItem } = state || {}; // Destructure the caseItem
  const navigate = useNavigate();
  const componentRef = useRef();

  const deleteCase = (id) => {
    axios
      .delete(`http://localhost:8070/case/delete/${id}`)
      .then(() => {
        alert("Case deleted successfully");
        navigate('/Lcm_PreviousCases'); // Redirect to the AllCases page after deletion
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // PDF download
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Case Details Report",
    onAfterPrint: () => alert("Report Downloaded..!"),
  });

  const goToReportPage = (caseItem) => {
    navigate(`/Lcm_CaseReport`, { state: { caseItem } });
  };

  // Array of colors to apply to case labels
  const labelColors = ["#ff6666", "#66b3ff", "#99ff99", "#ffcc66"];

  // State for bookmarked status
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Function to toggle bookmark status
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev); // Toggle the bookmarked state
  };

 // Determine the status label based on the caseItem status
const getStatusLabel = (status) => {
  switch (status) {
    case "complete":
      return { text: "Completed", color: "#66cc00" }; // Green for complete
    default:
      return { text: "Unknown", color: "#cccccc" }; // Gray for unknown
  }
};

const statusInfo = caseItem ? getStatusLabel(caseItem.status) : { text: "Completed", color: "#66cc00" };

const [showdclient, setshowdclient] = useState([]);
const searchId = Number(caseItem.clientId);

useEffect(() => {
  function get_client_details() {
    axios
      .get(`http://localhost:8070/client/getByNic/${searchId}`)
      .then((res) => {
        setshowdclient(res.data.client);

      })
      .catch((err) => {
        alert(err.message);
      });
  }
  get_client_details();
}, []);


  return (
    <div>
      <NavBar />
      <div className="casedetails-show-container" ref={componentRef}>
        <h2 className="all-report-title">Case Details</h2>

        {/* Status Banner */}
        <div 
          className="cdetails-status-banner" 
          style={{ backgroundColor: statusInfo.color, color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center' }}
        >
          <strong>{statusInfo.text}</strong>
        </div>

        {/* Bookmark icon positioned inside the container */}
        <div 
          className="bookmark-container" 
          onClick={toggleBookmark} 
          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}
        >
          <BookmarkIcon 
            style={{ color: isBookmarked ? 'green' : 'white', fontSize: '30px' }} // Default to green
          />
        </div>

        {caseItem ? (
          <div className="casedetails-show-card">
            <div className="casedetails-show-sub-card">
              <div className="casedetails-show-field">
                <label 
                  className="casedetails-show-label" 
                  style={{ color: labelColors[0] }} // Use the first color from the array
                >
                  Case Number:
                </label>
                <p className="casedetails-show-data">{caseItem.caseNumber}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Procedure:</label>
                <p className="casedetails-show-data">{caseItem.procedure}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Court Type:</label>
                <p className="casedetails-show-data">{caseItem.courtType}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Court Area:</label>
                <p className="casedetails-show-data">{caseItem.courtArea}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Monetary Value:</label>
                <p className="casedetails-show-data">{caseItem.monetaryValue}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Case Created Date:</label>
                <p className="casedetails-show-data">{caseItem.caseCreatedDate}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Initial Case Date:</label>
                <p className="casedetails-show-data">{caseItem.initialCaseDate}</p>
              </div>

              {/* Updated Needed Documents Section */}
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Needed Documents:</label>
                <div className="needed-documents-container">
                  {caseItem.neededDocuments.split(',').map((doc, index) => (
                    <span key={index} className="needed-documents-document-badge">
                      {doc.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Nature:</label>
                <p className="casedetails-show-data">{caseItem.nature}</p>
              </div>
            </div>

            {/* Second Sub Card for Client Details */}
            <div className="casedetails-show-sub-card">
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Client Name:</label>
                <p className="casedetails-show-data">{showdclient.fname}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Client NIC:</label>
                <p className="casedetails-show-data">{showdclient.nic}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Client Address:</label>
                <p className="casedetails-show-data">{showdclient.address}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Client Phone Number:</label>
                <p className="casedetails-show-data">{showdclient.phone}</p>
              </div>
            </div>


            <div className="casedetails-show-container" ref={componentRef}>
            <div className="casedetails-show-card2">
            <div className="casedetails-show-sub-card">
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Next Court Date:</label>
                <p className="casedetails-show-data">{caseItem.nextCourtDate}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Steps To Be Taken:</label>
                <p className="casedetails-show-data">{caseItem.stepsToBeTaken}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Preivious Court Date:</label>
                <p className="casedetails-show-data">{caseItem.previousDate}</p>
              </div>
              <div className="casedetails-show-field">
                <label className="casedetails-show-label">Steps Taken:</label>
                <p className="casedetails-show-data">{caseItem.stepsTaken}</p>
              </div>
              </div>
              </div>
              </div>

          </div>
        ) : (
          <p>No case details available</p>
        )}
      </div>

      <div className="previous-button-container">
        <button
          type="button"
          className="casedetails-show-btn casedetails-show-btn-delete"
          onClick={() => deleteCase(caseItem._id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="casedetails-show-btn"
          onClick={() => goToReportPage(caseItem)}
        >
          Report
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default PreviousCaseDetails;
