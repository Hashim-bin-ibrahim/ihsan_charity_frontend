import axios from "axios";
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Popup({ setShow }) {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/addBeneficiary`,
      {
        name,
        location,
        type,
        amount,
      }
    );
    setMessage(data.data.message);
    if (data.statusText === "OK") {
      setLoading(true);
      setTimeout(() => {
        setShow(false);
        setLoading(false)
      }, [3000]);
    }
  };
  return (
    <div className="popup_main_wrapper">
      <div className="input popup_wrapper">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Select a Type">Select a Type</option>
          <option value="Educational charities">Educational charities</option>
          <option value="Health charities">Health charities</option>
          <option value="Humanitarian charities">Humanitarian charities</option>
          <option value="Other charities">Other charities</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        {/* {message && (
            <p className="message">{message}</p>
        )} */}
        <div className="submit_btn">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? <PulseLoader color="black" size={5} /> : "Donate"}
          </button>
        </div>
      </div>
    </div>
  );
}
