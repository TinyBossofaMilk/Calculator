/* TODO: INtegration of decimal point logics
 //ce clears it, backspace clears it,, true when someone clicks the . operator.
 //then you add floating point part. 

 limit how many decimal points you can add

FORGET EVERYTHING, CHANGE INTEGER ADDITION FROM DISPLAY*10 + INT to just adding it on the string
    decimal point bool
        checked after every operation, turned on if there are decimal places.
        turned on when . op is pressed
        turned off when operator happens
        when clear happens
        when backspace happens 


        for all number input functions EXCEPT 0
        1) checks if decmial point is true
        2) then adds to floating point part.
            adds by finding decimal place, then taking that integer * pow(10, [decimalplace])
instead, just check if there is a decimal before adding dec point

TODO: remove all global variables.
*/

const body = document.querySelector("body");
let storedValue = undefined;
let storedOperator = undefined;
let lastEntrywasOp = false;
let clearDisplay = false;
let floatingPointInts = 0;
let decimalPoint;

const buttonMarginPx = 10;
const buttonPaddingPx = 50;
const gapPx = 10;

function makeCalculator()
{
    body.style.display = "flex";
    body.style.flex = "1";
    body.style.justifyContent = "center";
    //body.style.alignItems = "space-around";

    const calculator = document.createElement("div");
    calculator.style.display = "flex-column"; 
    calculator.style.border = "solid black";
 
    //calculator.style.justifyContent = "center";
    //calculator.style.flexDirection = "column";
    body.appendChild(calculator);
    
    const display = document.createElement("div");
    display.textContent = 0;
    display.id = "display";
    display.style.backgroundColor = "grey";
    display.style.margin = buttonMarginPx + "px";
    display.style.padding = `10px`;
    display.style.fontFamily = "";
    // display.style.fontWeight = "bold";
    
    display.style.fontSize = "50px";
    calculator.appendChild(display);
    
    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    calculator.appendChild(buttons);

    const inputbuttons = document.createElement("div");
    inputbuttons.style.display = "flex-column";
    buttons.appendChild(inputbuttons);
    
    /*********************************************************************** MISC BUTTONS */

    const miscFunctions = document.createElement("div");
    miscFunctions.style.display = "flex";
    miscFunctions.style.margin = buttonMarginPx + "px";
    miscFunctions.style.justifyContent = "space-between";
    miscFunctions.style.gap = gapPx + "px";
    
    inputbuttons.appendChild(miscFunctions);

    const miscbuttons = [];
    for(let i = 0; i < 4; i++)
    {
        miscbuttons[i] = document.createElement("button");
        miscbuttons[i].id = "misc";        
        miscbuttons[i].style.backgroundColor = "pink";
        miscbuttons[i].style.margin = buttonMarginPx + "px";
        miscbuttons[i].style.padding = `${buttonPaddingPx/2}px ${buttonPaddingPx}px`;
        
        miscbuttons[i].style.flex = "1 1 auto";

        miscFunctions.appendChild(miscbuttons[i]);
    }

    for(let i = 4; i < 5; i++)
    {miscbuttons[i] = document.createElement("button");}

    miscbuttons[0].textContent = "A/C";
    miscbuttons[1].textContent = "+/-";
    miscbuttons[2].textContent = "%";
    miscbuttons[3].textContent = "<=";
    miscbuttons[4].textContent = ".";

    miscbuttons[0].addEventListener("click", ( () => {
        const displayText = document.getElementById("display");
        storedValue = undefined;
        storedOperator = undefined;
        lastEntrywasOp = false;
        displayText.textContent = 0;
    }));
    miscbuttons[1].addEventListener("click", ( () => {
        const displayText = document.getElementById("display");
        displayText.textContent *= -1;
    }));
    miscbuttons[2].addEventListener("click", ( () => {
        const displayText = document.getElementById("display");
        displayText.textContent /= 100;
    }));
    miscbuttons[3].addEventListener("click", ( () => {
        const displayText = document.getElementById("display");
        displayText.textContent = (displayText.textContent.length == 1) ? 0 : displayText.textContent.substring(0, displayText.textContent.length-1);

        // if(displayText.textContent == "")
            
    }));
    miscbuttons[4].addEventListener("click", ( () => {
        const displayText = document.getElementById("display");
        if(!isDecimal(display.textContent))
            {displayText.textContent += ".";}
    }));


    /*********************************************************************** NUMBERS */

    const numbersRowArr = [];
    for(let i = 3; i >= 0; i--)
    {
        numbersRowArr[i] = document.createElement("div");
        numbersRowArr[i].style.display = "flex";
        numbersRowArr[i].style.margin = buttonMarginPx + "px";
        numbersRowArr[i].style.justifyContent = "space-between";

        
        // numbersRowArr[i].style.gap = gapPx + "px";
        inputbuttons.appendChild(numbersRowArr[i]);
    }

    const numbersElementsArr = [];
    for(let i = 0; i < 10; i++)
    {
        numbersElementsArr[i] = document.createElement("button");
        numbersElementsArr[i].id = "integer";
        numbersElementsArr[i].textContent = i;
        numbersElementsArr[i].style.backgroundColor = "cyan";
        numbersElementsArr[i].style.margin = buttonMarginPx + "px";
        numbersElementsArr[i].style.padding = `${buttonPaddingPx/2}px ${buttonPaddingPx}px`;

        numbersElementsArr[i].addEventListener("click", ( () => {
            const displayText = document.getElementById("display");
            lastEntrywasOp = false;

            if(clearDisplay)
            {
                displayText.textContent = 0;
                clearDisplay = false;
            }

            if(display.textContent == 0)
            {
                displayText.textContent = i; 
            }
            else
                displayText.textContent += i;
        }));
    }

    for(let i = 7; i < 10 ; i++)
    {numbersRowArr[3].appendChild(numbersElementsArr[i]);}
    for(let i = 4; i < 7 ; i++)
    {numbersRowArr[2].appendChild(numbersElementsArr[i]);}
    for(let i = 1; i < 4 ; i++)
    {numbersRowArr[1].appendChild(numbersElementsArr[i]);}
    numbersRowArr[0].appendChild(numbersElementsArr[0]);
    numbersRowArr[0].appendChild(miscbuttons[4]);


    /*********************************************************************** OPERATORS */

    const operatorsColumn = document.createElement("div");
    operatorsColumn.style.display = "flex";
    operatorsColumn.style.flexDirection = "column"
    operatorsColumn.style.margin = buttonMarginPx + "px";
    operatorsColumn.style.justifyContent = "space-between";
    operatorsColumn.style.gap = gapPx + "px";
    buttons.appendChild(operatorsColumn);

    const operatorsArr = [];
    for(let i = 0; i < 5; i++)
    {
        operatorsArr[i] = document.createElement("button");
        operatorsArr[i].id = "op";
        operatorsArr[i].style.backgroundColor = "orange";
        operatorsArr[i].style.margin = buttonMarginPx + "px";
        operatorsArr[i].style.padding = `${buttonPaddingPx/2}px ${buttonPaddingPx}px`;

        operatorsArr[i].addEventListener("click", ( () => {
            const displayText = document.getElementById("display");
            operate(operatorsArr[i].textContent, storedValue, displayText.textContent);
        }));

        operatorsColumn.appendChild(operatorsArr[i]);
    }

    operatorsArr[0].textContent = "/";
    operatorsArr[1].textContent = "*";
    operatorsArr[2].textContent = "-";
    operatorsArr[3].textContent = "+";
    operatorsArr[4].textContent = "=";
}

