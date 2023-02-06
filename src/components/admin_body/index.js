import React, { useRef, useState } from "react";
import "./style.css";
import DonersList from "./donersList";
import DonationList from "./donationList";
import Popup from "./popUp";
import useClickOutide from "../../helpers/clickOutSide";

export default function AdminBody() {
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");
  const popup = useRef(null);
  const [show, setShow] = useState(false);
  useClickOutide(popup, () => {
    setShow(false);
  });
  return (
    <>
      <div>
        <div className="donation_wrapper ">
          <div className="donation">
            <div className="credit">
              <p>Total Funds Raised.</p>
              <div className="amount">
                <p>&#8377; {Math.floor(credit)}</p>
                <span>Updated 1 min ago</span>
              </div>
            </div>
            <div className="debit">
              <p>Total Amount Donated.</p>
              <div className="amount">
                <p>&#8377; {Math.floor(debit)}</p>
                <span>Updated 1 min ago</span>
              </div>
            </div>
            <div className="balance">
              <p>Total Balance.</p>
              <div className="amount">
                <p>&#8377; {Math.floor(credit-debit)}</p>
                <span>Updated 1 min ago</span>
              </div>
            </div>
          </div>
          <div className="donersList ">
            <DonersList setCredit={setCredit} />
          </div>
          <div className="donationLIst">
            <DonationList setDebit={setDebit}/>
            <button className="plus_button" onClick={() => setShow(true)}>
              &#43;
            </button>
          </div>
          {show && (
            <div className="popup" ref={popup}>
              <Popup setShow={setShow} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
