// alert("There is not enough credit");
// var message:string = "Hello World";
// console.log(message);
/* ISymbol Interface*/
window.onload = function () {
    //Implementing ISymbol interface
    //class name was changed to Symbols as there's a in-built
    //library class called Symbol
    var Symbols = /** @class */ (function () {
        function Symbols(image, points) {
            this.image = null;
            this.setImage(image);
            this.setValue(points);
        }
        Symbols.prototype.setImage = function (image) {
            this.image = image;
        };
        Symbols.prototype.getImage = function () {
            return this.image;
        };
        Symbols.prototype.setValue = function (points) {
            this.points = points;
        };
        Symbols.prototype.getValue = function () {
            return this.points;
        };
        return Symbols;
    }());
    // Creating Reel class
    var Reel = /** @class */ (function () {
        //constructor
        function Reel() {
        }
        Reel.prototype.getRandomNum = function () {
            return this.randomNum;
        };
        Reel.prototype.setRandomNum = function (randomNum) {
            this.randomNum = randomNum;
        };
        Reel.addSymbol = function () {
            //creating vars to get the path of images and set the value
            var cherry = new Symbols('assets/images/cherry.png', 2);
            var lemon = new Symbols('assets/images/lemon.png', 3);
            var plum = new Symbols('assets/images/plum.png', 4);
            var waterMelon = new Symbols('assets/images/watermelon.png', 5);
            var bell = new Symbols('assets/images/bell.png', 6);
            var redSeven = new Symbols('assets/images/redseven.png', 7);
            //adding all symbols to the array
            Reel.symbol[0] = cherry;
            Reel.symbol[1] = lemon;
            Reel.symbol[2] = plum;
            Reel.symbol[3] = waterMelon;
            Reel.symbol[4] = bell;
            Reel.symbol[5] = redSeven;
        };
        //changing the images
        Reel.prototype.spinImage = function (slot, randomNum) {
            slot.src = Reel.symbol[randomNum].getImage();
        };
        //creating an array of symbol objects
        Reel.symbol = new Array(6);
        return Reel;
    }());
    //initilizing randomNum
    var randomNum = 0;
    //initilizing the 3 reels
    var reel1 = new Reel();
    var reel2 = new Reel();
    var reel3 = new Reel();
    /*Buttons */
    //spinBtn
    var spinBtn = document.getElementById('spinBtn');
    //betBtn
    var betBtn = document.getElementById('betBtn');
    //betMaxBtn
    var betMaxBtn = document.getElementById('betMaxBtn');
    //resetBtn
    var resetBtn = document.getElementById('resetBtn');
    //addCoinBtn
    var addCoinBtn = document.getElementById('addCoinBtn');
    //statBtn
    var statBtn = document.getElementById('statBtn');
    /*Labels */
    //creditLbl
    var creditLbl = document.getElementById('creditLbl');
    //currBetLbl
    var currBetLbl = document.getElementById('currBetLbl');
    //msgsLbl
    var msgsLbl = document.getElementById('msgsLbl');
    /*Slots */
    var slot1 = document.getElementById('slot1');
    var slot2 = document.getElementById('slot2');
    var slot3 = document.getElementById('slot3');
    /*Timer var*/
    var slot1Timer;
    var slot2Timer;
    var slot3Timer;
    /*Booleans and counters */
    var toSpin = false;
    //credit amount
    var credits = 10;
    //current bet display var
    var currBet = 0;
    //bet max counter
    var betmaxCount = 0;
    //spin status
    var spinStat = false;
    //total spin count
    var totalNoSpins = 0;
    //bool to check if slot1 can be stopped
    var slot01Bool = false;
    //bool to check if slot2 can be stopped
    var slot02Bool = false;
    //bool to check if slot3 can be stopped
    var slot03Bool = false;
    //won amount
    var wonAmount = 0;
    //total wins
    var totalWins = 0;
    //total loses
    var totalLoses = 0;
    //total no of wins and losses
    // let totalNoOfWinsLosses;
    // constructor(){
    //adding the symbols
    Reel.addSymbol();
    //spin button function
    spinBtn.addEventListener("click", function () {
        // alert('hi');
        spin();
    });
    function spin() {
        // alert('works');
        // console.log('btn func');
        if (toSpin) {
            if (!spinStat) {
                slot1Timer = setInterval(function imageSpinning() {
                    randomNum = Math.floor(Math.random() * 6);
                    reel1.setRandomNum(randomNum);
                    reel1.spinImage(slot1, reel1.getRandomNum());
                }, 100);
                slot2Timer = setInterval(function imageSpinning() {
                    randomNum = Math.floor(Math.random() * 6);
                    reel2.setRandomNum(randomNum);
                    reel2.spinImage(slot2, reel2.getRandomNum());
                }, 100);
                slot3Timer = setInterval(function imageSpinning() {
                    randomNum = Math.floor(Math.random() * 6);
                    reel3.setRandomNum(randomNum);
                    reel3.spinImage(slot3, reel3.getRandomNum());
                }, 100);
                //validating the buttons if user tried to press while spinning
                resetBtn.disabled = true;
                betBtn.disabled = true;
                betMaxBtn.disabled = true;
                msgsLbl.innerHTML = "Hit the First Slot!";
                totalNoSpins++;
                spinStat = true;
                slot01Bool = true;
                toSpin = false;
            }
            else {
                alert("Can't spin while spinning!!");
            }
        }
        else {
            alert('You need to bet before you spin');
        }
    }
    //stop spin functions
    //stopping slot 1 btn func
    slot1.addEventListener("click", function () {
        // alert('works');
        stopSlot1();
    });
    //stopping slot 1
    function stopSlot1() {
        if (slot01Bool) {
            clearInterval(slot1Timer);
            msgsLbl.innerHTML = "Hit the second Slot";
            slot01Bool = false;
            slot02Bool = true;
        }
        else {
            alert('You have to spin first to Stop');
        }
    }
    //stopping slot 2 btn func
    slot2.addEventListener("click", function () {
        // alert('works');
        stopSlot2();
    });
    //stopping slot 2
    function stopSlot2() {
        if (slot02Bool) {
            clearInterval(slot2Timer);
            msgsLbl.innerHTML = "Hit the Third Slot";
            slot02Bool = false;
            slot03Bool = true;
        }
        else {
            alert('Stop the first slot before stopping second slot');
        }
    }
    //stopping slot 3 btn func
    slot3.addEventListener("click", function () {
        // alert('works');
        stopSlot3();
    });
    //stopping slot 3
    function stopSlot3() {
        if (slot03Bool) {
            clearInterval(slot3Timer);
            //printing whether user won/lost
            wonOrLost();
            betmaxCount = 0;
            spinStat = false;
            slot03Bool = false;
            //re-enabling the buttons
            resetBtn.disabled = false;
            betBtn.disabled = false;
            betMaxBtn.disabled = false;
        }
        else {
            alert('Stop the first & Second Slot First');
        }
    }
    //add coin button func
    addCoinBtn.addEventListener("click", function () {
        addCredit();
    });
    //add credits
    function addCredit() {
        credits++;
        creditLbl.innerHTML = "" + credits;
    }
    //bet 1 button
    betBtn.addEventListener("click", function () {
        betOne();
    });
    //bet 1 func
    function betOne() {
        if (credits > 0) {
            credits -= 1;
            toSpin = true;
            currBet++;
            currBetLbl.innerHTML = "" + currBet;
            creditLbl.innerHTML = "" + credits;
        }
        else {
            alert('You ran out of credits!!!');
        }
    }
    //bet max button
    betMaxBtn.addEventListener("click", function () {
        betMax();
    });
    //bet max func
    function betMax() {
        //validating user to press max bet only once
        if (betmaxCount == 0) {
            if (credits >= 3) {
                credits -= 3;
                //validating whether all reels are stopped and ready to start a anonther game
                toSpin = true;
                currBet += 3;
                betmaxCount++;
                currBetLbl.innerHTML = "" + currBet;
                creditLbl.innerHTML = "" + credits;
            }
            else {
                alert('You ran out of credits!!!');
            }
        }
        else {
            alert('Max bet can only be used once');
        }
    }
    //reset btn
    resetBtn.addEventListener("click", function () {
        reset();
        alert('Game Restarted');
    });
    function reset() {
        credits += currBet;
        currBet = 0;
        toSpin = false;
        currBetLbl.innerHTML = "" + currBet;
        creditLbl.innerHTML = "" + credits;
        betmaxCount = 0;
    }
    //open statistics page
    statBtn.addEventListener("click", function () {
        var stasWin = window.open('/Statistics', '_blank');
        // console.log(totalWins);
        stasWin.focus();
    });
    //finding and displaying whether user won or lost
    function wonOrLost() {
        var stat = "";
        //3 reels
        var reel01 = Reel.symbol[reel1.getRandomNum()].getValue();
        var reel02 = Reel.symbol[reel2.getRandomNum()].getValue();
        var reel03 = Reel.symbol[reel3.getRandomNum()].getValue();
        console.log(reel01 + " " + reel02 + " " + reel03);
        if ((reel01 == reel02) && (reel02 == reel03) || (reel01 == reel02) || (reel02 == reel03) || (reel01 == reel03)) {
            if ((reel01 == reel02) && (reel02 == reel03)) {
                credits = credits + (reel01);
                wonAmount = wonAmount + (reel01);
                totalWins++;
                msgsLbl.innerHTML = "You Won! \u00a3 " + reel01;
            }
            else if ((reel01 == reel02)) {
                credits = credits + reel01;
                wonAmount = wonAmount + reel01;
                totalWins++;
                msgsLbl.innerHTML = "You Won! \u00a3 " + reel01;
            }
            else if ((reel02 == reel03)) {
                credits = credits + reel02;
                wonAmount = wonAmount + reel02;
                totalWins++;
                msgsLbl.innerHTML = "You Won! \u00a3 " + reel02;
            }
            else if (reel01 == reel03) {
                credits = credits + reel01;
                wonAmount = wonAmount + reel01;
                totalWins++;
                msgsLbl.innerHTML = "You Won! \u00a3 " + reel01;
            }
        }
        else {
            msgsLbl.innerHTML = "You Lost! ";
            totalLoses++;
        }
        currBet = 0;
        // totalNoOfWinsLosses=totalNoOfWinsLosses+(totalLoses+totalWins);
        currBetLbl.innerHTML = "" + currBet;
        creditLbl.innerHTML = "" + credits;
        // winlbl.innerHTML=""+totalWins;
        // lostLbl.innerHTML=""+totalLoses;
        // totalLbl.innerHTML=""+totalNoOfWinsLosses;
        // avgLbl.innerHTML=""+wonAmount/totalNoSpins;
        localStorage.setItem("totalWons", "" + totalWins);
        localStorage.setItem("totalLost", "" + totalLoses);
        localStorage.setItem("totals", "" + totalNoSpins);
        localStorage.setItem("avg", "" + Math.floor(wonAmount / totalNoSpins));
        // alert(totalNoSpins);
        // alert(localStorage.getItem("totals"));
        // winlbl.innerHTML=localStorage.getItem("totalWons");
        // var totWins = );
        // alert(totWins);
        // winlbl.innerHTML=totWins;
        // winlbl.innerText=localStorage.getItem("totalWons");
        // 
    }
};
