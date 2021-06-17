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