//import for the parser libery
//global Variable
let equation = "0";
let ans;
let standard = true;
let startPosition = [];
let open = false;
//to add Characters to the global:equation
function main(){
    document.addEventListener("keydown", (event) => {keyboardInput(event)}, false);
    document.getElementById("equation").textContent = equation;
    const numbers = document.getElementsByClassName("number");
    Array.from(numbers).forEach((i)=> {i.addEventListener("click", () => addToEquation(i))});
    const operators = document.getElementsByClassName("mathOperator");
    Array.from(operators).forEach((i) => {i.addEventListener("click", () => addToEquation(i))});
    const solve = document.getElementsByClassName("solve");
    Array.from(solve).forEach((i) => {i.addEventListener("click", () => solveEquation())});
    const mathFunction = document.getElementsByClassName("mathFunction");
    Array.from(mathFunction).forEach((i)=> {i.addEventListener("click", () => addToEquation(i))});
    document.getElementById("extended").addEventListener("click", openEx);
    document.getElementById("controlLine").addEventListener("mousedown", startDrag);
    document.getElementById("close").addEventListener("click",openCloseCalculator);
    document.getElementById("closeOpenButton").addEventListener("click", openCloseCalculator);
}
function addToEquation(element){
    if ((equation.length <= 19 && standard) || (equation.length <= 53 && !standard)) {
        if (element.className === "mathOperator") {
            if (!checkLastChar(element.textContent)) {
                if (ans !== undefined) {
                    equation += "Ans" + element.textContent;
                } else {
                    equation += element.textContent;
                }
            }
        } else if (element.id === "comma") {
            if (!checkLastChar(element.textContent) && !checkForDuplicateCommas()) {
                equation += ",";
            }
        } else if (element.id === "c") {
            equation = "0";
        } else if (element.id === "changeTheSign") {
            changeTheSign()
        } else if (element.id === "procent") {
            equation += "÷100";
        } else if (element.id === "id-(" || element.id === "id-)") {
            equation += element.textContent;
        } else if (element.id === "faculty") {
            solveEquation();
            let temp = faculty(ans);
            if (temp === undefined) {
                return;
            }
            equation = temp.toString();
            solveEquation();
            return;
        } else if (element.id === "sin") {
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.sin(ans).toString();
            solveEquation();
            return;
        } else if (element.id === "cos"){
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.cos(ans).toString();
            solveEquation();
            return;
        } else if (element.id === "tan") {
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.tan(ans).toString();
            solveEquation();
            return;
        } else if (element.id === "sinh") {
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.sinh(ans).toString();
            solveEquation();
            return;
        } else if (element.id === "cosh") {
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.cosh(ans).toString();
            solveEquation();
            return;
        } else if (element.id === "tanh") {
            solveEquation();
            if (equation === "" && ans === "") {
                return;
            }
            equation = Math.tanh(ans).toString();
            solveEquation();
            return;
        } else {
            removeStartingZero();
            equation += element.textContent;
            if (!equation.includes("Ans")) {
                ans = undefined;
            }
        }
    }
    document.getElementById("equation").textContent = equation;
}

