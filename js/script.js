function save(a,b){localStorage.setItem(a,b)}function get(a){return localStorage.getItem(a)}function rem(a){localStorage.removeItem(a)}function off(){localStorage.clear()}function dynamicAdaptive(){function a(a){this.type=a}a.prototype.init=function(){const a=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(let a=0;a<this.nodes.length;a++){const b=this.nodes[a],c=b.dataset.da.trim(),d=c.split(","),e={};e.element=b,e.parent=b.parentNode,e.destination=document.querySelector(d[0].trim()),e.breakpoint=d[1]?d[1].trim():"767",e.place=d[2]?d[2].trim():"last",e.index=this.indexInParent(e.parent,e.element),this.оbjects.push(e)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(a){return"("+this.type+"-width: "+a.breakpoint+"px),"+a.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(a,b,c){return Array.prototype.indexOf.call(c,a)===b});for(let b=0;b<this.mediaQueries.length;b++){const c=this.mediaQueries[b],d=String.prototype.split.call(c,","),e=window.matchMedia(d[0]),f=d[1],g=Array.prototype.filter.call(this.оbjects,function(a){return a.breakpoint===f});e.addListener(function(){a.mediaHandler(e,g)}),this.mediaHandler(e,g)}},a.prototype.mediaHandler=function(a,b){if(a.matches)for(let a=0;a<b.length;a++){const c=b[a];c.index=this.indexInParent(c.parent,c.element),this.moveTo(c.place,c.element,c.destination)}else for(let a=0;a<b.length;a++){const c=b[a];c.element.classList.contains(this.daClassname)&&this.moveBack(c.parent,c.element,c.index)}},a.prototype.moveTo=function(a,b,c){return b.classList.add(this.daClassname),"last"===a||a>=c.children.length?void c.insertAdjacentElement("beforeend",b):"first"===a?void c.insertAdjacentElement("afterbegin",b):void c.children[a].insertAdjacentElement("beforebegin",b)},a.prototype.moveBack=function(a,b,c){b.classList.remove(this.daClassname),a.children[c]===void 0?a.insertAdjacentElement("beforeend",b):a.children[c].insertAdjacentElement("beforebegin",b)},a.prototype.indexInParent=function(a,b){const c=Array.prototype.slice.call(a.children);return Array.prototype.indexOf.call(c,b)},a.prototype.arraySort=function(a){return"min"===this.type?void Array.prototype.sort.call(a,function(c,a){return c.breakpoint===a.breakpoint?c.place===a.place?0:"first"===c.place||"last"===a.place?-1:"last"===c.place||"first"===a.place?1:c.place-a.place:c.breakpoint-a.breakpoint}):void Array.prototype.sort.call(a,function(c,a){return c.breakpoint===a.breakpoint?c.place===a.place?0:"first"===c.place||"last"===a.place?1:"last"===c.place||"first"===a.place?-1:a.place-c.place:a.breakpoint-c.breakpoint})};const b=new a("max");b.init()}dynamicAdaptive();function mySpollers(){const a=document.querySelectorAll("[data-spollers]");if(0<a.length){function c(a,b=!1){a.forEach(a=>{a=b?a.item:a,b.matches||!b?(a.classList.add("_init"),e(a),a.addEventListener("click",f)):(a.classList.remove("_init"),e(a,!1),a.removeEventListener("click",f))})}function e(a,b=!0){const c=a.querySelectorAll("[data-spoller]");0<c.length&&c.forEach(a=>{b?(a.removeAttribute("tabindex"),!a.classList.contains("_active")&&(a.nextElementSibling.hidden=!0)):(a.setAttribute("tabindex","-1"),a.nextElementSibling.hidden=!1)})}function f(a){const b=a.target;if(b.hasAttribute("data-spoller")||b.closest("[data-spoller]")){const c=b.hasAttribute("data-spoller")?b:b.closest("[data-spoller]"),e=c.closest("[data-spollers]"),f=!!e.hasAttribute("data-one-spoller");e.querySelectorAll("._slide").length||(f&&!c.classList.contains("_active")&&g(e),c.classList.toggle("_active"),d(c.nextElementSibling,500)),a.preventDefault()}}function g(a){const c=a.querySelector("[data-spoller]._active");c&&(c.classList.remove("_active"),b(c.nextElementSibling,500))}const h=Array.from(a).filter(function(a){return!a.dataset.spollers.split(",")[0]});0<h.length&&c(h);const i=Array.from(a).filter(function(a){return a.dataset.spollers.split(",")[0]});if(0<i.length){const a=[];i.forEach(b=>{const c=b.dataset.spollers,d={},e=c.split(",");d.value=e[0],d.type=e[1]?e[1].trim():"max",d.item=b,a.push(d)});let b=a.map(function(a){return"("+a.type+"-width: "+a.value+"px),"+a.value+","+a.type});b=b.filter(function(a,b,c){return c.indexOf(a)===b}),b.forEach(b=>{const d=b.split(","),e=d[1],f=d[2],g=window.matchMedia(d[0]),h=a.filter(function(a){if(a.value===e&&a.type===f)return!0});g.addListener(function(){c(h,g)}),c(h,g)})}}let b=(a,b=500)=>{a.classList.contains("_slide")||(a.classList.add("_slide"),a.style.transitionProperty="height, margin, padding",a.style.transitionDuration=b+"ms",a.style.height=a.offsetHeight+"px",a.offsetHeight,a.style.overflow="hidden",a.style.height=0,a.style.paddingTop=0,a.style.paddingBottom=0,a.style.marginTop=0,a.style.marginBottom=0,window.setTimeout(()=>{a.hidden=!0,a.style.removeProperty("height"),a.style.removeProperty("padding-top"),a.style.removeProperty("padding-bottom"),a.style.removeProperty("margin-top"),a.style.removeProperty("margin-bottom"),a.style.removeProperty("overflow"),a.style.removeProperty("transition-duration"),a.style.removeProperty("transition-property"),a.classList.remove("_slide")},b))},c=(a,b=500)=>{if(!a.classList.contains("_slide")){a.classList.add("_slide"),a.hidden&&(a.hidden=!1);let c=a.offsetHeight;a.style.overflow="hidden",a.style.height=0,a.style.paddingTop=0,a.style.paddingBottom=0,a.style.marginTop=0,a.style.marginBottom=0,a.offsetHeight,a.style.transitionProperty="height, margin, padding",a.style.transitionDuration=b+"ms",a.style.height=c+"px",a.style.removeProperty("padding-top"),a.style.removeProperty("padding-bottom"),a.style.removeProperty("margin-top"),a.style.removeProperty("margin-bottom"),window.setTimeout(()=>{a.style.removeProperty("height"),a.style.removeProperty("overflow"),a.style.removeProperty("transition-duration"),a.style.removeProperty("transition-property"),a.classList.remove("_slide")},b)}},d=(a,d=500)=>a.hidden?c(a,d):b(a,d)}mySpollers();function myPopups(){const a=document.querySelectorAll("[data-popup-open]"),b=document.querySelectorAll(".lock-padding"),c=document.body;let d=!0;const e=500;if(a){function f(a){if(a&&d){const b=document.querySelector(".popup._active");b?g(b,!1):h(),a.classList.add("_active"),a.addEventListener("click",function(a){a.target.closest(".popup__body")||g(a.target.closest(".popup"))})}}function g(a,b=!0){d&&(a.classList.remove("_active"),b&&i())}function h(){const a=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";b&&b.forEach(b=>{b.style.paddingRight=a}),c.style.paddingRight=a,c.classList.add("_lock-scroll"),d=!1,setTimeout(()=>{d=!0},e)}function i(){setTimeout(()=>{b&&b.forEach(a=>{a.style.paddingRight="0px"}),c.style.paddingRight="0px",c.classList.remove("_lock-scroll")},e),d=!1,setTimeout(()=>{d=!0},e)}a.forEach(a=>{a.addEventListener("click",function(a){const b=this.getAttribute("data-popup"),c=document.getElementById(b);f(c)})});const j=document.querySelectorAll("[data-popup-close]");j.forEach(a=>{a.addEventListener("click",function(b){g(a.closest(".popup"))})}),document.addEventListener("keydown",function(a){if("Escape"===a.code){const a=document.querySelector(".popup._active");g(a)}}),function(){Element.prototype.closest||(Element.prototype.closest=function(a){for(var b=this;b;){if(b.matches(a))return b;b=b.parentElement}return null})}(),function(){Element.prototype.matches||(Element.prototype.mathes=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector)}()}}myPopups();function myBurger(){if(document.getElementById("header-menu")){const a=document.getElementById("menu-open"),b=document.getElementById("menu-content"),c=document.getElementById("menu-wrapper"),d=document.querySelector("body");if(a&&b&&c){a.addEventListener("click",function(){b.classList.add("_active"),c.classList.add("_active"),d.classList.add("_lock-scroll")});const f=document.getElementById("menu-close");if(document.addEventListener("click",function(a){const e=a.target;(e===f||e===c)&&(b.classList.remove("_active"),c.classList.remove("_active"),d.classList.remove("_lock-scroll"))}),document.querySelector("[data-popup-open]")){function a(){const a=document.querySelectorAll("[data-popup-open]");a.forEach(a=>{a.addEventListener("click",function(){b.classList.remove("_active"),c.classList.remove("_active")})})}a()}}}}myBurger();function theme(){function a(){d?c.classList.add(d):c.classList.add(e)}function b(a=!1){let b,d=c.classList.contains("light")?"light":"dark";"light"==d?b="dark":"dark"===d&&(b="light"),c.classList.remove(d),c.classList.add(b),a?localStorage.setItem("user-theme",b):null}const c=document.documentElement,d=localStorage.getItem("user-theme");let e;window.matchMedia&&(e=window.matchMedia("prefers-color-scheme: dark").matches?"dark":"light"),window.matchMedia("prefers-color-scheme: dark").addEventListener("change",function(){d?null:b()});const f=document.getElementById("theme-website");f&&f.addEventListener("click",function(){b(!0)}),a()}theme();const checkGet=get("lang");null===checkGet||(document.querySelector("[data-select-button]").innerHTML=get("lang"));const selects=document.querySelectorAll("[data-select]");selects.forEach(a=>{a.addEventListener("click",function(b){const c=b.target;if(isMobile.any()&&552.2>window.innerWidth&&c.closest("[data-select-button]")&&(a.querySelector("[data-select-button]").classList.toggle("_active"),a.querySelector("[data-select-dropdown]").classList.toggle("_active")),c.closest("[data-select-item]")){const b=c.closest("[data-select-item]").innerHTML;save("lang",b),a.querySelector("[data-select-button]").innerHTML=b,a.querySelector("[data-select-button]").classList.remove("_active"),a.querySelector("[data-select-dropdown]").classList.remove("_active")}}),a.addEventListener("mouseenter",function(b){const c=b.target;isMobile.any()||c!==a||a.querySelector("[data-select-dropdown]").classList.add("_active")}),a.addEventListener("mouseleave",function(b){const c=b.target;isMobile.any()||c!==a||a.querySelector("[data-select-dropdown]").classList.remove("_active")}),document.addEventListener("click",function(a){const b=a.target;if(isMobile.any()&&!b.closest("[data-select-button]")&&!b.closest("[data-select-dropdown]")){const a=document.querySelectorAll("[data-select]");a.forEach(a=>{a.querySelector("[data-select-dropdown]").classList.remove("_active")})}})});let isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};isMobile.any()?document.body.classList.add("_touch"):document.body.classList.add("_pc");