# FG Innovation LP

When inside the `innovate` folder, use the command `hugo server` in Terminal to lauch the website.

## Styling with Sass
Sass is simply sassier CSS that allows for custom variables, nesting, partials, importing, and more. In a nutshell, if you feel at home on Hugo, SASS is the CSS-equivalent to the partials system. In fact, this build mirrors partials from both Hugo and Sass, so if you're looking to make style adjustments to `hero.html`, go to `_hero.scss`. 

### Organization
All stylesheets are located in `assets/css`. Make style changes by either adding or altering the `.scss` files in the `partials` folder, which are then imported in logical order via `input.scss`. Please note that you'll need to add an underscore before any file destined to be a partial. 

For the most part, all overarching styles and variables will be handled directly in `input.scss`. For unique components though, such as fonts, 3rd party integrations or those mirrored files, check out `partials`.  

### Variables
Variables are housed in the main `input.scss` file. They are used to control universal elements, such as fonts and colors, so we can make widespread changes with very little effort. 

### More on Sass
For more information on Sass, go to [sass-lang.com/guide](https://sass-lang.com/guide).

### Maintenance
An experimental feature in Google Chrome, threaded scrolling, causes quite a lot of jitter on a pinned section that uses tweening by GSAP. (Disabling this feature, as explained [in an issue raised on GitHub](https://github.com/janpaepke/ScrollMagic/issues/866), fixes the problem, but this can't be done programatically.)

We're currently doing a browser check on page load, then serving one of two ScrollMagic scene initialization functions:

1. Function #1 attaches trigger-based scenes to the controller, which add classes to elements at certain scrolling positions (`offsets`) on the page. Once these animations trigger, they continue triggering, regardless of velocity or momentum in scrolling. This is currently attached to Google Chrome.

2. Function #2 attaches tween-based scenes to the controller. These are closer to the ideal behavior of the scenes "scrubbing" on page scroll, rather than firing discrete events.

We should pay attention to the issue linked to above on GitHub, and modify the code accordingly if it's resolved, as we're happier with the tween-based animations than we are the trigger-based.








