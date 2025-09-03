class Timer {
    //special function that is called automatically
    //When a new timer is created
    //Timer class is going to listen to those events
    constructor(durationInput, startBtn, pauseBtn, callbacks) {
        //assign to instance variables
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        if(callbacks){
            //reference to the on start function
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        //add event listener to the start button
        //bind event listeners to our elements
        this.startBtn.addEventListener("click", this.start);
        this.pauseBtn.addEventListener("click", this.pause);
    }
    //This arrow function is moved into the constructor under the hood so it solves our problem
    start = () => {
        //check for the callback
        if(this.onStart) {
            this.onStart(this.timeRemaining);
        }
        //The value of this is the button!
        //It has been overwritten
        //console.log(this);
        //Call .tick every second
        this.tick();
        this.intervalId = setInterval(this.tick, 50); 
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
            if(this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - .05;
            if(this.onTick) {
                this.onTick(this.timeRemaining);
            }
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
    };

    //this is treated like an instance variable
    //we don't have to call a mathod when we do this
    //it makes it clear to other engineers we are just getting value from a variable
    //We have hidden the complexity
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }

    //getters and setters
    // getTime(){
    //     return parseFloat(this.durationInput.value)
    // }
    // setTime (time){
    //     this.durationInput.value = time;
    // }
}