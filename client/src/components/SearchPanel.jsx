import React from 'react';

export default function SearchPanel(props) {
  let { value, handleChange } = props
  return (
    <div className="mui-panel">
      <div className="mui-row">
        <div className="mui-col-md-6">
          <div className="mui-textfield">
            <h1 className="mui--text-center"><strong>Lord of The Rings Books</strong></h1>
            <h2 className="mui--text-center"><strong>E.Search</strong></h2>
            <input type="text" value={value} onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}