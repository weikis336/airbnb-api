import { Loader } from '@googlemaps/js-api-loader'

class Map extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.markers = []
    this.loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      version: 'weekly'
    })
    this.data = null
  }

  async connectedCallback () {
    this.data = await fetch('./src/data/airbnb-owner-accumulation-property-geolocatation.json').then(response => response.json())
    await this.render()
  }

  async render () {
    this.shadow.innerHTML =
    /* html */`<style>

      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .map {
        height: 100vh;
        width: 100%;
      }

      .gm-style iframe + div { border:none!important; }
    </style>

    <div class="map"></div>
    `

    await this.loadMap()
  }

  async loadMap () {
    this.google = await this.loader.load()
    const { Map } = await this.google.maps.importLibrary('maps')
    const { AdvancedMarkerElement, PinElement } = await this.google.maps.importLibrary('marker')

    this.map = await new Map(this.shadow.querySelector('.map'), {
      backgroundColor: 'hsl(217, 89%, 79%)',
      center: { lat: 39.6135612, lng: 2.8820133 },
      clickableIcons: false,
      disableDefaultUI: true,
      mapId: '25f3bd1d53babd39',
      minZoom: 10,
      restriction: {
        latLngBounds: {
          east: 4.649715,
          north: 40.971935,
          south: 38.204442,
          west: 1.160065
        },
        strictBounds: true
      },
      zoom: 10
    })

    this.data.forEach((element) => {
      if(element.town == "Pollença"){
        const pinView = new PinElement({
          background: 'hsl(280deg 56% 47%)',
          borderColor: 'hsl(0deg 0% 0%)',
          glyphColor: 'hsl(0deg 0% 0%)'
        })
  
        if (element.latitude && element.longitude) {
          const marker = new AdvancedMarkerElement({
            map: this.map,
            position: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
            title: element.hostName,
            content: pinView.element
          })
  
          this.markers.push(marker)
        }
      }
    })
  }
}

customElements.define('map-component', Map)
