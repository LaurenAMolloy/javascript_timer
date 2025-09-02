console.log("HI THERE");
//Event based archictecture
//Our program does two things
//We need elements related to the timer
//We need an animated border

//Pseudo Code
//This approach flips between border/timer and is confusing
//Listen for click
//Draw a border
//Start counting
//Update the border
//If the counter reaches 0
//Reset border

//A better approach would be an events approach
//We can emit an event or callback that can make code more resuable

//We are going to use a class!
//Timer class will have
//start, pause, onDuration, tick
//We will pass in DOM elements that represent duration, start and pause)

//Reminder on this! 
//The value of this inside a class!
//We want this inside a class to refer to the instance of the class that we create
//The reason for this is so we can access the methods on the class

//Three questions to ask when we are tryin to find the value of this?
// #1 Is it an arrow function? console.log this above the arrow what ever this is will be eqaul to this in the arrow function
// #2 Did you bind call or apply? It is the first argument passed in
// # 3 Where did we invoke the function?

//How do we store the data? Where does current time live?
//Option 1
//An instance variable? 
//Option 2
//Current time will live in the input
//We will take the value from the input
//Why would we do that?
//It makes UX easier to handle
//We do not need an event listener
//Storing data in the dom

class Timer {
    //special function that is called automatically
    //When a new timer is created
    //Timer class is going to listen to those events
    constructor(durationInput, startBtn, pauseBtn) {
        //assign to instance variables
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        //add event listener to the start button
        //bind event listeners to our elements
        this.startBtn.addEventListener("click", this.start);
        this.pauseBtn.addEventListener("click", this.pause);
    }
    //This arrow function is moved into the constructor under the hood so it solves our problem
    start = () => {
        //The value of this is the button!
        //It has been overwritten
        //console.log(this);
        //Call .tick every second
        this.tick();
        this.intervalId = setInterval(this.tick, 1000);
        
    };

    pause = () => {
        //get the timer variable
        console.log("paused")
        clearInterval(this.intervalId);
    };

    //tick method
    //what do we want to run every second?
    tick = () => {
        if (this.timeRemaining <= 0){
            this.pause();
        } else {
            this.timeRemaining = timeRemaining - 1;
        }
        //console.log("tick");
        //look into the dom
        //decrease the value
        //pull the value and get a number not a string
        //This is our one source of truth
        // const timeRemaining = parseFloat(this.durationInput.value);
        //The right hand side if this expression is the argument for the setter
        //this.timeRemaining = timeRemaining - 1;
        //console.log(timeRemaining)
    }

    //this is treated like an instance variable
    //we don't have to call a mathod when we do this
    //it makes it clear to other engineers we are just getting value from a variable
    //We have hidden the complexity
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time
    }

    //getters and setters
    // getTime(){
    //     return parseFloat(this.durationInput.value)
    // }
    // setTime (time){
    //     this.durationInput.value = time;
    // }
}

const durationInput = document.querySelector("#duration");
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");


const timer = new Timer(durationInput, startBtn, pauseBtn);
//timer.start();

//This refers to the window
// console.log(this);
// const printThis = (() =>{
//     console.log(this);   
// });

//Example of how to use call and apply to overide the value of this using a function expression
// const printThis = function(){
//     console.log(this);
// }

// printThis.call({color: "red"});
// printThis.apply({color: "red"});

// const colors = {
//     printColor() {
//         console.log(this);
//     }
// };
//What ever is to the left of the dot is the value of this!
//It is not determined by where the method is created
// colors.printColor();

// const randObject = {
//     a: 1
// };
// //copying the method
// randObject.printColor = colors.printColor;
// randObject.printColor();