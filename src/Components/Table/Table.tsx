import React from "react";
import { useTable } from "react-table";

function Table({
  columns,
  data,
  viewIndex,
}: {
  columns: any[];
  data: any[];
  viewIndex: number;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="m-4" {...getTableProps()}>
      <thead className="my-4">
        {headerGroups.map((headerGroup) => (
          <tr
            className="h-10 bg-green-300"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          let viewData;
          if (i === viewIndex) {
            viewData = row.original;
          }
          return (
            <>
              <tr
                className={`text-center ${
                  i % 2 === 0 ? "bg-gray-200" : ""
                } `}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              <tr>
                {i === viewIndex && (
                  <td colSpan={4}>
                    <div className="bg-green-100 h-40 items-center flex flex-col justify-around">
                      <div>First Name : {viewData.firstName}</div>
                      <div>Last Name : {viewData.lastName}</div>
                      <div>Status: {viewData.status}</div>
                    </div>
                  </td>
                )}
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
