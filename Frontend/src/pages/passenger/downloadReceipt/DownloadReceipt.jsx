import "./DownloadReceipt.css";
import logo from "../../../assets/favicon.png";

const DownloadReceipt = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <section className="receipt-section">
      <div className="receipt-layout">
        <div className="receipt-header">
          <div className="receipt-header-logo">
            <img src={logo} alt="" />
          </div>
          <div className="receipt-header-text">
            <h2 className="receipt-title">eel coach</h2>
            <p>fast and comfortable</p>
          </div>
        </div>

        <fieldset>
          <legend>traveller details</legend>
          <div className="traveller-details">
            <p className="name">manase gunga</p>
            <p>0789657453</p>
          </div>
        </fieldset>

        <fieldset>
          <legend>booking details</legend>
          <div className="booking-details">
            <p className="seat-number">34</p>
            <p className="number-of-seats">1</p>
            <p className="from">malindi</p>
            <p className="to">nairobi</p>
            <p className="travelling-date">1/2/2003</p>
            <p>Ksh. 1, 200</p>
            <p>Ksh. 1, 200</p>
            <p className="arrival">1.30pm</p>
          </div>
        </fieldset>

        <div className="receipt-guidlines">
          <h3>guidlines</h3>
          <ul>
            <li>
              make sure to provide this receipt before boarding, either in
              softcopy or hardcopy format.
            </li>
            <li>luggages of atleast 15kgs will be charged separately.</li>
            <li>make sure to provide this receipt before boarding</li>
            <li>there won't be a refund on failure to travell</li>
          </ul>
        </div>
      </div>
      <button onClick={handleDownload}>download</button>
    </section>
  );
};

export default DownloadReceipt;
