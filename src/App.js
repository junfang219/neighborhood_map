import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList'


class App extends Component {

  state = {

      locations: [
       {
         title:'Hall of Languages',
         location: {
         'lat'  : 43.038567,
         'lng' : -76.134478
         },
         id:'ChIJIxzYrp_z2YkRLlDFZPxS-wQ'
       },
       {
         title:'Carrier Dome', location: {
         'lat'  : 43.036227,
         'lng' : -76.136316
         },
         id:'ChIJQ8K5Npnz2YkRZof_3BalOvo'
       },
       {
         title:'Setnor School of Music', location: {
         'lat'  : 43.038528,
         'lng' : -76.13688
         },
         id:'ChIJD3hZQZ_z2YkRH6wqd0WIpl8'
       },
       {
         title:'Maxwell School of Citizenship and Public Affairs', location: {
         'lat'  : 43.03806,
         'lng' : -76.135891
         },
         id: 'ChIJy3yl_J7z2YkR72RKT5mv1v8'
       },
       {
         title:'Whitman School of Management', location: {
         'lat'  : 43.042135,
         'lng' : -76.133898
         },
         id: 'ChIJvZ7OTqDz2YkR7QNrPsyGQbs'
       },
       {
         title:'Huntington Hall', location: {
         'lat'  : 43.041338,
         'lng' : -76.135373
         },
         id: 'ChIJPeRB0qHz2YkRmz-rg1Z3HdU'
       },
       {
         title:'Life Sciences Complex', location: {
         'lat'  : 43.038099,
         'lng' : -76.130557
         },
         id: 'ChIJT2C5bXXz2YkRHvSd6quA97M'
       },
       {
         title:'Syracuse University Library', location: {
         'lat'  : 43.039951,
         'lng' : -76.132617
         },
         id: 'ChIJHXQh-p_z2YkRA9O_JsMG9vg'
       }
     ],
    map:{},
    mapMarkers:[],
    infowindow:{}
  }



  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center:{lat:43.039153,lng:-76.135116},
      zoom:16,
    });
    this.setState({map:map})
  }

    hideMarkers = (markers) => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
  }

  // create function that shows the selected markers
  createMarkers = (locations, infowindow, map) => {
    let currmarkers = [];
    const out = this;
      // The following group uses the location array to create an array of markers on initialize.
      locations.forEach((location) => {
        // Create a marker per location, and put into markers array.
        var marker = new window.google.maps.Marker({
          map: map,
          position: location.location,
          title: location.title,
          animation: window.google.maps.Animation.DROP,
        });
        // push the single marker to the currmarkers array
        currmarkers.push(marker);
        //add event listner to marker: click it gives infowindow, mouseover to bounce
        marker.addListener('click', function() {
            out.populateInfoWindow(marker, infowindow, map);
        });
        marker.addListener('mouseover', function() {
           out.addBounce(marker);
        });
        marker.addListener('mouseout', function() {
           out.removeBounce(marker);
        })

      })
      // set the currmarkers to state
    this.setState({mapMarkers:currmarkers});
  }

  addBounce= (marker) => {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
  }
  removeBounce = (marker) => {
    marker.setAnimation(null);
  }

  // get data from Flickr via API
  getFlickrPic = (marker, infowindow, map) => {
      let search = marker.title.split(' ').join('_');
      let out = this;
      const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d2eb1dfc3546c22991540f933a8e77b4&tags='+ search +'&format=json&nojsoncallback=1'

      fetch(url).then( function ( response ) {
          return response.json();
        } ).then(function( data ) {
        // get pic url from json
        let picArray = data.photos.photo.map(pic => {
          return 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        })
        // pass the url to set the infowindow
        out.windowContent(marker, infowindow, map, picArray[0])
      }).catch(
        // Show on HTML to the user that the picture request has failed.
        error => {
          let errorMsg = 'Flickr API failed:' + error;
          out.requestError(marker, infowindow, map, errorMsg);
        }
      )
  }

  windowContent = (marker, infowindow, map, flickrImg) => {
    infowindow.marker = marker
    infowindow.setContent(`<div tabIndex='0' >${marker.title}</div> <img tabIndex='0' alt= ${marker.title}  src=${flickrImg}></img>`)
    infowindow.open(map, marker)
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null
    })
  }

  requestError = (marker, infowindow, map, errorMsg) => {
    infowindow.marker = marker
    infowindow.setContent(errorMsg)
    infowindow.open(map, marker)
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null
    })
  }

  populateInfoWindow = (marker,infowindow, map) => {
      if (infowindow.marker !== marker) {
        this.getFlickrPic(marker, infowindow, map);
      }
  }


  renderMap = () => {
    this.initMap();
    let infowindow = new window.google.maps.InfoWindow();
    this.createMarkers(this.state.locations, infowindow, this.state.map);
    this.setState({infowindow:infowindow})
  }


  componentDidMount() {
    window.renderMap = this.renderMap;
    loadMapAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYhhzeQLNVsdsJSoLjGfsuX8Z_FMC50Ec&v=3&callback=renderMap")
  }

  render() {
      return (
        <div className='App'>
          < LocationList
          locations = {this.state.locations}
          hideMarkers = {this.hideMarkers}
          createMarkers = {this.createMarkers}
          mapMarkers = {this.state.mapMarkers}
          infowindow = {this.state.infowindow}
          populateInfoWindow = {this.populateInfoWindow}
          map = {this.state.map}
          addBounce = {this.addBounce}
          removeBounce = {this.removeBounce}
          />
          <div id = 'map'></div>
        </div>
      );
    }
  }

export default App;

function loadMapAPI(url) {
    var script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = url;
    // Show user an error if the map request fails
    script.onerror = () => {
      alert('Google map can not be loaded!');
    }

    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(script, x)
}
