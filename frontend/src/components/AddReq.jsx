import { useState } from "react";
import Modal from "react-modal";
import "../CSS/AddReq.css";
import HomePage from "../pages/HomePage";
// import { Link } from "react-router-dom";

export default function AddReq() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddReq = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    console.log("Submitted value:", inputValue);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="buttons">
        <button className="btn btn-primary  AddReq" onClick={handleAddReq}>
          AddReq
        </button>
      </div>
      {/* <div className="modal"> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Input Modal"
        className="modal"
      >
        <HomePage />
        {/* <div className="inputData">
          <div className="title1">Enter Information</div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div> */}
      </Modal>
      {/* </div> */}
    </div>
  );
}
