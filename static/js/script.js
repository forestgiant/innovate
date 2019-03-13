var overlay = $('.modal-overlay');
var modal = $('.modal-wrapper');


//overlay.hide()
//modal.hide()*/


$('.cta-button').click(function(e) {
    e.preventDefault();
    modal.fadeIn();
    overlay.fadeIn();
});


$('.modal-close').click(function() {
    modal.fadeOut();
    overlay.fadeOut();
});

$('.modal-overlay').click(function() {
    modal.fadeOut();
    overlay.fadeOut();
})

