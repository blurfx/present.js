# fufufu.js

fufufu.js is lightweight presentation jquery library.

##Dependency
jQuery only


##Installation

###manual

Download minified js file to your project and link it.
```html
<script type="text/javascript" src="fufufu.min.js"></script>
```


##Usage
```javascript
$(document).ready(function(){
  $.fufufu();
});
```
or
```javascript
$(document).ready(function({
  $.fufufu({
    animate: true,
    showProgress: true,
    showPageNumber: true,
    //more options goes here
  });
});
```


##Options(Attributes)

| Option | Data type | Default | Comment |
|--------|-----------|---------|---------|
|alignMiddle|boolean|true|It wraps every slide cotents and align vertically middle and align texts to center.|
|animate|boolean|false| This options for animation of slide transition effect and speed.<br>slideSpeed, opacityTransition, bgColorTransition requires this option.|
|slideSpeed|integer|400|Determining how long the slide transition effect will run|
|opacityTransition|boolean|false|Sets whether to use the opacity change animation when slide changing.|
|bgColorTransition|boolean|false|Sets whether to use the background color change animation when background color of the change slide is different.|
|transitionSpeed|integer|600|Determining how long the tranparency and color transition effect will run|
|showPageNumber|boolean|true|Display text that shows current slide index and total slide count.|
|pageNumberPos|string|right bottom| Set position of *showPageNumber*.<br>Usable Values : left, right, top, bottom, center|
|showProgress|boolean|false|Display progress bar that shows presentation progress.|
