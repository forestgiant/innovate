window.onload = function(fn, wait) {
  let controller = new ScrollMagic.Controller(),  
      topWave = document.getElementById('validation-start'),
      bottomWave = document.getElementById('validation-end'),
      waveOffsetBegin = topWave.offsetTop + topWave.offsetHeight,
      waveOffsetEnd = bottomWave.offsetTop,
      imageHeight = document.getElementById('globe').offsetHeight;
 
  document.getElementById('image-set-01').style.height = imageHeight + 'px'; 

  //---------------------------------------------------------
  // Page Handling
  //--------------------------------------------------------- 
  new ScrollMagic.Scene({
    duration: 2500,
    offset: waveOffsetBegin,
  })
  .setPin('#main')
  .addTo(controller);
 
  new ScrollMagic.Scene({
    duration: 3500,
    offset: waveOffsetBegin *  5,
  })
  .setPin('.validation-container')
  .reverse(true)
  .addTo(controller);
  
  //---------------------------------------------------------
  // text-set-02
  //---------------------------------------------------------
  new ScrollMagic.Scene({
    duration: 800,
    offset: waveOffsetBegin,
  })
  .setClassToggle('#text-set-02', 'visible')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 800,
    offset: waveOffsetBegin,
  })
  .setClassToggle('#people', 'scale-people-up')
  .addTo(controller);

      //-----------------------------------------------------
      // Transition out
      //-----------------------------------------------------
      new ScrollMagic.Scene({
        duration: 0,
        offset: waveOffsetBegin + 800,
      })
      .setClassToggle('.first-pieces', 'scale-pieces-up')
      .addTo(controller);

  //---------------------------------------------------------
  // text-set-03
  //---------------------------------------------------------
  new ScrollMagic.Scene({
    duration: 800,
    offset: waveOffsetBegin + 800,
  })
  .setClassToggle('#text-set-03', 'visible')
  .addTo(controller);

  new ScrollMagic.Scene({
    duration: 800,
    offset: waveOffsetBegin + 800,
  })
  .setClassToggle('#annotations', 'visible')
  .addTo(controller);

      //-----------------------------------------------------
      // Transition out
      //-----------------------------------------------------
      new ScrollMagic.Scene({
        duration: 0,
        offset: waveOffsetBegin + 1600
      })
      .setClassToggle('.next-pieces', 'scale-pieces-up')
      .addTo(controller);

  //---------------------------------------------------------
  // text-set-04
  //---------------------------------------------------------
  new ScrollMagic.Scene({
    duration: 0,
    offset: waveOffsetBegin + 1600,
  })
  .setClassToggle('#text-set-04', 'visible')
  .addTo(controller);
  
  new ScrollMagic.Scene({
    duration: 0,
    offset: waveOffsetBegin + 1600,
  })
  .setClassToggle('#rays', 'scale-rays-up')
  .addTo(controller); 
}
