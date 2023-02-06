import React from "react";
import "./style.css";
export default function Footer() {
  return (
    <>
      <div className="wrapper">
        <div className="footer_part one">
          <img src="../../ihsaan_logo_2.png" alt="" width={"70px"} />
        </div>

        <div className="footer_part account_details">
          <p>Account Details :</p>
          <p>G-PAY : 81378 62764</p>
          <p>PHONE-PAY : 81378 62764</p>
        </div>
      </div>
      <div className="footer_part hadeeth">
        <p>
          قَالَ رَسُولَ اللَّهُ صلى الله عليه وسلم: اتَّقُوا النَّارَ وَلو بشق
          تمرة".
        </p>
        <p>
          The Prophet (صلى الله عليه وسلم) said: "Save yourself from Hell- fire
          even by giving half a date-fruit in charity." البخاري - Al-Bukhari
        </p>
      </div>

      <div className="developer_info">
        <p>Seethayil Poyil</p>
        <p>
          Designed and developed by Hashim <span>+91 9633802594</span>
        </p>
      </div>
    </>
  );
}
