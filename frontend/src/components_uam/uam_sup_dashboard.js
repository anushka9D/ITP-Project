import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)


function Dashboard() {

  
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Create title for the report
    pdf.text("Support Ticket Report", 10, 10);

    // Set column titles for the grid
    const columns = ["Ticket Date", "Ticket Type", "Subject", "Status"];
    const rows = [];

    // Fill rows with the support tickets data
    supportTickets.forEach(ticket => {
      rows.push([
        new Date(ticket.supTicketDate).toISOString().split('T')[0],
        ticket.supTicketType,
        ticket.supTicketSubject,
        ticket.supTicketStatus
      ]);
    });

    // Add table with ticket data to the PDF
    pdf.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 }
    });

    pdf.save("support_tickets_report.pdf");
  };



  const { id } = useParams();
  const [supportTickets, setSupportTickets] = useState([]); 
  const [replyTickets, setReplyTickets] = useState([]); 
  const [supportAgent, setSupportAgent] = useState({}); 
  const [clientDetails, setClientDetails] = useState({});
  const [ticketDetails, setTicketDetails] = useState({});
  
  // Search state
  const [searchDate, setSearchDate] = useState("");
  
  //pic chart data
  const [supportTicketPending, setSupportTicketPending] = useState(0);
  const [supportTicketReplied, setSupportTicketReplied] = useState(0); 
  
  // New state for counting tickets
  const [totalTicketsCount, setTotalTicketsCount] = useState(0);
  const [repliedTicketsCount, setRepliedTicketsCount] = useState(0);
  const [pendingTicketsCount, setPendingTicketsCount] = useState(0);

  // Get support ticket details and calculate totals
  useEffect(() => {
    function getSupportTickets() {
      axios.get("http://localhost:8070/supportticket/all").then((res) => { 
        console.log(res.data);
        setSupportTickets(res.data); 

        // Calculating the total, replied, and pending tickets
        const totalTickets = res.data.length;
        const repliedTickets = res.data.filter(ticket => ticket.supTicketStatus === 'Replied').length;
        const pendingTickets = res.data.filter(ticket => ticket.supTicketStatus === 'Pending').length;

        setTotalTicketsCount(totalTickets);
        setRepliedTicketsCount(repliedTickets);
        setPendingTicketsCount(pendingTickets);

        res.data.forEach(supportTicket => {
          const clientId = supportTicket.clientId;

          if (!clientDetails[clientId]) {
            axios.get(`http://localhost:8070/client/v/${clientId}`)
              .then(response => {
                setClientDetails(prevDetails => ({
                  ...prevDetails,
                  [clientId]: response.data
                }));
              })
              .catch(error => {
                console.error("Error fetching client details:", error);
              });
          }
        });
      }).catch((err) => {
        alert(err.message);
      });
    }
    getSupportTickets();
  }, [clientDetails]);

  // get all pending replies (for specific support agent)
  useEffect(() => {
    function getReplyTickets(){
      axios.get(`http://localhost:8070/replyticket/pending/support-agent/${id}`).then((res) => {
        console.log(res.data);
        setReplyTickets(res.data);

        res.data.forEach(replyTickets => {
                const supportTicketId = replyTickets.supportTicketId;
                if (!ticketDetails[supportTicketId]) {
                    axios.get(`http://localhost:8070/supportticket/${supportTicketId}`)
                        .then(response => {
                          setTicketDetails(prevDetails => ({
                                ...prevDetails,
                                [supportTicketId]: response.data
                              }));
                            })
                            .catch(error => {
                              console.error("Error fetching ticket details:", error);
                            });
            }
          });
                        }).catch((err) => {
                          alert(err.message);
                        });
                      }
                      getReplyTickets();
    }, [ticketDetails, id]);

  // Get support agent details
  useEffect(() => { 
    function getSupportAgent(){
      axios.get(`http://localhost:8070/supportagent/${id}`).then((res) => {
        console.log(res.data);
        setSupportAgent(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getSupportAgent(); 
  }, [id])


  // pie chart functions
  useEffect(() => {
    function getsupportTicketPending() {
        axios.get("http://localhost:8070/supportticket/pending/count")
            .then((res) => {
                console.log("Pending count: ", res.data.count);
                setSupportTicketPending(res.data.count);  // Set the count
            })
            .catch((err) => {
                console.error("Error fetching pending appointment request count:", err);
            });
      }
        getsupportTicketPending();
    }, []);

    useEffect(() => {
      function getsupportTicketReplied() {
          axios.get("http://localhost:8070/supportticket/replied/count")
              .then((res) => {
                  console.log("Replied count: ", res.data.count);
                  setSupportTicketReplied(res.data.count);  // Set the count
              })
              .catch((err) => {
                  console.error("Error fetching pending reply count:", err);
              });
        }
        getsupportTicketReplied();
      }, []);
 

  const pieData = {
      labels: ['Pending', 'Replied'],
      datasets: [{
          label: '# of Appointment Requests',
          data: [supportTicketPending, supportTicketReplied],
          backgroundColor: ['#F8F4E1', '#AF8F6F'],
          borderColor: ['#543310', '#543310'],
          borderWidth: 1,
      }],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
            }
        }
    }
};
 
  // Function to filter tickets by date
  const filteredSupportTickets = searchDate 
    ? supportTickets.filter(ticket => {
        const ticketDate = new Date(ticket.supTicketDate).toISOString().split('T')[0];
        return ticketDate === searchDate; 
      }) 
    : supportTickets;

  return (
    <div>
        <NavBar />
        <hr />

        <div className="uam-container">
        <h1 className="uam-header">Support Agent Dashboard</h1>

        <p className="uam-user-welcome">Welcome {supportAgent.fName} {supportAgent.lName}</p>
        <p className="uam-user-welcome">User ID : {supportAgent.userId}</p>

        {/* Ticket count boxes */}
         <div className="uam-ticket-counts">
          <div className="uam-ticket-count-box">
            <p>Total Tickets: {totalTicketsCount}</p>
          </div>
          <div className="uam-ticket-count-box">
            <p>Replied Tickets: {repliedTicketsCount}</p>
          </div>
          <div className="uam-ticket-count-box">
            <p>Pending Tickets: {pendingTicketsCount}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="uam-chart-container">
                    <h3>Support Ticket Status Distribution</h3>
                    <Pie data={pieData} options={pieOptions} />
         </div>

         <div className="uam-search-container">
  <label htmlFor="searchDate" className="uam-search-label">Search by date:</label>
  <input 
    type="date" 
    id="searchDate"
    value={searchDate} 
    onChange={(e) => setSearchDate(e.target.value)} 
    className="uam-search-input"
  />
</div>



        <h2>Received Support Tickets</h2>
        <table border='1' className="uam-summary-table">
        <thead>
            <tr className="uam-summary-table-row">
                <th className="uam-summary-table-header">Ticket Date</th>
                <th className="uam-summary-table-header">Ticket Type</th> 
                <th className="uam-summary-table-header">Subject</th>
                <th className="uam-summary-table-header">Status</th>
                <th className="uam-summary-table-header">Action</th>
            </tr>
        </thead>
        <tbody>
            {
            filteredSupportTickets.map(supportTicket => {
                return (
                <tr className="uam-summary-table-row" key={supportTicket._id}>
                    <td className="uam-summary-table-data">{
                    new Date(supportTicket.supTicketDate).toISOString().split('T')[0]
                    }
                    </td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketType}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketSubject}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketStatus}</td>
                    <td className="uam-summary-table-action">
                        <a className="uam-summary-table-button" href={`/support-agent-dashboard/view-support-ticket/${supportTicket._id}/${id}`}>View Ticket</a>
                    </td>
                </tr>
                )
            })
            }
        </tbody>
        </table>

        <a className="uam-view-button" href="/support-agent-dashboard/view-all-support-tickets/">View Previous Support Tickets</a>


        <h2>Upcoming Reply Tickets</h2>

        <table border='1' className="uam-summary-table">
        <thead>
            <tr className="uam-summary-table-row">
                <th className="uam-summary-table-header">Reply Date</th>
                <th className="uam-summary-table-header">Ticket Type</th> 
                <th className="uam-summary-table-header">Subject</th>
                <th className="uam-summary-table-header">Client Name</th>
                <th className="uam-summary-table-header">Client Mobile</th>
                <th className="uam-summary-table-header">Status</th>
                <th className="uam-summary-table-header">Action</th>
            </tr>
        </thead>
        <tbody>
            {
            replyTickets.map(replyTicket => {
                return (
                <tr className="uam-summary-table-row" key={replyTicket._id}>
                    <td className="uam-summary-table-data">{
                      new Date(replyTicket.replyTicketDate).toISOString().split('T')[0]
                    }</td>
                    <td className="uam-summary-table-data">
                    {ticketDetails[replyTicket.supportTicketId]
                        ? ticketDetails[replyTicket.supportTicketId].supTicketType
                        : 'Loading...'}
                    </td>
                    <td className="uam-summary-table-data">
                    {ticketDetails[replyTicket.supportTicketId]
                        ? ticketDetails[replyTicket.supportTicketId].supTicketSubject
                        : 'Loading...'}
                    </td>
                    <td className="uam-summary-table-data">
                    {clientDetails[replyTicket.clientId]
                        ? `${clientDetails[replyTicket.clientId].fname} ${clientDetails[replyTicket.clientId].lname}`
                        : 'Loading...'}
                    </td>
                    <td className="uam-summary-table-data">
                    {clientDetails[replyTicket.clientId]
                        ? clientDetails[replyTicket.clientId].phone
                        : 'Loading...'}
                    </td>
                    <td className="uam-summary-table-data">{replyTicket.replyTicketstatus}</td>
                    <td className="uam-summary-table-action"><a className="uam-summary-table-button" href={`/support-agent-dashboard/view-ticket-reply/${replyTicket._id}/${id}`}>View Reply</a></td>
                </tr>
                )
            })
            }
        </tbody>
        </table>

        <a className="uam-view-button" href="/support-agent-dashboard/view-all-ticket-replies/">View Previous Replies</a>

 </div>

<button className="uam-generate-pdf-button"  onClick={generatePDF}>
    Generate Report
</button>
  
        <Footer />
    </div>
  );
}

export default Dashboard;
