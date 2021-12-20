const 
    id = Id => document.getElementById(Id),
    $ = QuerySelector => document.querySelector(QuerySelector)
    _$ = QueryAll => document.querySelectorAll(QueryAll)

HTMLElement.prototype.$ = function(querySelector){
    return this.querySelector(querySelector)
}

HTMLElement.prototype._$ = function(querySelector){
    return this.querySelectorAll(querySelector)
}
class Menu {
    constructor(toggleActiveAttr, activeClass, openClass, moreContainerClass, optionClass){

        this.toggleActiveAttr = toggleActiveAttr
        this.activeClass = activeClass
        this.openClass = openClass
        this.moreContainerClass = moreContainerClass
        this.optionClass = optionClass
    }

    //search in the parents of the element
    #searchUp(element, attr, search){

        //input validation
        if(
            !element || !attr
            || typeof attr != "string" 
            || !element.parentElement

        ){ throw Error("Unexpected: two valid arguments are required")}

        //get the first matching parent
        let parent = element
        while(!parent?.getAttribute(attr)?.includes(search) && parent.tagName != "HTML"){

            parent = parent.parentElement
        }

        // return the parent element 
        return parent.tagName == "HTML"? false : parent
    }

    // Add the height and margins of the element and multiply 
    // by the number of children to get the height of the container.
    #getHeight(element){
        const Styles = getComputedStyle(element.children[1].children[0])
        const getNumber = text => parseInt(text.split("px")[0])
        return `${
            (getNumber(Styles.height) 
            + getNumber(Styles.marginBottom)
            + getNumber(Styles.marginTop))
            * element.children[1].children.length
        }px`
    }

    // Remove class and styles from elements
    #removeClass(){
        _$(`.${this.moreContainerClass}`)
            .forEach(e => e.removeAttribute("style"))

        _$(`[${this.toggleActiveAttr}]`)
            .forEach(e => {
                e.classList.remove(this.activeClass)
                e.classList.remove(this.openClass)
            })
    }

    //Set styles for elements active and open
    #setStyles(element){

        const container = this.#searchUp(element, "class", this.optionClass)
        const active = this.#searchUp(element, this.toggleActiveAttr, "")
        const moreOptions = container.$("."+this.moreContainerClass)
        if(moreOptions) moreOptions.style.height = this.#getHeight(container)
            container.$(`[${this.toggleActiveAttr}]`).classList.add(this.openClass)
        active.classList.add(this.activeClass)
    }

    //Open the item and close the others
    open(element){
        this.#removeClass()
        this.#setStyles(element)
    }
}

const menu = new Menu("swicht", "active", "open", "more", "option")

const screenVisible = (screen) => {

    menu.open($(`[href="${screen}"]`))

    _$("article[scr]").forEach(article => {

            article.removeAttribute("style")
    })
    $(`[scr="${screen}"]`).setAttribute("style", `opacity: 1; z-index: 3`)
}

onhashchange = () => screenVisible(location.hash)

const threshold = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

const observer = new IntersectionObserver((entrys, observer)=> {

    

    entrys.forEach(entry => {
            if(entry.isIntersecting) screenVisible("#"+entry.target.id)
    })

}, { threshold})


_$(".view").forEach(article => observer.observe(article))

setTimeout(() => {
   location.reload()
}, 1000000);
