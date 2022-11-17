function save(a,b){localStorage.setItem(a,b)}function get(a){return localStorage.getItem(a)}function rem(a){localStorage.removeItem(a)}function off(){localStorage.clear()}function dynamicAdaptive(){function a(a){this.type=a}a.prototype.init=function(){const a=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(let a=0;a<this.nodes.length;a++){const b=this.nodes[a],c=b.dataset.da.trim(),d=c.split(","),e={};e.element=b,e.parent=b.parentNode,e.destination=document.querySelector(d[0].trim()),e.breakpoint=d[1]?d[1].trim():"767",e.place=d[2]?d[2].trim():"last",e.index=this.indexInParent(e.parent,e.element),this.оbjects.push(e)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(a){return"("+this.type+"-width: "+a.breakpoint+"px),"+a.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(a,b,c){return Array.prototype.indexOf.call(c,a)===b});for(let b=0;b<this.mediaQueries.length;b++){const c=this.mediaQueries[b],d=String.prototype.split.call(c,","),e=window.matchMedia(d[0]),f=d[1],g=Array.prototype.filter.call(this.оbjects,function(a){return a.breakpoint===f});e.addListener(function(){a.mediaHandler(e,g)}),this.mediaHandler(e,g)}},a.prototype.mediaHandler=function(a,b){if(a.matches)for(let a=0;a<b.length;a++){const c=b[a];c.index=this.indexInParent(c.parent,c.element),this.moveTo(c.place,c.element,c.destination)}else for(let a=0;a<b.length;a++){const c=b[a];c.element.classList.contains(this.daClassname)&&this.moveBack(c.parent,c.element,c.index)}},a.prototype.moveTo=function(a,b,c){return b.classList.add(this.daClassname),"last"===a||a>=c.children.length?void c.insertAdjacentElement("beforeend",b):"first"===a?void c.insertAdjacentElement("afterbegin",b):void c.children[a].insertAdjacentElement("beforebegin",b)},a.prototype.moveBack=function(a,b,c){b.classList.remove(this.daClassname),a.children[c]===void 0?a.insertAdjacentElement("beforeend",b):a.children[c].insertAdjacentElement("beforebegin",b)},a.prototype.indexInParent=function(a,b){const c=Array.prototype.slice.call(a.children);return Array.prototype.indexOf.call(c,b)},a.prototype.arraySort=function(a){return"min"===this.type?void Array.prototype.sort.call(a,function(c,a){return c.breakpoint===a.breakpoint?c.place===a.place?0:"first"===c.place||"last"===a.place?-1:"last"===c.place||"first"===a.place?1:c.place-a.place:c.breakpoint-a.breakpoint}):void Array.prototype.sort.call(a,function(c,a){return c.breakpoint===a.breakpoint?c.place===a.place?0:"first"===c.place||"last"===a.place?1:"last"===c.place||"first"===a.place?-1:a.place-c.place:a.breakpoint-c.breakpoint})};const b=new a("max");b.init()}dynamicAdaptive();function myPopups(){const a=document.querySelectorAll("[data-popup-open]"),b=document.querySelectorAll(".lock-padding"),c=document.body;let d=!0;const e=500;if(a){function f(a){if(a&&d){const b=document.querySelector(".popup._active");b?g(b,!1):h(),a.classList.add("_active"),a.addEventListener("click",function(a){a.target.closest(".popup__body")||g(a.target.closest(".popup"))})}}function g(a,b=!0){d&&(a.classList.remove("_active"),b&&i())}function h(){const a=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";b&&b.forEach(b=>{b.style.paddingRight=a}),c.style.paddingRight=a,c.classList.add("_lock-scroll"),d=!1,setTimeout(()=>{d=!0},e)}function i(){setTimeout(()=>{b&&b.forEach(a=>{a.style.paddingRight="0px"}),c.style.paddingRight="0px",c.classList.remove("_lock-scroll")},e),d=!1,setTimeout(()=>{d=!0},e)}a.forEach(a=>{a.addEventListener("click",function(a){const b=this.getAttribute("data-popup"),c=document.getElementById(b);f(c)})});const j=document.querySelectorAll("[data-popup-close]");j.forEach(a=>{a.addEventListener("click",function(b){g(a.closest(".popup"))})}),document.addEventListener("keydown",function(a){if("Escape"===a.code){const a=document.querySelector(".popup._active");g(a)}}),function(){Element.prototype.closest||(Element.prototype.closest=function(a){for(var b=this;b;){if(b.matches(a))return b;b=b.parentElement}return null})}(),function(){Element.prototype.matches||(Element.prototype.mathes=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector)}()}}myPopups();function myBurger(){if(document.getElementById("header-menu")){const a=document.getElementById("menu-open"),b=document.getElementById("menu-content"),c=document.getElementById("menu-wrapper"),d=document.querySelector("body");if(a&&b&&c){a.addEventListener("click",function(){b.classList.add("_active"),c.classList.add("_active"),d.classList.add("_lock-scroll")});const f=document.getElementById("menu-close");if(document.addEventListener("click",function(a){const e=a.target;(e===f||e===c)&&(b.classList.remove("_active"),c.classList.remove("_active"),d.classList.remove("_lock-scroll"))}),document.querySelector("[data-popup-open]")){function a(){const a=document.querySelectorAll("[data-popup-open]");a.forEach(a=>{a.addEventListener("click",function(){b.classList.remove("_active"),c.classList.remove("_active")})})}a()}}}}myBurger();function theme(){function a(){d?c.classList.add(d):c.classList.add(e)}function b(a=!1){let b,d=c.classList.contains("light")?"light":"dark";"light"==d?b="dark":"dark"===d&&(b="light"),c.classList.remove(d),c.classList.add(b),a?localStorage.setItem("user-theme",b):null}const c=document.documentElement,d=localStorage.getItem("user-theme");let e;window.matchMedia&&(e=window.matchMedia("prefers-color-scheme: dark").matches?"dark":"light"),window.matchMedia("prefers-color-scheme: dark").addEventListener("change",function(){d?null:b()});const f=document.getElementById("theme-website");f&&f.addEventListener("click",function(){b(!0)}),a()}theme();const checkGet=get("lang");null===checkGet||(document.querySelector("[data-select-button]").innerHTML=get("lang"));const selects=document.querySelectorAll("[data-select]");selects.forEach(a=>{a.addEventListener("click",function(b){const c=b.target;if(isMobile.any()&&c.closest("[data-select-button]")&&(a.querySelector("[data-select-button]").classList.toggle("_active"),a.querySelector("[data-select-dropdown]").classList.toggle("_active")),c.closest("[data-select-item]")){const b=c.closest("[data-select-item]").innerHTML;save("lang",b),a.querySelector("[data-select-button]").innerHTML=b,a.querySelector("[data-select-button]").classList.remove("_active"),a.querySelector("[data-select-dropdown]").classList.remove("_active")}}),a.addEventListener("mouseenter",function(b){const c=b.target;isMobile.any()||c!==a||a.querySelector("[data-select-dropdown]").classList.add("_active")}),a.addEventListener("mouseleave",function(b){const c=b.target;isMobile.any()||c!==a||a.querySelector("[data-select-dropdown]").classList.remove("_active")}),document.addEventListener("click",function(a){const b=a.target;if(552.2<window.innerWidth&&!b.closest("[data-select-button]")&&!b.closest("[data-select-dropdown]")){const a=document.querySelectorAll("[data-select]");a.forEach(a=>{a.querySelector("[data-select-dropdown]").classList.remove("_active")})}})});function removeExtra(){const a=+document.querySelector("[data-content]._active").getAttribute("data-content"),b=document.querySelectorAll("[data-content]").length;1==a?document.querySelector("[data-left]").classList.add("_disabled"):document.querySelector("[data-left]").classList.remove("_disabled"),a===b?document.querySelector("[data-right]").classList.add("_disabled"):document.querySelector("[data-right]").classList.remove("_disabled")}function sorting(){const a=+document.querySelector("[data-sorting]").getAttribute("data-sorting");let b=1;const c=document.querySelectorAll("[data-block]"),d=document.querySelector("[data-content-zone]");for(const e of c){const c=document.querySelector("[data-free-content]").querySelectorAll("[data-block]").length;if(c===a){b++,document.querySelector("[data-free-content]").removeAttribute("data-free-content");const a=`
		 <div class="statistics-column__content-item" data-content="${b}" data-free-content>
		 </div>
		 `;d.insertAdjacentHTML("beforeend",a)}const f=document.querySelector("[data-free-content]");f.appendChild(e)}}sorting();function pagination(){const a=document.querySelectorAll("[data-main]");a.forEach(a=>{let b=+a.querySelector("[data-pagination]").getAttribute("data-pagination");const c=a.querySelectorAll("[data-content]"),d=a.querySelectorAll("[data-content]").length;c.forEach(()=>{const b=a.querySelectorAll("[data-btn]").length,c=b+1,d=a.querySelector("[data-billet]"),e=d.cloneNode();e.removeAttribute("data-billet"),e.setAttribute("data-btn",`${c}`),e.innerHTML=c;const f=a.querySelector("[data-btns]");f.appendChild(e)});const e=a.querySelector("[data-btn]");e.classList.add("_active"),e.setAttribute("data-arrows",""),a.addEventListener("click",c=>{if(c.target.closest("[data-btn]")){const d=c.target.getAttribute("data-btn"),e=`[data-content="${d}"]`;a.querySelector(e).classList.add("_active"),c.target.classList.add("_active"),c.target.setAttribute("data-arrows","");const f=a.querySelectorAll("[data-content]");f.forEach(a=>{a.getAttribute("data-content")===d||a.classList.remove("_active")});const g=a.querySelectorAll("[data-btn]");g.forEach(a=>{a.getAttribute("data-btn")===d||(a.classList.remove("_active"),a.removeAttribute("data-arrows"))});const h=a.querySelectorAll("[data-content]").length,i=+d-1,j=+d+(b-2),k=b-2,l=h-k;if(+c.target.getAttribute("data-btn")>l){const c=a.querySelectorAll("[data-btn]");c.forEach(c=>{const d=+a.querySelectorAll("[data-content]").length-b;+c.getAttribute("data-btn")>d?c.classList.add("_visible"):c.classList.remove("_visible")})}else if(1===+c.target.getAttribute("data-btn"));else{const b=a.querySelectorAll("[data-btn]");b.forEach(a=>{+a.getAttribute("data-btn")>=i&&a.getAttribute("data-btn")<=j?a.classList.add("_visible"):a.classList.remove("_visible")})}removeExtra()}if(c.target.closest("[data-right]")){const c=a.querySelector("[data-arrows]");if(+c.getAttribute("data-btn")===d);else{const c=a.querySelector("[data-arrows]");c.classList.remove("_active"),c.removeAttribute("data-arrows"),c.nextElementSibling.classList.add("_active"),c.nextElementSibling.setAttribute("data-arrows","");const d=c.nextElementSibling,e=d.getAttribute("data-btn"),f=`[data-content="${e}"]`;a.querySelector(f).classList.add("_active");const g=a.querySelectorAll("[data-content]");g.forEach(a=>{a.getAttribute("data-content")===e||a.classList.remove("_active")});const h=a.querySelectorAll("[data-content]").length,i=+e-1,j=+e+(b-2),k=b-2,l=h-k;if(+d.getAttribute("data-btn")>l){const c=a.querySelectorAll("[data-btn]");c.forEach(c=>{const d=+a.querySelectorAll("[data-content]").length-b;+c.getAttribute("data-btn")>d?c.classList.add("_visible"):c.classList.remove("_visible")})}else{const b=a.querySelectorAll("[data-btn]");b.forEach(a=>{+a.getAttribute("data-btn")>=i&&a.getAttribute("data-btn")<=j?a.classList.add("_visible"):a.classList.remove("_visible")})}}removeExtra()}if(c.target.closest("[data-left]")){const c=a.querySelector("[data-arrows]");if(1!==+c.getAttribute("data-btn")&&2!==+c.getAttribute("data-btn")){const c=a.querySelector("[data-arrows]");c.classList.remove("_active"),c.removeAttribute("data-arrows"),c.previousElementSibling.classList.add("_active"),c.previousElementSibling.setAttribute("data-arrows","");const d=c.previousElementSibling,e=d.getAttribute("data-btn"),f=`[data-content="${e}"]`;a.querySelector(f).classList.add("_active");const g=a.querySelectorAll("[data-content]");g.forEach(a=>{a.getAttribute("data-content")===e||a.classList.remove("_active")});const h=a.querySelectorAll("[data-content]").length,i=+e-1,j=+e+(b-2),k=b-2,l=h-k;if(+d.getAttribute("data-btn")>l);else{const b=a.querySelectorAll("[data-btn]");b.forEach(a=>{+a.getAttribute("data-btn")>=i&&a.getAttribute("data-btn")<=j?a.classList.add("_visible"):a.classList.remove("_visible")})}}else if(2===+c.getAttribute("data-btn")){const b=a.querySelector("[data-arrows]");b.classList.remove("_active"),b.removeAttribute("data-arrows"),b.previousElementSibling.classList.add("_active"),b.previousElementSibling.setAttribute("data-arrows","");const c=a.querySelectorAll("[data-content]");c.forEach(a=>{"1"===a.getAttribute("data-content")?a.classList.add("_active"):a.classList.remove("_active")})}removeExtra()}});const f=a.querySelectorAll("[data-btn]");f.forEach(a=>{+a.getAttribute("data-btn")<=b&&a.classList.add("_visible")})})}pagination(),removeExtra();let isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};isMobile.any()?document.body.classList.add("_touch"):document.body.classList.add("_pc");const promptButtons=document.querySelectorAll("[data-prompt-button]");promptButtons.forEach(a=>{document.addEventListener("click",function(b){const c=b.target;isMobile.any()&&(a.nextElementSibling.classList.contains("_active")?(a.classList.remove("_active"),a.nextElementSibling.classList.remove("_active"),(c!=a||c!=a.nextElementSibling)&&(a.classList.remove("_active"),a.nextElementSibling.classList.remove("_active"))):c==a&&(c.classList.add("_active"),a.nextElementSibling.classList.add("_active")))})});function timer(){var a=Math.floor;function b(){let b=a(c/60/60),g=a(c/60)-60*b,h=a(c%60);b=10>b?"0"+b:b,g=10>g?"0"+g:g,h=10>h?"0"+h:h,d.innerHTML=`${b}`,e.innerHTML=`${g}`,f.innerHTML=`${h}`,c--}let c=14399;setInterval(()=>{1>c&&(c=14399)},14399),setInterval(b,1e3);const d=document.getElementById("hours"),e=document.getElementById("minutes"),f=document.getElementById("seconds")}timer(),setTimeout(windowLoad,300);function windowLoad(){function a(a){let c=a?a:document.querySelectorAll("[data-digits-counter]");c&&c.forEach(a=>{b(a)})}function b(a){let b=null,c=parseInt(a.dataset.digitsCounter)?parseInt(a.dataset.digitsCounter):1e3;const d=parseInt(a.innerHTML),e=0,f=g=>{b||(b=g);let h=Math.min((g-b)/c,1);const i=Math.floor(h*(e+d));let j;.3>h&&(j=c+14.5,c=j),.95<h&&(j=c+12.5,c=j),console.log(h),a.innerHTML=i,1>h&&window.requestAnimationFrame(f)};window.requestAnimationFrame(f)}const c=document.querySelectorAll(".info-row-balance__load");c.forEach(a=>{a.style.display="none"});const d=document.querySelectorAll(".info-row-balance__price-item");d.forEach(a=>{a.style.display="inline"}),a()}