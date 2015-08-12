# fufufu.js

fufufu.js is lightweight presentation jquery library.

##Dependency
jQuery only



##Options

| Option | Data type | Default | Comment |
|--------|-----------|---------|---------|
|alignMiddle|boolean|true|It wraps every slide cotents and align vertically middle and align texts to center.|
|animate|boolean|false| This options for animation of slide transition effect and speed.<br>slideSpeed, opacityTransition, bgColorTransition requires this option.|
|slideSpeed|integer|400|Determining how long the slide transition effect will run|
|opacityTransition|boolean|false|Sets whether to use the opacity change animation when slide changing.|
|bgColorTransition|boolean|false|Sets whether to use the background color change animation when background color of the change slide is different.|
|showPageNumber|boolean|true|Display text that shows current slide index and total slide count.|
|pageNumberPos|string|right bottom| Set position of *showPageNumber*.<br>Usable Values : left, right, top, bottom, center|
|showProgress|boolean|false|Display progress bar that shows presentation progress.|
