const { keyframes, listen, stagger, styler, tween  } = popmotion;

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
        bodyText = document.getElementsByClassName('body-text'),
        bodyTextContainer = document.getElementById('body-text-container'), 
        firstPieces = document.getElementsByClassName('first-pieces'),
        globe = document.getElementById('globe'),
        imageSet01 = document.getElementById('image-set-01'),
        lastPieces = document.getElementsByClassName('last-pieces'),
        people = document.getElementById('people'),
        rays = document.getElementById('rays'),
        textContainer = document.getElementById('text-container'),
        textSet01 = document.getElementById('text-set-01'),
        textSet02 = document.getElementById('text-set-02'),
        validationContainer = document.getElementById('validation-container');  

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

    validationStartRelativeTop = validationContainer.getBoundingClientRect().top, 
    validationStartAbsoluteTop = validationStartRelativeTop - bodyTop;

    imageHeight = globe.offsetHeight; 
      
    imageSet01.style.height = imageHeight + 'px'; 
    textContainer.style.height = '50vh';
    bodyTextContainer.style.paddingBottom = bodyTextContainerBottomPadding;

    const bodyTextBottomOffset = (textSet01.offsetTop + textSet01.offsetHeight);
     
    for (let i = 0; i < bodyText.length; i++) { 
      bodyText[i].style.marginTop = screen.height * bodyTextTopMarginScale + 'px';
      bodyText[i].style.top = bodyTextBottomOffset + 'px';
    } 

    textSet02.style.marginTop = '50vh';
  }

  //---------------------------------------------------------------------
  // Popmotion stylers, keyframes, and tweens
  //---------------------------------------------------------------------
  // People
  //---------------------------------------------------------------------
  const peopleStyler = styler(people);
  const peopleAnimation = keyframes({
    values: [
      { top: '90px', opacity: 1, scale: 0.4 },
      { top: '-90px', opacity: 1, scale: 1.15 },
      { top: '-90px', opacity: 1, scale: 1.15 },
      { top: '90px', opacity: 0, scale: 0.4 },
    ],
      times: [0, 0.75, 0.85, 0.99]
  }).start({
    update: peopleStyler.set
  }); 

  //---------------------------------------------------------------------
  // First Pieces
  //---------------------------------------------------------------------
  const firstPieceAnimations = [].slice.call(firstPieces).map(piece => {  
    return pieceAnimation = tween({ 
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: 1.25,
        opacity: 0
      }
    })  
  })

  const firstPieceControls = [].slice.call(firstPieceAnimations).map((pieceAnimation, i) => {
    const pieceStyler = styler(firstPieces[i]); 
    pieceControl = pieceAnimation.start({
      update: pieceStyler.set,
      complete: () => {}
    }); 
    pieceControl.pause();
    return pieceControl;
  })
  //---------------------------------------------------------------------
  // Annotations
  //---------------------------------------------------------------------
  const annotationStyler = styler(annotations);
  const annotationAnimation = keyframes({
    values: [
      { opacity: 0 },
      { opacity: 1 }, 
      { opacity: 0,},
    ],
      times: [0, 0.33, 0.67]
  }).start({
    update: annotationStyler.set
  }); 
  //---------------------------------------------------------------------
  // Last Pieces
  //---------------------------------------------------------------------
  const lastPieceAnimations = [].slice.call(lastPieces).map(piece => {  
    return pieceAnimation = tween({ 
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: 1.25,
        opacity: 0
      }
    })  
  })

  const lastPieceControls = [].slice.call(lastPieceAnimations).map((pieceAnimation, i) => {
    const pieceStyler = styler(lastPieces[i]); 
    pieceControl = pieceAnimation.start({
      update: pieceStyler.set,
      complete: () => {}
    }); 
    pieceControl.pause();
    return pieceControl;
  })
  //---------------------------------------------------------------------
  // Scroll event handler
  //---------------------------------------------------------------------
  listen(window, 'scroll')  
    .filter(function(e) {
      const scrollPosition = e.target.scrollingElement.scrollTop;
      return lastAnimationsToggled ? null : scrollPosition >= validationStartAbsoluteTop;
    })
    .start(function(e) { 
      const scrollPosition = e.target.scrollingElement.scrollTop,
            peopleScrollMax = validationStartAbsoluteTop + peopleScrollInDuration,
            firstPieceScrollMin = validationStartAbsoluteTop + (peopleScrollInDuration / 1.15),
            firstPieceScrollMax = validationStartAbsoluteTop + peopleScrollInDuration,
            annotationScrollMin = peopleScrollMax * 1,
            annotationScrollMax = annotationScrollMin + annotationScrollDuration,
            lastPieceScrollMin = annotationScrollMax * 0.95;

      // Trigger the people rising up from the globe (then descending back down)
      if (scrollPosition < peopleScrollMax) {
        animationProgress = (e.target.scrollingElement.scrollTop - validationStartAbsoluteTop) / peopleScrollInDuration; 
        peopleAnimation.seek(animationProgress);
      } 

      // Trigger the first pieces animating out 
      if (scrollPosition >= firstPieceScrollMin && scrollPosition < firstPieceScrollMax) {        
        stagger(firstPieceAnimations, 150)
          .start((values) => {  
            values.forEach((val = 0, i) => {   
              firstPieceControls[i].resume();
            })
          })
      }

      // Trigger the annotations appearing over the globe (then disappearing) 
      if (scrollPosition >= annotationScrollMin && scrollPosition <= annotationScrollMax) {  
        animationProgress = (e.target.scrollingElement.scrollTop - annotationScrollMin) / annotationScrollDuration; 
        animationProgress = animationProgress < 0.05 ? 0 : animationProgress;
        annotationAnimation.seek(animationProgress);
      }

      // Trigger the first pieces animating out 
      if (scrollPosition >= lastPieceScrollMin) {
        if (!lastAnimationsToggled) {
          globe.classList.toggle('rotate'); 
          rays.classList.toggle('scale-rays-up');
          lastAnimationsToggled = true;
        }

        stagger(lastPieceAnimations, 150)
          .start((values) => {  
            values.forEach((val = 0, i) => {   
              lastPieceControls[i].resume();
            })
          })
        }
    }); 
 
  updateValidationSection();
}
