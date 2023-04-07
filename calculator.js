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
    const screenDiv = document.createElement("div");
    screenDiv.classList = "screenDiv";
    calcDiv.appendChild(screenDiv); 
    let onOrAff = document.createElement("div");
    onOrAff.classList = "onOrAff";
    calcDiv.appendChild(onOrAff);
    let theDisplay= new Display(screenDiv);
    let theButtons = addTheButtons(theDisplay);
}

function addTheButtons(aScreen){
    const calcDiv = document.querySelector(".calcBase")
    const buttonDiv= document.createElement("div");
    buttonDiv.classList = "buttonDiv";
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
            longerButton1.addEventListener("click", (event) => aScreen.clearInput())
            longerButton2.textContent = "On";
            longerButton2.addEventListener("click", (event) => aScreen.turnOn())
            buttonMap.set("On", longerButton2);
        } else{
            longerButton1.textContent = "π";
            buttonMap.set("Pi", longerButton1);
            longerButton1.addEventListener("click", (event) => aScreen.addInput("π"));
            longerButton2.textContent = "off"
            buttonMap.set("Off", longerButton2);
            longerButton2.addEventListener("click", (event) => aScreen.turnOff());
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
        theButton.addEventListener("click", (event) => aScreen.addInput(theButton.textContent));
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
    inputAry;
    screenNode;
    active;
    powerDisplay;

    constructor(screenNode) {
        this.screenNode = screenNode;
        this.inputAry = new Array();   
        this.active = true;
        this.powerDisplay = document.querySelector(".onOrAff");
    }
    clearInput(){
        this.inputAry.length = 0; 
        this.showInput();  
    }
    addInput(value){
        if(this.active){
            this.inputAry.push(value);
            this.showInput();
        }
    }
    showInput(){
            this.screenNode.textContent = this.inputAry.toString().replaceAll(",","");
        }
    turnOff(){
        this.clearInput();
        this.active = false;
        this.screenNode.style.setProperty("background-color","#B0BEC5");
        this.powerDisplay.style.setProperty("background-color","#e64d00")
    }
    turnOn(){
        this.active = true;
        this.screenNode.style.setProperty("background-color","#000000");
        this.powerDisplay.style.setProperty("background-color","#5D865F")
    }

}