//operate(operatorsArr[i].textContent, storedValue, displayText.textContent);
function operate(operator, a, b)
{
    const display = document.getElementById("display");
    
    if(lastEntrywasOp)
    {
        storedOperator = operator;
        return;
    }
    else if (typeof storedValue == "undefined")
    {
        storedValue = display.textContent;
        storedOperator = operator;
        clearDisplay = true;
    }
    else
    {
        switch(storedOperator)
        {
            case "+" :  display.textContent = add(a,b);
                        break;
            
            case "-" :  display.textContent = subtract(a,b);
                        break;
            
            case "*":   display.textContent = multiply(a,b);
                        break;
            
            case "/":   display.textContent = divide(a,b);
                        break;
        }
    
        clearDisplay = true;
        storedValue = display.textContent;
        storedOperator = operator;
    }
    lastEntrywasOp = true;
}

function addKeyboardSupport()
{
    // window.addEventListener("keydown", )

}

function add(a, b)
{return +a + +b;}

function subtract(a, b)
{return a - b;}

function multiply(a, b)
{return a * b;}

function divide(a, b)
{
    if(b != 0)
        return a / b;
    
    alert("Cannot divide by 0.");
    alert("idiot");
        return Infinity;
}

function numDecimalPlaces(number)
{
    let i;
    for(i = 0; number*Math.pow(10,i) != Math.round(number*Math.pow(10,i)); i++)
    {}// console.log(`${number*Math.pow(10,i)} ${Math.round(number*Math.pow(10,i))}`);
    return i; 
}

function isDecimal(number)
{
    return number.indexOf(".") != -1;
}

makeCalculator();

/*
Do not worry about wiring up the JS just yet.
There should also be a display for the calculator, go ahead and fill it with some dummy numbers so you can get it looking right.
Add a ???clear??? button.
Create the functions that populate the display when you click the number buttons??? you should be storing the ???display value??? in a variable somewhere for use in the next step.
Make the calculator work! You???ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the ???=??? key.
You should already have the code that can populate the display, so once operate() has been called, update the display with the ???solution??? to the operation.
This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don???t feel bad if it takes you a while to figure out the logic.

Gotchas: watch out for and fix these bugs if they show up in your code:
Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we???re looking for would be this student solution.
Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
You should round answers with long decimals so that they don???t overflow the screen.
Pressing = before entering all of the numbers or an operator could cause problems!
Pressing ???clear??? should wipe out any existing data.. make sure the user is really starting fresh after pressing ???clear???
Display a snarky error message if the user tries to divide by 0??? don???t let it crash your calculator!

EXTRA CREDIT: Users can get floating point numbers if they do the Math required to get one, but they can???t type them in yet. 
Add a . button and let users input decimals! Make sure you don???t let them type more than one though: 12.3.56.5. 
It is hard to do Math on these numbers. (disable the decimal button if there???s already one in the display)

EXTRA CREDIT: Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.

EXTRA CREDIT: Add a ???backspace??? button, so the user can undo if they click the wrong number.

EXTRA CREDIT: Add keyboard support!
*/