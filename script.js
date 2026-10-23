document.documentElement.classList.add('js');
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el,i){if(!el.style.getPropertyValue('--d')&&el.tagName==='LI'){el.style.setProperty('--d',((i%4)*.08)+'s')}io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  var bar=document.getElementById('bar'),band=document.getElementById('band'),name=document.getElementById('name'),t=false;
  function tick(){
    t=false;var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';
    if(!rm){band.style.transform='translateX('+(-y*.35)+'px)';if(y<800)name.style.transform='translateY('+(y*.12)+'px)'}
  }
  window.addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(tick)}},{passive:true});tick();
  var b=document.getElementById('dc');
  b.addEventListener('click',function(){
    var done=function(){b.textContent='Copied: dazai.aim';setTimeout(function(){b.textContent='Copy Discord username'},2200)};
    try{navigator.clipboard.writeText('dazai.aim').then(done,done)}catch(e){done()}
  });
})();
