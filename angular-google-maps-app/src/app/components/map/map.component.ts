import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'angular-google-maps-app';
  lat = 38.707680860109335;
  lng = -9.197723499267596;
  zoom = 10;
  address!: string;
  private geoCoder: any;



  markers = [
    {
        lat: 47,
        lng: 16,
        label1: 'Surat',
        label2: 'Ahmedabad'
    },
    {
        lat: 46,
        lng: 15,
        label1: 'Ahmedabad',
        label2: 'Surat'
    },
    {
        lat: 49,
        lng: 17,
        label1: 'Rajkot',
        label2: 'Surat',
    }

];


  @ViewChild('search')
  public searchElementRef!: ElementRef;


  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    
  ) { }

  ngOnInit(): void {
    let markerOptions = {
      position: new google.maps.LatLng(48, 16)
      }
    let marker = new google.maps.Marker(markerOptions);

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          //this.zoom = 12;
        });
      });
    });

    marker.setLabel('Qualquer info');
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
       // this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }


  markerDragEnd($event: google.maps.MouseEvent) {
    console.log($event);
    this.lat = $event.latLng.lat();
    this.lng = $event.latLng.lng();
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          //this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
