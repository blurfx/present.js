function qs(str){ return document.querySelector(str) }
function qa(str){ return document.querySelectorAll(str) }

function colorHex(val) {
    var p = val.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(p[0]);
    for (var i = 1; i <= 3; ++i) {
        p[i] = parseInt(p[i]).toString(16);
        if (p[i].length == 1) p[i] = '0' + p[i];
    }
    return '#' + p.join('');
}

function prepareColorTransition(){
  if(getPrevNext('prev'))
  {
    singleCss(getPrevNext('prev'),{
      'background' : qs('.slide.current').getAttribute('data-background'),
    });
  }
  
  if(getPrevNext('next'))
  {
    singleCss(getPrevNext('next'),{
      'background' : qs('.slide.current').getAttribute('data-background'),
    });
  }
}

function getPrevNext(pos){
  var i=0,f=0;
  if(pos=='prev')
    o = qs('.slide.current').previousElementSibling
  else
    o = qs('.slide.current').nextElementSibling

  for(;i<o.classList.length;i++){
    if(o.classList[i] == 'slide'){ f++; break; }
  }
  return (f)?o:null;
}

function css(obj,param){
  var i=0, _o;
  if(obj instanceof Object)
    _o = obj;
  else _o = qa(obj);

  for(;i<_o.length;i++)
    for (var val in param)
      _o[i].style[val] = param[val];
}

function singleCss(obj,param){
  for (var val in param)
    obj.style[val] = param[val];
} 

function parsePos(str){
  str = str.split(' ');
  for(i=0;i<str.length;i++){
    if(str[i] != 'center'){
      var dict = {};
      dict[str[i]] = '10px';
      css('.slide-paging',dict);
    }
    else{
      css('.slide-paging',{'left':'0','right':'0','textAlign':'center'});
    }
  }
} 

function responsive(){
  var i=0,r = qa('.slide img,.slide embed,.slide iframe');
  for(;i<r.length;i++){
    r[i].style.maxHeight = r[i].offsetHeight / (r[i].offsetWidth / window.innerHeight)+'px';
    r[i].style.maxWidth = window.innerWidth+'px';
  }
}

function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}

