import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
export default function Home_Body({user}) {
  const [error, setError] = useState("");
  const [online, setOnline] = useState(true);
  const [addComment, setAddComment] = useState(false);
  const [message, setMessage] = useState("");
  let [otherAmount, setOtherAmount] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState();
  const [transactionId, setTransactionId] = useState();
  const [comment, setComment] = useState();
  let amounts = [
    { value: 100 },
    { value: 200 },
    { value: 500 },
    { value: 1000 },
    { value: 2000 },
    { value: "Other" },
  ];

 

  let userId = user._id;


  const handleAmount = (value) => {
    console.log("clicked");
    if (value === "Other") {
      setOtherAmount(true);
    }
    // do the function to store the specified  amount in database
    else {
      setSelectedAmount(value);
    }
  };

  const onSubmit = async () => {
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/donate`, {
      userId,
      amount: selectedAmount,
      transactionId,
      comment,
    });

    setMessage(data.data.message);
    setError(data.data.error);

    console.log("data", data);
  };

  return (
    <div>
      <div className="donate_wrapper">
        <div className="donate">
          <div className="donate_header">
            <span>Secure Donation</span>
          </div>
          <div className="payment_type">
            <div
              className={`online ${online ? "blue" : "white"}`}
              onClick={() => setOnline(true)}
            >
              <p>Onlilne</p>
            </div>
            <div
              className={`cash_on_hand ${online ? "white" : "blue"}`}
              onClick={() => setOnline(false)}
            >
              <p>Cash On Hand</p>
            </div>
          </div>
          <div className="amounts">
            {amounts.map((amnt, i) => {
              return (
                <button
                  className="amount"
                  key={i}
                  onClick={() => handleAmount(amnt.value)}
                  disabled={amnt.value !== "Other" && otherAmount}
                >
                  <p>
                    <span>&#8377;</span>
                    {amnt.value}
                  </p>
                </button>
              );
            })}
          </div>
          {selectedAmount && (
            <div className="donating_amount">
              <div className="selectedAmount">
                <p>Donatting Amount : </p>
                <span>&#8377; {selectedAmount}</span>
              </div>
            </div>
          )}
          {otherAmount && (
            <div className="other_amounts">
              <div className="other_amount">
                <input
                  type="number"
                  placeholder="Enter your Amount"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                />
              </div>
            </div>
          )}
          {online && (
            <div className="transaction_details">
              <span>Please Enter your Transaction ID</span>
              <div className="other_amount transaction">
                <input
                  type="text"
                  placeholder="Enter Your Transaction Id"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
              {error && (
                <div className="error">
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
          <div className="add_comment">
            <button onClick={() => setAddComment(!addComment)}>
              Add comment{" "}
            </button>
          </div>
          {addComment && (
            <div className="transaction_details comment">
              <div className="other_amount comment">
                <input
                  type="text"
                  placeholder="Enter Your Comment Here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          )}

          {message && (
            <div className="error">
              <span>{message}</span>
            </div>
          )}

          <div className="button_donate">
            <button className="donate_btn" onClick={onSubmit}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
