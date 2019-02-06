const { everyFrame, keyframes, listen, stagger, styler, tween  } = popmotion;

window.onload = function(fn) { 
  let animationProgress,    
      imageHeight,  
      scrollTimeout,
      timeout,
      triggerPoint_Sphere1,
      triggerPoint_Sphere2,
      triggerPoint_Sphere3 = 0;

  const resizeDebounceDelay = 250;
  //---------------------------------------------------------------------
  // DOM elements
  //---------------------------------------------------------------------
  const main = document.getElementById('main'),
        people = document.getElementById('people'),
        productText = document.getElementsByClassName('product-text')[0],
        sphereBase01 = document.getElementById('sphere-base-01'), 
        sphere02Pieces = document.getElementById('sphere-02-pieces'),
        sphere03Pieces = document.getElementById('sphere-03-pieces'),
        validationImageContainers = document.getElementsByClassName('validation-image-container');
 
  //---------------------------------------------------------------------
  // We'll need to re-calculate our positions, offsets, and durations
  // when the browser resizes, but we should debounce these calculations 
  // to occur at most once within a given period.
  //---------------------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(setSizesAndOffsets, resizeDebounceDelay);
  });
 
  const setSizesAndOffsets = () => { 
    imageHeight = sphereBase01.offsetHeight;
    productTextHeight = productText.offsetHeight;
    triggerPoint_Sphere1 = sphereBase01.getBoundingClientRect().bottom - screen.height;

    if (screen.width > 768) {
      triggerPoint_Sphere2 = triggerPoint_Sphere1 + imageHeight;
      triggerPoint_Sphere3 = triggerPoint_Sphere2 + imageHeight; 
    } else {
      triggerPoint_Sphere2 = triggerPoint_Sphere1 + imageHeight + productTextHeight;
      triggerPoint_Sphere3 = triggerPoint_Sphere2 + imageHeight + productTextHeight;
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
      times: [0, 0.5]
  });
  
  const raysControls = raysAnimation.start({
    update: raysStyler.set
  });

  raysControls.pause();
  //---------------------------------------------------------------------
  // Our scroll handler. Throttle the number of times we update our 
  // animation to the browser's framerate. Cuts down on jank.
  //---------------------------------------------------------------------
  main.addEventListener('scroll', (e) => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      const scrollPosition = e.target.scrollTop;

      if (scrollPosition >= triggerPoint_Sphere1) {
        // Trigger the people rising up from the globe (then descending back down)
        if (scrollPosition < triggerPoint_Sphere2) {
          animationProgress = (scrollPosition - triggerPoint_Sphere1) / imageHeight; 
          peopleControls.seek(animationProgress);
        }

        // Trigger the first set of globe pieces fading out and the annotations fading in
        if (scrollPosition >= triggerPoint_Sphere2 && scrollPosition < triggerPoint_Sphere3) {
          animationProgress = (scrollPosition - triggerPoint_Sphere2) / imageHeight; 
          animationProgress = animationProgress <= 0.1 ? 0 : animationProgress;
          pieces02Controls.seek(animationProgress);
          annotationsControls.seek(animationProgress);
        }

        // Trigger the second set of pieces fading out and the rays scaling up
        if (scrollPosition >= triggerPoint_Sphere3 && scrollPosition < (triggerPoint_Sphere3 + imageHeight)) {
          animationProgress = (scrollPosition - triggerPoint_Sphere3) / imageHeight; 
          pieces03Controls.seek(animationProgress);
          raysControls.seek(animationProgress);
        }
      }
    })
  }, {
    passive: true
  })
  
  setSizesAndOffsets();
}