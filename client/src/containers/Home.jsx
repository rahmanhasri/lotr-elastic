import React, { Component } from 'react';
import axios from 'axios';
import get from 'lodash.get';
import bookTitle from '../bookTitle';

import '../css/Home.css';

import ResultCard from '../components/ResultCard';
import ResultsCount from '../components/ResultsCount';
import SearchPanel from '../components/SearchPanel';
import Pagination from '../components/Pagination';
import BookModal from '../components/BookModal';


class Home extends Component {
  state = {
    baseUrl: 'http://localhost:3000',
    searchResults: [],
    numHits: null,
    searchTerm: 'Mordor',
    searchOffset: 0,
    selectedParagraph: null,
    bookOffset: 0,
    paragraphs: [],
  }
  componentDidMount() {
    this.search();
  }

  // setStateAsync(state) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }

  search = async (offset=0) => {
    const { baseUrl, searchTerm } = this.state
    try {
      const response = await axios({
        method: 'GET',
        url: baseUrl + `/search?term=${searchTerm}&offset=${offset}`,
      });
      this.setState({
        searchOffset: offset,
        searchResults: get(response, 'data.hits.hits', []),
        numHits: get(response, 'data.hits.total', 0),
      })
    } catch(error) {
      // alert('internal server error');
    }
  }

  nextResultsPage = () => {
    if(this.state.numHits >= 10) {
      const nextOffset = this.state.searchOffset + 10
      nextOffset < this.state.numHits ?
        this.search(nextOffset) : this.search()
      document.documentElement.scrollTop = 0
    }
  }

  prevResultsPage = () => {
    if(this.state.numHits >= 10) {
      const nextOffset = this.state.searchOffset - 10
      nextOffset > 0 ?
        this.search(nextOffset) :
        this.search()
      document.documentElement.scrollTop = 0
    }
  }

  getParagraphs = async (bookTitle, offset) => {
    try {
      const { baseUrl } = this.state
      this.setState({ bookOffset: offset })
      const start = offset
      const end = offset + 10
      const response = await axios({
        method: 'GET',
        url: baseUrl + `/paragraphs?bookTitle=${bookTitle}&start=${start}&end=${end}`
      })
      console.log(response)
      document.getElementsByClassName('book-modal')[0].scrollTop = 0
      return get(response, 'data.hits.hits', [])
    } catch (err) {
      console.error(err)
    }
  }

  nextBookPage = async () => {
    const paragraphs = await this.getParagraphs(this.state.selectedParagraph._source.title, this.state.bookOffset + 10)
    this.setState({ paragraphs })
  }

  prevBookPage = async () => {
    let offset = this.state.bookOffset - 10
    if(offset - 10 < 0) {
      this.setState({ bookOffset: 0 })
      offset = 0
    }
    const paragraphs = await this.getParagraphs(this.state.selectedParagraph._source.title, offset)
    this.setState({ paragraphs })
  }

  showBookModal = async (searchHit) => {
    // console.log('hit modal', searchHit)
    try {
      document.body.style.overflow = 'hidden'

      this.setState({ selectedParagraph: searchHit })

      const paragraphs = await this.getParagraphs(searchHit._source.title, searchHit._source.location)
      this.setState({ paragraphs })
    } catch (err) {
      console.error(err)
    }
  }

  closeBookModal = () => {
    document.body.style.overflow = 'auto'
    this.setState({ selectedParagraph: null })
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
    this.state.searchTerm.length && this.search();
  }

  openBook = (vol) => {
    this.showBookModal({
      _source: {
        author: "J.R.R Tolkien",
        title: bookTitle[vol],
        location: 0,
      },
    });
  }

  render() {
    const {
      searchTerm,
      searchOffset,
      numHits,
      searchResults,
      bookOffset,
      selectedParagraph,
      paragraphs } = this.state

    return (
      <div className="mui-container-fluid" >
        <div className="mui-row">
          <div className="mui-col-md-8" >
            <SearchPanel value={searchTerm} handleChange={this.handleChange} search={this.search}/>
            <div className="mui-panel pagination-panel">
              <button className="mui-btn mui-btn--flat" onClick={() => this.openBook(0)}>Book 1</button>
              <button className="mui-btn mui-btn--flat" onClick={() => this.openBook(1)}>Book 2</button>
              <button className="mui-btn mui-btn--flat" onClick={() => this.openBook(2)}>Book 3</button>
            </div>
            <ResultsCount numHits={numHits} searchOffset={searchOffset}/>
            <ResultCard searchResults={searchResults} showBookModal={this.showBookModal}/>
            <Pagination prevResultsPage={this.prevResultsPage} nextResultsPage={this.nextResultsPage}/>
            { selectedParagraph
              && 
              <BookModal
                bookOffset={bookOffset}
                selectedParagraph={selectedParagraph}
                paragraphs={paragraphs}
                nextBookPage={this.nextBookPage}
                prevBookPage={this.prevBookPage}
                closeBookModal={this.closeBookModal}
                /> }
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
