import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import { slide as Menu } from 'react-burger-menu'

class LocationList extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }


  render() {
    const {map, locations,mapMarkers, createMarkers, hideMarkers, infowindow, populateInfoWindow, addBounce, removeBounce} = this.props
    const {query} = this.state

    let filteredList
    let filteredMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredList = locations.filter((location) => match.test(location.title))
      filteredMarkers = mapMarkers.filter((marker) => match.test(marker.title))
    } else {
      filteredList = locations
      filteredMarkers = mapMarkers

    }

    return (
      // hambuger menu
        <Menu isOpen={ true }>
          <div className = 'list-locations'>
            <p id='SU'>Syracuse University</p>

            <form className='search-form' tabIndex='0' onSubmit = {e => { hideMarkers(mapMarkers); createMarkers(filteredList, infowindow, map); e.preventDefault();}}>
              <input className='search-locations' aria-label='search' type='text' placeholder='Search locations' value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

              <input className='search-filter' value='filter' type= 'submit'/>
            </form>

            <ul className= 'locations-list'>
              {filteredMarkers.map((marker) => (

                <li key={marker.title} tabIndex='0' className='location-list-item'
                onClick = {() => {populateInfoWindow(marker, infowindow, map)}}
                onMouseOver = {() => {addBounce(marker)}}
                onMouseOut = {() => {removeBounce(marker)}}>
                  <p>{marker.title}</p>
                </li>
              ))}
            </ul>

          </div>
        </Menu>

    );
  }
}

export default LocationList;
