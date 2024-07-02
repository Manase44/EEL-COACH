import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/passenger/home/Home";
import Notfound from "./pages/notfound/Notfound";
import Book from "./pages/passenger/book/Book";
import ChooseSeat from "./pages/passenger/chooseSeat/ChooseSeat";
import Pay from "./pages/passenger/payment/Pay";
import DownloadReceipt from "./pages/passenger/downloadReceipt/DownloadReceipt";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Bookings from "./pages/admin/bookings/Bookings";
import Buses from "./pages/admin/buses/Buses";
import Employees from "./pages/admin/employees/Employees";
import Offices from "./pages/admin/offices/Offices";
import Payments from "./pages/admin/payments/Payments";
import BusRoutes from "./pages/admin/routes/BusRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/chooseseat" element={<ChooseSeat />} />
          <Route path="/payments" element={<Pay />} />
          <Route path="/done" element={<DownloadReceipt />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/buses" element={<Buses />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/offices" element={<Offices />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/routes" element={<BusRoutes />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
