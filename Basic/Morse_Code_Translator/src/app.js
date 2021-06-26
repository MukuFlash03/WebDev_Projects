
const morDic = require('./morseDict.js');

/* Testing class constructor imports...this method works!
const buggy  = require('./constr_test.js');
const Car = new buggy.Car("ABC","Turquoise");
Car.show();
*/

/* Testing class constructor imports...this method works!
const WordCounter = new morseTrans.WordCounter();
WordCounter.display("Mukul");
*/

// import { WordCounter } from './morse-translator.js';
const morseTrans = require('./morse-translator.js');


const inputText = document.querySelector('#text1');
const statIn = document.querySelector('#stat1');

const outputText = document.querySelector('#text2');
const statOut = document.querySelector('#stat2');

const menuSelect = document.getElementById('.menu');
menuSelect.addEventListener('select', () => {
    console.log("Inn " + menuSelect.innerText);
    console.log("tC " + menuSelect.textContent);
    console.log("Val " + menuSelect.value);
})
console.log(menuSelect.value);


new morseTrans.WordCounter(inputText);

const render = ((event) => {
    statIn.innerHTML = `<p>You've written <span class="highlight">${event.detail.wordStat.words} words</span>
        and <span class="highlight">${event.detail.wordStat.characters} characters </span>.</p>`;

        
    if (inputText.value.trim() === '') {
        event.detail.wordStat.codeLen = 0;
        // console.log(event.detail.wordStat.codeLen);
    }
    
    // console.log(inputText.value.trim() === '');
    statOut.innerHTML = `<p>Cipher message contains <span class="highlight">${event.detail.wordStat.codeLen} characters </span>.</p>`;

    // outputText.innerHTML = inputText.value.toUpperCase();
    outputText.innerHTML = event.detail.wordStat.code;    
});

inputText.addEventListener('count', render);

/*
inputText.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === "Backspace" && inputText.value.trim() === '') {
        statOut.innerHTML = `<p>Cipher message contains <span class="highlight">0 characters </span>.</p>`;
    }
});
*/