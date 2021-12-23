const 
    id = Id => document.getElementById(Id),
    $ = query =>  document.querySelector(query),
    $All = query => document.querySelectorAll(query)

HTMLElement.prototype.$ = function(query){
    return this.querySelector(query)
}

HTMLElement.prototype.$All = function(query){
    return this.querySelectorAll(query)
}

HTMLElement.prototype.css = function(styles){
    return this.setQUERYibute("css", styles)
}

//Menu controler
class Menu {

    constructor(selectedOptionClass, openMenuClass, menuContainer){

        this.SELECTED_OPTION_CLASS = selectedOptionClass
        this.OPEN_MENU_CLASS = openMenuClass
        this.MENU_CONTAINER = menuContainer
    }

    //search in the parents of the element
    //the first match
    #lookUp(START_ELEMENT, QUERY){

        //input validation
        if(
            !START_ELEMENT || !QUERY
            || typeof QUERY != "string" 
            || !START_ELEMENT.parentElement

        ){ throw Error("Unexpected: two valid arguments are required")}

        //Get the first matching parent
        let parent = START_ELEMENT
        while (!parent.className.includes(QUERY)  && parent.tagName != "HTML") {
            parent = parent.parentElement
        }

        return parent.tagName == "HTML"? false : parent

    }

    // Add the height and margins of the menu options and multiply 
    // by the number of children to get the height need of the container.
    #getHeight(dropdown){

        const FIRST_OPTION = dropdown.firstChild 
        const CHILDREN_LENGTH = dropdown.children.length
        const OPTION_STYLES = getComputedStyle(FIRST_OPTION)
        const { height, marginTop, marginBottom } = OPTION_STYLES
        const RESULT = `calc((${height} + ${marginTop} + ${marginBottom}) * ${CHILDREN_LENGTH})`
        return RESULT
    }

    #removeStyles(isToUnfold, isToSelect){

        $All(".dropdown").forEach(dropdown => {
            
            
            if(isToUnfold != dropdown){

                dropdown.style.height = 0
            }
        })

        const SELECTABLES = this.MENU_CONTAINER.$All(".selectable")
        SELECTABLES.forEach( selectable => {
            
            if(isToSelect !== selectable){

                selectable.classList.remove("open")
                selectable.classList.remove("selected")
            }
        })

    }

    #setStyles(isToUnfold, isToSelect, menuOption){

        const SELECTABLE = menuOption.$(".selectable")
        if(isToUnfold){

            isToUnfold.style.height = this.#getHeight(isToUnfold)
        }

        SELECTABLE.classList.add(this.OPEN_MENU_CLASS)
        isToSelect.classList.add(this.SELECTED_OPTION_CLASS)
    }

    open(itemToOpen){

        const MENU_OPTION =  this.#lookUp(itemToOpen, "menu_option")
        const IS_TO_UNFOLD = MENU_OPTION.$(".dropdown")
        const IS_TO_SELECT = this.#lookUp(itemToOpen, "selectable")

        this.#removeStyles(IS_TO_UNFOLD, IS_TO_SELECT)
        this.#setStyles(IS_TO_UNFOLD, IS_TO_SELECT, MENU_OPTION)
        
    }

}

const menu = new Menu("selected", "open", id("menu"))

let openScreen

const screenVisible = screenName => {

    const SCREEN_TO_SHOW = $(`[scr="${screenName}"]`)
    const MENU_TO_SELECT = $(`[href="${screenName}"]`)

    if(openScreen !== SCREEN_TO_SHOW){

        menu.open(MENU_TO_SELECT)

        $All("article[scr]").forEach(screen => {

            if(screen !== SCREEN_TO_SHOW){

                screen.removeAttribute("style")
            }
        })

        openScreen = screenName
    }
    SCREEN_TO_SHOW.setAttribute("style", `opacity: 1; z-index: 3`)
}

const observerFunction = entrys => {

    entrys.forEach(entry => {
        const ID = entry.target.id

        if(entry.isIntersecting && `#${ID}` !== location.hash) {

            location.hash = ID
        }
    })
}
const observer = new IntersectionObserver(observerFunction, {threshold: 1})
$All(".view").forEach( screen => observer.observe(screen))

location.hash = location.hash || "home"
screenVisible(location.hash)
onhashchange = () => screenVisible(location.hash)