//to set the events on the keys on the keyboard for the calculator
function keyboardInput(event){
    const keyInput = event.key;
    if (keyInput === "Enter") {
        solveEquation();
        return;
    }
    if (keyInput === "Control") {
        openEx();
        return;
    }
    if (keyInput === 'Backspace') {
        equation = equation.slice(0, -1);
        if (equation.toString().length === 0) {
            equation = "0";
        }
        document.getElementById("equation").textContent = equation;
    }
    if (keyInput === "x"){
        equation = "0";
        document.getElementById("equation").textContent = equation;
    }
    if ((equation.length <= 19 && standard) || (equation.length <= 53 && !standard)) {
        switch (keyInput){
            case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":
                removeStartingZero();
                equation += Number(keyInput);
                break;
            case"+":case"*":case"/":case"-":
                if (!checkLastChar(keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+")){
                    if (!equation.slice(-1).match(/[0-9]/) && ans !== undefined) {
                        equation += "Ans" + (keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+");
                    } else {
                        equation += keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+";
                    }
                }
                break;
            case",":
                if (!checkLastChar(keyInput) && !checkForDuplicateCommas()){
                    equation += ",";
                }
                break;
            case "(":
                equation += "(";
                break;
            case ")":
                equation += ")";
                break;
            case "?":
                changeTheSign();
                break;
            case "%":
                equation += "÷100";
                break;
            case "!":
                solveEquation();
                let temp = faculty(ans);
                if (temp === undefined) {
                    return;
                }
                equation = temp.toString();
                solveEquation();
                return;
            case "s":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.sin(ans).toString();
                solveEquation();
                return;
            case "c":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.cos(ans).toString();
                solveEquation();
                return;
            case "t":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.tan(ans).toString();
                solveEquation();
                return;
            case "q":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.sinh(ans).toString();
                solveEquation();
                return;
            case "w":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.cosh(ans).toString();
                solveEquation();
                return;
            case "e":
                solveEquation();
                if (equation === "" && ans === "") {
                    return;
                }
                equation = Math.tanh(ans).toString();
                solveEquation();
                return;
            default:
                console.log(keyInput+ ":Ist noch nicht verfügbar!");
                return;
        }
    }
    document.getElementById("equation").textContent = equation;
}
//execute the equation
function solveEquation(){
    if (equation === ""){
        return;
    }
    equation = equation.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-").replaceAll("Ans", ans);
    if (!equation.includes("*") && !equation.includes("/") && !equation.includes("+") && !equation.includes("-") && equation.includes(",")) {
        document.getElementById("equation").textContent = equation === "" ? ans : equation !== "" ? equation : "0";
    } else {
        equation = equation.replaceAll(",", ".");
        checkForValidityAndSolve();
    }
}
function checkForValidityAndSolve(){
    try{
        equation = eval(equation).toString();
        document.getElementById("equation").textContent = equation.replace(".",",");
        ans = equation
        equation = "";
    }catch (e) {
        equation = "";
        ans = "";
        document.getElementById("equation").textContent = "Error";
    }
}
//Faculty
function faculty(temp){
    if (temp < 0 ) {
        equation = "";
        ans = "";
        document.getElementById("equation").textContent = "Error";
        return;
    }
    if (temp === 0){
        return 1;
    }
    return faculty(temp - 1) * temp;
}
function removeStartingZero(){
    equation = (equation === "0") ? "" : equation;
}
function checkLastChar(lastChar) {
    if (equation !== "") {
        let valid = equation.slice(-1).match(/[\+−×÷]/)
        if (valid && (equation+lastChar).slice(-2).match(/[\+×÷]−/)) {
            valid = false;
            valid = !valid && (equation.charAt(equation.length - 1) === "−");
        } else if (valid && (equation+lastChar).slice(-2).match(/[\+−×÷],/)) {
            equation += 0;
            valid = false;
        }
        return valid;
    } else {
        return !(ans !== undefined);
    }
}
function changeTheSign() {
    if (ans === undefined && (equation.slice(0, 2) !== "−(" && equation.slice(-1) !== ")")) {
        equation = "−(" + equation + ")";
    } else if (equation.slice(0, 2) === "−(" && equation.slice(-1) === ")") {
        equation = equation.slice(2,equation.length-1);
    }else if (ans !== undefined) {
        equation = "−(" + ans + ")";
    }
}
//check for duplicates Commas for valid equation string
function checkForDuplicateCommas(){
    let temp = 0;
    for (let i = 0; i < equation.length; i++) {
        if (equation.charAt(i) === '+' || equation.charAt(i) === '−' || equation.charAt(i) === "×" || equation.charAt(i) === "÷" ) {
            temp = 0;
        }
        if (equation.charAt(i) === ",") {
            temp++;
        }
    }
    return (temp >= 1);
}
//when calculator expend change
function openEx(){
    let extendedContainer = document.getElementById("extendedKeypadContainer");
    let standardContainer = document.getElementById("numericKeypadContainer");
    let equation = document.getElementById("equation");
    if (
        standard === true){
        let calculator = document.getElementById("calculator-standart");
        calculator.id = "calculator-extended";
        extendedContainer.setAttribute("style","display:grid;")
        standardContainer.setAttribute("style","padding:0 10px 10px 0;width:186px;");
    }else{
        let calculator = document.getElementById("calculator-extended");
        calculator.id = "calculator-standart";
        extendedContainer.setAttribute("style","display:none;");
        standardContainer.setAttribute("style","padding:0 10px 10px 10px;width:196px;");
    }
    standard = !standard;
}
//functions to move the calculator
function startDrag(e){
    startPosition["x"] = e.clientX;
    startPosition["y"] = e.clientY;
    document.addEventListener("mousemove",drag);
    document.addEventListener("mouseup",stopDrag);
}
function drag(e) {
    let newX = e.clientX - startPosition["x"];
    let newY = e.clientY - startPosition["y"];
    let calculator = document.querySelector(".calculator");
    calculator.setAttribute("style","left:"+(calculator.offsetLeft + newX)+"px;top:"+(calculator.offsetTop+newY)+"px;display:grid;");
    startPosition["x"] = e.clientX;
    startPosition["y"] = e.clientY;
}
function stopDrag() {
    document.removeEventListener("mousemove",drag);
    document.removeEventListener("mouseup",stopDrag);
}
function openCloseCalculator() {
    let calculator = document.querySelector(".calculator");
    if (open) {
        calculator.setAttribute("style", "display:none;");
    } else {
        calculator.setAttribute("style", "display:grid;")
    }
    open = !open;
}
main();