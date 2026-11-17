import '../src/style.css';
import {mountOffice} from '../src/scene.js';
const header=document.querySelector('.header'),journey=document.querySelector('.journey'),canvas=document.querySelector('#office');
const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
nav?.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');});
const dialog=document.querySelector('#search-dialog');
document.querySelector('#search-open')?.addEventListener('click',()=>dialog.showModal());
document.querySelector('#search-close')?.addEventListener('click',()=>dialog.close());
const toggle=document.createElement('button');toggle.className='theme-toggle';toggle.type='button';toggle.textContent='Mode malam';toggle.setAttribute('aria-pressed','false');document.body.append(toggle);
toggle.addEventListener('click',()=>{const night=document.documentElement.dataset.theme!=='night';document.documentElement.dataset.theme=night?'night':'day';toggle.textContent=night?'Mode siang':'Mode malam';toggle.setAttribute('aria-pressed',String(night));dispatchEvent(new Event('komi-theme'));});
if(journey&&canvas){
 const loader=document.querySelector('#preloader');loader.hidden=false;
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  try{const dispose=mountOffice(canvas,journey);if(dispose){journey.classList.add('has-3d');addEventListener('pagehide',dispose,{once:true});}else{canvas.hidden=true;journey.classList.add('static-scene');}}
  catch(e){canvas.hidden=true;journey.classList.add('static-scene');console.warn('Adegan 3D tidak tersedia',e);}
  finally{loader.remove();}
 }));
 const update=()=>{const show=document.querySelector('#sambutan').getBoundingClientRect().top<innerHeight*.7;header.classList.toggle('revealed',show);header.inert=!show;};
 addEventListener('scroll',update,{passive:true});update();
}else{header.classList.add('revealed');}
