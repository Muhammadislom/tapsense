(function ($) { $(document).ready(function() {
    //Slider setup
    (function() {
        var fade_time = 300;
        var slide_time = 1000;
        
        var block_offset = 440;
        $('.image_slider .slider_info').css('width', block_offset + 'px');
        var max_offset = 550;
        var offset_function = function(x) { return block_offset + max_offset * (2 * x + x * x) / 3 }; //px
        
        var image_height = 470;
        var image_max_shrink = 200;
        var resize_function = function(x) { return image_height - image_max_shrink * (2 * x + x * x) / 3 } //px

        var inactive_opacity = 0.5;

        var slides = $('.image_slider .slider_image_container');
        var active_slide = 1;
        
        var blocks = $('.image_slider .slider_info');
        
        function InitSlides(active) {
            for (var i = 0; i < slides.length; i++) {
                var current = (active + i) % slides.length;
                var elem = slides.eq(current);
                var ratio = i / slides.length;
                if (i == 0) {
                    elem.children('img').css('opacity', 1);
                    blocks.eq(current).fadeIn(fade_time);
                } else {
                    elem.children('img').css('opacity', inactive_opacity);
                }
                elem.css('height', resize_function(ratio) + 'px')
                    .css('z-index', slides.length - i)
                    .css('top', (image_height - resize_function(ratio)) / 2 + 'px')
                    .css('left', offset_function(ratio) + 'px')
                    .css('display', 'block');
            }
        }
        InitSlides(active_slide);
        
        var animation_in_progress = false;
        
        function Next() {
            animation_in_progress = true;
            var next_slide = (active_slide + 1) % slides.length;
            blocks
                .eq(active_slide)
                .fadeOut(fade_time);
            blocks
                .eq(next_slide)
                .delay(slide_time)
                .fadeIn(fade_time);
            slides
                .eq(active_slide)
                .animate({
                    'opacity': 0
                }, fade_time, function() {
                    slides
                        .eq(active_slide)
                        .css('opacity', 1)
                        .css('height', resize_function(1) + 'px')
                        .css('top', (image_height - resize_function(1)) / 2 + 'px')
                        .css('left', offset_function(1) + 'px')
                        .children('img')
                        .css('opacity', 0)
                        .animate({
                            'opacity': inactive_opacity
                        }, slide_time)
                    slides
                        .eq(next_slide)
                        .children('img')
                        .animate({
                            'opacity': 1
                        }, slide_time, function(){
                            active_slide = next_slide;
                            animation_in_progress = false;
                        });
                    for (var i = 0; i < slides.length; i++) {
                        var current = (next_slide + i) % slides.length;
                        var elem = slides.eq(current);
                        var ratio = i / slides.length;
                        elem.css('z-index', slides.length - i)
                        elem.animate({
                            'height': resize_function(ratio) + 'px',
                            'top': (image_height - resize_function(ratio)) / 2 + 'px',
                            'left': offset_function(ratio) + 'px'
                        }, slide_time);
                    }
                });
        }
        
        function Prev() {
            animation_in_progress = true;
            var next_slide = (active_slide + slides.length - 1) % slides.length;
            blocks
                .eq(active_slide)
                .fadeOut(fade_time);
            blocks
                .eq(next_slide)
                .delay(slide_time)
                .fadeIn(fade_time);
            slides
                .eq(active_slide)
                .children('img')
                .animate({
                    'opacity': inactive_opacity
                }, slide_time);
            for (var i = 0; i < slides.length; i++) {
                var current = (active_slide + i) % slides.length;
                var elem = slides.eq(current);
                var ratio = (i + 1) / slides.length;
                elem.css('z-index', slides.length - i - 1)
                elem.animate({
                    'height': resize_function(ratio) + 'px',
                    'top': (image_height - resize_function(ratio)) / 2 + 'px',
                    'left': offset_function(ratio) + 'px'
                }, slide_time);
            }
            slides
                .eq(next_slide)
                .children('img')
                .animate({
                    'opacity': 0
                }, slide_time, function() {
                    slides
                        .eq(next_slide)
                        .css('opacity', 0)
                        .css('height', resize_function(0) + 'px')
                        .css('top', (image_height - resize_function(0)) / 2 + 'px')
                        .css('left', offset_function(0) + 'px')
                        .css('z-index', slides.length)
                        .animate({
                            'opacity': 1
                        }, fade_time, function(){
                            active_slide = next_slide;
                            animation_in_progress = false;
                        })
                        .children('img')
                        .css('opacity', 1);
                });
        }
        
        $('.image_slider .slider_button__next').on('click', function() {
            if (!animation_in_progress) {
                Next();
            }
        })
        
        $('.image_slider .slider_button__prev').on('click', function() {
            if (!animation_in_progress) {
                Prev();
            }
        })
        
    })();


    //Slider text
    (function() {
        var fade_time = 300;

        var slides = $('.slider_text .text_slide');
        var active_slide = 0;
        
        function InitSlides(active) {
            slides.eq(active).css('display', 'block');
        }
        InitSlides(active_slide);
        
        var animation_in_progress = false;
        
        function Slide(new_slide) {
            slides
                .eq(active_slide)
                .fadeOut(fade_time, function() {
                    slides
                        .eq(new_slide)
                        .fadeIn(fade_time, function() {
                            active_slide = new_slide;
                            animation_in_progress = false;
                        })
                })
        }
        
        $('.slider_text .slider_button__next').on('click', function() {
            if (!animation_in_progress) {
                Slide((active_slide + 1) % slides.length);
            }
        })
        
        $('.slider_text .slider_button__prev').on('click', function() {
            if (!animation_in_progress) {
                Slide((active_slide + slides.length - 1) % slides.length);
            }
        })
        
    })();
})})(jQuery)