(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{"./morse-translator.js":2,"./morseDict.js":3}],2:[function(require,module,exports){
// https://www.javascripttutorial.net/javascript-dom/javascript-word-counter/

// import { morseDict }  from './morseDict.js';
// console.log(morseDict);

const morseDict = require('./morseDict.js').morseDict;
console.log(morseDict);

// export class WordCounter {
class WordCounter {

    constructor(inputText) {
        this.inputText = inputText;
        this.inputText.addEventListener('input', () => {
            this.count()
        });
        
    }
    count() {
        let wordStat = this.getWordStat(this.inputText.value.trim());
        // console.log(morseDict);

        let messageSymbols = this.inputText.value.toUpperCase().split("");
        // console.log(messageSymbols);
        wordStat.code = this.encodeMessage(messageSymbols);
        // console.log(wordStat.code);
        wordStat.codeLen = wordStat.code.length - messageSymbols.length + 1; // total size - no. of spaces

        this.emitEvent(wordStat);
    }

    encodeMessage(message) {
        let code = message.map(element => {
             if (morseDict[element] === undefined)
                 return element;
             return morseDict[element];
            // console.log(element + " : " + morseDict[element]);
        });
        // console.log(code);
        return code.join(" ");
    }

    display(message) {
        console.log(`Hi, ${message}!`);
    }

    getWordStat(str) {
        let matches = str.match(/\S+/g);
        return {
            characters: str.length,
            words: matches? matches.length : 0,
        };
    }

    emitEvent(wordStat) {

        //Create count event
        let countEvent = new CustomEvent('count', {
            bubbles: true,
            cancelable: true,
            detail: {
                wordStat
            }
        });

        //Dispatch count event
        this.inputText.dispatchEvent(countEvent);
    }
}

window.WordCounter = WordCounter;

exports.WordCounter = WordCounter;
},{"./morseDict.js":3}],3:[function(require,module,exports){
const dict = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
    " ": "/",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    "_": "..--.-",
    "\"": ".-..-.",
    "'": ".----.",
    "@": ".--.-.",
    "%": "-..-.-----"
}


// export { dict as morseDict };


exports.morseDict = dict;



// Preparing punctuation morsedict using forEach and map array methods
/*
const symbol = [
    '.', ',', '?', '!', 
    '/', '(', ')', '&', 
    ':', ';', '=', '+', 
    '-', '_', '"', "'", 
    '@', '%'
    ];
    
    const morse = [
        '.-.-.-', '--..--', '..--..', '-.-.--',
        '-..-.', '-.--.', '-.--.', '.-...', 
        '---...', '-.-.-.', '-...-', '.-.-.', 
        '-....-', '..--.-', '.-..-.', '.----.', 
        '.--.-.', '-..-.-----',
    ];
    
    
    console.log("ForEach");
    symbol.forEach((element,index) => console.log(`"${element}": "${morse[index]}",`));
    
    
    console.log("Map");
    let symbolDict = {};
    
    symbol.map((item,index) => {
        symbolDict[item] = morse[index];
    });
    console.log(symbolDict);
*/

},{}]},{},[1,2,3]);
