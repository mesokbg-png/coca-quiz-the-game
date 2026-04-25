import React from 'react';

export default function PhonePanel({ hint, onClose }) {
  if (!hint) return null;
  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Call Ivo</h3>
        <p className="phone-message">{hint.message}</p>
        <button className="btn btn-lock" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
