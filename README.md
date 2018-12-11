# FG Innovation LP

Use command `hugo server` to lauch website. 

## Styling with Sass
Sass is simply sassier CSS that allows for custom variables, nesting, partials, importing, and more. In a nutshell, if you feel at home on Hugo, SASS is the CSS-equivalent to the system. 

All stylesheets are organized by adding your code to static/main.scss, then running the `sass` command to compile `.scss`/`.sass` files to `.css` files. 

### Organization
All stylesheets are located in `static/css`. Make style changes by either adding or altering the `.scss` files in the `partials` folder, which are then imported in logical order to `input.scss`. Please note that you'll need to add an underscore before any file destined to be a partial. 

For the most part, all overarching styles will be handled directly in `input.scss`. For unique components though, such as fonts, 3rd party integrations or files, use `partials`.  

### Compiling
Compile Sass to CSS in your terminal using the `sass` command. Assuming you've navigated to the main `innovation` folder, use the following compand to compile and watch for changes. This tells the program to take your commands from `input` and compile them into a single `output` file. 

`sass --watch static/css/input.scss:static/css/output.css`

### Variables
Variables are housed in the main `input.scss` file. They are used to control universal elements, such as fonts and colors, so we can make widespread changes with very little effort. 

### More on Sass
For more information on Sass, go to [sass-lang.com/guide](https://sass-lang.com/guide).








