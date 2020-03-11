import Axios from 'axios'
import buildUrl from './utils/url'
import { GoogleReponse } from './utils/types'

const form = document.querySelector('form')! as HTMLFormElement,
      input = document.getElementById('address')! as HTMLInputElement

function handleSearchAddress (e: Event) {
  e.preventDefault()
  const address = buildUrl(input.value)
  Axios.get<GoogleReponse>(address)
    .then(result => {
      if (result.data.status !== 'OK') throw new Error('Could not fetch location!')
      const coords = result.data.results[0].geometry.location
      const map = new google.maps.Map(document.getElementById('map')!, {
        center : coords,
        zoom   : 16,
      })
      // eslint-disable-next-line no-new
      new google.maps.Marker({
        map,
        position: coords,
      })
    })
    .catch(err => {
      console.log('Error!', err)
    })
}

form.addEventListener('submit', handleSearchAddress)
