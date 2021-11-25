function tooltipPosion() {
    $(".tooltip-trigger").each(function() {
        var data_attr = $(this).attr("data-tooltip");
        var offset_left = $(this).offset().left;
        var offset_top = $(this).offset().top;
        var element_width = $(this)[0].getBoundingClientRect().width / 2;
        var element_height = $(this)[0].getBoundingClientRect().height;

        $(".tooltip-block").each(function() {
            var t_width = $(this).innerWidth() / 2;
            var total_left = offset_left + element_width - t_width;
            var total_top = offset_top - (element_height + 80);
            if ($(this).attr("id") == data_attr) {
                $(this).css({ "left": total_left + 'px', "top": total_top + 'px' });
            }
        });
        if ($(this).attr("data-multi") == "multiple") {
            var m_element_height = $(this)[0].getBoundingClientRect().height / 2;
            $(".tooltip-block").each(function() {
                var m_t_width = $(this).innerWidth() / 2;
                var m_total_left = offset_left + element_width - m_t_width;
                var m_total_top = offset_top - (m_element_height + 80);
                if ($(this).attr("id") == data_attr) {
                    $(this).css({ "left": m_total_left + 'px', "top": m_total_top + 'px' });
                }
            });
        }

    });
}

function campusHoverDesktop() {
    $(".tooltip-trigger").on("mouseenter", function(e) {
        e.preventDefault();
        var data_attr = $(this).attr("data-tooltip");
        $(".tooltip-block").each(function() {
            if ($(this).attr("id") == data_attr) {
                $(this).toggleClass("open-tooltip");
                $(this).siblings().removeClass("open-tooltip")
            }
        });
    });

    $(".tooltip-trigger").on("mouseleave", function(e) {
        $(".tooltip-block").removeClass("open-tooltip");
    });

    $('.link-block, .tooltip-trigger').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('data-redirect');
        window.location = url;
    });

    if (!$(".scaling-svg-container").hasClass("city-level")) {
        $('.link-block, .tooltip-block').click(function(e) {
            e.preventDefault();
            var url = $(this).attr('data-src');
            window.location = url;
        });
    }
}

function mobileClick() {

    $(".tooltip-trigger").click(function(e) {

        /* For City level map */
        var attr = $(this).attr('clickable');
        var _this = $(this);
        $(".tooltip-trigger").removeAttr('clickable');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).removeAttr('clickable');
            e.preventDefault();
            var url = _this.attr('data-redirect');
            window.location = url;
        } else {
            $(this).attr('clickable', 'clickable');
            var data_attr = _this.attr("data-tooltip");
            $(".tooltip-block").each(function() {
                if ($(this).attr("id") == data_attr) {
                    $(this).toggleClass("open-tooltip");
                    $(this).siblings().removeClass("open-tooltip")
                }
            });
        }
    });

    /* For 2nd and 3rd level zoom */
    $('.link-block').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('data-src');
        window.location = url;
    });

}

$(document).ready(function() {

    // svg scalling
    var initialMouseX = 0;
    var initialMouseY = 0;
    var mouseIsDown = false;
    var scaleSvg = $('.scaling-svg-container>svg');

    scaleSvg.each(function() {
        var _this = $(this);
        _this.on('mousedown', function(event) {
            mouseIsDown = true;
            initialMouseX = event.clientX || event.originalEvent.touches[0].pageX;
            initialMouseY = event.clientY || event.originalEvent.touches[0].pageY;
        });

        $(document, _this).on('mouseup', function(event) {
            if (!mouseIsDown)
                return;
            mouseIsDown = false;
            _this.css({ 'left': '0', 'top': '0' });

        });

        $(document, _this).on('mousemove', function(event) {
            if (!mouseIsDown)
                return;

            var currentMouseX = event.clientX || event.originalEvent.touches[0].pageX;
            var currentMouseY = event.clientY || event.originalEvent.touches[0].pageY;
            var relativeMouseX = currentMouseX - initialMouseX;
            var relativeMouseY = currentMouseY - initialMouseY;

            _this.css({ 'left': relativeMouseX, 'top': relativeMouseY });

            if (relativeMouseX >= 500) {
                _this.css({ 'left': '500px' });
                return;
            } else if (relativeMouseX <= -500) {
                _this.css({ 'left': '-500px' });
                return;
            }

            if (relativeMouseY >= 300) {
                _this.css({ 'top': '300px' });
                return;
            } else if (relativeMouseY <= -300) {
                _this.css({ 'top': '-300px' });
                return;
            }

        });
        // $(document, _this).mouseleave(function(event) {
        // 	if (!mouseIsDown)
        //         return;
        //     alert();
        //     console.log(relativeMouseY);
        //     console.log(relativeMouseX);
        //     var relativeMouseY1 = relativeMouseY;
        //     var relativeMouseX1 = relativeMouseX;
        //     _this.css({ 'left': relativeMouseX1, 'top': relativeMouseY1 });
        // });
    });
    // end of scall svg


    if ($("html").hasClass("no-touch")) {
        campusHoverDesktop();
    } else if ($("html").hasClass("touch")) {
        mobileClick();
    }


    $(".back-btn").click(function(e) {
        e.preventDefault();
        if (history.length != 0) {
            history.go(-1);
        }
        return false;
    });



});

$(window).load(function() {
    $(".scaling-svg-container").addClass("scaling-svg-loaded");
    setTimeout(function() {
        tooltipPosion();
    }, 1000);
});

$(window).resize(function() {
    setTimeout(function() {
        tooltipPosion();
    }, 1000);
});