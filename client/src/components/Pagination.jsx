import React from 'react';

export default function Pagination(props) {
  let { prevResultsPage, nextResultsPage } = props
  return (
    <div className="mui-panel pagination-panel">
        <button className="mui-btn mui-btn--flat" onClick={prevResultsPage}>Prev Page</button>
        <button className="mui-btn mui-btn--flat" onClick={nextResultsPage}>Next Page</button>
    </div>
  )
}