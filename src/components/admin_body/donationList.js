import React, { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import Moment from "react-moment";

export default function DonationList({setDebit}) {
  const [donateDetails, setDonateDetails] = useState([]);

  useEffect(() => {
    getDonationDetails();
  }, []);

  const getDonationDetails = async () => {
    let data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getDonationDetails`
    );
    console.log("beneficiaryDetails", data);
    setDonateDetails(data.data);
    setDebit(data.data.reduce((total,item)=>total+item.amount,0))
    // getDonationDetails();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Date",
      selector: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
  ];

  return (
    <DataTable
      title="Donation History"
      columns={columns}
      data={donateDetails}
    />
  );
}
