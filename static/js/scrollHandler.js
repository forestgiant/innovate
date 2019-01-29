const { keyframes, listen, stagger, styler, tween  } = popmotion;

window.onload = function(fn) { 
  let animationProgress,   
      imageHeight, 
      subtextHeight, 
      textHeight, 
      timeout,
      validationStartAbsoluteTop,
      validationStartRelativeTop = 0;
      
  //---------------------------------------------------------------------
  // Durations. The following values affect how long the animation takes
  // to scrub through.
  //---------------------------------------------------------------------
  // TODO: consider making these values dependent on viewport size. They
  // aren't translating perfectly between desktop and mobile.
  //---------------------------------------------------------------------
  const peopleScrollInDuration = 3500,
        // bodyTextTopMarginScale affects the distance between the 
        // 'subtext' groups ('PLAN & VISION, Create informed ideas,', 
        // etc.) Greater values result in longer scrolling.
        bodyTextTopMarginScale = 1.25,
        // bodyTextContainerBottomPadding affects the distance between
        // the last subtext group and the next (non-animated) section.
        bodyTextContainerBottomPadding = '160vh',
        // The distance for the .first-pieces to complete a scale-up &
        // fade-out animation. Staggered.
        firstPiecesScrollOutDuration = 1000;
  
  const resizeDebounceDelay = 250;

  //---------------------------------------------------------------------
  // DOM elements
  //---------------------------------------------------------------------
  const bodyText = document.getElementsByClassName('body-text'),
        bodyTextContainer = document.getElementById('body-text-container'), 
        firstPieces = document.getElementsByClassName('first-pieces'),
        globe = document.getElementById('globe'),
        imageSet01 = document.getElementById('image-set-01'),
        people = document.getElementById('people'),
        textContainer = document.getElementById('text-container'),
        textSet01 = document.getElementById('text-set-01'),
        textSet02 = document.getElementById('text-set-02'),
        validationContainer = document.getElementById('validation-container');
 
  //---------------------------------------------------------------------
  // We'll need to re-calculate our positions and offsets when the
  // browser resizes, but we should debounce these calculations to
  // occur at most once within a given period.
  //---------------------------------------------------------------------
  window.addEventListener('resize', () => {
    this.clearTimeout(timeout);
    timeout = setTimeout(updateValidationSection, resizeDebounceDelay);
  });

  const updateValidationSection = () => {
    calculateSizesAndOffsets();
  }

  const calculateSizesAndOffsets = () => { 
    const bodyTop = document.body.getBoundingClientRect().top;

    validationStartRelativeTop = validationContainer.getBoundingClientRect().top, 
    validationStartAbsoluteTop = validationStartRelativeTop - bodyTop;

    imageHeight = globe.offsetHeight,
    textHeight = textSet01.offsetHeight;
    subtextHeight = textSet02.offsetHeight;  
      
    imageSet01.style.height = imageHeight + 'px'; 
    textContainer.style.height = textHeight + subtextHeight + 'px';
    bodyTextContainer.style.paddingBottom = bodyTextContainerBottomPadding;

    const bodyTextBottomOffset = (textSet01.offsetTop + textSet01.offsetHeight);
     
    for (let i = 0; i < bodyText.length; i++) { 
      bodyText[i].style.marginTop = screen.height * bodyTextTopMarginScale + 'px';
      bodyText[i].style.top = bodyTextBottomOffset + 'px';
    } 
  }

  //---------------------------------------------------------------------
  // Popmotion stylers, keyframes, and tweens
  //---------------------------------------------------------------------
  const peopleStyler = styler(people);

  const peopleAnimation = keyframes({
    values: [
      { top: '0%', opacity: 0, scale: 0.5 },
      { top: '-24%', opacity: 1, scale: 1.15 },
      { top: '-24%', opacity: 1, scale: 1.15 },
      { top: '0%', opacity: 0, scale: 0.65 },
    ],
      times: [0, 0.75, 0.85, 0.99]
  }).start({
    update: peopleStyler.set
  }); 

  const pieceAnimations = [].slice.call(firstPieces).map(piece => { 
    const animation = keyframes({ 
      values: [
        { scale: 1, opacity: 1 },
        { scale: 1.25, opacity: 0 }
      ], 
    }) 

    return animation;
  })

  const pieceStylers = [].slice.call(firstPieces).map(piece => {
    return styler(piece);
  })

  listen(window, 'scroll')  
    .filter(function(e) {
      const scrollPosition = e.target.scrollingElement.scrollTop;
      return scrollPosition >= validationStartAbsoluteTop;
    })
    .start(function(e) {
      const scrollPosition = e.target.scrollingElement.scrollTop;

      // Trigger the people rising up from the globe (then descending back down)
      if (scrollPosition < validationStartAbsoluteTop + peopleScrollInDuration) {
        animationProgress = (e.target.scrollingElement.scrollTop - validationStartAbsoluteTop) / peopleScrollInDuration; 
        peopleAnimation.seek(animationProgress);
      } 

      // Trigger the first pieces animating out 
      if (scrollPosition >= validationStartAbsoluteTop + (peopleScrollInDuration / 3)) {
        stagger(pieceAnimations, 50)
          .start((values) => {  
            values.forEach((val = 0, i) => { 
              pieceStylers[i].set({
                opacity: val.opacity,
                scale: val.scale
              })
            })
          })
      }
    }); 

    
    
 
  updateValidationSection();
}
