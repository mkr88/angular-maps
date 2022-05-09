import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  title = 'multiplos markers';
  lat= 40.54048031554511;
  lng= -7.26653300854494;
  zoom= 13;
  address!: string;
  private geoCoder: any;
  infoWindow: any;
  infoWindowOpened: any
  previous_info_window: any

  markers = [
    {
        id: 1,
        lat: 40.54048031554511,
        lng: -7.26653300854494,
        label1: 'Auchan',
        label2: 'Av. dos Bombeiros Voluntários Egitanienses 3 44, 6300-523 Guarda, Portugal',
        url: 'http://www.auchan.pt/'
    },
    {
        id: 2,
        lat: 40.545828697020404,
        lng: -7.26477347943117,
        label1: 'Continente',
        label2: 'Freguesia S. Vicente, R. do Ferrinho, 6300-566 Guarda, Portugal',
        url: 'http://www.continente.pt/'
    },
    {
        id: 3,
        lat: 40.5441003033708,
        lng: -7.259151569335955,
        label1: 'Lidl',
        label2: 'Rua Vila de Manteigas, 6300-617 Guarda, Portugal',
        url: 'http://www.lidl.pt/'
    }

];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  });
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
  
    close_window(){
      if (this.previous_info_window != null ) {
        this.previous_info_window.close()
        }    
      }


      select_marker(infoWindow: any){
        if (this.previous_info_window == null)
         this.previous_info_window = infoWindow;
        else{
         this.infoWindowOpened = infoWindow
         this.previous_info_window.close()
        }
        this.previous_info_window = infoWindow

        //this.router.navigate(['/home'], { queryParams: { null:null } });
      } 



  

}
