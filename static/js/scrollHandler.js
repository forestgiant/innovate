//const { keyframes, listen, stagger, styler, tween  } = popmotion;

window.onload = function(fn) { 
  let animationProgress,   
      annotationScrollDuration,
      bodyTextContainerBottomPadding,
      bodyTextTopMarginScale,
      imageHeight, 
      peopleScrollInDuration, 
      timeout,
      validationStartAbsoluteTop,
      validationStartRelativeTop = 0,
      lastAnimationsToggled = false;

  const resizeDebounceDelay = 250;
  //---------------------------------------------------------------------
  // DOM elements
  //---------------------------------------------------------------------
  const annotations = document.getElementById('annotations'), 
        firstPieces = document.getElementsByClassName('first-pieces'),
        globe = document.getElementById('globe'),
        imageSet01 = document.getElementById('image-set-01'),
        imageWrappers = document.getElementsByClassName('image-wrapper'), 
        people = document.getElementById('people'),
        rays = document.getElementById('rays');
 

  //---------------------------------------------------------------------
  // We'll need to re-calculate our positions, offsets, and durations
  // when the browser resizes, but we should debounce these calculations 
  // to occur at most once within a given period.
  //---------------------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(updateValidationSection, resizeDebounceDelay);
  });

  const updateValidationSection = () => {
    setDurations();
    setSizesAndOffsets();
  }
  
  //---------------------------------------------------------------------
  // Durations. The following values affect how long the animation takes
  // to scrub through.
  //--------------------------------------------------------------------- 
  const setDurations = () => {
    // peopleScrollInDuration affects the distance needed to 
    // complete the people growing/shrinking animation
    peopleScrollInDuration = screen.height * 1.75,
    // bodyTextTopMarginScale affects the distance between the 
    // 'subtext' groups ('PLAN & VISION, Create informed ideas,', 
    // etc.) Greater values result in longer scrolling.
    bodyTextTopMarginScale = 1,
    // bodyTextContainerBottomPadding affects the distance between
    // the last subtext group and the next (non-animated) section.
    bodyTextContainerBottomPadding = '150vh',
    // annotationsScrollDuration affects the distance needed to 
    // complete the annotation animation
    annotationScrollDuration = screen.height * 1.75;
  }
  
  const setSizesAndOffsets = () => { 
    const bodyTop = document.body.getBoundingClientRect().top;

    /*
    validationStartRelativeTop = validationContainer.getBoundingClientRect().top, 
    validationStartAbsoluteTop = validationStartRelativeTop - bodyTop;
    */

    imageHeight = globe.offsetHeight; 
      
    Array.prototype.forEach.call(imageWrappers, (imageWrapper) => {
      imageWrapper.style.height = imageHeight + 'px';
    }) 
  }
 
  //updateValidationSection();
}
