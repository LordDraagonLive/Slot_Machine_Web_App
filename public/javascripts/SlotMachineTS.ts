// alert("There is not enough credit");

// var message:string = "Hello World";
// console.log(message);

/* ISymbol Interface*/
window.onload=function(){

/* ISymbol Interface*/
interface ISymbol{
    getImage():string;
    setValue(val:number):void;
    getValue():number;
    setImage(image:string):void;

}


//Implementing ISymbol interface
//class name was changed to Symbols as there's a in-built
//library class called Symbol
class Symbols implements ISymbol{

    private image:string=null;
    private points:number;

    constructor(image:string, points:number){
        this.setImage(image);
        this.setValue(points);
    }

    public setImage(image:string):void{
        this.image=image;
    }
    public getImage():string{
        return this.image;
    }

    public setValue(points:number):void{
        this.points=points;
    }

    public getValue():number{
        return this.points;
    }
}

// Creating Reel class
class Reel{
    
    //creating an array of symbol objects
    static symbol:Array<Symbols> = new Array(6);
    // private label:String;
    private randomNum:number;

    //constructor
    constructor(){
        
    }

    public getRandomNum():number{
        return this.randomNum;
    }

    public setRandomNum(randomNum:number):void{
        this.randomNum=randomNum;
    }

    public static addSymbol():void{

        //creating vars to get the path of images and set the value
        let cherry = new Symbols('assets/images/cherry.png',2);
        let lemon = new Symbols('assets/images/lemon.png',3);
        let plum = new Symbols('assets/images/plum.png',4);
        let waterMelon = new Symbols('assets/images/watermelon.png',5);
        let bell = new Symbols('assets/images/bell.png',6);
        let redSeven = new Symbols('assets/images/redseven.png',7);

        //adding all symbols to the array
        Reel.symbol[0]=cherry;
        Reel.symbol[1]=lemon;
        Reel.symbol[2]=plum;
        Reel.symbol[3]=waterMelon;
        Reel.symbol[4]=bell;
        Reel.symbol[5]=redSeven;

    }    
    
    //changing the images
    public spinImage(slot:HTMLImageElement, randomNum:number){

        slot.src = Reel.symbol[randomNum].getImage();

    }

}

    //initilizing randomNum
    let randomNum:number= 0;
    //initilizing the 3 reels
    let reel1:Reel = new Reel();
    let reel2:Reel = new Reel();
    let reel3:Reel = new Reel();
    

    /*Buttons */
    //spinBtn
    let spinBtn = document.getElementById('spinBtn');
    //betBtn
    let betBtn = document.getElementById('betBtn');
    //betMaxBtn
    let betMaxBtn = document.getElementById('betMaxBtn');
    //resetBtn
    let resetBtn = document.getElementById('resetBtn');
    //addCoinBtn
    let addCoinBtn = document.getElementById('addCoinBtn');
    //statBtn
    let statBtn = document.getElementById('statBtn');

    /*Labels */
    //creditLbl
    let creditLbl = document.getElementById('creditLbl');
    //currBetLbl
    let currBetLbl = document.getElementById('currBetLbl');
    //msgsLbl
    let msgsLbl = document.getElementById('msgsLbl');
    


    /*Slots */
    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');

    /*Timer var*/
    let slot1Timer;
    let slot2Timer;
    let slot3Timer;

    /*Booleans and counters */
    let toSpin=false;
    //credit amount
    let credits =10;
    //current bet display var
    let currBet = 0;
    //bet max counter
    let betmaxCount=0;
    //spin status
    let spinStat=false;
    //total spin count
    let totalNoSpins=0;
    //bool to check if slot1 can be stopped
    let slot01Bool=false
    //bool to check if slot2 can be stopped
    let slot02Bool=false
    //bool to check if slot3 can be stopped
    let slot03Bool=false

    //won amount
    let wonAmount=0;
    //total wins
    let totalWins=0;
    //total loses
    let totalLoses=0;
    //total no of wins and losses
    // let totalNoOfWinsLosses;

    // constructor(){

    //adding the symbols
    Reel.addSymbol();
            
    //spin button function
    spinBtn.addEventListener("click",function(){
        // alert('hi');
        spin();

    });

    function spin(){
        // alert('works');
        // console.log('btn func');
        if(toSpin){
            if(!spinStat){
                slot1Timer = setInterval(function imageSpinning()
                { 
                    randomNum=Math.floor(Math.random()*6);
                    reel1.setRandomNum(randomNum);
                    reel1.spinImage(<HTMLImageElement>slot1,reel1.getRandomNum());

                },100);

                slot2Timer = setInterval(function imageSpinning()
                {
                    randomNum=Math.floor(Math.random()*6);
                    reel2.setRandomNum(randomNum);
                    reel2.spinImage(<HTMLImageElement>slot2,reel2.getRandomNum());

                },100);

                slot3Timer = setInterval(function imageSpinning()
                {
                    randomNum=Math.floor(Math.random()*6);
                    reel3.setRandomNum(randomNum);
                    reel3.spinImage(<HTMLImageElement>slot3,reel3.getRandomNum());
                },100);

                //validating the buttons if user tried to press while spinning
                (<HTMLInputElement>resetBtn).disabled=true;
                (<HTMLInputElement>betBtn).disabled=true;
                (<HTMLInputElement>betMaxBtn).disabled=true;
                msgsLbl.innerHTML="Hit the First Slot!";
                totalNoSpins++;
                spinStat=true;
                slot01Bool=true;
                toSpin=false;
            }else{
                alert("Can't spin while spinning!!");
            }
        }else{
            alert('You need to bet before you spin');
        }
    }

    //stop spin functions
    //stopping slot 1 btn func
    slot1.addEventListener("click",function(){
        // alert('works');
        stopSlot1();

    });

    //stopping slot 1
    function stopSlot1(){
        if(slot01Bool){
            clearInterval(slot1Timer);
            msgsLbl.innerHTML="Hit the second Slot";
            slot01Bool=false;
            slot02Bool=true;
        }else{
            alert('You have to spin first to Stop');
        }
    }

    //stopping slot 2 btn func
    slot2.addEventListener("click",function(){
        // alert('works');
        stopSlot2();

    });

    //stopping slot 2
    function stopSlot2(){
        if(slot02Bool){
            clearInterval(slot2Timer);
            msgsLbl.innerHTML="Hit the Third Slot";
            slot02Bool=false;
            slot03Bool=true;
        }else{
            alert('Stop the first slot before stopping second slot');
        }
    }

    //stopping slot 3 btn func
    slot3.addEventListener("click",function(){
        // alert('works');
        stopSlot3();

    });

    //stopping slot 3
    function stopSlot3(){
        if(slot03Bool){
            clearInterval(slot3Timer);
            //printing whether user won/lost
            wonOrLost();
            betmaxCount=0;

            spinStat=false;
            slot03Bool=false;

            //re-enabling the buttons
            (<HTMLInputElement>resetBtn).disabled=false;
            (<HTMLInputElement>betBtn).disabled=false;
            (<HTMLInputElement>betMaxBtn).disabled=false;

           
    
        }else{
            alert('Stop the first & Second Slot First');
        }
    }

    //add coin button func
    addCoinBtn.addEventListener("click",function(){
        addCredit();

    });

    //add credits
    function addCredit(){
        credits++;
        creditLbl.innerHTML=""+credits;
    }
 
    //bet 1 button
    betBtn.addEventListener("click",function(){
        betOne();

    });

    //bet 1 func
    function betOne(){
        if(credits>0){
            credits-=1;
            toSpin=true;
            currBet++;
            currBetLbl.innerHTML=""+currBet;
            creditLbl.innerHTML=""+credits;
        }else{
            alert('You ran out of credits!!!')
        }
    }

    //bet max button
    betMaxBtn.addEventListener("click",function(){
        betMax();

    });

    //bet max func
    function betMax(){
        //validating user to press max bet only once
        if(betmaxCount==0){
            if(credits>=3){//validating if credits are available to bet
                credits-=3;
                //validating whether all reels are stopped and ready to start a anonther game
                toSpin=true;
                currBet+=3;
                betmaxCount++;
                currBetLbl.innerHTML=""+currBet;
                creditLbl.innerHTML=""+credits;
            }else{
                alert('You ran out of credits!!!');
            }
        }else{
            alert('Max bet can only be used once');
        }
    }

    //reset btn
    resetBtn.addEventListener("click",function(){
        reset();
        alert('Game Restarted')
    });

    function reset(){
        credits+=currBet;
        currBet=0;
        toSpin=false;
        currBetLbl.innerHTML=""+currBet;
        creditLbl.innerHTML=""+credits;
        betmaxCount=0;

    }

    //open statistics page
    statBtn.addEventListener("click",function(){
        let stasWin = window.open('/Statistics','_blank');
        // console.log(totalWins);
        stasWin.focus();

    });

    //finding and displaying whether user won or lost
    function wonOrLost(){

        let stat="";
          //3 reels
        let reel01=Reel.symbol[reel1.getRandomNum()].getValue();
        let reel02=Reel.symbol[reel2.getRandomNum()].getValue();
        let reel03=Reel.symbol[reel3.getRandomNum()].getValue();

        console.log(reel01+" "+reel02+" "+reel03);
        

        if((reel01==reel02) && (reel02==reel03) || (reel01==reel02) ||(reel02==reel03) || (reel01==reel03)){
            if((reel01==reel02) && (reel02==reel03)){

                credits=credits+(reel01);
                wonAmount=wonAmount+(reel01);
                totalWins++;

                msgsLbl.innerHTML="You Won! \u00a3 "+reel01;
            }else if((reel01==reel02)){
                
                credits=credits+reel01;
                wonAmount=wonAmount+reel01;
                totalWins++;

                msgsLbl.innerHTML="You Won! \u00a3 "+reel01;
            }else if((reel02==reel03)){
                
                credits=credits+reel02;
                wonAmount=wonAmount+reel02;
                totalWins++;

                msgsLbl.innerHTML="You Won! \u00a3 "+reel02;
            }else if(reel01==reel03){

                credits=credits+reel01;
                wonAmount=wonAmount+reel01;
                totalWins++;

                msgsLbl.innerHTML="You Won! \u00a3 "+reel01;
            }  
        }else{

            msgsLbl.innerHTML="You Lost! ";
            totalLoses++;
        }

        currBet=0;
        // totalNoOfWinsLosses=totalNoOfWinsLosses+(totalLoses+totalWins);
        currBetLbl.innerHTML=""+currBet;
        creditLbl.innerHTML=""+credits;
        // winlbl.innerHTML=""+totalWins;
        // lostLbl.innerHTML=""+totalLoses;
        // totalLbl.innerHTML=""+totalNoOfWinsLosses;
        // avgLbl.innerHTML=""+wonAmount/totalNoSpins;

        localStorage.setItem("totalWons",""+totalWins);
        localStorage.setItem("totalLost",""+totalLoses);
        localStorage.setItem("totals",""+totalNoSpins);
        localStorage.setItem("avg",""+Math.floor(wonAmount/totalNoSpins));
        // alert(totalNoSpins);
        // alert(localStorage.getItem("totals"));

        // winlbl.innerHTML=localStorage.getItem("totalWons");
        // var totWins = );
        // alert(totWins);
        // winlbl.innerHTML=totWins;
        // winlbl.innerText=localStorage.getItem("totalWons");
        // 

    }

}



