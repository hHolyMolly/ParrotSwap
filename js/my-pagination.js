function removeExtra(){const a=+document.querySelector("[data-content]._active").getAttribute("data-content"),b=document.querySelectorAll("[data-content]").length;1==a?document.querySelector("[data-left]").classList.add("_disabled"):document.querySelector("[data-left]").classList.remove("_disabled"),a===b?document.querySelector("[data-right]").classList.add("_disabled"):document.querySelector("[data-right]").classList.remove("_disabled")}function sorting(){const a=+document.querySelector("[data-sorting]").getAttribute("data-sorting");let b=1;const c=document.querySelectorAll("[data-block]"),d=document.querySelector("[data-content-zone]");for(const e of c){const c=document.querySelector("[data-free-content]").querySelectorAll("[data-block]").length;if(c===a){b++,document.querySelector("[data-free-content]").removeAttribute("data-free-content");const a=`
		 <div class="statistics-column__content-item" data-content="${b}" data-free-content>
		 </div>
		 `;d.insertAdjacentHTML("beforeend",a)}const f=document.querySelector("[data-free-content]");f.appendChild(e)}}sorting();function pagination(){const a=document.querySelectorAll("[data-main]");a.forEach(a=>{let b=+a.querySelector("[data-pagination]").getAttribute("data-pagination");const c=a.querySelectorAll("[data-content]"),d=a.querySelectorAll("[data-content]").length;c.forEach(()=>{const b=a.querySelectorAll("[data-btn]").length,c=b+1,d=a.querySelector("[data-billet]"),e=d.cloneNode();e.removeAttribute("data-billet"),e.setAttribute("data-btn",`${c}`),e.innerHTML=c;const f=a.querySelector("[data-btns]");f.appendChild(e)});const e=a.querySelector("[data-btn]");e.classList.add("_active"),e.setAttribute("data-arrows",""),a.addEventListener("click",c=>{if(c.target.closest("[data-btn]")){const d=c.target.getAttribute("data-btn");a.querySelector(`[data-content="${d}"]`).classList.add("_active"),c.target.classList.add("_active"),c.target.setAttribute("data-arrows","");const e=a.querySelectorAll("[data-content]");e.forEach(a=>{a.getAttribute("data-content")===d||a.classList.remove("_active")});const f=a.querySelectorAll("[data-btn]");f.forEach(a=>{a.getAttribute("data-btn")===d||(a.classList.remove("_active"),a.removeAttribute("data-arrows"))});const g=a.querySelectorAll("[data-content]").length;if(+c.target.getAttribute("data-btn")>g-(b-2)){const c=a.querySelectorAll("[data-btn]");c.forEach(c=>{const d=+a.querySelectorAll("[data-content]").length-b;+c.getAttribute("data-btn")>d?c.classList.add("_visible"):c.classList.remove("_visible")})}else if(1===+c.target.getAttribute("data-btn"));else{const c=a.querySelectorAll("[data-btn]");c.forEach(a=>{+a.getAttribute("data-btn")>=+d-1&&a.getAttribute("data-btn")<=+d+(b-2)?a.classList.add("_visible"):a.classList.remove("_visible")})}removeExtra()}if(c.target.closest("[data-right]")){const c=a.querySelector("[data-arrows]");if(+c.getAttribute("data-btn")===d);else{const c=a.querySelector("[data-arrows]");c.classList.remove("_active"),c.removeAttribute("data-arrows"),c.nextElementSibling.classList.add("_active"),c.nextElementSibling.setAttribute("data-arrows","");const d=c.nextElementSibling,e=d.getAttribute("data-btn");a.querySelector(`[data-content="${e}"]`).classList.add("_active");const f=a.querySelectorAll("[data-content]");f.forEach(a=>{a.getAttribute("data-content")===e||a.classList.remove("_active")});const g=a.querySelectorAll("[data-content]").length;if(+d.getAttribute("data-btn")>g-(b-2)){const c=a.querySelectorAll("[data-btn]");c.forEach(c=>{const d=+a.querySelectorAll("[data-content]").length-b;+c.getAttribute("data-btn")>d?c.classList.add("_visible"):c.classList.remove("_visible")})}else{const c=a.querySelectorAll("[data-btn]");c.forEach(a=>{+a.getAttribute("data-btn")>=+e-1&&a.getAttribute("data-btn")<=+e+(b-2)?a.classList.add("_visible"):a.classList.remove("_visible")})}}removeExtra()}if(c.target.closest("[data-left]")){const c=a.querySelector("[data-arrows]");if(1!==+c.getAttribute("data-btn")&&2!==+c.getAttribute("data-btn")){const c=a.querySelector("[data-arrows]");c.classList.remove("_active"),c.removeAttribute("data-arrows"),c.previousElementSibling.classList.add("_active"),c.previousElementSibling.setAttribute("data-arrows","");const d=c.previousElementSibling,e=d.getAttribute("data-btn");a.querySelector(`[data-content="${e}"]`).classList.add("_active");const f=a.querySelectorAll("[data-content]");f.forEach(a=>{a.getAttribute("data-content")===e||a.classList.remove("_active")});const g=a.querySelectorAll("[data-content]").length;if(+d.getAttribute("data-btn")>g-(b-2));else{const c=a.querySelectorAll("[data-btn]");c.forEach(a=>{+a.getAttribute("data-btn")>=+e-1&&a.getAttribute("data-btn")<=+e+(b-2)?a.classList.add("_visible"):a.classList.remove("_visible")})}}else if(2===+c.getAttribute("data-btn")){const b=a.querySelector("[data-arrows]");b.classList.remove("_active"),b.removeAttribute("data-arrows"),b.previousElementSibling.classList.add("_active"),b.previousElementSibling.setAttribute("data-arrows","");const c=a.querySelectorAll("[data-content]");c.forEach(a=>{"1"===a.getAttribute("data-content")?a.classList.add("_active"):a.classList.remove("_active")})}removeExtra()}});const f=a.querySelectorAll("[data-btn]");f.forEach(a=>{+a.getAttribute("data-btn")<=b&&a.classList.add("_visible")})})}window.addEventListener("load",pagination),removeExtra();