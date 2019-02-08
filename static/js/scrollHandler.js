const { everyFrame, keyframes, listen, stagger, styler, tween  } = popmotion;

window.onload = function(fn) { 
  let animationProgress,    
      imageHeight,  
      scrollDuration,
      timeout,
      triggerPoint_Sphere1,
      triggerPoint_Sphere2,
      triggerPoint_Sphere3 = 0;

  const resizeDebounceDelay = 250,
        isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  //---------------------------------------------------------------------
  // DOM elements
  //---------------------------------------------------------------------
  const largeImages = document.getElementsByClassName('image-lg'), 
        parallaxElements = document.getElementsByClassName('plx'),
        people = document.getElementById('people'),
        productText = document.getElementsByClassName('product-text')[0],
        sphereBase01 = document.getElementById('sphere-base-01'), 
        sphere02Pieces = document.getElementById('sphere-02-pieces'),
        sphere03Pieces = document.getElementById('sphere-03-pieces'),
        validationImageContainers = document.getElementsByClassName('validation-image-container');

  let main = document.getElementById('main');
 
  //---------------------------------------------------------------------
  // We'll need to re-calculate our positions, offsets, and durations
  // when the browser resizes, but we should debounce these calculations 
  // to occur at most once within a given period.
  //---------------------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(setSizesAndOffsets, resizeDebounceDelay);
  });

  const handleSafari = () => {
    if (isSafari) {
      main.classList.remove('plx-viewport');
      Array.prototype.forEach.call(parallaxElements, (parallaxElement) => {
        parallaxElement.classList.remove('plx-group', 'plx-layer', 'plx-depth2', 'plx-depth3', 'plx-depth4');
      })
      Array.prototype.forEach.call(largeImages, (largeImage) => {
        largeImage.classList.add('absolute');
      })

      main = window;
    }
  }
  
  //---------------------------------------------------------------------
  // We need to set some dimensions and offsets here. In particular, we
  // set the heights on our imageContainers because they contain 
  // absolutely-positioned children, and thus won't expand to contain 
  // them, which causes display: flex to position them incorrectly on
  // the y-axis. We also (re)calculate the trigger points for our
  // animations; this needs to be done both (1) once the window's ready,
  // and (2) whenever the window resizes.
  //---------------------------------------------------------------------
  const setSizesAndOffsets = () => { 
    imageHeight = sphereBase01.offsetHeight;
    scrollDuration = imageHeight * 1.25;
    productTextHeight = productText.offsetHeight;

    if (screen.width > 768) {
      triggerPoint_Sphere1 = sphereBase01.getBoundingClientRect().top + main.scrollTop - (screen.height / 1.25);
      triggerPoint_Sphere2 = triggerPoint_Sphere1 + scrollDuration;
      triggerPoint_Sphere3 = triggerPoint_Sphere2 + scrollDuration; 
    } else {
      triggerPoint_Sphere1 = sphereBase01.getBoundingClientRect().top + main.scrollTop - (screen.height / 2);
      triggerPoint_Sphere2 = triggerPoint_Sphere1 + scrollDuration + productTextHeight;
      triggerPoint_Sphere3 = triggerPoint_Sphere2 + scrollDuration + productTextHeight;
    }

    Array.prototype.forEach.call(validationImageContainers, (imageContainer) => {
      imageContainer.style.height = imageHeight + 'px';
    }) 
  }

  //---------------------------------------------------------------------
  // Popmotion stylers, keyframes, and tweens
  //---------------------------------------------------------------------
  // People
  //---------------------------------------------------------------------
  const peopleStyler = styler(people);
  const peopleAnimation = keyframes({
    values: [
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1 }, 
    ],
      times: [0, 0.5]
  });
  
  const peopleControls = peopleAnimation.start({
    update: peopleStyler.set
  });

  peopleControls.pause();
  //---------------------------------------------------------------------
  // First set of pieces
  //---------------------------------------------------------------------
  const pieces02Styler = styler(sphere02Pieces);
  const pieces02Animation = keyframes({
    values: [
      { opacity: 1 },
      { opacity: 0 }, 
    ],
      times: [0, 0.5]
  });
  
  const pieces02Controls = pieces02Animation.start({
    update: pieces02Styler.set
  });

  pieces02Controls.pause();
  //---------------------------------------------------------------------
  // Annotations
  //---------------------------------------------------------------------
  const annotationsStyler = styler(annotations);
  const annotationsAnimation = keyframes({
    values: [
      { opacity: 0 },
      { opacity: 1 }, 
    ],
      times: [0, 0.5]
  });
  
  const annotationsControls = annotationsAnimation.start({
    update: annotationsStyler.set
  });

  annotationsControls.pause();
  //---------------------------------------------------------------------
  // Second set of pieces
  //---------------------------------------------------------------------
  const pieces03Styler = styler(sphere03Pieces);
  const pieces03Animation = keyframes({
    values: [
      { opacity: 1 },
      { opacity: 0 }, 
    ],
      times: [0, 0.5]
  });
  
  const pieces03Controls = pieces03Animation.start({
    update: pieces03Styler.set
  });

  pieces03Controls.pause();
  //---------------------------------------------------------------------
  // Rays
  //---------------------------------------------------------------------
  const raysStyler = styler(rays);
  const raysAnimation = keyframes({
    values: [
      { scale: 0 },
      { scale: 1 }, 
    ],
      times: [0, 0.25]
  });
  
  const raysControls = raysAnimation.start({
    update: raysStyler.set
  });

  raysControls.pause();
  //---------------------------------------------------------------------
  // Our scroll handler. Throttle the number of times we update our 
  // animation to the browser's framerate. Cuts down on jank.
  //---------------------------------------------------------------------
  attachScrollHandler = () => {
    main.addEventListener('scroll', (e) => {
      requestAnimationFrame(() => { 
        handleScroll(e)
      });
    }, {
      passive: true
    })
  }

  handleScroll = (e) => {
    if (typeof e.target !== 'undefined') {
      const scrollPosition = typeof e.target.scrollTop === 'undefined' ? e.target.scrollingElement.scrollTop : e.target.scrollTop;

      if (scrollPosition >= triggerPoint_Sphere1) {
        // Trigger the people rising up from the globe (then descending back down)
        if (scrollPosition < triggerPoint_Sphere2) {
          animationProgress = (scrollPosition - triggerPoint_Sphere1) / scrollDuration; 
          peopleControls.seek(animationProgress);
        }

        // Trigger the first set of globe pieces fading out and the annotations fading in
        if (scrollPosition >= triggerPoint_Sphere2 && scrollPosition < triggerPoint_Sphere3) {
          animationProgress = (scrollPosition - triggerPoint_Sphere2) / scrollDuration; 
          animationProgress = animationProgress <= 0.1 ? 0 : animationProgress;
          pieces02Controls.seek(animationProgress);
          annotationsControls.seek(animationProgress);
        }

        // Trigger the second set of pieces fading out and the rays scaling up
        if (scrollPosition >= triggerPoint_Sphere3 && scrollPosition < (triggerPoint_Sphere3 + scrollDuration)) {
          animationProgress = (scrollPosition - triggerPoint_Sphere3) / scrollDuration; 
          pieces03Controls.seek(animationProgress);
          raysControls.seek(animationProgress);
        }
      }
    }

    requestAnimationFrame(handleScroll);
  }
  
  //handleSafari();
  setTimeout(() => {
    setSizesAndOffsets();
  }, 100);
  setTimeout(() => {
    attachScrollHandler();
  }, 250);
}