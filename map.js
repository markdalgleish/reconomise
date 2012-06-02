function initialize() {
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  	var myOptions = {
    	zoom: 4,
    	center: myLatlng,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	}
  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Hello World!"
  });
}
google.maps.event.addDomListener(window, 'load', initialize);