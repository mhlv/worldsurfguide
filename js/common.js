var map;

var months = {
    1:"january",
    2:"february",
    3:"march",
    4:"april",
    5:"may",
    6:"june",
    7:"july",
    8:"august",
    9:"september",
    10:"october",
    11:"november",
    12:"december"
};

var surfer_levels = [
    'rookie',
    'intermediate',
    'advanced',
    'experienced',
    'pro'
];

function loadResults (data) {
    var items, markers_data = [];
    if (data.spots.length > 0) {
        items = data.spots;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.coords[0] != 0 && item.coords[1] != 0) {
                var discr = '<h4>' + item.name + '</h4><p>some spot discription.</p><p><a href="#" class="iw_more_button">Button for full info</a></p>';

                markers_data.push({
                    lat : item.coords[0],
                    lng : item.coords[1],
                    title : item.name,
                    infoWindow: {
                        content: discr
                    }
                });
            }
        }
    }

    map.addMarkers(markers_data);

    // тоже про умную геолокацию
    /*
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
        alert(this.getBounds());
    });

    for (var i=0; i<markers_data.length; i++){
        if( map.getBounds().contains(markers_data[i].getPosition()) ){
            console.log(markers_data[i])
        }
    }*/
}

// gmap key
// AIzaSyA7vdLm2fpGX7CiKxL5TqGITwaduXGtKU8

function initMap(){

    var $MAP = $('#map');
    map = new GMaps({
        div: '#map',
        lat: 43,
        lng: 25,
        zoom: 2,
        markerClusterer: function(map) {
            options = {
                gridSize: 40
            }

            return new MarkerClusterer(map, [], options);
        }
    });
    $MAP.removeClass('hidden');

    // умную геолокацию оставим на потом
    /*
    GMaps.geolocate({
        success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error) {
            alert('Geolocation failed: '+error.message);
            map.setZoom(2)
        },
        not_supported: function() {
            alert("Your browser does not support geolocation");
            map.setZoom(2)
        },
        always: function() {
            $MAP.removeClass('hidden');
        }
    });
    */

    var xhr = $.getJSON('spots.json');

    xhr.done(loadResults);
}

$(document).ready(function(){

    initMap();
    initFilters();

    $('.iw_more_button').live('click',function(e){
        e.preventDefault();
        console.log(13)
    });
	
});



var showFilters = function(){
    $('.show_filters').addClass('hidden');
    $('.filters_holder').removeClass('hidden');
};
var hideFilters = function(){
    $('.show_filters').removeClass('hidden');
    $('.filters_holder').addClass('hidden');
};

function initFilters(){
    var $showBtn = $('.show_filters'),
        $hideBtn = $('.hide_filters'),
        $filtersHolder = $('.filters_holder');
        $filtersBlock = $filtersHolder.find('.filters');

    $showBtn.click(showFilters);
    $hideBtn.click(hideFilters);

    $filtersBlock.css('max-height',$(window).height()-93);

    $('.slider-input-wave-size').jRange({
        from: 0,
        to: 20,
        step: 0.5,
        scale: [0,5,10,15,'20+'],
        format: '%s feet',
        width: 300,
        showLabels: true,
        isRange : true
    });

    $('.slider-input-season').jRange({
        from: 1,
        to: 12,
        step: 1,
        format: function(value, pointer){
            return months[value];
        },
        width: 300,
        showLabels: true,
        isRange : true,
        snap:true,
        showScale:false
    });

    $('.slider-input-level').jRange({
        from: 0,
        to: 4,
        step: 1,
        format: function(value, pointer){
            return surfer_levels[value];
        },
        width: 300,
        showLabels: true,
        isRange : true,
        snap:true,
        showScale:false
    });
}



