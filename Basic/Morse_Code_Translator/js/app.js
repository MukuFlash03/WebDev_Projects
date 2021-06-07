const inputText = document.querySelector('#text1');
const statIn = document.querySelector('#stat1');

const outputText = document.querySelector('#text2');
const statOut = document.querySelector('#stat2');

new WordCounter(inputText);

const render = ((event) => {
    statIn.innerHTML = `<p>You've written <span class="highlight">${event.detail.wordStat.words} words</span>
        and <span class="highlight">${event.detail.wordStat.characters} characters </span>.</p>`;

    statOut.innerHTML = `<p>Cipher message contains <span class="highlight">${event.detail.wordStat.characters} characters </span>.</p>`;

    outputText.innerHTML = inputText.value;
});

inputText.addEventListener('count', render);

