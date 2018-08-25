var Map = null;
var MARKERS_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = {};
//지도요청
function showMap(){
    //map객체 생성
    Map = new google.maps.Map(document.getElementById('myMap'), {
        center : {
            lat : 33.3617,
            lng : 126.5292
        },        
        zoom : 12
    })
}

$(function(){
    var myTrips = Cookies.getJSON('MYTRIPS');
    if(!myTrips)
        myTrips = [];
    showMap();
    generateMyTripList(myTrips);
})

//myTripList 생성 
function generateMyTripList(list){    
    var bounds = new google.maps.LatLngBounds();
    var $list = $("#myTripList");
    for(var i = 0; i < list.length; i++){     
        var markerLabel = MARKERS_LABELS[i];
        var myTrip = list[i];
        var $item = $("#template").clone().removeAttr("id");
        $item.find(".place").html(markerLabel + "." + myTrip.name);
        $item.data('id',myTrip.id);
        $item.find(".city").html(myTrip.cityName);        
       
        $list.append($item);

        var pos = {
            lat : myTrip.x,
            lng : myTrip.y
        }

        var marker = new google.maps.Marker({
            position:pos,
            label : markerLabel,
            map : Map
        })

        markers[myTrip.id] = marker;
        bounds.extend(pos);

        $item.find(".btn_mylist_del").click(function(){
            var $elem =  $(this).closest('.mlist');
            var id = $elem.data('id');
            $elem.remove();
            markers[id].setMap(null);
            markers[id] = null;     

            var newList = removeFromList(list, id);

            Cookies.set('MYTRIPS', newList);
        })
    }
    Map.fitBounds(bounds);
}

function removeFromList(list, id){
    var index = -1;
    for (var i = 0; i < list.length; i++){
        if(list[i].id === id){
            index = i;
            break;
        }
    }

    if( index !== -1){
        list.splice(index, 1);
    }
    return list;
}