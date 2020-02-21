require('dotenv').config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_PUBLIC_TOKEN });


const getResponse = async (location) => {
    let response = await geocodingClient
      .forwardGeocode({
        query: location,
        limit: 1
      })
      .send()
      
    console.log(response.body.features[0].geometry.coordinates);
}

getResponse('Paris, France');