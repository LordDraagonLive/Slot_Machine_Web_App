window.onload = function () {
    //totalLbl
    var totalLbl = document.getElementById('total');
    //winlbl
    var winlbl = document.getElementById('wins');
    //lostLbl
    var lostLbl = document.getElementById('losses');
    //avgLbl
    var avgLbl = document.getElementById('avg');
    //saveBtn
    var saveBtn = document.getElementById('saveBtn');
    var totalWons = localStorage.getItem("totalWons");
    var totalLost = localStorage.getItem("totalLost");
    var totals = localStorage.getItem("totals");
    var avg = localStorage.getItem("avg");
    winlbl.innerHTML = totalWons;
    lostLbl.innerHTML = totalLost;
    totalLbl.innerHTML = totals;
    avgLbl.innerHTML = avg;
    saveBtn.addEventListener("click", function () {
        //saving to firebase
        saveUser(totalWons, totalLost, totals);
        alert('Saved to cloud Successfully!');
        getUser();
    });
    //pie chart
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Pie Chart"
        },
        data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    { y: totalWons, label: "Wins" },
                    { y: totalLost, label: "Losses" }
                ]
            }]
    });
    chart.render();
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBlDwxuxc80AxxVqcqs6iBySsHDrE0RQ6U",
        authDomain: "slot-machine-game-15928.firebaseapp.com",
        databaseURL: "https://slot-machine-game-15928.firebaseio.com",
        projectId: "slot-machine-game-15928",
        storageBucket: "slot-machine-game-15928.appspot.com",
        messagingSenderId: "463063984105"
    };
    firebase.initializeApp(config);
    //reference users collection
    var usersRef = firebase.database().ref('users');
    var usersRef1 = firebase.database().ref();
    //save user data to firebase
    function saveUser(totalWins, totalLosses, total) {
        var newUsersRef = usersRef.push();
        newUsersRef.set({
            totalWins: totalWins,
            totalLosses: totalLosses,
            total: total
        });
    }
    //Get user data from firebase
    function getUser() {
        var childArr = [];
        usersRef1.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                //for(var i=0;i<3;i++){
                for (var key in childData) {
                    childData = childSnapshot.val();
                    childArr[key] = childData;
                }
                // alert(childData.getDate());
            });
        });
        console.log(childArr);
    }
};
