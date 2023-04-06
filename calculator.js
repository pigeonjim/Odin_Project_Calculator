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
    addTheButtonsNScreen();
}

function addTheButtonsNScreen(){
    const calcDiv = document.querySelector(".calcBase")
    const screenDiv = document.createElement("div");
    const buttonDiv= document.createElement("div");
    screenDiv.classList = "screenDiv";
    buttonDiv.classList = "buttonDiv";
    calcDiv.appendChild(screenDiv); 
    calcDiv.appendChild(buttonDiv);

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
            longerButton2.textContent = "On"
        } else{
            longerButton1.textContent = "π";
            longerButton2.textContent = "off"
        }
    }  
    let count = 9
    for(let i = 1; i < 21;i++){     
        let theButton = document.createElement("button");        
        if(i % 5 == 0 || (i + 1) % 5 == 0) {
            theButton.classList = "buttons longerButton opButtons";
            operatorButtons(i, theButton);
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
            count--;
        }
        buttonDiv.appendChild(theButton); }
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