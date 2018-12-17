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








