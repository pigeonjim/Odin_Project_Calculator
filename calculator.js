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
            longerButton1.classList.add("clearButton"); 
            buttonMap.set("Clear", longerButton1);
            longerButton1.addEventListener("click", function(){
                aDisplay.clearInput();
                operate.clear();
             })
            longerButton2.textContent = "On";
            longerButton2.classList.add("onButton");
            longerButton2.addEventListener("click", (event) => aDisplay.turnOn())
            buttonMap.set("On", longerButton2);
        } else{
            longerButton1.textContent = "π";  
            longerButton1.classList.add("piButton");         
            longerButton1.addEventListener("click", function(){
                if(operate.inputSpecial(Math.PI.toFixed(4))){
                    aDisplay.addInput(Math.PI.toFixed(4));
                }
            })
            buttonMap.set("Pi", longerButton1);
            longerButton2.textContent = "Off";
            longerButton2.classList.add("offButton");
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
            const standardCalcs = ["+", "-","X","÷"];
            if(standardCalcs.includes(theButton.textContent)){
                theButton.addEventListener("click", function(){                
                    if(!(operate.lastEntryWasOp())){
                        operate.onKeyPress(theButton.textContent);
                        aDisplay.addInput(theButton.textContent);   
                    } else{
                        window.alert("You can not use two operators in a row");
                    }
                })
            }else {
                theButton.addEventListener("click", function(){                
                    if(!(operate.lastEntryWasOp())){
                        aDisplay.clearInput();                    
                        aDisplay.addInput(operate.calc(theButton.textContent));   
                    }
                })
             }
            buttonMap.set(`OpB${i}`, theButton);
             } else{
            theButton.classList = "buttons";
            if(count >= 0){
                theButton.textContent = count.toString();
                theButton.addEventListener("click", function(){
                    if(operate.lastEntryWasEquals()){
                        aDisplay.clearInput();
                    }
                    operate.onKeyPress(theButton.textContent);
                    aDisplay.addInput(theButton.textContent);
                })
             } else {
                switch (count){
                    case -1:
                        theButton.textContent = "=";
                        theButton.addEventListener("click", function(){
                            let theAnswer = operate.equals();
                            aDisplay.answer(theAnswer);
                        })
                        break;
                    case -2:
                        theButton.textContent = ".";
                        theButton.addEventListener("click", function(){
                            if(operate.inputSpecial(".")){
                                aDisplay.addInput(".");
                            }
                        })
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
            aButton.textContent = "10^x";
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
    opAry;
    
    constructor(){
        this.clear();
        this.opAry = ["+","-","X","÷","X^2","MOD","√","1/X"]
    }
    get opAry(){
        return this.opAry;
    }
    hasAnOperator(){
        return this.operator.length > 0;
    }
    hasFirstNumber(){
        return this.result.length > 0;
    }
    lastEntryWasOp(){
        return (isNaN(parseFloat(this.previousEntry)) && this.previousEntry != "=");
    }
    lastEntryWasEquals(){
        return ( this.previousEntry === "=");
    }
    onKeyPress(input){
        if(isNaN(parseFloat(input))){
            if (!(this.hasFirstNumber())){
                window.alert("Please enter a number first");
            }else if(!(this.opAry.includes(input))){
                window.alert("Not a valid operator")
            } else if(!(this.hasAnOperator())){
                this.operator += input;
            }else{
                this.calc();
                this.operator = input;
                this.numberTwo = new String("");
            }
        } else{
            if(this.previousEntry === "="){
                this.clear();
                this.result += input;
            }else if(!this.hasAnOperator()){
                this.result += input;
            } else{
                this.numberTwo += input;
            }
        }
        this.previousEntry = input;
    }
    inputSpecial(anInput){
        if(!this.hasAnOperator()){
            if((!(this.result.includes(".")) || this.result.length == 0) && anInput === "."){
                this.result += anInput;
                this.previousEntry = "1"
                return true;
            } else if(!(this.result.includes(".")) && this.result.length == 0){
                this.result += anInput;
                this.previousEntry = "1"
                return true;
            }
        } else{
            if((!(this.numberTwo.includes(".")) || this.numberTwo.length == 0) && anInput === "."){
                this.numberTwo += anInput;
                this.previousEntry = "1"
                return true;
            } else if(!(this.numberTwo.includes(".")) && this.numberTwo.length == 0){
                this.numberTwo += anInput;
                this.previousEntry = "1"
                return true;
            }
        }
    }
    calc(anOp = this.operator){
        this.result = this.removeLeadingZero(this.result);
        this.numberTwo = this.removeLeadingZero(this.numberTwo);
        switch (anOp){
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
            case "√":
                this.sqlRt();
                return this.result;
            case "X^2":
                this.sqIt();
                return this.result;
            case "10^x":
                this.tenUp();
                return this.result;
            case "1/X":
                this.reciprocal();
                return this.result;
            default:
                console.log("Operator Error");
                this.result = "0";
                break;
        }
        return this.result;
    }
    equals(){
        if(!(this.lastEntryWasOp()) && this.previousEntry !="="){
            this.calc();
        }
        this.specialOpReset();
        return this.result;
    }
    removeLeadingZero(aString){
        if(aString[0] === "0"){
            return aString.substring(1);
        }
        return aString;
    }
    clear(){
        this.numberTwo = new String("");
        this.result = new String("");
        this.operator = new String("");
        this.previousEntry = new String("");
    }
    addition(){
        this.result = (parseFloat(this.result) + parseFloat(this.numberTwo)).toFixed(2);
    }
    subtraction(){
        this.result = (parseFloat(this.result) - parseFloat(this.numberTwo)).toFixed(2);
    }
    multiplication(){
        this.result = (parseFloat(this.result) * parseFloat(this.numberTwo)).toFixed(2);
    }
    division(){
        if (this.numberTwo.length == 0){
            window.alert( `can not divide by zero`)
        } else{
            this.result = (parseFloat(this.result) / parseFloat(this.numberTwo)).toFixed(2);
        }
    }
    sqlRt(){
        if(this.result.length > 0){
            this.result = Math.sqrt(this.result).toFixed(2);
        } else if(this.numberTwo > 0){
            this.result = Math.sqrt(this.numberTwo).toFixed(2);
        }
        this.specialOpReset();
    }
    sqIt(){
        if(this.result.length > 0){
            this.result = Math.pow(this.result,2).toFixed(2);
        } else if(this.numberTwo > 0){
            this.result = Math.pow(this.numberTwo,2).toFixed(2);
        }
        this.specialOpReset();
    }
    tenUp(){
        if(this.result.length > 0){
            this.result = Math.pow(10,this.result).toString();
        } else if(this.numberTwo > 0){
            this.result = Math.pow(10,this.numberTwo).toString();
        }
        this.specialOpReset();
    }
    reciprocal(){
        if(this.result.length > 0){
            this.result = Math.pow(this.result,-1).toString();
        } else if(this.numberTwo > 0){
            this.result = Math.pow(this.numberTwo,-1).toString();
        }
        this.specialOpReset();
    }
    specialOpReset(){
        this.numberTwo = new String("");
        this.operator = new String("");
        this.previousEntry = "=";
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
