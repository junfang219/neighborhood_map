import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class LocationList extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }


  render() {
    const {locations,showMarkers} = this.props
    const {query} = this.state

    let filteredlocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredlocations = locations.filter((location) => match.test(location.title))
    } else {
      filteredlocations = locations
    }
console.log(filteredlocations);
    return (
      <div className = 'list-locations'>
        <p id='SU'>Syracuse University</p>
        <form className='search-form' onSubmit={(e) => {showMarkers(filteredlocations);e.preventDefault()}}>

          <input className='search-locations' type='text' placeholder='Search locations' value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

          <input className='search-filter' type='submit' value='Filter' />

        </form>

        <ul className= 'locations-list'>
          {filteredlocations.map((location) => (
            <li key={location.id} className='location-list-item'>
              <p>{location.title}</p>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default LocationList;
