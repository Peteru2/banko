import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const PinInputField = ({ value, onChange, onFocusNext, onFocusPrev }) => {
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault()
    const newValue = e.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      onChange(newValue);
      if (newValue !== '') {
        onFocusNext();
      }
    }
  };

  const handleKeyDown = (e) => {
    
    if (e.key === 'Backspace' && value === '') {
      onFocusPrev();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      maxLength="1"
      value={value}
      onChange={handleInputChange}
      onFocus={() => inputRef.current.select()}
      className='border-[1px] w-full border-gray flex rounded-md  outline-none py-1 px-2 mx-2  my-2 '
      onKeyDown={handleKeyDown}
    />
  );
};

const TransPinForm = ({ onSubmit }) => {
  const [pinValues, setPinValues] = useState(['', '', '', '']);

  const handlePinChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const handleFocusNext = (index) => {
    if (index < 3) {
      document.getElementById(`pinInput${index + 1}`).focus();
    }
  };

  const handleFocusPrev = (index) => {
    if (index > 0) {
      document.getElementById(`pinInput${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pinValues.every((value) => value !== '')) {
      const pin = pinValues.join('');
      onSubmit(pin); // Call the onSubmit function passed from the parent component
    } else {
      toast.error("Please fill in all PIN fields.", {
        position: "top-right",
      })
    }
  };

  return (
    <>    <div>
         <div className="flex ">
      <PinInputField
        value={pinValues[0]}
        onChange={(value) => handlePinChange(0, value)}
        onFocusNext={() => handleFocusNext(0)}
        onFocusPrev={() => handleFocusPrev(0)}
      />
    
    <PinInputField
        id="pinInput1"
        value={pinValues[1]}
        onChange={(value) => handlePinChange(1, value)}
        onFocusNext={() => handleFocusNext(1)}
        onFocusPrev={() => handleFocusPrev(1)}
        className="flex w-2"
      />
      <PinInputField
        id="pinInput2"
        value={pinValues[2]}
        onChange={(value) => handlePinChange(2, value)}
        onFocusNext={() => handleFocusNext(2)}
        onFocusPrev={() => handleFocusPrev(2)}
      />
      <PinInputField
        id="pinInput3"
        value={pinValues[3]}
        onChange={(value) => handlePinChange(3, value)}
        onFocusPrev={() => handleFocusPrev(3)}
      />
     

      </div>

      <button className="bg-private rounded-md w-full text-center font-bold  py-2" onClick={handleSubmit}>Submit</button>
    </div>
                <ToastContainer />
                </>

  );
};

export default TransPinForm;
