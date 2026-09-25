/* Jewel Crush Kingdom – shared shell for More Games */
(function(){
const ICON={
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4 7 12l8 8"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.6 7.6 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.6 7.6 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.6 7.6 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" transform="translate(-1 0)"/></svg>',
  skip:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 5 7 7-7 7M12 5l7 7-7 7"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  sound:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9h4l5-4v14l-5-4H3z"/><path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  vib:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8v8M21 8v8"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/></svg>',
  undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>',
  bulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  shuffle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 21V4h2v1h11l-2.5 4.5L18 14H7v7z"/></svg>'
};
const HAND='<svg viewBox="0 0 64 64"><path d="M22 6c3 0 5 2 5 5v17l2-1c2-1 5 0 6 2l1 1 2-1c2-1 5 0 6 2l1 1 1-.4c3-1 6 1 6 4v10c0 9-7 16-16 16h-4c-6 0-10-3-13-8l-8-12c-2-3 1-6 4-5l5 3V11c0-3 2-5 5-5z" fill="#fff" stroke="#1d1f3a" stroke-width="3" stroke-linejoin="round"/><path d="M27 28v8M36 30v7M45 33v6" stroke="#c9cbe0" stroke-width="2.4" stroke-linecap="round"/></svg>';

function readAll(){try{return JSON.parse(localStorage.getItem('jck-v1')||'{}')}catch(e){return {}}}
function settings(){const s=readAll().settings||{};return {sound:s.sound!==false,vib:s.vib!==false,lang:s.lang||'en'}}
function writeSetting(k,v){try{const a=readAll();a.settings=a.settings||{};a.settings[k]=v;localStorage.setItem('jck-v1',JSON.stringify(a))}catch(e){}}

let actx=null;
function tone(f,d,type,v,delay){
  if(!settings().sound)return;
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();
  const t=actx.currentTime+(delay||0),o=actx.createOscillator(),g=actx.createGain();
  o.type=type||'triangle';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v||.09,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
  o.connect(g).connect(actx.destination);o.start(t);o.stop(t+d+.02);}catch(e){}
}
const SFX={
  tap:()=>tone(620,.05,'sine',.07),
  place:()=>tone(360,.07,'sine',.08),
  good:()=>[523,659,784].forEach((f,i)=>tone(f,.14,'triangle',.08,i*.05)),
  bad:()=>tone(160,.18,'square',.05),
  win:()=>[523,659,784,1046,1318].forEach((f,i)=>tone(f,.22,'triangle',.09,i*.08)),
  lose:()=>[392,330,262].forEach((f,i)=>tone(f,.25,'triangle',.08,i*.14)),
};
function vibrate(style){
  if(!settings().vib)return;
  try{const H=window.parent&&window.parent.Capacitor&&window.parent.Capacitor.Plugins&&window.parent.Capacitor.Plugins.Haptics;
    if(H){H.impact({style:style||'LIGHT'});return}
    navigator.vibrate&&navigator.vibrate(style==='HEAVY'?40:style==='MEDIUM'?22:10)}catch(e){}
}

const JG={ICON,SFX,tone,vibrate,settings,
  save(k,v){try{localStorage.setItem('jckg-'+JG.id+'-'+k,JSON.stringify(v))}catch(e){}},
  load(k,d){try{const v=localStorage.getItem('jckg-'+JG.id+'-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  close(){try{if(window.parent&&window.parent!==window){window.parent.postMessage({type:'jck-close'},'*');return}}catch(e){}history.back()},
  init(o){
    JG.id=o.id;JG.opts=o;
    document.title=o.name;
    const top=document.createElement('div');top.className='jg-top';
    top.innerHTML=`<button class="jg-ib" id="jgBack" aria-label="Back">${ICON.back}</button><div class="jg-mid" id="jgMid"></div><button class="jg-ib" id="jgGear" aria-label="Settings">${ICON.gear}</button>`;
    document.body.prepend(top);
    const foot=document.createElement('div');foot.className='jg-foot disp';
    foot.innerHTML=`<span class="orn">✦·✦</span><span>${o.name}</span><span class="orn">✦·✦</span>`;
    document.body.appendChild(foot);
    document.getElementById('jgBack').onclick=()=>{SFX.tap();JG.close()};
    document.getElementById('jgGear').onclick=()=>{SFX.tap();JG.settingsPanel()};
    JG.mid=document.getElementById('jgMid');
    document.addEventListener('contextmenu',e=>e.preventDefault());
  },
  stats(list){JG.mid.innerHTML=list.map(s=>`<div class="jg-stat"><small>${s[0]}</small><b id="${s[2]||''}">${s[1]}</b></div>`).join('')},
  modal(html,cls){
    const m=document.createElement('div');m.className='jg-modal';
    m.innerHTML=`<div class="jg-card ${cls||''}">${html}</div>`;document.body.appendChild(m);return m;
  },
  settingsPanel(){
    const s=settings();
    const m=JG.modal(`<button class="jg-ib x" aria-label="Close">${ICON.x}</button><h2>Settings</h2><div class="jg-rows">
      <div class="jg-row">${ICON.sound}<span>Sound</span><button class="jg-tg ${s.sound?'on':''}" data-k="sound" aria-label="Sound"></button></div>
      <div class="jg-row">${ICON.vib}<span>Vibration</span><button class="jg-tg ${s.vib?'on':''}" data-k="vib" aria-label="Vibration"></button></div>
      <div class="jg-row">${ICON.home}<span>Home</span><button class="jg-btn pri" data-a="home">Back</button></div>
      <div class="jg-row">${ICON.replay}<span>Replay</span><button class="jg-btn pri" data-a="replay">Play</button></div></div>`);
    m.querySelector('.x').onclick=()=>m.remove();
    m.onclick=e=>{if(e.target===m)m.remove()};
    m.querySelectorAll('.jg-tg').forEach(b=>b.onclick=()=>{const on=!b.classList.contains('on');b.classList.toggle('on',on);writeSetting(b.dataset.k,on);SFX.tap()});
    m.querySelector('[data-a=home]').onclick=()=>JG.close();
    m.querySelector('[data-a=replay]').onclick=()=>{m.remove();JG.opts.onReplay&&JG.opts.onReplay()};
  },
  toast(txt,color){const t=document.createElement('div');t.className='jg-toast';t.textContent=txt;if(color)t.style.color=color;document.body.appendChild(t);setTimeout(()=>t.remove(),1100)},
  result(o){
    const m=JG.modal(`<h2>${o.title}</h2>${(o.lines||[]).map(l=>`<p>${l}</p>`).join('')}<div class="jg-bar" style="padding-top:14px">${(o.buttons||[]).map((b,i)=>`<button class="jg-btn ${b.cls||'pri'}" data-i="${i}">${b.label}</button>`).join('')}</div>`);
    m.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{m.remove();o.buttons[+b.dataset.i].fn()});
    (o.win?SFX.win:SFX.lose)();vibrate(o.win?'MEDIUM':'LIGHT');
    return m;
  },
  /* first-time tutorial: text + hand pointing at an element; Skip button */
  tutorial(text,getTarget,placeTip){
    if(JG.load('tut',false))return;
    const tip=document.createElement('div');tip.className='jg-tip';tip.textContent=text;
    const hand=document.createElement('div');hand.className='jg-hand';hand.innerHTML=HAND;
    const skip=document.createElement('button');skip.className='jg-skip';skip.innerHTML='Skip '+ICON.skip;
    document.body.append(tip,hand,skip);
    function place(){
      const el=getTarget&&getTarget();if(!el){hand.hidden=true;return}
      const r=el.getBoundingClientRect();hand.hidden=false;
      hand.style.left=(r.left+r.width/2)+'px';hand.style.top=(r.top+r.height/2)+'px';
      const main=document.querySelector('.jg-main').getBoundingClientRect();
      tip.style.top=(placeTip==='top'?Math.max(8,r.top-main.top-90):Math.min(main.height-80,r.bottom-main.top+30))+'px';
      tip.style.position='absolute';document.querySelector('.jg-main').appendChild(tip);
    }
    setTimeout(place,60);addEventListener('resize',place);
    JG.tutDone=()=>{JG.save('tut',true);tip.remove();hand.remove();skip.remove();removeEventListener('resize',place);JG.tutDone=()=>{}};
    JG.tutPlace=place;
    skip.onclick=()=>{SFX.tap();JG.tutDone()};
  },
  tutDone(){},tutPlace(){},
  rng(seed){let a=seed>>>0||1;return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},
  shuffle(arr,r){r=r||Math.random;for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
};
window.JG=JG;
})();
