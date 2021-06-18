/*
class buttonchooser { // name of class must be div name (cuz of click-processing)
    constructor(div, content) {
        let s = this.styles
        this.name = div //containing div (where the thing should go)
        this.div = $(div)

        let html = `<input type="hidden" value="" class="${div}-value">`
        for(let i = 0; i != content.length; i++) {
            let addstyles = ""
            switch(true) {
                case i == 0:
                    addstyles = `${s.sel_left}`; break;
                case 0 > i > content.length:
                    addstyles = `${s.sel_middle}`; break;
                case i == content.length - 1:
                    addstyles = `${s.sel_right}`; break;
            }
            html += `
            <span style="${s.sel}left: calc( (100% / ${content.length} ) * ${i} );width: calc( 100% / ${content.length} ); ${s.common}; background-color: ${content[i].col};${addstyles}" onclick='this.parentElement.children[0].value = this.getAttribute("data");' data="${content[i].val}">
                <span style="${s.sel_text}">
                    ${content[i].txt}
                </span>
            </span>`;
        }
        html += "</div>"
        this.div.html(html)
    }
    value() {
        return this.div.children("input").val()
    }
    get styles() { // returns array of styles (this is to not need own css file)
        let r = {}
        r.sel_text = "position: absolute;height: 1em;width: 100%;top: 0.5em;text-align: center;font-size: 1em;"

        r.sel_middle = "border-bottom-left-radius: 0em;border-bottom-right-radius: 0em;border-top-left-radius: 0em;border-top-right-radius: 0em;"

        r.sel_left = "border-top-left-radius: 1em;border-bottom-left-radius: 1em;border-top-right-radius: 0em;border-bottom-right-radius: 0em;"

        r.sel_right = "border-bottom-left-radius: 0em;border-top-left-radius: 0em;border-top-right-radius: 1em;border-bottom-right-radius: 1em;"

        r.sel = "position: absolute;top: 0;height: 100%;"

        r.common = "border-width: 1px;border-color: black"

        return r
    }

}
/*
TODOs: for buttonchooser (WIP)

make the entrys selectable (and change value of them then)
 - Add solid borders to selected thingy
 - interpret options in constructor
   - generate style in interpreter (no css file needed! (for the basic style that is))


*/

 /* -- [[ "adv"-listchooser ]] -- //
 # todo for "adv"-lch
 - get da style right!*/
class listchooser {
    constructor(div, content, col) {
        // div     - the container suppost to have the choosing menu
        
        // content - a list of entry objects
        // bcol  |-> color supplied for the background of the entry
        // val   |-> the value displayed if entry is choosen / returned on value query
        // txt   |-> the text displayed on the entry
        // --- Examples ---
        // [
        // {"bcol": "blue", "val": "displayed thing", "txt": "choose mee!"},
        // {"bcol": "#fff", "val": "other thing",     "txt": "no meeeeee!"}
        // ]

        // col     - the genereal background color (false for none)
        let s        = this.styles // just fetches the styles from somewhere in this function
        this.name    = div         // containing div (where the thing should go)
        this.div     = $(div)      //
        this.content = content     //
        this.col     = col         // saving the color for some use sometime (or false for no color)

        let bgcolor = col ? 1 : 0

        // do some styling on the container
        this.div.css({"background-color":col})
        this.div.css({"height":`${this.content.length * 1.6 + 1.1}em`})

        let html = `<div style="${( "background-color:" + col ).repeat(bgcolor) }; height: auto">`
        html    += `<input type="text" value="" class="${div.substr(1)}-value" style="width: calc( 100% - 1.5em ); position: absolute; left: 0.5em;" placeholder="Please choose...">`
        for(let i = 0; i != this.content.length; i++) {
            html += `
            <span style="top: ${( i + 1.6 ) * 1.6 }em;${s.common};border-top-color:${this.content[i].bcol}" onclick='this.parentElement.children[0].value = this.getAttribute("data");' data="${this.content[i].val}">
                <span style="${s.sel_text}">
                    ${this.content[i].txt}
                </span>
            </span>`;
        }
        html += "</div>"
        this.div.html(html)
    }
    get value() {
        return this.div.children()[0].children[0].value
    }
    get styles() { // returns array of styles (this is to not need own css file)
        let r = {}

        r.common =  "position: absolute;left: .5em; width: calc( 100% - 1em );border-top-width: 1px;border-top-style:solid;"

        return r
    } 
}


