import React from 'react';

const MarketingApprovalBox = () => {
  const handleClick = (spkId) => {
    // Handle click event (e.g., send approval request to the server)
    console.log(`Approving SPK with ID ${spkId}`);
  };

  return (
    <div className="col-md-2 text-center" style={{ textAlign: 'center', border: '2px dashed #000000', fontSize: '10pt', padding: '6px', fontWeight: 'bold' }}>
      <div className="form-group">
        <label>( <u>&nbsp;&nbsp; Marketing &nbsp;&nbsp;</u>)</label>
        <br /> <br /> <br />
        <button className="btn bg-green" onClick={() => handleClick('154805')}>
          Approve & Create SPK
        </button>
        <br />
      </div>
    </div>
  );
};

export default MarketingApprovalBox;
