const id=e=>document.getElementById(e),$=e=>document.querySelector(e);_$=e=>document.querySelectorAll(e),HTMLElement.prototype.$=function(e){return this.querySelector(e)},HTMLElement.prototype._$=function(e){return this.querySelectorAll(e)};class Menu{constructor(e,t,s,i,o){this.toggleActiveAttr=e,this.activeClass=t,this.openClass=s,this.moreContainerClass=i,this.optionClass=o}#searchUp(e,t,s){if(!e||!t||"string"!=typeof t||!e.parentElement)throw Error("Unexpected: two valid arguments are required");let i=e;for(;!i?.getAttribute(t)?.includes(s)&&"HTML"!=i.tagName;)i=i.parentElement;return"HTML"!=i.tagName&&i}#getHeight(e){var t=getComputedStyle(e.children[1].children[0]),s=e=>parseInt(e.split("px")[0]);return(s(t.height)+s(t.marginBottom)+s(t.marginTop))*e.children[1].children.length+"px"}#removeClass(){_$("."+this.moreContainerClass).forEach(e=>e.removeAttribute("style")),_$(`[${this.toggleActiveAttr}]`).forEach(e=>{e.classList.remove(this.activeClass),e.classList.remove(this.openClass)})}#setStyles(e){const t=this.#searchUp(e,"class",this.optionClass),s=this.#searchUp(e,this.toggleActiveAttr,""),i=t.$("."+this.moreContainerClass);i&&(i.style.height=this.#getHeight(t)),t.$(`[${this.toggleActiveAttr}]`).classList.add(this.openClass),s.classList.add(this.activeClass)}open(e){this.#removeClass(),this.#setStyles(e)}}const menu=new Menu("swicht","active","open","more","option");location.href=2<location.hash.length?location.hash:"#home";const screenVisible=()=>{menu.open($(`[href="${location.hash}"]`)),_$("article[id]").forEach(e=>{e.removeAttribute("style")}),$(location.hash).setAttribute("style","opacity: 1; z-index: 3")};onhashchange=screenVisible,screenVisible(),setTimeout(()=>{location.href="/"},1e6);
//# sourceMappingURL=main.js.map
