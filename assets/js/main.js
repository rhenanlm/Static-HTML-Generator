(function($, window, document, undefined) {
    $(function() {
        $('a[rel~=external]').attr('target', '_blank');

        $('.selectcustom').customSelect();
        
        //Abrindo Menu
        $('.navbar-twitch-toggle').on('click', function(event) {
            event.preventDefault();
            $('.navbar-twitch').toggleClass('open');
        });
        
//        $(".treetable").treetable({ 
//            expandable: true,
//            indent: 25,
//            expanderTemplate: "<a href='#' class='expander awesome-tooltip' data-toggle='tooltip' data-placement='top' title=''></a>",
//            stringExpand: "Vizualizar filhos",
//            stringCollapse: "Vizualizar filhos"
//        });
        
        $('.awesome-tooltip').tooltip();
        
        $(":file").filestyle();
        
        
        $('.scroll-pane').jScrollPane();
        
        
    });
    
    
     $.fn.innerstaticHeight = function() {
        var heightOfOuterfixed = $('.navbar-twitch.edc').height(),
            offset = $('.content-menu-lateral-edc').offset(),
            topOfInnerstatic2 = offset.top,
            potentialHeight = heightOfOuterfixed - topOfInnerstatic2;

        $('.content-menu-lateral-edc').css('max-height', potentialHeight);
    };
    
})(jQuery, window, document); 