/* -- [[ inputlist ]] -- //
 # todo
 - like do stuff

*/
class inputlist {
    constructor(div, styling, onsubmit) {
        // div     - container
        // styling -  default values
        this.defaultvalues = {
            "style":             "", // additional styling (per input field)
            "startlen":           1, // number of inputs
            "bgcolor" : "#00000000", // background color (defualt is 100% transparent)
            "placeholder":       "", // placeholder displayed in input fields
            "submit_txt": "Submit",  // text on the bottom submit button
        }
        // onsubmit - gets called (with values as arg) on submit-button-press 

        let s        = this.styles // just fetches the styles from somewhere in this object
        this.name    = div         // containing div (where the thing should go)
        this.div     = $(div)      // global jq object
        this.ready   = false       // true if constructor completed | not rly used

        // concat stylings
        this.styling = concatObjects(this.defaultvalues, styling)

        // set base length
        this.length = this.styling.startlen


        // make this working or sth
        this.update()
        this.onsubmit = onsubmit
        this.ready = true
    }
    read_contents() { // reads the content of fileds (is automatically executed on change & addfield)
        for(let i = 0; i < this.length; i++) {
            this.value[i] = $(`.${this.name.substring(1) + "-value-" + i}`).val()
        }
        return this.value
    }
    set_values(c, i)  { // sets valus of list
        this.value = c
        this.length = c.length
        if(!i) this.update() 
        return this.value
    }
    update() {
        if(!this.ready) {
            this.set_values([""], true)
        } else {
			this.read_contents()
        }

        this.div.css({"background-color":this.styling.bgcolor})
        this.div.css({"height":`${this.length * 1.6 + 1.1}em`})

        let html = `<div style="background-color: ${this.styling.bgcolor}; height: auto">`
        html    += ``
        let i
        for(i = 0; i < this.length + 1; i++) {
        
            if(i == this.length) {
                // do thing for some bottom thing or sth
                html += `<span style="top: ${( i + .5 ) * 1.6 }em;${this.styles.common};">
                    <input type="submit" value="${this.styling.submit_txt}" style="width: calc( 100% - 1.5em );left: 0.5em;${this.styles.submit}" 
                    class="${this.name.substring(1) + "-submit"}">
                </span>`
            } else if(i == this.length - 1) {
                // do shit for last entry
                html += `<span style="top: ${( i + .3 ) * 1.6 }em;${this.styles.common};">
                <input style="${this.styles.lastinput}" placeholder="${this.styling.placeholder}" value="${this.value[i] ? this.value[i] : ""}" class="${this.name.substring(1) + "-value-" + i}">
                <input style="${this.styles.addone}" type="submit" value="+" class="${this.name.substring(1) + "-addone"}">
            	</span>`;
            } else {    
                html += `
                <span style="top: ${( i + .3 ) * 1.6 }em;${this.styles.common};">
                    <input style="${this.styles.input}" placeholder="${this.styling.placeholder}" value="${this.value[i] ? this.value[i] : ""}" class="${this.name.substring(1) + "-value-" + i}">
                </span>`;
            }
        }

        html += "</div>"
        this.div.html(html)

        //register onclick-handlers
        $(`.${this.name.substring(1) + "-addone"}`).on("click", ()=>{
            this.addfield()
        })

        $(`.${this.name.substring(1) + "-submit"}`).on("click",() =>
        {
        	this.read_contents()
            this.onsubmit(this.value)
        })
        
        return this
    }
    addfield(i) {
        let addcount;
        if(i == 0) {
            console.warn("Selectors set count of fileds to zero (dsnt work correctly) preceding")
        }
        if(typeof(i) == "number") {
            this.length = i
        } else {
            this.length = this.length + 1
        }
        for(let i = 0; i < this.length; i++) {
            if(typeof(this.value[i]) == "undefined") {
                this.value[i] = "";
            }
        }

        this.update()
        return this.length
    }
    remfield(i) {
        if(typeof(i) == "number") {
            return this.addfield(i)
        }
        let ret   = this.value[this.length]
        this.length = this.length - 1
        this.update()
        return ret
    }
    get styles() { // returns array of styles (this is to not need own css file)
        let r = {}

        r.common = "position: absolute;left: .5em; width: calc( 100% - 1em )"

        r.submit = ""

        r.input  = "width:calc( 100% - 1em );"

        r.lastinput = r.input + "width:calc( 100% - 1em - 2em )"

        r.addone = "width:2em; left:0;"

        return r
    } 
}