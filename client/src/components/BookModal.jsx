import React from 'react';

export default function BookModal(props) {
  let { bookOffset, selectedParagraph, paragraphs, prevBookPage, nextBookPage, closeBookModal } = props
  return (
    <div className="book-modal">
      <div className="paragraphs-container">
        <div className="title-row">
          <div className="mui--text-display2 all-caps">
            {selectedParagraph._source.title}
          </div>
          <div className="mui--text-display1">
            {selectedParagraph._source.author}
          </div>
        </div>
        <br/>
        <div className="mui-divider"></div>
        <div className="mui--text-subhead locations-label">Locations {bookOffset } to { bookOffset + 9 }</div>
        <div className="mui-divider"></div>
        <br/>

        {/* Book Paragraphs */}
        { paragraphs.map(
            (para, index) => (
              <div key={index} className="margin-paragraphs">
              { para._source.location === selectedParagraph._source.location
                ?
                <div className="mui--text-body2">
                  <strong>{para._source.text}</strong>
                </div>
                :
                <div className="mui--text-body1">
                  {para._source.text}
                </div>
              }
              </div>
          )
        )}
      </div>
      <div className="modal-footer">
        <button className="mui-btn mui-btn--flat" onClick={prevBookPage}>Prev Page</button>
        <button className="mui-btn mui-btn--flat" onClick={closeBookModal}>Close</button>
        <button className="mui-btn mui-btn--flat" onClick={nextBookPage}>Next Page</button>
      </div>
    </div>
  )
}