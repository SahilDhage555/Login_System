import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  // Import necessary components from react-router-dom
import Register from './Components/RegForm';  // Import Register component
import Login from './Components/LogForm';  // Import Login component
import UserDash from './Components/UserDash';  // Import User Dashboard component
import SecureRoute from './Components/SecureRoute';  // Import SecureRoute component to protect the dashboard

export default function App() {
  return (
    <div className='page'>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>  {/* The BrowserRouter component wraps the entire routing logic to enable routing in the app */}
        <Routes>
          {/* Default route, redirects users to the login page */}
          <Route path="/" element={<Navigate to="/register" />} />  
          
          {/* Route for the registration page */}
          <Route path="/register" element={<Register />} />
          
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected route for the dashboard. Wrapped with SecureRoute to check for authentication */}
          <Route path="/dashboard" element={<SecureRoute><UserDash /></SecureRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
