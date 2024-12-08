import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common
import Home from './components_home/Home';

// Login
import Login from './components_login/login';
import LoginAppointmentManager from './components_login/login_appointment_manager';
import LoginSupportAgent from './components_login/login_support_agent';
import LoginLegalCaseManager from './components_login/login_legal_case_manager';
import LoginDocumentManager from './components_login/login_document_manager';
import LoginFinanceManager from './components_login/login_finance_manager';
import LoginDeedManager from './components_login/login_deed_manager';
import LoginAttorneyManager from './components_login/login_attorney_manager';

// Appointment Management
import LawyerAppointmentDashboard from './components_apm/Apm_law_dashboard';
import LawyerCreateAppointmentRequest from './components_apm/apm_law_create_appointment_request';
import LawyerViewAppointmentRequest from './components_apm/apm_law_view_appointment_request';
import LawyerViewAppointment from './components_apm/apm_law_view_appointment';
import LawyerViewAllAppointmentRequests from './components_apm/apm_law_view_all_appointment_requests';
import LawyerViewAllAppointments from './components_apm/apm_law_view_all_appointments';

import AppointmentManagerDashboard from './components_apm/apm_apm_dashboard';
import AppointmentManagerViewAppointmentRequest from './components_apm/apm_apm_view_appointment_request';
import AppointmentManagerViewAppointment from './components_apm/apm_apm_view_appointment';
import AppointmentManagerViewAllAppointmentRequests from './components_apm/apm_apm_view_all_appointment_requests';
import AppointmentManagerViewAllAppointments from './components_apm/apm_apm_view_all_appointments';

import ClientAppointmentDashboard from './components_apm/apm_cli_dashboard';
import ClientViewAppointment from './components_apm/apm_cli_view_appointment';
import ClientViewAllAppointments from './components_apm/apm_cli_view_all_appointments';


// Support Ticket Management
import ClientSupportTicketDashboard from './components_uam/uam_cli_dashboard';
import ClientCreateSupportTicket from './components_uam/uam_cli_create_support_ticket';
import ClientViewSupportTicket from './components_uam/uam_cli_view_support_ticket';
import ClientViewTicketReply from './components_uam/uam_cli_view_reply_ticket';
import ClientViewAllSupportTickets from './components_uam/uam_cli_view_all_support_tickets';
import ClientViewAllTicketReplies from './components_uam/uam_cli_view_all_replies';

import SupportAgentDashboard from './components_uam/uam_sup_dashboard';
import SupportAgentViewSupportTicket from './components_uam/uam_sup_view_support_ticket';
import SupportAgentViewTicketReply from './components_uam/uam_sup_view_reply_ticket';
import SupportAgentViewAllSupportTickets from './components_uam/uam_sup_view_all_support_tickets';
import SupportAgentViewAllTicketReplies from './components_uam/uam_sup_view_all_reply_tickets';


// Document Management
import Dom_Dashboard from './components_dom/Dom_Dashboard';
import Dom_Request from './components_dom/Dom_Request';
import Dom_Call from './components_dom/Dom_Call';
import Dom_Call_Update from './components_dom/Dom_Call_Update';
import Dom_Call_Dashboard from './components_dom/Dom_Call_Dashboard';
import Dom_Call_View from './components_dom/Dom_Call_View';
import Dom_Request_Dom from './components_dom/Dom_Request_Dom';
import Dom_Request_View from './components_dom/Dom_Request_View';
import Dom_Request_Update from './components_dom/Dom_Request_Update';
import Dom_Client_Dashboard from './components_dom/Dom_Client_Dashboard';
import Dom_Request_Submitted_View from './components_dom/Dom_Request_Submitted_View';
import Dom_Request_Approval from './components_dom/Dom_Request_Approval';
import Dom_Call_View_Requested from './components_dom/Dom_Call_View_Requested';



// Legal Case Management
import LegalCaseManagerDashboard from './components_lcm/Lcm_Dashboard';
import AddCase from './components_lcm/Lcm_AddCase';
import CaseUpdate from './components_lcm/Lcm_UpdateCase';
import CaseDetails from './components_lcm/Lcm_CaseDetails';
import PreviousCases from './components_lcm/Lcm_PreviousCases';
import ClientSummary from './components_lcm/Lcm_ClientSummary';
import AddClient from './components_lcm/Lcm_AddClient';
import PreviousCaseDetails from './components_lcm/Lcm_PreviousCaseDetails';
import CaseReport from './components_lcm/Lcm_CaseReport';
import ClientCDashboard from './components_lcm/Lcm_ClientCDashboard';


