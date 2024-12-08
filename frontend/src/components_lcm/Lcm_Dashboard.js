import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Lcm_Footer";
import NavBar from "./Lcm_NavBar";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CasesIcon from '@mui/icons-material/Folder';
import DocumentIcon from '@mui/icons-material/Description';
import AppointmentIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/MonetizationOn';
import { Bar, Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import './legal_case_management.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AllCases() {
  const [cases, setCases] = useState([]);
  const [previousCases, setPreviousCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPendingCases, setFilteredPendingCases] = useState([]);
  const navigate = useNavigate();
  const [filteredLand, setFilteredsLand] = useState([]);
  const [filteredMoneymatter, setFilteredsMoneymatter] = useState([]);
  const [filteredNamechange, setFilteredsNamechange] = useState([]);
  const [filteredDivorce, setFilteredsDivorce] = useState([]);

const { id } = useParams();

  const lawyerid = {id};

  useEffect(() => {
    function getCases() {
      axios
        .get("http://localhost:8070/case/getallcase")
        .then((res) => {
          console.log(res.data);
          setCases(res.data);
          setFilteredPendingCases(res.data.filter(caseItem => caseItem.status === "Pending"));

          setFilteredsLand(res.data.filter(caseItem => caseItem.nature === "land"));
          setFilteredsMoneymatter(res.data.filter(caseItem => caseItem.nature === "money-matter"));
          setFilteredsNamechange(res.data.filter(caseItem => caseItem.nature === "name-change"));
          setFilteredsDivorce(res.data.filter(caseItem => caseItem.nature === "divorce"));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getCases();
  }, []);



  const deleteCase = (id) => {
    axios
      .delete(`http://localhost:8070/case/delete/${id}`)
      .then(() => {
        alert("Case deleted successfully");
        setCases(cases.filter((caseItem) => caseItem._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const goToUpdatePage = (id) => {
    navigate(`/Lcm_CaseUpdate/${id}`);
  };

  const goToCaseDetailsPage = (caseItem) => {
    navigate(`/Lcm_CaseDetails`, { state: { caseItem } });
  };

  useEffect(() => {
    const fetchPreviousCases = async () => {
      try {
        const res = await axios.get("http://localhost:8070/case/getallcase");
        setPreviousCases(res.data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchPreviousCases();
  }, []);

  const completeCases = previousCases.filter(caseItem => caseItem.status === "complete");


// Data and options for Chart.js
const data = {
  labels: ['Land', 'Money Matter','Name Change','Divorce'],
  datasets: [
    {
      label: 'Case Nature',
      data: [filteredLand.length, filteredMoneymatter.length, filteredNamechange.length, filteredDivorce.length],
      backgroundColor: ['rgba(125, 61, 44)','rgba(153, 82, 64)','rgba(168, 93, 74 )','rgba(188, 105, 87)'],
      barThickness: 80,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pending vs Completed Cases',
    },
  },
  scales: {
    x: {
      stacked: false,
      barPercentage: 0.8, 
      categoryPercentage: 0.8, 
    },
    y: {
      beginAtZero: true,
    },
  },
};

  // Data for Pie Chart
  const pieData = {
    labels: ['Pending Cases', 'Complete Cases'],
    datasets: [{
        data: [filteredPendingCases.length, completeCases.length],
        backgroundColor: ['rgba(171, 24, 5 )', 'rgba(3, 82, 10)']
    }]
};


  // Function to handle search and filter cases

    const filteredCases = filteredPendingCases.filter(caseItem =>
      caseItem.nature && caseItem.nature.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Function to count cases by type
  const caseTypeCounts = () => {
    const counts = {};
    cases.forEach(caseItem => {
      counts[caseItem.nature] = (counts[caseItem.nature] || 0) + 1;
    });
    return counts;
  };

  const typeCounts = caseTypeCounts();

  return (
    <div>
      <NavBar />
      <div className="lcm-dashboard-container">
        
          <h1 className="lcm-dashboard-headline">Legal Case Manager Dashboard</h1>
        
          <div className="count-button-container">
          <div
            className="lcm-dashboard-box"
            style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            onClick={() => navigate("/AllCases")}
          >
            <CasesIcon /> Current Cases <span>{filteredPendingCases.length}</span>
          </div>
          <div
            className="lcm-dashboard-box"
            style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            onClick={() => navigate("/DocumentRequest")}
          >
            <DocumentIcon /> Document Request <span>{cases.filter(caseItem => caseItem.documentsRequested).length}</span>
          </div>
          <div
            className="lcm-dashboard-box"
            style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            onClick={() => navigate("/Lcm_AddClient")}
          >
            <AppointmentIcon /> Appointment <span>{cases.filter(caseItem => caseItem.appointmentsScheduled).length}</span>
          </div>
          <div
            className="lcm-dashboard-box"
            style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            onClick={() => navigate("/Lcm_ClientCDashboard")}
          >
            <PaymentIcon /> Payment Request <span>{cases.filter(caseItem => caseItem.paymentsPending).length}</span>
          </div>
        </div>

        <div className="lcm-dashboard-all-chart-container">
        <div className="lcm-dashboard-chart-container">
        <h3 className="lcm-dashboard-subhead">Case Overview</h3>
        <Bar data={data} options={options} />
        </div>

        
        <div className="case-piechart-container">
        {/* New table for case types - moved below the bar chart */}
        <h3 className="lcm-dashboard-subhead">Case Types Overview</h3>
        <div style={{ width: '50%', margin: 'auto' }}>
             <Pie data={pieData} />
            </div>
        </div>
        </div>
        

        <div className="lcm-dashboard-table-container">
        <h3 className="lcm-dashboard-subhead">Current Cases</h3>
        <br />
        <div className="lcm-button-container">
          <div className="lcm-dashboard-search">
            <input
              type="text"
              className="lcm-dashboard-search-bar"
              placeholder="Search by Case Number or Nature"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '18px',border: '2px solid #7a7a7a' }}
            />
          </div>

  
          <div className="add-viewprevious-case-container">
          <button
            type="button"
            className="btn-btn-add-new-case"
            onClick={() => navigate(`/AddCase/${lawyerid}`)}
          >
            Add New Case
          </button>
          <button
            type="button"
            className="btn-btn-view-previous-case"
            onClick={() => navigate("/Lcm_PreviousCases")}
          >
            View Previous Cases
          </button>
          </div>
        </div>
        <br />

        {/* Table container for current cases */}
        
          <table className="lcm-dashboard-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="lcm-dashboard-th">Case Number</th>
                <th scope="col" className="lcm-dashboard-th">Case Created Date</th>
                <th scope="col" className="lcm-dashboard-th">Nature</th>
                <th scope="col" className="lcm-dashboard-th">Court Area</th>
                <th scope="col" className="lcm-dashboard-th">Court Type</th>
                <th scope="col" className="lcm-dashboard-th">Status</th>
                <th scope="col" className="lcm-dashboard-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem._id}>
                  <td>{caseItem.caseNumber}</td>
                  <td>{caseItem.caseCreatedDate}</td>
                  <td>{caseItem.nature}</td>
                  <td>{caseItem.courtArea}</td>
                  <td>{caseItem.courtType}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{caseItem.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-btn-view-case"
                      onClick={() => goToCaseDetailsPage(caseItem)}
                    >
                      <VisibilityIcon /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllCases;
