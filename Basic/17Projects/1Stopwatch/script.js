// https://codepen.io/cathydutton/pen/GBcvo

window.onload = function () {
  
    var seconds = 00; 
    var tens = 00; 
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval ;
  
    buttonStart.addEventListener("click", function() {
      
       clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    })
    
    buttonStop.addEventListener("click", function() {
        clearInterval(Interval);
        var li = document.createElement("li");
        var inputValue = seconds + ":" + tens;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById("splits").appendChild(li);
    })
  
    buttonReset.addEventListener("click", function() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        var lst = document.getElementsByTagName("ul");
        lst[0].innerHTML = "";
    })
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens < 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    
    }
  }