// client
import AddClientE from './components_cli/Clients/addClient';
import ClientPortalHome from './components_cli/Clients/ClientPortalHome';
import SuccessPage from './components_cli/ClientDetails/viewClientDetails';
import UserClients from './components_cli/ClientDetails/UserClients';
import ClientLogin from './components_cli/ClientDetails/ClientLogin';
import ClientProfile from './components_cli/ClientDetails/ClientProfile';
import UpdateClient from './components_cli/Clients/UpdateClient';
import DeleteClient from './components_cli/Clients/DeleteClient';
import ClientCase from './components_cli/Clients_Info/ClientCases';
import ClientDeeds from './components_cli/Clients_Info/ClientDeeds';
import SearchResults from './components_cli/Clients_Info/SearchResults';


//finance management
/*import Fin_payment_RQ from './components_fin/lawyer_payment_request/Fin_Payment_RQ'
import Fin_nav_login from './components_login/login'
import Fin_Payment_RQ_details from './components_fin/lawyer_payment_request/DIsplay/Fin_payment_RQ_Display'
import Fin_Payment_RQ_Insert from "./components_fin/lawyer_payment_request/insert/Fin_Payment_RQ_Insert"
import Fin_Payment_RQ_Update from "./components_fin/lawyer_payment_request/update/Fin_payment_RQ_Update"
import Delete_Payment_RQ from './components_fin/lawyer_payment_request/delete/Delete_Payment_RQ'
import Fin_payment_proofs from './components_fin/Client_payment_proof/Display_proofs/PaymentProofDisplay'
import Fin_payment_proof_form from './components_fin/Client_payment_proof/Inser_proofs/PaymentProofInsert'
import Fin_payment_proof_update from './components_fin/Client_payment_proof/update_proofs/PaymentProofUpdate'
import Fin_payment_proof_delete from './components_fin/Client_payment_proof/Delete_proofs/Delete_PaymentProof'
import PaymentRequestDetails from './components_fin/lawyer_payment_request/PaymentRequestDetails'; 
import Payment_proofs_details from './components_fin/lawyer_payment_request/PaymentProofDetails'
import Back_dashboard from './components_fin/lawyer_payment_request/Fin_Payment_RQ';
import Fin_client_PAyemnt_Submit from './components_fin/Client__FIN_Dashbord/FIN_Client_RQs_form'
import Fin_proofs_spec_client from './components_fin/Client__FIN_Dashbord/FIN_client_display_proofs'
import Fin_proofs_Spec_lawyer from './components_fin/Lwyer_FIN_dashboard/FIN_lawyer_Dashboard_rq'
import PaymentProofDetails from './components_fin/Client__FIN_Dashbord/PaymentProofDetails'; // Assuming this is the correct path*/


// Deed Management
import DemDashboard from './components_dem/Dem_Dashboard';
import DemAddDeed from './components_dem/Dem_addDeed';
import DemReadAll from './components_dem/Dem_allDeed';
import DemDeedDetail from './components_dem/Dem_deedDetail';
import DemSearchResults from './components_dem/Dem_searchResult';


// Attorney Mangement
/*import Atm_Dashboard from './components_atm/Atm_Dashboard';

import Atm_LawFrim_Add from './components_atm/Atm_LawFrim/Atm_LawFrim_Add';

import Atm_LawFirm_Details from './components_atm/Atm_LawFrim/Atm_LawFirm_Details';
import Atm_Lawyer_Display from'./components_atm/Atm_Lawyer_Details/Atm_Lawyer_Display';
import Atm_Lawyer_Update from './components_atm/Atm_Lawyer_Update';
import Atm_Lawyer_Delete from'./components_atm/Atm_Lawyer_Details/Atm_Lawyer_Delete';
import Atm_LawFirm_Update from'./components_atm/Atm_LawFrim/Atm_LawFirm_Update';
import ViewUserDetails from './components_atm/ViewUserDetails';

import Atm_LawyerRegForm from './components_atm/Atm_LawyerRegistration/Atm_LawyerRegForm';*/



