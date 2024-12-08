import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./Lcm_NavBar";
import Footer from "./Lcm_Footer";
import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Lcm_ClientCDashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const [filteredClientCases, setFilteredClientCases] = useState([]);

  const client = '123456789V';

  useEffect(() => {
    function getCases() {
      axios
        .get("http://localhost:8070/case/getallcase")
        .then((res) => {
          setFilteredClientCases(res.data.filter(caseItems => caseItems.clientId === client));
          console.log(setFilteredClientCases);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getCases();
  }, []);

  // Array of colors to apply to case labels
  const labelColors = ["#ff6666", "#66b3ff", "#99ff99", "#ffcc66"];

  const [showdclient, setshowdclient] = useState([]);
  const searchId = Number(client);
  
    
    useEffect(() => {
      function get_client_details() {
        axios
          .get(`http://localhost:8070/client/search/nic/${searchId}`)
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
      <div className="client-cdetails-container" ref={componentRef}>
        <h2 className="all-report-title">Case Details</h2>

        {filteredClientCases.length > 0 ? (
          filteredClientCases.map((caseItem, index) => (
            <div key={caseItem.caseNumber} className="client-case-card">
              <p className="client-case-label" style={{ backgroundColor: labelColors[index % labelColors.length] }}>
                Case {index + 1}
              </p>

              <p className="client-intro-paragraph">
                You are viewing case details for a client. Please review both client and case details carefully.
              </p>
              
              <div className="client-cdetails-entry">
                <div className="client-cdetails-left">
                  <h3>Client Details</h3>
                  <p>Client Name: {showdclient.fname}</p>
                  <p>Client NIC: {showdclient.nic}</p>
                  <p>Client Address: {showdclient.address}</p>
                  <p>Client Phone Number: {showdclient.phone}</p>
                </div>

                <div className="client-cdetails-right">
                  <h3>Case Details</h3>
                  <p>Case Number: {caseItem.caseNumber}</p>
                  <p>Court Type: {caseItem.courtType}</p>
                  <p>Procedure: {caseItem.procedure}</p>
                  <p>Monetary Value: {caseItem.monetaryValue}</p>
                  <p>Case Created Date: {caseItem.caseCreatedDate}</p>
                  <p>Initial Case Date: {caseItem.initialCaseDate}</p>
                  
                </div>

                
              </div>
              <div className="client-cdetails-left">
                <h3 className="cli-important">***Important Reminders***</h3>
                <p>Next Court Date: {caseItem.nextCourtDate}</p>
                <p>Previous Court Date: {caseItem.previousDate}</p>
                <p>Steps To Be Taken: {caseItem.stepsToBeTaken}</p>
                <p>Steps Taken: {caseItem.stepsTaken}</p>
                </div>

              <div className="client-case-bookmark">
                <BookmarkIcon />
              </div>

              <p className="client-important-message">
                ** Important: Ensure you bring all necessary documents when attending court. Failure to do so may delay proceedings.
              </p>
            </div>
          ))
        ) : (
          <p>No case details available</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Lcm_ClientCDashboard;
