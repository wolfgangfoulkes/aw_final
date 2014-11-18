jQuery(document).ready(function($) {

    var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };

    var callbacks =
    {
        windowSize: function() {
            //believe width is the same as outerWidth for the window.
            w.x = $(window).width();
            w.y = $(window).height();
            
            // console.log("window.x", w.x);
            // console.log("window.y", w.y);
        },
        
        scrollFix: function() {
            var scr_t = $(window).scrollTop(); //probably just "window" calls this
            var scr_b = scr_t + w.y;
            $(".scroll-inner").each(function(index_i, element_i){
                //first ancestor with class .scroll-outer
                var $outer = $(element_i).parents(".scroll-outer").first();
                
                //get height of outer element just once
                var top_o = $outer.offset().top;
                var height_o = $outer.outerHeight(false); //no margins
                var bottom_o = top_o + height_o;

                //inner
                var $inner = $(element_i);

                var height_i = $inner.outerHeight(true);
                var bottom_i = top_o + height_i; //top is dynamic
                
                
                var state = "below-scroll"; //same as defining an else
                if ((scr_b >= top_o) && (scr_t < bottom_o)) //thing is onscreen
                {
                    if (scr_b >= bottom_i)
                    {
                        if (scr_b >= bottom_o) {state = "above-scroll";}
                        else {state = "scroll";}
                    }
                }
                $inner.toggleClass("below-scroll", (state == "below-scroll") );
                $inner.toggleClass("scroll", (state == "scroll") );
                $inner.toggleClass("above-scroll", (state == "above-scroll") );

                // console.log("index_i", index_i, "bottom_o", bottom_o, "top_o:", top_o, "bottom_i", bottom_i, "scr_t", scr_t, "scr_b", scr_b, "state", state);
            });
        }
    };
    
    
       /*****RUNTIME*****/
    
    $(window).resize(callbacks.windowSize);
    $(window).resize(callbacks.scrollFix);
    $(window).scroll(callbacks.scrollFix);
    callbacks.scrollFix(); //initialize
    
});

