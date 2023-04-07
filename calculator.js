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
    let theDisplay = new Display(screenDiv);
    let operate = new TheOperations();
    let theButtons = addTheButtons(operate, theDisplay);
}

function addTheButtons(operate, aDisplay){
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
            longerButton1.addEventListener("click", function(){
                aDisplay.clearInput();
                operate.clear();
             })
            longerButton2.textContent = "On";
            longerButton2.addEventListener("click", (event) => aDisplay.turnOn())
            buttonMap.set("On", longerButton2);
        } else{
            longerButton1.textContent = "π";
            buttonMap.set("Pi", longerButton1);
            longerButton1.addEventListener("click", (event) => aDisplay.addInput("π"));
            longerButton2.textContent = "off"
            buttonMap.set("Off", longerButton2);
            longerButton2.addEventListener("click", (event) => aDisplay.turnOff());
        }
    }  
    let count = 9
    for(let i = 1; i < 21;i++){     
        let theButton = document.createElement("button");        
        if(i % 5 == 0 || (i + 1) % 5 == 0) {
            theButton.classList = "buttons longerButton opButtons";
            operatorButtons(i, theButton);
            theButton.addEventListener("click", function(){
                
                if(!(operate.lastEntryWasOp())){
                    operate.onKeyPress(theButton.textContent);
                    aDisplay.addInput(theButton.textContent);   
                } else{
                    window.alert("You can not use two operators in a row");
                }
            })
            buttonMap.set(`OpB${i}`, theButton);
             } else{
            theButton.classList = "buttons";
            if(count >= 0){
                theButton.textContent = count.toString();
                theButton.addEventListener("click", function(){
                    operate.onKeyPress(theButton.textContent);
                    aDisplay.addInput(theButton.textContent);
                })
            } else {
                switch (count){
                    case -1:
                        theButton.textContent = "="
                        theButton.addEventListener("click", function(){
                            let theAnswer = operate.equals();
                            aDisplay.answer(theAnswer);
                        })
                        break;
                    case -2:
                        theButton.textContent = "."
                        break;
                }                
            }    
            buttonMap.set(theButton.textContent, theButton);        
            count--;
        }
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
    numberTwo;
    operator;
    result;
    previousEntry;
    
    constructor(){
        this.clear();
    }
    hasAnOperator(){
        return this.operator.length > 0;
    }
    hasFirstNumber(){
        return this.result.length > 0;
    }
    lastEntryWasOp(){
        return isNaN(parseFloat(this.previousEntry));
    }
    onKeyPress(input){
        if(isNaN(parseFloat(input))){
            if (!(this.hasFirstNumber())){
                window.alert("Please enter a number first");
            } else if(!(this.hasAnOperator())){
                this.operator += input;
            }else{
                console.log(this.result)
                this.calc();
                console.log("after " + this.result)
                this.operator = input;
                this.numberTwo = new String("");
            }
        } else{
            if(!this.hasAnOperator()){
                this.result += input;
            } else{
                this.numberTwo += input;
            }
        }
        this.previousEntry = input;
    }
    calc(){
        switch (this.operator){
            case "+":
                this.addition();
                break;
            case "-":
                this.subtraction();
                break;
            case "X":
                this.multiplication();
                break;
            case "÷":
                this.division();
                break;
            default:
                console.log("Operator Error");
                this.result = "0";
                break;
        }
    }
    equals(){
        if(isNaN(parseFloat(this.previousEntry))){
            this.calc();
        }
        else{
            this.numberTwo = this.previousEntry;
            this.calc();
        }
        this.numberTwo = new String("0");
        return this.result;
    }
    clear(){
        this.numberTwo = new String("");
        this.result = new String("");
        this.operator = new String("");
        this.previousEntry = new String("");
    }
    addition(){
        this.result = (parseFloat(this.result ) + parseFloat(this.numberTwo)).toString();
    }
    subtraction(){
        this.result = (parseFloat(this.result ) - parseFloat(this.numberTwo)).toString();
    }
    multiplication(){
        this.result = (parseFloat(this.result ) * parseFloat(this.numberTwo)).toString();
    }
    division(){
        if (parseFloat(this.numberTwo) === 0){
            window.alert( `can not divide by zero`)
        } else{
            this.result = (parseFloat(this.result ) / parseFloat(this.numberTwo)).toString();
        }
    }
}
class Display{
    inputString;
    screenNode;
    active;
    powerDisplay;

    constructor(screenNode) {
        this.screenNode = screenNode;
        this.inputString = new String();   
        this.active = true;
        this.powerDisplay = document.querySelector(".onOrAff");
    }
    clearInput(){
        this.inputString = ""; 
        this.showInput();  
    }
    addInput(value){
        if(this.active){
            this.inputString += value;
            this.showInput();
        }
    }
    answer(theResult){
        this.clearInput();
        this.inputString = new String(theResult);
        this.showInput();
    }
    showInput(){
            this.screenNode.textContent = this.inputString;
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
