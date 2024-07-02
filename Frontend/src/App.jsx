import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/passenger/home/Home";
import Notfound from "./pages/notfound/Notfound";
import Book from "./pages/passenger/book/Book";
import ChooseSeat from "./pages/passenger/chooseSeat/ChooseSeat";
import Pay from "./pages/passenger/payment/Pay";
import DownloadReceipt from "./pages/passenger/downloadReceipt/DownloadReceipt";

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
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
