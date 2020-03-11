
$(document).ready(function () {
  $('.review-id').hide();
  $('.post-id').hide();
  
  $(function () {
    $('.review-container').on('click', '.edit-review-icon', function($event) {
      console.log($event.target.parentNode.parentNode.parentNode);
      var container = $event.target.parentNode.parentNode.parentNode;
      var reviewId = container.children[1].textContent;
      var postId = container.children[2].textContent;
      var reviewContent = container.children[3].textContent;
      var rating = container.children[5].textContent.slice(7).trim();
      $('#content').val(reviewContent);
      $(':radio[value=' + rating + ']').attr('checked', true);
      $('form#main-form').attr(
        'action',
        '/posts/reviews/' + postId + '/' + reviewId + '?_method=PUT'
      );
    });
  })
  
  $(function () {
    $('.review-container').on('click', '.delete-review-icon', function($event) {
      console.log($event.target.parentNode.parentNode.parentNode);
      var container = $event.target.parentNode.parentNode.parentNode;
      var reviewId = container.children[1].textContent;
      var postId = container.children[2].textContent;
      $('form#delete-form').attr(
        'action',
        '/posts/reviews/' + postId + '/' + reviewId + '?_method=DELETE'
      );
    });
  })

  $(function () {
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

  })

})