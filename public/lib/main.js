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
    constructor(selectablesAttr, activeCls, openCls, dropdownCls, optionCls){

        this.selectablesAttr = selectablesAttr
        this.activeCls = activeCls
        this.openCls = openCls
        this.dropdownCls = dropdownCls
        this.optionCls = optionCls
    }

    //search in the parents of the element
    #searchUp(element, attr, query){

        //input validation
        if(
            !element || !attr
            || typeof attr != "string" 
            || !element.parentElement

        ){ throw Error("Unexpected: two valid arguments are required")}

        //get the first matching parent
        let parent = element
        while(!parent?.getAttribute(attr)?.includes(query) && parent.tagName != "HTML"){

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
        _$(`.${this.dropdownCls}`)
            .forEach(e => e.removeAttribute("style"))

        _$(`[${this.selectablesAttr}]`)
            .forEach(e => {
                e.classList.remove(this.activeCls)
                e.classList.remove(this.openCls)
            })
    }

    //Set styles for elements active and open
    #setStyles(element){

        const container = this.#searchUp(element, "class", this.optionCls)
        const active = this.#searchUp(element, this.selectablesAttr, "")
        const moreOptions = container.$("."+this.dropdownCls)
        
        if(moreOptions) {
            moreOptions.style.height = this.#getHeight(container)
            console.log("xd")    
        }
        container.$(`[${this.selectablesAttr}]`).classList.add(this.openCls)
        active.classList.add(this.activeCls)
    }

    //Open the item and close the others
    open(element){
        this.#removeClass()
        this.#setStyles(element)
    }
}

const menu = new Menu("swicht", "active", "open", "more", "option")



let openScreen = undefined

const screenVisible = (screen) => {

    const screenToShow = $(`[scr="${screen}"]`)
    
    if(openScreen !== screen){

        menu.open($(`[href="${screen}"]`))

        _$("article[scr]").forEach(_screen => {

            if(_screen !== screenToShow){

                _screen.removeAttribute("style")
            }
        })

        openScreen = screen
    }

    screenToShow.setAttribute("style", `opacity: 1; z-index: 3`)
}

location.hash = location.hash || "home"
screenVisible(location.hash)
const observerFunction = entrys => {

    entrys.forEach(entry => {
        const id = entry.target.id

        if(entry.isIntersecting && `#${id}` !== location.hash) {

            location.hash = id
        }
    })
}

const observer = new IntersectionObserver(observerFunction, {threshold: 1})



onhashchange = () => screenVisible(location.hash)



_$(".view").forEach(article => observer.observe(article))

setTimeout(() => {
   location.reload()
}, 10000000);
