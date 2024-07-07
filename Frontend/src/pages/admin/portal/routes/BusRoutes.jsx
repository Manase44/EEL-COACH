import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";

const BusRoutes = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [allRoutes, setAllRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const columns = useMemo(
    () => [
      { Header: "FROM", accessor: "from" },
      { Header: "TO", accessor: "to" },
      { Header: "FARE", accessor: "price" },
      { Header: "DEPARTURE TIME", accessor: "departureTime" },
      {
        Header: "PASSENGER MUST ARRIVE BEFORE",
        accessor: "passengerArrivalTime",
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: allRoutes });

  const fetchBusRoutes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/admin/routes`);
      console.log(response.data.busRoutes);
      setAllRoutes(response.data.busRoutes);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusRoutes();
  }, []);
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">
            These are the registered routes
          </h2>
          <div className="label-cta">
            <button>add route</button>
          </div>
        </div>
        {isLoading || error ? (
          <p className="error">
            {error ? error : "we are setting up things for you..."}
          </p>
        ) : (
          <table {...getTableProps()}>
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

export default BusRoutes;
