import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import Modal from "../../../../components/modal/Modal";
import axios from "axios";

const Buses = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [allBuses, setAllBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(
    () => [
      { Header: "NUMBER PLATE", accessor: "busNumber" },
      { Header: "SEAT NUMBER", accessor: "numberOfSeats" },
      { Header: "WIFI", accessor: "wifi" },
      { Header: "AC", accessor: "ac" },
      { Header: "CHARGING POINTS", accessor: "sockets" },
      { Header: "ADJUSTABLE SEAT", accessor: "adjustableSeat" },
      { Header: "LUGGAGE COMPARTMENT", accessor: "luggageCompartment" },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: allBuses });

  const fetchBuses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/admin/buses`);
      console.log(response.data.buses);
      setAllBuses(response.data.buses);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">available buses</h2>
          <div className="label-cta">
            <button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              add bus
            </button>
          </div>
        </div>
        <Modal
          open={openModal}
          close={() => {
            setOpenModal(false);
          }}
          title="adding a bus"
          content="This is the modal content"
        />
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
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
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

export default Buses;
