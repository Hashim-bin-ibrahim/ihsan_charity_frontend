import React, { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import Moment from "react-moment";

export default function DonersList({ setCredit }) {
  const [donateDetails, setDonateDetails] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getDetails`
    );
    setDonateDetails(data.data);

    setCredit(data.data.reduce((total, item) => total + item.amount, 0));
  };

  const columns = [
    {
      name: "name",
      selector: (row) => row.userId.username,
    },
    {
      name: "date",
      selector: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
    },
    {
      name: "payment_type",
      selector: (row) => (row.transactionId ? "Online" : "Onhand"),
    },
    {
      name: "transaction_id",
      selector: (row) => row.transactionId,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
  ];

  return (
    <DataTable
      title="Donors History"
      progressComponent={<PulseLoader />}
      columns={columns}
      data={donateDetails}
    />
  );
}
