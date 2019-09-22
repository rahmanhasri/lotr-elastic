import React from 'react';
import Parser from 'html-react-parser';

export default function ResultCard(props) {
  return (
    <div className="search-results">
     {
       props.searchResults.map((hit, index) => (
        <div className="mui-panel" key={index + '+' + hit._source.location} onClick={() => props.showBookModal(hit)}>
          <div className="mui--text-title">{Parser(hit.highlight.text[0])}</div>
          <div className="mui-divider"></div>
          <div className="mui--text-subhead">{ hit._source.title } - { hit._source.author }</div>
          <div className="mui--text-body2">Location { hit._source.location }</div>
        </div>
       ))
     }
    </div>
  )
}