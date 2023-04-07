    window.addEventListener("load", (event) => onLoad())

function onLoad(){
    document.body.classList = "body";
    const mainDiv = document.createElement("div");
    const headerDiv = document.createElement("div");
    const calcDiv = document.createElement("div");
    mainDiv.classList = "mainDiv"; 
    headerDiv.classList = "header";
    calcDiv.classList = "calcBase"
    headerDiv.textContent ="Calculator"
    mainDiv.appendChild(headerDiv);
    mainDiv.appendChild(calcDiv);
    document.body.appendChild(mainDiv);
    let theButtons = addTheButtonsNScreen();
    let theScreen = new Display(document.querySelector(".screenDiv"));
    theScreen.value1 = 1;
    theScreen.value2 = 2;
    theScreen.opValue = "+";
    theScreen.showDisplay();
}

function addTheButtonsNScreen(){
    const calcDiv = document.querySelector(".calcBase")
    const screenDiv = document.createElement("div");
    const buttonDiv= document.createElement("div");
    screenDiv.classList = "screenDiv";
    buttonDiv.classList = "buttonDiv";
    calcDiv.appendChild(screenDiv); 
    calcDiv.appendChild(buttonDiv);
    let buttonMap = new Map();
    for(let i = 1; i < 3; i ++){
        const longerButton1 = document.createElement("button");
        const longerButton2 = document.createElement("button");
        longerButton1.classList = "buttons longerButton topButtons"
        longerButton1.style.setProperty("grid-column","1 / 3");
        longerButton2.classList = "buttons longerButton topButtons"
        longerButton2.style.setProperty("grid-column","4 / 6");
        buttonDiv.appendChild(longerButton1);
        buttonDiv.appendChild(longerButton2);
        if(i == 1){
            longerButton1.textContent = "Clear";
            buttonMap.set("Clear", longerButton1);
            longerButton2.textContent = "On";
            buttonMap.set("On", longerButton2);
        } else{
            longerButton1.textContent = "π";
            buttonMap.set("Pi", longerButton1);
            longerButton2.textContent = "off"
            buttonMap.set("Off", longerButton2);
        }
    }  
    let count = 9
    for(let i = 1; i < 21;i++){     
        let theButton = document.createElement("button");        
        if(i % 5 == 0 || (i + 1) % 5 == 0) {
            theButton.classList = "buttons longerButton opButtons";
            operatorButtons(i, theButton);
            buttonMap.set(`OpB${i}`, theButton);
        } else{
            theButton.classList = "buttons";
            if(count >= 0){
                theButton.textContent = count.toString();
                
            } else {
                switch (count){
                    case -1:
                        theButton.textContent = "="
                        break;
                    case -2:
                        theButton.textContent = "."
                        break;
                }                
            }    
            buttonMap.set(theButton.textContent, theButton);        
            count--;
        }
        theButton.addEventListener("click", (event) =>  alert(theButton.textContent));
        buttonDiv.appendChild(theButton); }
        return buttonMap;
    }
function operatorButtons(aNumber, aButton){
    switch(aNumber){
        case 4:
            aButton.textContent = "÷";
            break;
        case 5:
            aButton.textContent = "√";
            break;
        case 9:
            aButton.textContent = "X";
            break;      
        case 10:
            aButton.textContent= "X^2";
            break;
        case 14:
            aButton.textContent= "-";
            break;
        case 15:
            aButton.textContent = "MOD";
            break; 
        case 19:
            aButton.textContent = "+";
            break;
        case 20:
            aButton.textContent = "1/X";
            break; 
}

}

class TheOperations{
    #numberOne; //or array of string from buttons
    #numberTwo;
    #operator;

    constructor(no1, no2, operator){
        this.#numberOne = no1;
        this.#numberTwo = no2;
        this.#operator = operator;
        this.whatOp();
    }

    whatOp(){
        switch (this.#operator){
            case "+":
                this.addition();
                break;
            case "-":
                this.subtraction();
                break;
            case "X":
                this.multiplication();
                break;
            case "-":
                this.subtraction();
                break;
        }
    }
    addition(){
        return this.#numberOne + this.#numberTwo
    }
    subtraction(){
        return this.#numberOne - this.#numberTwo;
    }
    multiplication(){
        return this.#numberOne*this.#numberTwo;
    }
    division(){
        if (this.#numberTwo === 0){
            return `can not divide by zero`
        } else{
        return this.#numberOne/this.#numberTwo;
        }
    }

}
class Display{
    #value1;
    #value2;
    #opValue;
    display;
    #screenNode;


    constructor(screenNode) {
        this.#screenNode = screenNode;
        this.display = "";      
    }

    clearScreen(){
        this.display = "";
    }

    get value1(){
        return this.#value1;
    }

    get value2(){
        return this.#value2;
    }

    get opValue(){
        return this.#opValue;
    }
    set value1(value){
        this.#value1 = value;
    }
    set value2(value){
        this.#value2 = value;
    }
    set opValue(opValue){
        this.#opValue = opValue;
    }
    get display(){
        return this.display;
    }
    showDisplay(){
        this.clearScreen();
        this.makeOutput();
        this.#screenNode.textContent = this.display;
    }
    makeOutput(){
        this.display = `${this.#value1} ${this.opValue} ${this.value2} `;
    }
}
