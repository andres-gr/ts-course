import Constants from './contants'

function buildUrl (address: string): string {
  const cleanAddress = address.trim(),
        fixedAddress = encodeURI(cleanAddress),
        url = `${Constants.API_URL}?address=${fixedAddress}&key=${Constants.GOOGLE_API_KEY}`
  return url
}

export default buildUrl
