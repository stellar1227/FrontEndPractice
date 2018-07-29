/**
 * mytrip adviser
 */

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
})

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