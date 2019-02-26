import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList'

class App extends Component {
  state = {
    center:
      {
        title:'Syracuse University', location:{
          lat:43.039153,
          lng:-76.135116
        }
      }
    ,
    locations: [
      {
        title:'Syracuse University Hall of Languages',
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
      }
    ],
    map:{},
    currmarkers:[],
    // InfoWindow:[]
  }


  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center:this.state.center.location,
      zoom:16,
    });
    this.setState({map:map})
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  // populateInfoWindow = (marker, infowindow) => {
  //   // Check to make sure the infowindow is not already opened on this marker.
  //   if (infowindow.marker != marker) {
  //     infowindow.marker = marker;
  //     infowindow.setContent('<div>' + marker.title + '</div>');
  //     infowindow.open(this.state.map, marker);
  //     // Make sure the marker property is cleared if the infowindow is closed.
  //     infowindow.addListener('closeclick',function(){
  //       infowindow.setMarker = null;
  //     });
  //   }
  // }

  // create function that shows the selected markers
  showMarkers = (markers) => {

    let currmarkers = [];

    var bounds = new window.google.maps.LatLngBounds();

      // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < markers.locations.length; i++) {
      // Get the position from the location array.
      var position = markers.locations[i].location;
      var title = markers.locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new window.google.maps.Marker({
        map: this.state.map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i
      });

      currmarkers.push(marker);

      // extend view for each marker
      bounds.extend(position);
    }

    // Extend the boundaries of the map for each marker
    this.state.map.fitBounds(bounds);

    this.setState({currmarkers:currmarkers})
  }


  renderMap = () => {
    this.initMap();
    this.showMarkers(this.state)
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
          showMarkers = {this.showMarkers}/>
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
  script.onerror = () => {
    alert('Google map can not be loaded!');
  }

  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(script, x)
}
