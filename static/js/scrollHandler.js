window.onload = function(fn) {
  let controller = null, 
      debounceDelay = 250,  
      timeout, topWave = null,  
      imageHeight, waveOffsetBegin, subtextHeight, textHeight = 0;
  
  const calculateContainerSizes = () => { 
    topWave = document.getElementById('validation-start'), 
    waveOffsetBegin = topWave.offsetTop + topWave.offsetHeight, 
    imageHeight = document.getElementById('globe').offsetHeight,
    textHeight = document.getElementById('text-set-01').offsetHeight;
    subtextHeight = document.getElementById('text-set-02').offsetHeight;

    // Need to set the height of these containers in order to vertically
    // center them. They include absolutely-positioned children, so
    // the containers are unaware of their heights, which means the
    // children can't be positioned by CSS. 
    document.getElementById('image-set-01').style.height = imageHeight + 'px'; 
    document.getElementById('text-container').style.height = textHeight + subtextHeight + 'px';
  } 
 
  const updateValidationSection = () => {
    controller !== null && controller.destroy(true);
    calculateContainerSizes();
    configureScrollMagicScenes();
  }

  //-----------------------------------------------------------
  // We're debouncing the resize event handler so it only fires
  // on completion.
  //-----------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(updateValidationSection, debounceDelay);
  });

 
  const configureScrollMagicScenes = () => {
    controller = new ScrollMagic.Controller();
    //---------------------------------------------------------
    // Page Handling
    //--------------------------------------------------------- 
    new ScrollMagic.Scene({
      duration: 2500,
      offset: waveOffsetBegin,
    })
    .setPin('#main') 
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
      duration: 0,
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
    .setClassToggle('#annotations', 'fade-out-quick')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: waveOffsetBegin + 1600,
    })
    .setClassToggle('#globe', 'rotate')
    .addTo(controller);

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
 
  updateValidationSection();
}
