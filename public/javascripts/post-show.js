mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lzZG9tMjIwIiwiYSI6ImNrNmNjNXltbTA5aXAzb3F4Y3RtbXV0bXUifQ.ak3enOeKF5X8ctS5tbV5fw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: post.coordinates,
  zoom: 10
});

var el = document.createElement('div');
el.className = 'marker';

new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      '<h6>' + post.title + '</h6><p>' + post.location + '</p>'
    )
  )
  .addTo(map);
