import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import { useTable } from "react-table";
import busRoutes from "./busRoutes";
import { useMemo } from "react";

const Dashboard = () => {
  const data = useMemo(() => busRoutes, []);
  console.log(data);
  const columns = useMemo(
    () => [
      { Header: "FROM", accessor: "from" },
      { Header: "TO", accessor: "to" },
      { Header: "DEPT TIME", accessor: "departureTime" },
      { Header: "ARRIVAL TIME", accessor: "arrivalTime" },
      {
        Header: "PASSENGER SHOULD ARRIVE AT",
        accessor: "passengerArrivalTime",
      },
    ],
    [],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("cell")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody> */}
        </table>

        <dialog open>jj</dialog>
      </main>
    </div>
  );
};

export default Dashboard;
