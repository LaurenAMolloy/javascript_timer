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

const durationInput = document.querySelector("#duration");
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const circle = document.querySelector("circle");
const circumference = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', circumference);

//Pass in Optional callBacks
//Options object with hooks to update the border animation
let currentOffset = 0;
let duration;
const timer = new Timer(durationInput, startBtn, pauseBtn, {
onStart(totalDuration){
    //console.log('Timer starts');
    duration = totalDuration;
},
onTick(timeRemaining){
    //console.log("Timer just ticked down");
    circle.setAttribute('stroke-dashoffset', 
    circumference * timeRemaining / duration - circumference
    );
},
onComplete(){
    console.log("Timer completed");
}
});

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

