function initialize() {
	var myOptions = {
    	zoom: 4,
    	center: new google.maps.LatLng(-25.363882,131.044922),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	}
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
  
	var businesses = get_businesses();
	var index;
	
	for (index in businesses) {	
		var business = businesses[index];
		var business_location = new google.maps.LatLng(
			business.sensis_data.primaryAddress.latitude,
			business.sensis_data.primaryAddress.longitude);
  	
		var marker = new google.maps.Marker({
	      position: business_location,
	      map: map,
	      title: business.sensis_data.name
	  });

        // TODO. What should we do?
        google.maps.event.addListener(marker, 'click', function() {
            window.location = business.sensis_data.detailsLink;
        });

	}	
}

function get_businesses() {

	  var businesses = [{
	    business_id: 12193709,
	    sensis_data: {
	        "name": "Compliance & Risk Services Pty Ltd",
	        "id": "12193709",
	        "categories": [
	            {
	                "name": "Risk Management Consultants",
	                "id": "43672",
	                "sensitive": false
	            }
	        ],
	        "primaryAddress": {
	            "state": "VIC",
	            "type": "PHYSICAL",
	            "suburb": "Melbourne",
	            "postcode": "3000",
	            "latitude": "-37.8146",
	            "longitude": "144.97131",
	            "addressLine": "Lvl 9/ 63 Exhibition St",
	            "geoCodeGranularity": "PROPERTY"
	        },
	        "primaryContacts": [
	            {
	                "value": "(03) 9663 5644",
	                "type": "PHONE"
	            },
	            {
	                "value": "http://www.compliancerisk.com.au",
	                "type": "URL"
	            }
	        ],
	        "reportingId": "eyJzb3VyY2UiOiJZRUxMT1ciLCJwcm9kdWN0SWQiOiI0ODE5MDY1ODkiLCJwcm9kdWN0VmVyc2lvbiI6IjEifQ",
	        "detailsLink": "http://www.yellowpages.com.au/vic/melbourne/compliance-risk-services-pty-ltd-12193709-listing.html?referredBy=TAPI-usSp5M4X22Qs46DYnjMUTPIUGQiu-TEK",
	        "listingType": "Business",
	        "pureMobileBusiness": false,
	        "hasExposureProducts": false
	    },
	    "needs": {
	        456: { // ID of need
	            "comments": "I need a generator to keep my food from spoiling",
	            "urgency": 6
	        },
	        457: {
	            "comments": "I need petrol for the generator, if possible",
	            "urgency": 6
	        }
	    },
	    "offers": {
	        567: {
	            "comments": "I have 20 staff who can help with disaster recovery",
	            "availability": "Business hours"
	        },
	        568: {
	            "comments": "I have a large car park which can be used for temporary storage",
	            "availability": "As long as this disaster lasts"
	        }
	    }
	}, 
	{
	    business_id: 12193709,
	    sensis_data: {
	        "name": "Bobs tractors",
	        "id": "12193709",
	        "categories": [
	            {
	                "name": "Risk Management Consultants",
	                "id": "43672",
	                "sensitive": false
	            }
	        ],
	        "primaryAddress": {
	            "state": "VIC",
	            "type": "PHYSICAL",
	            "suburb": "Melbourne",
	            "postcode": "3000",
	            "latitude": "-37.4146",
	            "longitude": "144.17131",
	            "addressLine": "Lvl 9/ 63 Exhibition St",
	            "geoCodeGranularity": "PROPERTY"
	        },
	        "primaryContacts": [
	            {
	                "value": "(03) 9663 5644",
	                "type": "PHONE"
	            },
	            {
	                "value": "http://www.compliancerisk.com.au",
	                "type": "URL"
	            }
	        ],
	        "reportingId": "eyJzb3VyY2UiOiJZRUxMT1ciLCJwcm9kdWN0SWQiOiI0ODE5MDY1ODkiLCJwcm9kdWN0VmVyc2lvbiI6IjEifQ",
	        "detailsLink": "http://www.yellowpages.com.au/vic/melbourne/compliance-risk-services-pty-ltd-12193709-listing.html?referredBy=TAPI-usSp5M4X22Qs46DYnjMUTPIUGQiu-TEK",
	        "listingType": "Business",
	        "pureMobileBusiness": false,
	        "hasExposureProducts": false
	    },
	    "needs": {
	        456: { // ID of need
	            "comments": "I need a generator to keep my food from spoiling",
	            "urgency": 6
	        },
	        457: {
	            "comments": "I need petrol for the generator, if possible",
	            "urgency": 6
	        }
	    },
	    "offers": {
	        567: {
	            "comments": "I have 20 staff who can help with disaster recovery",
	            "availability": "Business hours"
	        },
	        568: {
	            "comments": "I have a large car park which can be used for temporary storage",
	            "availability": "As long as this disaster lasts"
	        }
	    }
	}]	
	return businesses;
}
google.maps.event.addDomListener(window, 'load', initialize);

