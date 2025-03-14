import React from "react";

function Deliver() {
  return (
    <div className="flex justify-center mt-[10%]">
      <ul className="steps">
        <li className="step step-info">Fly to moon</li>
        <li className="step step-info">Shrink the moon</li>
        <li className="step step-info">Grab the moon</li>
        <li className="step step-error" data-content="?">
          Sit on toilet
        </li>
      </ul>
    </div>
  );
}

export default Deliver;
