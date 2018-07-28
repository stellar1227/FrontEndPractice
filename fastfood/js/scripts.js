/**
 * 패스트푸드점 찾기
 */


var API_URL =  'https://floating-harbor-78336.herokuapp.com/fastfood';



var searchFN = function(pagenum , perpage , keyword){
    if(typeof pagenum !== 'number' || pagenum < 1) pagenum = 1;

    if(typeof perpage !== 'number' || perpage <= 0)
    pagepage = 10;
    
    //리스트 조회    
    $.get(API_URL, {
        page : pagenum,
        pagePer : perpage,
        searchKeyword : keyword
    }, function(data){
        var _list = data.list;
        var _total = data.total;

        //메시지 출력
        $(".msg").html('총' + '<span class="total">'+ _total + '</span> 개의 패스트 푸드점을 찾았습니다.');

        //리스트 출력 
        var $list = $(".list");
            $list.find("li").not("#template").remove();

        for(var i = 0; i < _list.length; i++){
            var item = _list[i];
            //DOM API를 사용하여 모든 DOM 엘리먼트를 직접 생성하는 방법(단순한 구조로 생성할 때)
            //템플릿 개념을 도입하여 HTML 태그로 구성된 템플릿 사용하는 방법 (복잡할때) 
            var $itemElem = $list.find("#template").clone().removeAttr("id");
            $itemElem.find(".num").html(i + 1);
            $itemElem.find(".name").html(item.name);
            $itemElem.find(".address").html(item.addr);

            $list.append($itemElem);
        }

        //pagenation 

        showPaging(pagenum, perpage, _total, keyword)

    })

}

var showPaging = function(page, perpage, total, keyword){
    
    if(typeof keyword !== 'string') keyword = '';
    var $paging = $(".pagination");
        $paging.empty();
                    
    var numPages = 5;
    var pageStart = Math.floor((page - 1)/numPages) * numPages + 1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor((total - 1) / perpage) + 1;
    
    if(pageEnd > totalPages) pageEnd = totalPages;
    
    var prevPage = pageStart - 1; 
    if(prevPage < 1) prevPage = 1;
    var nextPage = pageEnd + 1;
    if(nextPage > totalPages) nextPage = totalPages;
    
    var $prevElem = $('<button type="button" onclick="searchFN('+ prevPage + ',' + perpage + ');">이전</button>');
    $prevElem.addClass('prev');
    $paging.append($prevElem);

    




    for(var i = pageStart; i <= pageEnd; i++){
        var $elem = $('<a href="#" onclick="searchFN('+ i + ',' + perpage + ',\'' + keyword + '\')">' + i + '</a>');

        if( i === page){
            $elem.addClass('current').siblings("a"); 
        }
        $paging.append($elem);
    }

    
    var $nextElem = $('<button type="button" onclick="searchFN('+ nextPage + ',' + perpage + ');">다음</button>');
    $nextElem.addClass('next');
    $paging.append($nextElem)


}

//DOM READY 
$(function(){
    //로드 실행되는 부분을 최대한 줄인다.    
    $(".btn_srch").click(function(){
        var _searchKeyword = $("#inputSearch").val();
        
        //검색어로 탐색
        searchFN(1, 10, _searchKeyword);
    })

    //EnterKey Event 
    $("#inputSearch").on("keypress", function(e){
        if(e.keyCode === 13){
            $(".btn_srch").trigger("click");
        }
    })
})