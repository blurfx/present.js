# fufufu.js

fufufu.js is lightweight presentation jquery library.

##Dependency
jQuery only



##Options
- alignMiddle ```boolean```

  default : ```true```
  
  It wraps every slide cotents and align vertically middle and align texts to center.



- animate ```boolean```

  default : ```false```
  
  This options for animation of slide transition effect and speed.

  slideSpeed, opacityTransition, bgColorTransition requires this option.
  
  
  - slideSpeed ```integer```

  default : ```400```
  
  Determining how long the slide transition effect will run

  
- opacityTransition ```boolean```

  default : ```false```
  
  Sets whether to use the opacity change animation when slide changing.

  
- bgColorTransition ```boolean```

  default : ```false```
  
  Sets whether to use the background color change animation when background color of the change slide is different.
  

- showPageNumber ``boolean``

  default : ``true``
  
  Display text that shows current slide index and total slide count.
  
  
- pageNumberPos ``string``

  default : ``right bottom``
  

- showProgress ``boolean``

  default : ``false``
  
  Display progress bar that shows presentation progress.
