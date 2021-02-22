// https://github.com/dmarcisovska/javascript-tip-calculator

window.onload = () => {

    let tipAmount= document.getElementById("tipForm");
    let billAmount = document.getElementById("billInput");
    let billCard = document.getElementById("bill-card");
    let buttonCalc = document.getElementById("calc-tip");

    buttonCalc.addEventListener("click", () => {

        //turn strings into numbers
        let tipAmountNumber = parseFloat(tipAmount.value);
        let billAmountNumber = parseFloat(billAmount.value);


        //grab elements
        let bill = document.getElementById('bill-p');
        let tip = document.getElementById('tip-p');
        let total = document.getElementById('total-p');

        // calculations
        let totalAmount = (billAmountNumber * tipAmountNumber/100);
        let totalBill = totalAmount + billAmountNumber;

        //append content
        tip.innerHTML = "₹" + (totalAmount).toFixed(2);
        bill.innerHTML =  "₹" + billAmountNumber.toFixed(2);
        total.innerHTML = "₹" + totalBill.toFixed(2);


        billCard.style.display = "block";
    })


    let slider = document.getElementById("tipInput");
    slider.addEventListener("click", () => {
        tipAmount.value = slider.value;
        console.log(`Sliding at ${tipAmount.value}%`);
    });

    tipAmount.addEventListener("input", () => {
            slider.value = tipAmount.value;
    });

}
