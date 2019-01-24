window.onload = function(fn) {
  let controller = null, 
      debounceDelay = 250,  
      pieceTransitionDelay = .2,
      timeout, topWave = null,  
      imageHeight, waveOffsetBegin, subtextHeight, textHeight = 0, 
      ai1Offset, ao1Offset, ai2Offset, ao2Offset, ai3Offset, offsetScale = 0,
      //-------------------------------------------------------------------------------------------------------------
      // The following approach tests for Google Chrome, and was advised in lieu of 
      // testing the User agent string in 
      // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
      //-------------------------------------------------------------------------------------------------------------
      isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
      chromeScale = isChrome === true ? 0.8 : 1;

  const setDefaults = () => {
    transitionDuration = 1200 * chromeScale; 
    offsetScale = 1.3; 
  }
  
  const calculateSizesAndOffsets = () => {   
    topWave = document.getElementById('validation-start').getBoundingClientRect(), 
    waveOffsetBegin = topWave.bottom, 
    imageHeight = document.getElementById('globe').offsetHeight,
    textHeight = document.getElementById('text-set-01').offsetHeight;
    subtextHeight = document.getElementById('text-set-02').offsetHeight;

    ai1Offset = waveOffsetBegin,
    ao1Offset = ai1Offset + (transitionDuration * (offsetScale * 1) * chromeScale),
    ai2Offset = ai1Offset + (transitionDuration * (offsetScale * 2) * chromeScale),
    ao2Offset = ai1Offset + (transitionDuration * (offsetScale * 3) * chromeScale),
    ai3Offset = ai1Offset + (transitionDuration * (offsetScale * 4) * chromeScale);
    
    //------------------------------------------------------------------
    // Need to set the height of these containers in order to vertically
    // center them. They include absolutely-positioned children, so
    // the containers are unaware of their heights, which means the
    // children can't be positioned by CSS. 
    //------------------------------------------------------------------
    document.getElementById('image-set-01').style.height = imageHeight + 'px'; 
    document.getElementById('text-container').style.height = textHeight + subtextHeight + 'px';
  }

  //---------------------------------------------------------------------
  // TODO: Remove when Chrome threaded scrolling issue has been handled.
  //---------------------------------------------------------------------
  const configureStylesForChrome = () => { 
    document.getElementById('annotations').classList.add('annotations-extended');
    document.getElementById('people').classList.add('people-extended');
    document.getElementById('rays').classList.add('rays-extended');
    document.querySelectorAll('.body-text').forEach(function(bodyText) {
      bodyText.classList.add('body-text-extended');
    });
    document.querySelectorAll('.pieces').forEach(function(piece) {
      piece.style.transitionDelay = pieceTransitionDelay + 's';
      pieceTransitionDelay += 0.1;
    });
  }

  const updateValidationSection = () => { 
    controller !== null && controller.destroy(true);
    calculateSizesAndOffsets();
    isChrome === true ? configureSMScenesWithoutGSAP() : configureSMScenesWithGSAP();
  }

  //-----------------------------------------------------------
  // We're debouncing the resize event handler so it only fires
  // on completion. The event handler itself recalculates
  // positions and offsets.
  //-----------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(updateValidationSection, debounceDelay);
  });

  const configureSMScenesWithGSAP = () => { 
    controller = new ScrollMagic.Controller(); 
    //---------------------------------------------------------
    // Page Handling
    //--------------------------------------------------------- 

    new ScrollMagic.Scene({
      duration: ao2Offset,
      offset: ai1Offset,  
    })
    .setPin('#main', {
      pushFollowers: true
    })  
    .addTo(controller);
 
    //---------------------------------------------------------
    // Scene 1: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({ 
      duration: transitionDuration,
      offset: ai1Offset,
    }) 
    .setTween('#text-set-02', { 
      marginTop: '0px',
      opacity: 1,
    })
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: transitionDuration,
      offset: ai1Offset, 
    })  
    .setTween('#people', {
      scale: 1.15,
      transform: 'scale(1.15) translateY(-50%)',
    }) 
    .addTo(controller);

        //-----------------------------------------------------
        // Scene 1: Transition out
        //-----------------------------------------------------
        let tweenFirstPiecesOut = TweenMax.staggerFromTo(".first-pieces", 2,
          { opacity: 1, 
            scale: 1.0 }, 
          { opacity: 0, 
            scale: 1.5, 
            ease: Linear.easeNone }, 1);

        new ScrollMagic.Scene({
          duration: transitionDuration * 1.5,
          offset: ao1Offset,
        })
        .setTween(tweenFirstPiecesOut) 
        .addTo(controller);

        new ScrollMagic.Scene({
          duration: transitionDuration,
          offset: ao1Offset,
        }) 
        .setTween('#text-set-02', {
          opacity: 0,
          display: 'none',
        })
        .addTo(controller);

        new ScrollMagic.Scene({
          duration: transitionDuration,
          offset: ao1Offset, 
        })  
        .setTween('#people', {
          scale: 0.85,
          opacity: 0,
        }) 
        .addTo(controller);
 
    //---------------------------------------------------------
    // Scene 2: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({ 
      offset: ai2Offset,
      duration: transitionDuration,
    }) 
    .setTween('#text-set-03', {  
      marginTop: '0px',
      opacity: 1,
    })
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: transitionDuration,
      offset: ai2Offset,
    }) 
    .setTween('#annotations', {
      opacity: 1,
    }) 
    .addTo(controller);

        //-----------------------------------------------------
        // Scene 2: Transition out
        //-----------------------------------------------------
        let tweenLastPiecesOut = TweenMax.staggerFromTo(".next-pieces", 2,
          { opacity: 1, scale: 1.0 }, { opacity: 0, scale: 1.5, ease: Linear.easeNone }, 1);

        new ScrollMagic.Scene({
          duration: transitionDuration * 1.5,
          offset: ao2Offset,
        })
        .setTween(tweenLastPiecesOut) 
        .addTo(controller);
 
        new ScrollMagic.Scene({
          duration: transitionDuration,
          offset: ao2Offset,
        }) 
        .setTween('#text-set-03', {
          opacity: 0,
          display: 'none',
        })
        .addTo(controller);

        new ScrollMagic.Scene({
          duration: transitionDuration,
          offset: ao2Offset,
        })
        .setTween('#annotations', {
          opacity: 0,
        }) 
        .addTo(controller);

    //---------------------------------------------------------
    // Scene 3: Transition in (no transition out)
    //---------------------------------------------------------
    new ScrollMagic.Scene({ 
      offset: ai3Offset,
    }) 
    .setTween('#text-set-04', { 
      marginTop: '0px',
      opacity: 1,
    })
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#globe', 'rotate')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 2000,
      offset: ai3Offset,
    })
    .setTween('#rays', {
      scale: 1.35,
      top: "2px",
    }) 
    .addTo(controller); 
  }

  const configureSMScenesWithoutGSAP = () => {
    controller = new ScrollMagic.Controller(); 
    //---------------------------------------------------------
    // Page Handling
    //--------------------------------------------------------- 
    new ScrollMagic.Scene({
      duration: ao2Offset,
      offset: ai1Offset,
    })
    .setPin('#main') 
    .addTo(controller); 
    
    //---------------------------------------------------------
    // Scene 1: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({
      duration: 0,
      offset: ai1Offset,
    })
    .setClassToggle('#text-set-02', 'pull-body-text-up')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: transitionDuration,
      offset: ai1Offset,
    })
    .setClassToggle('#people', 'scale-people-up')
    .addTo(controller);

        //-----------------------------------------------------
        // Scene 1: Transition out
        //-----------------------------------------------------
        new ScrollMagic.Scene({
          duration: 0,
          offset: ao1Offset,
        })
        .setClassToggle('#text-set-02', 'invisible')
        .addTo(controller);

        new ScrollMagic.Scene({
          duration: 0,
          offset: ao1Offset,
        })
        .setClassToggle('.first-pieces', 'scale-pieces-up')
        .addTo(controller);

    //---------------------------------------------------------
    // Scene 2: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({
      duration: 0,
      offset: ai2Offset,
    })
    .setClassToggle('#text-set-02', 'display-none')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai2Offset,
    })
    .setClassToggle('#text-set-03', 'pull-body-text-up')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai2Offset,
    })
    .setClassToggle('#annotations', 'visible')
    .addTo(controller);

        //-----------------------------------------------------
        // Scene 2: Transition out
        //-----------------------------------------------------
        new ScrollMagic.Scene({
          duration: 0,
          offset: ao2Offset,
        })
        .setClassToggle('#text-set-03', 'invisible')
        .addTo(controller);
    
        new ScrollMagic.Scene({
          duration: 0,
          offset: ao2Offset
        })
        .setClassToggle('.next-pieces', 'scale-pieces-up')
        .addTo(controller);

    //---------------------------------------------------------
    // Scene 3: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#text-set-03', 'display-none')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#text-set-04', 'pull-body-text-up')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#annotations', 'fade-out-quick')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#globe', 'rotate')
    .addTo(controller);

    new ScrollMagic.Scene({
      duration: 0,
      offset: ai3Offset,
    })
    .setClassToggle('#rays', 'scale-rays-up') 
    .addTo(controller); 
  }

  isChrome === true && configureStylesForChrome();
  setDefaults();
  updateValidationSection();
}
