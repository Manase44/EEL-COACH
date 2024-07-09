import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
const Bookings = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [allBookings, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchAllBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/booking`);
      console.log(response.data.bookings);
      setAllBookings(response.data.bookings);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  const columns = useMemo(
    () => [
      { Header: "PASSENGER", accessor: "passengerName" },
      { Header: "PHONE", accessor: "passengerPhone" },
      { Header: "ID NUMBER", accessor: "passengerID" },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: allBookings });

  useEffect(() => {
    fetchAllBookings();
  }, []);
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">bookings</h2>
          <div className="label-cta">
            <button>book for passenger</button>
          </div>
        </div>
        {isLoading || error ? (
          <p className="error">
            {error ? error : "we are setting up things for you..."}
          </p>
        ) : (
          <table className="display-table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Bookings;
