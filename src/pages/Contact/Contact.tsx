import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { Row } from "react-table";
import {
  setActionIndex,
  setEdiIndex,
  deleteContact,
} from "../../redux-slice/contactSlice";

function Contact() {
  const { contacts, actionIndex } = useSelector(
    (state: RootState) => state.contact
  );

  const dispatch = useDispatch();
  const hasContacts = contacts.length > 0;

  const columns = useMemo(
    () => [
      {
        Header: "Sl. No",
        accessor: (_row: Row, i: number) => i + 1,
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Actions",
        Cell: ({ row }: { row: Row }) => {
          return (
            <div className="flex justify-center gap-4">
              <Button
                text="View"
                type="primary"
                onClick={() => dispatch(setActionIndex(Number(row.id)))}
              />
              <Link to="/edit-contact">
                <Button
                  text="Edit"
                  type="secondary"
                  onClick={() => dispatch(setEdiIndex(Number(row.id)))}
                />
              </Link>
              <Button
                text="Delete"
                type="danger"
                onClick={() => dispatch(deleteContact(Number(row.id)))}
              />
            </div>
          );
        },
      },
    ],
    [dispatch]
  );
  return (
    <div className="flex flex-col w-screen border-l-2 ">
      <Link to="/create-contact">
        <div className="flex justify-center h-40 items-center">
          <Button text="Create Contact" type="primary" />
        </div>
      </Link>
      <div className="flex flex-col flex-1 w-full overflow-y-scroll">
        {hasContacts ? (
          <Table columns={columns} data={contacts} viewIndex={actionIndex} />
        ) : (
          <div className="flex flex-col flex-1 justify-center text-center">
            <h3>
              No Contact Found <br />
              Please Add Contact from Create Contact Button
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
