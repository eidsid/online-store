
//toggle nav bar when click on bars
$('.navbars').on('click', () => {

    $('.header .nav_bar ').toggleClass('show');

})
//toggle side bar whene click on toggle-sidbar
$('.toggle-sidbar').on('click', () => {
    $('.toggle-sidbar').toggleClass('active');
    $('.side-bar').toggleClass('active');
})


