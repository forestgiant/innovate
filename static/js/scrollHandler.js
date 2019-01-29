const { easing, keyframes, listen, styler, tween } = popmotion;

window.onload = function(fn) { 
  let animationProgress, imageHeight, subtextHeight, textHeight = 0;
      
  //---------------------------------------------------------------------
  // Durations. The following values affect how long the animation takes
  // to scrub through.
  //---------------------------------------------------------------------
  const peopleScrollInDuration = 4000,
        // bodyTextTopMarginScale affects the distance between the 
        // 'subtext' groups ('PLAN & VISION, Create informed ideas,', 
        // etc.) Greater values result in longer scrolling.
        bodyTextTopMarginScale = 1.25,
        // bodyTextContainerBottomPadding affects the distance between
        // the last subtext group and the next (non-animated) section.
        bodyTextContainerBottomPadding = '160vh';

  //---------------------------------------------------------------------
  // DOM elements we might use a few times
  //---------------------------------------------------------------------
  const bodyText = document.getElementsByClassName('body-text'),
        bodyTextContainer = document.getElementById('body-text-container'), 
        globe = document.getElementById('globe'),
        imageSet01 = document.getElementById('image-set-01'),
        people = document.getElementById('people'),
        textContainer = document.getElementById('text-container'),
        textSet01 = document.getElementById('text-set-01'),
        textSet02 = document.getElementById('text-set-02');
 
  const bodyTop = document.body.getBoundingClientRect().top,
        validationStartRelativeTop = document.getElementsByClassName('validation-container')[0].getBoundingClientRect().top, 
        validationStartAbsoluteTop = validationStartRelativeTop - bodyTop;
 
  const calculateSizesAndOffsets = () => {    
    imageHeight = globe.offsetHeight,
    textHeight = textSet01.offsetHeight;
    subtextHeight = textSet02.offsetHeight;  
      
    imageSet01.style.height = imageHeight + 'px'; 
    textContainer.style.height = textHeight + subtextHeight + 'px';
    bodyTextContainer.style.paddingBottom = bodyTextContainerBottomPadding;

    let bodyTextBottomOffset = (textSet01.offsetTop + textSet01.offsetHeight);
     
    for (let i = 0; i < bodyText.length; i++) { 
      bodyText[i].style.marginTop = screen.height * bodyTextTopMarginScale + 'px';
      bodyText[i].style.top = bodyTextBottomOffset + 'px';
    }
  }

  //---------------------------------------------------------------------
  // Popmotion stylers, keyframes, and tweens
  //---------------------------------------------------------------------
  const animatePeopleIn = styler(people);

  const peopleAnimation = keyframes({
    values: [
      { top: '0%', opacity: 0, scale: 0.5 },
      { top: '-24%', opacity: 1, scale: 1.15 },
      { top: '0%', opacity: 0, scale: 0.5 },
    ]
  }).start(animatePeopleIn.set);


  let options = {
    root: document.querySelector('#validation-container-wrapper'),
    rootMargin: '0px',
    threshold: 1
  }

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      console.log(entry);
    })
  }
  let observer = new IntersectionObserver(callback, options);
  let target = textSet02;
  observer.observe(target);

 
  listen(window, 'scroll') 
    .filter(function(v) {  
      return v.target.scrollingElement.scrollTop >= validationStartAbsoluteTop &&           
        v.target.scrollingElement.scrollTop <= validationStartAbsoluteTop + peopleScrollInDuration;
    })
    .start(function(e) {    
      animationProgress = (e.target.scrollingElement.scrollTop - validationStartAbsoluteTop) / peopleScrollInDuration; 
      peopleAnimation.seek(animationProgress); 
    }); 

 calculateSizesAndOffsets();
}
