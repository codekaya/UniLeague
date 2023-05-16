import React, { useState } from 'react';
import './RedeemCodePage.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function RedeemCodePage() {
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (code === '123456') {
      setIsCodeValid(true);
    } else {
      setIsCodeInvalid(true);
    }
  }

  const handleCloseValidModal = () => {
    setIsCodeValid(false);
  }

  const handleCloseInvalidModal = () => {
    setIsCodeInvalid(false);
  }

  return (
    <div className="redeem-body">
      <form onSubmit={handleFormSubmit}>
        <div className="redeem-container">
          <h1>Redeem Code</h1>
          <div className="redeem-form">
            <label className="redeem-label" htmlFor="code">Enter your code:</label>
            <input className="redeem-input" type="text" id="code" name="code" value={code} onChange={handleCodeChange} />
          </div>
          <button className="redeem-button" type="submit">Redeem</button>
        </div>
      </form>
      <Modal
        isOpen={isCodeValid}
        onRequestClose={handleCloseValidModal}
        contentLabel="Code Valid Modal"
      >
      <div className="redeem-popup-container">
    <h2 className="redeem-popup-message">Code <span className="redeem-correct">Valid!</span></h2>
    <p className="redeem-popup-text">Your code is <span className="redeem-correct">valid</span>. Congratulations!</p>
    <button className="redeem-popup-button" onClick={handleCloseValidModal}>Close</button>
  </div>
</Modal>
      <Modal
        isOpen={isCodeInvalid}
        onRequestClose={handleCloseInvalidModal}
        contentLabel="Code Invalid Modal"
      >
         <div className="redeem-popup-container">
    <h2 className="redeem-popup-message">Code <span className="redeem-incorrect">Invalid!</span></h2>
    <p className="redeem-popup-text">Your code is <span className="redeem-incorrect">invalid</span>. Please try again.</p>
    <button className="redeem-popup-button" onClick={handleCloseInvalidModal}>Close</button>
  </div>
      </Modal>
    </div>
  );
}

export default RedeemCodePage;