# present.js

present.js is lightweight web presentation library.

##Features
- Lightweight
- Highly customizable
- No dependency
- Responsive
- Support Touch Events
- Support auto vertical-middle Alignment
- Animations
  - Color Transition
  - Opacity Transition
  - Slide Animation

##Installation

###manual

Download minified js file to your project and link it.
```html
<script type="text/javascript" src="present.min.js"></script>
```

##Usage

First, make some div elements that has slide class. div.slide elements will be one of slide page.
(parent of div.slide elements should be same)

and..

```javascript
present();
```
or
```javascript
present({
  animate: true,
  showProgress: true,
  showPageNumber: true,
  //more options goes here
});
```


##Options(Attributes)

| Option | Data type | Default | Comment |
|--------|-----------|---------|---------|
|alignMiddle|boolean|true|It wraps every slide cotents and align vertically middle and align texts to center.|
|animate|boolean|false| This options for animation of slide transition effect and speed.<br>slideSpeed, opacityTransition, bgColorTransition requires this option.|
|animationSpeed|integer|400|Determining how long animation will run|
|opacityTransition|boolean|false|Sets whether to use the opacity change animation when slide changing.|
|bgColorTransition|boolean|false|Sets whether to use the background color change animation when background color of the change slide is different.|
|showPageNumber|boolean|true|Display text that shows current slide index and total slide count.|
|pageNumberPos|string|right bottom| Set position of *showPageNumber*.<br>Usable Values : left, right, top, bottom, center|
|showProgress|boolean|false|Display progress bar that shows presentation progress.|



##Fragmentation

Set ``data-fragindex="INDEX_VALUE"`` attribute where you want.

like this
```html
<div class="slide">
    <span>Fragments</span>
    <span data-fragindex="1">Use <code>data-fragindex</code> attribute for fragments</span>
    <span data-fragindex="2">How easy!</span>
    <span data-fragindex="3">Isn't it?</span>
</div>
```

=======
##Browser Support

| Internet Explorer | Chrome | Firefox | Opera | Safari |
|:-----------------:|:------:|:-------:|:-----:|:------:|
|        10+        |   8+   |   3.6+  | 11.5+ |  5.1+  |


##Demo

http://mystika.me/present.js/
