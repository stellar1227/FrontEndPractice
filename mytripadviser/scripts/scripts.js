/**
 * mytrip adviser
 */

//필요 변수 선언
var Map;  
//header UI scroll - color와 배경으로 인한 가독성 개선
$(function(){
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        if (top > 0){
            $("#header").addClass("inverted");
        }else{
            $("#header").removeClass("inverted");
        }
    })
    $(window).trigger('scroll');

    //날짜datePicker
    var dpFrom = $("#from").datepicker({
        dateFormat :'yy-mm-dd',
        minDate : 0,
        onSelect : function(){
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'))
        }
    });
    dpFrom.datepicker('setDate', new Date());

    var dpTo = $("#to").datepicker({
        dateFormat :'yy-mm-dd',
        minDate : 0
    });
    dpTo.datepicker('setDate', 4)

    $("#formSearch").submit(function(e){
        e.preventDefault();

        var from = $("#from").val();
        var to = $("#to").val();

        search(from, to);
    })
    
    //상세페이지 id얻기
    var _id = parseId(window.location.search);
    if(_id !== null) getDetail(_id);

    
   
})

//리스트 검색 요청
function search(from, to){
    var url = 'https://javascript-basic.appspot.com/searchLocation';

    $.getJSON(url, {
        from : from,
        to : to
    }, function(r){
        var $list = $("#list");
        $list.empty();
        for(var i = 0; i < r.length; i++){
            var _data = r[i];
            var $item = createListItem(_data);

            $list.append($item);
        }
    })
}

//상세보기 요청 
function getDetail(id){
    var _url = "https://javascript-basic.appspot.com/locationDetail";
    $.getJSON(_url,{
        id : id
    }, function(r){
        // console.log(r);
        var $target = $(".detail_section");
        $target.find(".name").html(r.name);
        $target.find(".city").html(r.cityName);
        $target.find(".place dd").html(r.desc);
        
        //img 갤러리 생성
        var _images = r.subImageList;
        for(var i = 0; i < _images.length; i++){
            var $image = $("<img src='"+ _images[i] + "' alt='' />");
            $target.find("#gallery").append($image);
        }


        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#gallery');
         //지도 불러오기 
        $("#map").length && showMap();
        //지도 마커 표시
        showMarker(r.position.x, r.position.y);

        //등록하기
        $(".btn_register").click(function(){
            var myTrips = Cookies.getJSON('MYTRIPS');
            if(!myTrips){ //존재하지 않을경우 빈 배열로 초기화
                myTrips = [];
            }

            for (var i = 0; i <myTrips.length; i++){
                if(myTrips[i].id == id){
                    alert("이미 등록된 여행지 입니다.");
                    return;
                }
            }
            
            myTrips.push({
                id : id,
                name : r.name,
                cityName : r.cityName,
                x : r.position.x,
                y : r.position.y
            })
            Cookies.set('MYTRIPS',myTrips);
            console.log(Cookies.get());
            alert('여행지가 등록되었습니다.');
                
        });
    })
}

//리스트 아이템 만들기 
function createListItem(data){
    var $tmpl = $("#template").clone().removeAttr("id").addClass("list_panel");

    $tmpl.find(".img").html('<img src="' + data.titleImageUrl + '" alt="" />');
    $tmpl.find(".name").html(data.name)
    $tmpl.find(".city").html(data.cityName);

    $tmpl.click(function(e){
        var url = 'detail.html?id=' + data.id;
        window.location = url;
    })
    return $tmpl;
}

//주소창에서 문자열 분해
function parseId(str){
    var s = str.substring(1);
    var args = s.split('&');

    for(var i = 0; i < args.length; i++){
        var arg = args[i];
        var tokens = arg.split('=');
        
        if(tokens[0] === 'id')
        return tokens[1];
    }

    return null;
}

//지도요청
function showMap(){
    //map객체 생성
    Map = new google.maps.Map(document.getElementById('map'), {
        center : {
            lat : 33.3617,
            lng : 126.5292
        },        
        zoom : 12
    })
}

//마커 보여주기 
function showMarker(lat, lng){
    var pos = {
        lat : lat,
        lng : lng
    };

    new google.maps.Marker({
        position: pos,
        map: Map
    })

    Map.panTo(pos)
}


