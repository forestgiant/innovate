$(document).ready(function(){

    // Initializes ScrollMagic
    var productControl = new ScrollMagic.Controller();

    // Plan + Vision Slide (pinning)
    var productPlan = new ScrollMagic.Scene({
        triggerElement: '#product-plan',
        triggerHook: 0.3,
        duration: '30%'
    })
    .setPin('#product-plan')
    .addTo(productControl)

    // Validate Slide (pinning)
    var productValidate = new ScrollMagic.Scene({
        triggerElement: '#product-validate',
        triggerHook: 0.3,
        duration: '30%'
    })
    .setPin('#product-validate')
    .addTo(productControl)

    // Decide Slide (pinning)
    var productDecide = new ScrollMagic.Scene({
        triggerElement: '#product-decide',
        triggerHook: 0.3,
        duration: '30%'
    })
    .setPin('#product-decide')
    .addTo(productControl)

    //  Visual (pinning)
    var productVisual = new ScrollMagic.Scene({
        triggerElement: '#product-visual-frame',
        triggerHook: 0.3,
        duration: '40%'
    })
    .setPin('#product-visual-frame')
    .addTo(productControl)

});