import React from 'react';

export default function ResultsCount(props) {
  let { numHits, searchOffset } = props
  return (
    <div className="mui-panel">
      <div className="mui-row">
        <div className="mui-col-md-6">
          <div className="mui--text-headline"><p>Hits {numHits}</p></div>
          <div className="mui--text-subhead"><p>Displaying Results {numHits === 0 ? 0 : searchOffset + 1 } - {searchOffset + 10 > numHits ? numHits : searchOffset + 10}</p></div>
        </div>
      </div>
    </div>
  )
}