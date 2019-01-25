window.onload = function(fn) { 
  let controller, timeout = null,  
      imageHeight, pieceTransitionDelay, resizeDebounceDelay, subtextHeight, textHeight = 0, 
      ai1Offset, ao1Offset, ai2Offset, ao2Offset, ai3Offset = 0,
      //-------------------------------------------------------------------------------------------------------------
      // The following approach tests for Google Chrome, and was advised in lieu of 
      // testing the User agent string in an up-to-date (v1-v71) response.
      // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
      //-------------------------------------------------------------------------------------------------------------
      isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
      isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
      
  const setDefaults = () => {
    chromeScale = isChrome === true ? 0.85 : 1;
    resizeDebounceDelay = 250;
    pieceTransitionDelay = 0.2;
    transitionDuration = 1560 * chromeScale;  
  }
  
  const calculateSizesAndOffsets = () => {   
    topWaveBottom = document.getElementById('validation-start').getBoundingClientRect().bottom,
    bodyRectTop = document.body.getBoundingClientRect().top, 
    imageHeight = document.getElementById('globe').offsetHeight,
    textHeight = document.getElementById('text-set-01').offsetHeight;
    subtextHeight = document.getElementById('text-set-02').offsetHeight; 

    ai1Offset = topWaveBottom - bodyRectTop,
    ao1Offset = ai1Offset + (transitionDuration * 1 * chromeScale),
    ai2Offset = ai1Offset + (transitionDuration * 2 * chromeScale),
    ao2Offset = ai1Offset + (transitionDuration * 3 * chromeScale),
    ai3Offset = ai1Offset + (transitionDuration * 4 * chromeScale);
    
    //------------------------------------------------------------------
    // Need to set the height of these containers in order to vertically
    // center them. They include absolutely-positioned children, so
    // the containers are unaware of their heights, which means the
    // children can't be positioned by CSS. 5
    //------------------------------------------------------------------  
    
    if (isSafari !== true) { 
      document.getElementById('validation-container-wrapper').style.maxHeight = (ai3Offset * 0.85) + 'px';
      document.getElementById('validation-end').style.margin = (ai3Offset * 0.8) + 'px 0 0 0';
    }

    document.getElementById('image-set-01').style.height = imageHeight + 'px'; 
    document.getElementById('text-container').style.height = textHeight + subtextHeight + 'px';
  }

  const configureStylesForSafari = () => {   
   

    document.getElementsByClassName('validation-container')[0].style.position = "relative";
    document.getElementById('validation-container-wrapper').style.maxHeight = "initial";
  }

  //---------------------------------------------------------------------
  // TODO: Remove when Chrome threaded scrolling issue has been handled.
  // Currently in place because there are CSS attributes we want to add
  // (like transition delay) to some elements that would impact the
  // GSAP tweening in ways we don't want.
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
    typeof controller !== 'undefined' && controller !== null && controller.destroy(true);
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
    timeout = setTimeout(updateValidationSection, resizeDebounceDelay);
  }); 
 
  const configureSMScenesWithGSAP = () => { 
    controller = new ScrollMagic.Controller(); 

    if (isSafari === true) {
      new ScrollMagic.Scene({
        duration: ao2Offset + 2000,
        offset: ai1Offset,
      })
      .setPin('#main') 
      .addTo(controller);
    }
    //---------------------------------------------------------
    // Scene 1: Transition in
    //---------------------------------------------------------
    new ScrollMagic.Scene({ 
      duration: 0,
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
      duration: 0,
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
      duration: 800,
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
      duration: 0,
      offset: ai3Offset,
    })
    .setTween('#rays', {
      scale: 1.35,
      top: "2px",
    }) 
    .addTo(controller); 

    // new ScrollMagic.Scene({
    //   duration: 0,
    //   offset: ai3Offset + 2200,
    // })
    // .setTween('.validation-container', {
    //   marginTop: '-100%',
    // }) 
    // .addTo(controller);
  }

  

  const configureSMScenesWithoutGSAP = () => {
    controller = new ScrollMagic.Controller(); 
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

  setDefaults(); 
  isChrome === true && configureStylesForChrome();
  isSafari === true && configureStylesForSafari();
  updateValidationSection();
}
