import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./Lcm_NavBar";
import Footer from "./Lcm_Footer";
import React, { useRef ,useState,useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import BannerBackground from "../assets/home/case-logo.png";


function Lcm_CaseReport() {
  const { state } = useLocation();
  const { caseItem } = state || {};
  const navigate = useNavigate();
  const componentRef = useRef();

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


  const deleteCase = (id) => {
    axios
      .delete(`http://localhost:8070/case/delete/${id}`)
      .then(() => {
        alert("Case deleted successfully");
        navigate('/Lcm_Dashboard');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const goToUpdatePage = (id) => {
    navigate(`/Lcm_CaseUpdate/${id}`, { state: { caseItem } });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Legal Case Report",
    onAfterPrint: () => alert("Report Downloaded..!"),
  });

  return (
    <div>
      <NavBar />
      <div className="cdetails-container" ref={componentRef}>
        <div className="cdetails-report-header">
          <img src={BannerBackground} alt="Company Logo" className="cdetails-company-logo" />
          <h1 className="cdetails-company-name">ASM</h1>
          <p className="cdetails-company-contact">
            Email: asm@example.com | Phone: +94 71 123 4567
          </p>
        </div>

        <hr className="cdetails-report-separator" />
        <h2 className="cdetails-report-title">Legal Case Report</h2>

        {caseItem ? (
          <div className="cdetails-card-report">
            <p>
              This report provides a detailed overview of the legal case involving the client. It outlines the essential details of the case, including the client’s information, case specifics, and relevant documents submitted.
              This report outlines the details of the legal case, including case-specific information, procedural details, and an overview of the client's submitted documents. The case has been processed through the legal system according to the procedures applicable to the court type and area. All related documents have been reviewed to ensure that the case meets the necessary legal standards. The nature of this case involves financial and land-related aspects, with the potential for significant legal implications.
            </p>

            <h3>Client Details</h3>
            <p><strong>Client Name:</strong> {showdclient.fname || "N/A"}</p>
            <p><strong>Client NIC:</strong> {showdclient.nic || "N/A"}</p>
            <p><strong>Client Address:</strong> {showdclient.address || "N/A"}</p>
            <p><strong>Client Phone Number:</strong> {showdclient.phonenumber || "N/A"}</p>

            <h3>Case Details</h3>
            <p className="cdetails-case-number-label">
            <span>Case Number:</span>
            <strong className="cdetails-case-number-label-yellow">{caseItem.caseNumber || "N/A"}</strong>
              </p> {/* Added label here */}
            <p>
              The case number <strong>{caseItem.caseNumber || "N/A"}</strong> is a <strong>{caseItem.procedure || "N/A"}</strong>
              procedure in the <strong>{caseItem.courtType || "N/A"}</strong> court at <strong>{caseItem.courtArea || "N/A"}</strong>.
              Initiated on <strong>{caseItem.initialCaseDate || "N/A"}</strong>, it involves a monetary value of 
              <strong>{caseItem.monetaryValue || "N/A"}</strong>. The client, <strong>{showdclient.fname || "N/A"}</strong>, resides at 
              <strong>{showdclient.address || "N/A"}</strong> and has submitted the following documents: 
              <em>{caseItem.neededDocuments || "N/A"}</em>. The nature of this case is categorized as 
              <strong>{caseItem.nature || "N/A"}</strong>.
            </p>

            <h3>Needed Documents</h3>
            <ul>
              {caseItem.neededDocuments.split(",").map((doc, index) => (
                <li key={index}>{doc.trim() || "N/A"}</li>
              ))}
            </ul>

            <div className="advanced-report-section">
              <h3>Advanced Report Details</h3>
              <h4>Legal Context</h4>
              <p>
                This section could contain relevant legal information, statutes, or regulations applicable to the case. 
                Consider discussing precedents that might influence the outcome.
              </p>
              <h4>Next Steps</h4>
              <p>
                Recommendations for future actions, such as gathering more evidence, preparing for court appearances, 
                or negotiating settlements can be included here.
              </p>
            </div>
          </div>
        ) : (
          <p>No case details available</p>
        )}

        <div className="gen-report-button-container">
          <button
            type="button"
            className="gen-report-cdetails-btn"
            onClick={handlePrint}
          >
            Generate Report
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Lcm_CaseReport;
