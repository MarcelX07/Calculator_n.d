function main(){
    document.getElementById("addFunction").addEventListener("click",addFunctionInput);
}
function addFunctionInput(){
    const div = document.createElement("div");
    div.className = "functionInput";
    div.appendChild(createColorPicker());
    div.appendChild(creatPTag)
    document.getElementById("functions").appendChild(div);
}
function createColorPicker(){
    let input = document.createElement("input");
    input.type = "color";
    input.value = "#fffff";
    input.className = "functionColorPicker";
    return input;
}
function creatPTag(){

}
main();