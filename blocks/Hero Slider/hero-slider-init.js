jQuery(document).ready(function($) {
    $('.mp-hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        // cssEase: 'linear'
    });
});