function App() {
  return (
    <Router>
      <div>
        <Routes>

          {/* Common */}
          <Route path="/" exact element={<Home />} />

          {/* Login */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/login/appointment-manager" exact element={<LoginAppointmentManager />} />
          <Route path="/login/support-agent" exact element={<LoginSupportAgent />} />
          <Route path="/login/legal-case-manager" exact element={<LoginLegalCaseManager />} />
          <Route path="/login/document-manager" exact element={<LoginDocumentManager />} />
          <Route path="/login/finance-manager" exact element={<LoginFinanceManager />} />
          <Route path="/login/deed-manager" exact element={<LoginDeedManager />} />
          <Route path="/login/attorney-manager" exact element={<LoginAttorneyManager />} />


          {/* Appointment Management */}
          <Route path="/lawyer-dashboard/appointments/:id" exact element={<LawyerAppointmentDashboard />} />
          <Route path="/lawyer-dashboard/create-appointment-request/:id" exact element={<LawyerCreateAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment-request/:id" exact element={<LawyerViewAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment/:id" exact element={<LawyerViewAppointment />} />
          <Route path="/lawyer-dashboard/view-all-appointment-requests/:id" exact element={<LawyerViewAllAppointmentRequests />} />
          <Route path="/lawyer-dashboard/view-all-appointments/:id" exact element={<LawyerViewAllAppointments />} />

          <Route path="/appointment-manager-dashboard/:id/" exact element={<AppointmentManagerDashboard />} />
          <Route path="/appointment-manager-dashboard/view-appointment-request/:id/:apManagerId" exact element={<AppointmentManagerViewAppointmentRequest />} />
          <Route path="/appointment-manager-dashboard/view-appointment/:id" exact element={<AppointmentManagerViewAppointment />} />
          <Route path="/appointment-manager-dashboard/view-all-appointment-requests" exact element={<AppointmentManagerViewAllAppointmentRequests />} />
          <Route path="/appointment-manager-dashboard/view-all-appointments/:id" exact element={<AppointmentManagerViewAllAppointments />} />

          <Route path="/client-portal/appointments/:id" exact element={<ClientAppointmentDashboard />} />
          <Route path="/client-portal/view-appointment/:id" exact element={<ClientViewAppointment />} />
          <Route path="/client-portal/view-all-appointments/:id" exact element={<ClientViewAllAppointments />} />


          {/* User Affairs Management */}
          <Route path="/client-portal/support/:id" exact element={<ClientSupportTicketDashboard />} />
          <Route path="/client-portal/create-support-ticket/:id" exact element={<ClientCreateSupportTicket />} />
          <Route path="/client-portal/view-support-ticket/:id" exact element={<ClientViewSupportTicket />} />
          <Route path="/client-portal/view-ticket-reply/:id" exact element={<ClientViewTicketReply />} />
          <Route path="/client-portal/view-all-support-tickets/:id" exact element={<ClientViewAllSupportTickets />} />
          <Route path="/client-portal/view-all-ticket-replies/:id" exact element={<ClientViewAllTicketReplies />} />

          <Route path="/support-agent-dashboard/:id" exact element={<SupportAgentDashboard />} />
          <Route path="/support-agent-dashboard/view-support-ticket/:id/:agentId" exact element={<SupportAgentViewSupportTicket />} />
          <Route path="/support-agent-dashboard/view-ticket-reply/:id" exact element={<SupportAgentViewTicketReply />} />
          <Route path="/support-agent-dashboard/view-all-support-tickets" exact element={<SupportAgentViewAllSupportTickets />} />
          <Route path="/support-agent-dashboard/view-all-ticket-replies" exact element={<SupportAgentViewAllTicketReplies />} />


          {/* Document Management */}
          <Route path="/dom_dashboard/:id" exact element={<Dom_Dashboard/>}/>
          <Route path="/dom_request/:id" exact element={<Dom_Request/>}/>
          <Route path="/dom_call" exact element={<Dom_Call/>}/>
          <Route path="/update/:id" exact element={<Dom_Call_Update/>}/>
          <Route path="/dom_call_dashboard" exact element={<Dom_Call_Dashboard/>}/>
          <Route path="/dom_call_view/:id" exact element={<Dom_Call_View/>}/>
          <Route path="/Dom_request_dom/:id/:document_manager_id" exact element={<Dom_Request_Dom/>}/>
          <Route path="/Dom_request_view/:id" exact element={<Dom_Request_View/>}/>
          <Route path="/Dom_request_update/:id" exact element={<Dom_Request_Update/>}/>
          <Route path="/Dom_client_dashboard" exact element={<Dom_Client_Dashboard/>}/>
          <Route path="/dom_request_approval_view/:id" exact element={<Dom_Request_Submitted_View/>}/>
          <Route path="/dom_request_approval/:id" exact element={<Dom_Request_Approval/>}/>
          <Route path="/document_requested_call_view/:id" exact element={<Dom_Call_View_Requested/>}/>


          {/* Legal Case Management */}
          <Route path="/Lcm_Dashboard/:id" exact element={<LegalCaseManagerDashboard />} />
          <Route path="/AddCase/:lawyerid" exact element={<AddCase/>} />
          <Route path="/Lcm_CaseUpdate/:id" exact element={<CaseUpdate/>} />
          <Route path="/Lcm_CaseDetails" element={<CaseDetails />} />
          <Route path="/Lcm_ClientSummary" element={<ClientSummary />} />
          <Route path="/Lcm_PreviousCaseDetails" element={<PreviousCaseDetails />} />
          <Route path="/Lcm_AddClient" element={<AddClient />} />
          <Route path="/Lcm_PreviousCases" element={<PreviousCases />} />
          <Route path="/Lcm_CaseReport" element={<CaseReport />} />
          <Route path="/Lcm_ClientCDashboard" element={<ClientCDashboard />} />


          {/* Client Portal 
          <Route path="/addClient" element={<AddClientE />} />
          <Route path="/clientHome/:id" element={<ClientPortalHome />} />
          <Route path="/successCli_Page" element={<SuccessPage />} />
          <Route path="/viewClient" element={<UserClients />} />
          <Route path="/loginClient/" element={<ClientLogin />} />
          <Route path="/clientProfile/:id" element={<ClientProfile />} /> 
          <Route path="/updateClient/:id" element={<UpdateClient />} />
          <Route path="/deleteClient/:id" element={<DeleteClient />} />
          <Route path="/viewCase/:nic" element={<ClientCase />} />
          <Route path="/viewDeed/:nic" element={<ClientDeeds />} />
          <Route path="/searchResults" element={<SearchResults />} /> */}



          {/* Finance Management 
          <Route path="/finance-manager-dashboard/:id" exact element={<Fin_payment_RQ/>}/>
        <Route path="/mainHome" exact element={<Home/>}/>
        <Route path="/user_details" exact element={<Fin_Payment_RQ_details/>}/>
        <Route path="/Fin_nav_Rq_form" exact element={<Fin_Payment_RQ_Insert/>}/>
        <Route path="/user_details/:id" exact element={<Fin_Payment_RQ_Update/>}/>
        <Route path="/delete_payment_rq/:id" exact element={<Delete_Payment_RQ/>} />

        <Route path="/payment_proofs_lists" exact element={<Fin_payment_proofs/>} />
        <Route path="/payment_proofs_form" exact element={<Fin_payment_proof_form/>} />
        <Route path="/payment_proof_update/:id" exact element={<Fin_payment_proof_update/>} />
        <Route path="/delete_payment_proof/:id" exact element={<Fin_payment_proof_delete/>} />

        <Route path="/payment_request_details/:id" exact element={<PaymentRequestDetails/>} />
        <Route path="/payment_proofs_details/:id" exact element={<Payment_proofs_details/>} />

        <Route path="/View_all_requests" exact element={<Fin_Payment_RQ_details/>} />
        <Route path="/View_all_proofs" exact element={<Fin_payment_proofs/>} />
        <Route path="/back_dashboard" exact element={<Back_dashboard/>} />




        <Route path="/client/:clientId" exact element={<Fin_proofs_spec_client />} />

        <Route path="/lawyer/:lawyerId" exact element={<Fin_proofs_Spec_lawyer />} />
        <Route path="/payment_proof_details/:id" element={<PaymentProofDetails />} />

        <Route path="/payment_request_details_client/:id" exact element={<Fin_client_PAyemnt_Submit />} />
          


          {/* Deed Management */}
          <Route path="/dem_dashboard/:id" exact element={<DemDashboard/>}/>
          <Route path="/add_deed" exact element={<DemAddDeed/>}/>
          <Route path="/read_all_deeds" exact element={<DemReadAll/>}/>
          <Route path="/deed/:id" exact element={<DemDeedDetail />} />
          <Route path="/search/:query" element={<DemSearchResults />} />



          {/* Attorney Management 
          <Route path="/attorney-manager-dashboard/:id" exact element={<Atm_Dashboard/>}/>
    
          <Route path="/add-lawfrim" exact element={<Atm_LawFrim_Add/>}/>
          
          <Route path="Atm_LawFirm_Details_Dipsply" exact element={<Atm_LawFirm_Details/>}/>
          <Route path="/lawfirm/details" element={<Atm_LawFirm_Details />} />
          <Route path="/lawfirm/update/:id" element={<Atm_LawFirm_Update />} />

          <Route path="/lawyer-details" exact element={<Atm_Lawyer_Display/>}/>
          <Route path="/update-lawyer/:id" element={<Atm_Lawyer_Update />} />
          <Route path="/delete-lawyer/:id" element={<Atm_Lawyer_Delete />} />
          <Route path="/user_details/:id"  element={<ViewUserDetails />} />
          <Route path="/add_lawyer" element={<Atm_LawyerRegForm />} />*/}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
