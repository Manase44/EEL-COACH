import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import doneSubmittingStore from "../../../../store/doneSubmitting.store";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import Modal from "../../../../components/modal/Modal";
import BusForm from "./BusForm";
import axios from "axios";
import { GiCheckMark } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { GoEye } from "react-icons/go";

const AmenitiesValues = ({ value }) => {
  return value ? (
    <GiCheckMark className="amenities-display true" />
  ) : (
    <GrClose className="amenities-display false" />
  );
};

const Buses = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const doneSubmitting = doneSubmittingStore((state) => state.doneSubmitting);
  const setDoneSubmitting = doneSubmittingStore(
    (state) => state.setDoneSubmitting,
  );
  const [allBuses, setAllBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(
    () => [
      { Header: "NUMBER PLATE", accessor: "busNumber" },
      { Header: "SEAT NUMBER", accessor: "numberOfSeats" },
      {
        Header: "WIFI",
        accessor: "wifi",
        Cell: ({ cell: { value } }) => <AmenitiesValues value={value} />,
      },
      {
        Header: "AC",
        accessor: "ac",
        Cell: ({ cell: { value } }) => <AmenitiesValues value={value} />,
      },
      {
        Header: "CHARGING POINTS",
        accessor: "sockets",
        Cell: ({ cell: { value } }) => <AmenitiesValues value={value} />,
      },
      {
        Header: "ADJUSTABLE SEAT",
        accessor: "adjustableSeat",
        Cell: ({ cell: { value } }) => <AmenitiesValues value={value} />,
      },
      {
        Header: "LUGGAGE COMPARTMENT",
        accessor: "luggageCompartment",
        Cell: ({ cell: { value } }) => <AmenitiesValues value={value} />,
      },
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
            setDoneSubmitting(false);
            setOpenModal(false);
          }}
          title="adding a bus"
          content={
            doneSubmitting ? (
              <button
                onClick={() => {
                  setDoneSubmitting(false);
                }}
              >
                add another bus
              </button>
            ) : (
              <BusForm />
            )
          }
        />
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
                  <th>ACTIONS</th>
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
                    <td>
                      <MdDeleteOutline />
                    </td>
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
