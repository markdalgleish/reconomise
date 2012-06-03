$(function() {
	$.when(
		$.get('/templates/list.handlebars.html'),
		$.get('/templates/offers-list.handlebars.html'),
		$.get('/templates/details.handlebars.html'))
	.then(function(listTemplateSource, offersListTemplateSource, detailsTemplateSource) {
		
		var list_template = Handlebars.compile(listTemplateSource[0]),
			offers_list_template = Handlebars.compile(offersListTemplateSource[0]),
			details_template = Handlebars.compile(detailsTemplateSource[0]);
		
		var eventId = '4fc9e10a8d2d8923f2000003';
		
		var businesses = {};
		var needs = [];
		var offers = [];
		
		var markers = [];
		
			
		function initialize() {
			var myOptions = {
		    	zoom: 4,
		    	center: new google.maps.LatLng(-25.363882,131.044922),
		    	mapTypeId: google.maps.MapTypeId.ROADMAP
		  	}
		    var map = new google.maps.Map(document.getElementById("map"), myOptions);
			
			$('#needs-details').empty();
			loadAndRenderBusinessData(map, eventId);
			
			clearForms();
		}

		function loadAndRenderBusinessData(map, eventId) {
			_.each(markers, function(marker) {
				marker.setMap(null);
			});
			
			markers = [];
			
			$.getJSON('/api/events/' + eventId + '/businesses', function(data) {
				businesses = {};
				
				needs = [];
				offers = [];
				
				_.each(data, function(business) {
					
					businesses[business.business_id] = business;
					
					_.each(business.needs, function(need) {
						need.business = business;
						needs.push(need);
					});
					
					_.each(business.offers, function(offer) {
						offer.business = business;
						offers.push(offer);
					});
					
					business.sensis_data = JSON.parse(business.sensis_data);

					var business_location = new google.maps.LatLng(
						business.sensis_data.primaryAddress.latitude,
						business.sensis_data.primaryAddress.longitude);

					var marker = new google.maps.Marker({
				      position: business_location,
				      map: map,
				      title: business.sensis_data.name
				  });

			        google.maps.event.addListener(marker, 'click', function() {
						showDetailedBusinessData(business.business_id);
			        });
			
					markers.push(marker);
				});
				
				showNeedsList(needs, offers);
			});
		}
		
		function showNeedsList(needs, offers) {
			$('#needs-list').empty().append(list_template({needs: needs}));
			$('#offers-list').empty().append(offers_list_template({offers: offers}));
		}
		
		function showDetailedBusinessData(business_id) {
			$('#needs-details').empty().append(details_template(businesses[business_id]));
		}
		
		function clearForms() {
			$('#need-form').find('input,textarea').val('');
		}
		
		function hideForms() {
			$('#form-backdrop').fadeOut();
			$('#need-form').fadeOut();
			$('#offer-form').fadeOut();
		}
		
		$('#needs-list,#offers-list').on('click', 'li', function() {
			showDetailedBusinessData($(this).data('business-id'));
		});
		
		$('#offer-button').on('click', function() {
			$('#form-backdrop').fadeIn();
			$('#offer-form').fadeIn();
		});
		
		$('#need-button').on('click', function() {
			$('#form-backdrop').fadeIn();
			$('#need-form').fadeIn();
		});
		
		$('#form-backdrop').on('click', function() {
			hideForms();
		});
		
		$('#offer-form').on('click', 'button.submit', function() {
			
			var postcode = $('#offer-postcode').val(),
				businessName = $('#offer-business-name').val();
			
			$.get('/api/sensis/' + postcode + '/' + businessName, function(res) {
				
				var business_id = res.results[0].id;
				
				var data = {};

				data.business_id = business_id;
				data.offers = [{
					type: $('#offer-type').val(),
					availability: $('#offer-availability').val(),
					comments: $('#offer-comments').val()
				}];

				$.get('/api/events/' + eventId + '/businesses/' + data.business_id, function(res) {
					if (res.length === 0) {
						$.ajax({
							type: 'POST',
							url: '/api/events/' + eventId + '/businesses',
							data: data
						}).success(function(res) {
							hideForms();
							initialize();
						}).fail(function(err) {
							alert(err);
						});
					} else {
						$.ajax({
							type: 'PUT',
							url: '/api/events/' + eventId + '/businesses/' + data.business_id,
							data: data
						}).success(function(res) {
							hideForms();
							initialize();
						}).fail(function(err) {
							alert(err);
						});
					}
				});
				
			});
			
		});
		
		
		$('#need-form').on('click', 'button.submit', function() {
			
			var postcode = $('#need-postcode').val(),
				businessName = $('#need-business-name').val();
			
			$.get('/api/sensis/' + postcode + '/' + businessName, function(res) {
				
				var business_id = res.results[0].id;
				
				var data = {};

				data.business_id = business_id;
				data.needs = [{
					type: $('#need-type').val(),
					urgency: $('#need-urgency').val(),
					comments: $('#need-comments').val()
				}];

				$.get('/api/events/' + eventId + '/businesses/' + data.business_id, function(res) {
					if (res.length === 0) {
						$.ajax({
							type: 'POST',
							url: '/api/events/' + eventId + '/businesses',
							data: data
						}).success(function(res) {
							hideForms();
							initialize();
						}).fail(function(err) {
							alert(err);
						});
					} else {
						$.ajax({
							type: 'PUT',
							url: '/api/events/' + eventId + '/businesses/' + data.business_id,
							data: data
						}).success(function(res) {
							hideForms();
							initialize();
						}).fail(function(err) {
							alert(err);
						});
					}
				});
				
			});
			
		});


		google.maps.event.addDomListener(window, 'load', initialize);
	});
	
	
	
});