function present(options) {
  window.onload = function() {
  var index = 0;

  var def = {
    alignMiddle: true,
    animate: false,
    animationSpeed: 400,
    opacityTransition: false,
    bgColorTransition: false,
    showPageNumber: true,
    pageNumberPos: 'right bottom',
    showProgress: false,
  };

  var settings = extend({},def,options);

  if(!settings.animate){
    settings.opacityTransition = false;
    settings.bgColorTransition = false;
  }

  function hashChange(){
     if(window.location.hash.length) {
      var index = window.location.hash.substr(1,window.location.hash.length);
      var cls = '.slide[data-index="' + index + '"]';
      if(qa(cls).length){
        var i = 0;
        qs('.slide.current').classList.remove('current');

        for(i=+index-1;i>0;i--){
          css('.slide[data-index="' + i + '"]',{'left': -(index-i)*100+'%'});
        }

        for(i=+index+1;i<qa('.slide').length+1;i++){
          css('.slide[data-index="' + i + '"]',{'left': (i-index)*100+'%'});
        }

        qs(cls).classList.add('current');
        css(cls,{'left':'0px'});
        css(qs(cls).children,{'opacity':'1'});
        
        if(settings.opacityTransition)
          for(i=0;i<qa('.slide:not(.current)').length;i++)
            css(qa('.slide:not(.current)')[i].children, {'opacity':'0'});
        if(settings.showPageNumber) qs('.slide-paging').innerHTML = qs('.slide.current').getAttribute('data-index') + ' / ' + qa('.slide').length;
        if(settings.showProgress) css('.slide-progress span',{'width':qs('.slide.current').getAttribute('data-index')/qa('.slide').length*100+'%'});
      }
    }
  }

  function slideChange(nextSlide,lval){
    var i = 0;
    var slides = qa('.slide');
    
    //check fragments
    var frag = [];


    if(nextSlide.getAttribute('data-index') > qs('.slide.current').getAttribute('data-index')){
      for(i=0;i<qa('.slide.current [data-fragindex][data-fragvisible="n"]').length;i++) frag[i] = qa('.slide.current [data-fragindex][data-fragvisible="n"]')[i];
      for(i=0;i<frag.length-1;i++){
        if(frag[i].getAttribute('data-fragindex') > frag[i+1].getAttribute('data-fragindex')){
          var dummy = frag[i];
          frag[i] = frag[i+1];
          frag[i+1] = dummy;
          i=-1;
        }
      }

      if(frag.length){
        var nextFrag = qa('.slide.current [data-fragindex="'+frag[0].getAttribute('data-fragindex')+'"][data-fragvisible="n"]');
        css(nextFrag,{'opacity':1});
        for(i=0;i<nextFrag.length;i++)nextFrag[i].setAttribute('data-fragvisible','y');
        return;
      }
    }else {
      for(i=0;i<qa('.slide.current [data-fragindex][data-fragvisible="y"]').length;i++) frag[i] = qa('.slide.current [data-fragindex][data-fragvisible="y"]')[i];
      for(i=0;i<frag.length-1;i++){
        if(frag[i].getAttribute('data-fragindex') > frag[i+1].getAttribute('data-fragindex')){
          var dummy = frag[i];
          frag[i] = frag[i+1];
          frag[i+1] = dummy;
          i=-1;
        }
      }

      if(frag.length){
        var prevFrag = qa('.slide.current [data-fragindex="'+frag[frag.length-1].getAttribute('data-fragindex')+'"][data-fragvisible="y"]');
        css(prevFrag,{'opacity':0});
        for(i=0;i<prevFrag.length;i++)prevFrag[i].setAttribute('data-fragvisible','n');
        return;
      }
    }

    if(qs('.slide.current'))

    if(settings.animate){
      if(settings.bgColorTransition){
        singleCss(qs('.slide.current'), { 'background' : nextSlide.getAttribute('data-background')});
        singleCss(nextSlide, { 'background' : nextSlide.getAttribute('data-background')});
      }

      if(settings.opacityTransition){
        css(qs('.slide.current').children, {'opacity':0});
        css(nextSlide.children,{'opacity': 1});
      }
    }
    for(i=0;i<slides.length;i++){
      singleCss(slides[i],{'left':parseInt(slides[i].style.left)+lval+'%'},1);
    }



    qs('.slide.current').classList.remove('current');
    nextSlide.classList.add('current');
    prepareColorTransition();
    if(settings.showPageNumber) qs('.slide-paging').innerHTML = qs('.slide.current').getAttribute('data-index') + ' / ' + qa('.slide').length;
    if(settings.showProgress){
      css('.slide-progress span',{'width':qs('.slide.current').getAttribute('data-index')/qa('.slide').length*100+'%'});
    }
  }

  window.addEventListener("resize",responsive);
  responsive();

  //init slide parent
  singleCss(qs('.slide').parentElement,{
    overflow: 'hidden',
    width:'100%',
    height:'100%',
  });

  //alignMiddle
  if(settings.alignMiddle){
    var i=0;
    for(;i<qa('.slide').length;i++){
      qa('.slide')[i].innerHTML = '<div class="vcenter">' + qa('.slide')[i].innerHTML + '</div>';
    }

    css('.slide .vcenter',{
      'position': 'relative',
      'top': '50%',
      'transform' : 'translateY(-50%)',
      '-webkit-transform' : 'translateY(-50%)',
      '-ms-transform' : 'translateY(-50%)',
      'textAlign': 'center'
    });

  }

  //init slide
  for(i=0;i<qa('.slide').length;i++){
    singleCss(qa('.slide')[i],{
        'position': 'absolute',
        'width':'100%',
        'height':'100%',
        'top':0,
        'left':i*100 + '%'
    });
    var bg = qa('.slide')[i].getAttribute('data-background');
    if(bg){
      if(bg.substring(0,1) != '#') bg = '#'+bg;
      singleCss(qa('.slide')[i],{
        'background' : bg
      });
    }else{
      if(settings.bgColorTransition){
        qa('.slide')[i].setAttribute('data-background',colorHex(document.defaultView.getComputedStyle(qa('.slide')[i],null).backgroundColor));
        singleCss(qa('.slide')[i],{'background': colorHex(document.defaultView.getComputedStyle(qa('.slide')[i],null).backgroundColor)});
      }
    }
    var j=0;
    var frag = qa('[data-fragindex]');
    for(j=0;j<frag.length;j++){
      singleCss(frag[j],{'opacity': 0}); 
      frag[j].setAttribute('data-fragvisible','n');
    }

    if(!i) qa('.slide')[i].classList.add('current');
    
    qa('.slide')[i].setAttribute('data-index',i+1);
    
    if(settings.opacityTransition){
      
      for(;j<qa('.slide:not(.current)').length;j++)
        css(qa('.slide:not(.current)')[j].children,{'opacity':0});
    }
  }


  //showPageNumber
  if(settings.showPageNumber){
    qs('.slide').parentElement.innerHTML +='<span class="slide-paging"></span>';
    qs('.slide-paging').innerHTML = qs('.slide.current').getAttribute('data-index') + ' / ' + qa('.slide').length;
    css('.slide-paging',{
      'position': 'absolute',
      'fontSize': '1.2rem'
    });
    parsePos(settings.pageNumberPos);
  }

  if(settings.showProgress){
    qs('.slide').parentElement.innerHTML += '<div class="slide-progress"><span></span></div>';
    css('.slide-progress span',{
      'width':qs('.slide.current').getAttribute('data-index')/qa('.slide').length*100+'%'
    });
  }

  //set transition css
  if(settings.animate){
    var t = 'all ' + settings.animationSpeed + 'ms';

    css('.slide',{'transition' : t});
    
    if(settings.showProgress){
      t = 'width ' + settings.animationSpeed + 'ms';
      css('.slide-progress span',{'transition': t});
    }

    if(settings.opacityTransition)
    {
      t = 'opacity ' + settings.animationSpeed + 'ms';
      for(i=0;i<qa('.slide').length;i++)
        css(qa('.slide')[i].children, {'transition':t});
    }
  }

  
  window.addEventListener('hashchange',hashChange);
  hashChange();

  if(settings.bgColorTransition) prepareColorTransition();

  //keydown
  window.addEventListener('keydown',function(event){
    if(event.which == 37){
      //press left
      if(getPrevNext('prev')){
        slideChange(getPrevNext('prev'),100);
      }
    }else if(event.which == 39){
      //press right
      if(getPrevNext('next')){
       slideChange(getPrevNext('next'),-100);
      }
    }
  });

  var fx = 0; 
  var lx = 0;
  var _n = 90;

  //bind touch
  document.addEventListener('touchstart', function(e) {
    e.preventDefault();
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
    var touch = e.touches[0] || e.changedTouches[0];
    fx = touch.pageX;
    }
  });
       
  document.addEventListener('touchend', function(e) {
    e.preventDefault();

    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        var touch = e.touches[0] || e.changedTouches[0];
        lx = touch.pageX;
    }
    if(fx + _n < lx){
      if(getPrevNext('prev')){
        slideChange(getPrevNext('prev'),100);
      }
    } else if(fx > lx + _n) {
      if(getPrevNext('next')){
        slideChange(getPrevNext('next'),-100);
      }
    }
  });
}; 
};
