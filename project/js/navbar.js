$(function() {
    let navbar = false;

    $('.navbars').on('click', () => {
        navbar = true;
        $('.header .nav_bar ').toggleClass('show');

    })

})