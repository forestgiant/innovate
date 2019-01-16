window.onload = function(fn, wait) {
  let controller = new ScrollMagic.Controller(), 
      offset = window.innerHeight + document.getElementById('text-set-02').clientHeight,
      bodyTextOffset = window.innerHeight - document.getElementById('text-set-01').clientHeight;

  

  new ScrollMagic.Scene({
    duration: 6500,
    offset: 0,
    })
  .setPin('#image-set-01')
  .addTo(controller);
  
  //---------------------------------------------------------
  // Text Handling
  //---------------------------------------------------------
  new ScrollMagic.Scene({
    duration: 6500,
    offset: 0,
    })
  .setPin('#text-set-01', { pushFollowers: false })
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: offset,
    offset: -1 * offset,
  })
  .setPin('#text-set-02')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: offset,
    offset: -1 * offset,
  })
  .setPin('#text-set-03')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: offset,
    offset: -1 * offset,
  })
  .setPin('#text-set-04')
  .addTo(controller);

  //---------------------------------------------------------
  // Text Visibility Handlers
  //---------------------------------------------------------
  
  /*new ScrollMagic.Scene({
    duration: 0,
    offset: 2000,
  })
  .setClassToggle('#text-set-02', 'invisible') 
  .addTo(controller);

  new ScrollMagic.Scene({ duration: 0,
    offset: 3200,
  })
  .setClassToggle('#text-set-03', 'invisible')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 0,
    offset: 4200,
  })
  .setClassToggle('#text-set-04', 'invisible')
  .addTo(controller);*/

  new ScrollMagic.Scene({
    duration: 800,
    offset: offset + 1400,
  })
  .setClassToggle('#annotations', 'visible')
  .addTo(controller);

  
  //---------------------------------------------------------
  // Scaling Handlers
  //---------------------------------------------------------
 
  new ScrollMagic.Scene({
    duration: 800,
    offset: offset - 600,
  })
  .setClassToggle('#people', 'scale-people-up')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 0,
    offset: offset + 500,
  })
  .setClassToggle('.first-pieces', 'scale-pieces-up')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 0,
    offset: offset + 2597
  })
  .setClassToggle('.next-pieces', 'scale-pieces-up')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 0,
    offset: offset + 3400,
  })
  .setClassToggle('#rays', 'scale-rays-up')
  .addTo(controller);

  


  
  
  
}
