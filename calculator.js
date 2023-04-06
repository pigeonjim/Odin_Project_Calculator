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
        longerButton1.classList = "buttons longerButton"
        longerButton1.style.setProperty("grid-column","1 / 3");
        longerButton2.classList = "buttons longerButton"
        longerButton2.style.setProperty("grid-column","4 / 6");
        buttonDiv.appendChild(longerButton1);
        buttonDiv.appendChild(longerButton2);
    }  
    for(let i = 1; i < 21;i++){
     
        let theButton = document.createElement("button");
        theButton.classList = "buttons";
        if(i % 5 == 0 || (i + 1) % 5 == 0) {
            theButton.classList = "buttons longerButton";
        }
        theButton.textContent = i;
        buttonDiv.appendChild(theButton); }

    }