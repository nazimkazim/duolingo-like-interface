const board = document.querySelector('.board');
const tts = window.speechSynthesis;
let incr = 2;
const randomWordsArr = [];
const answer = [];


data.map((obj) => {
  splittedStr = obj.engPhrase.split(" ");
  return randomWordsArr.push(...splittedStr);
});

//console.log('line 11', randomWordsArr);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


board.innerHTML =
  `
  <div class="target-lang-container">
    <img src=${data[incr].pic} />
    <div class="speech-bubble">
      <div class="sent-container">
        <img id="speaker" src="/assets/speaker.svg" />
      ${data[incr].phraseByWord.map((word) => {
    return `<button value=${word.word} class="word-item ${word.highlighted && 'highlighted'}">${word.word}</button>`;
  }).join(' ')}
      </div>
    </div>
  </div>
  <div class="answer-field">
    ${answer.map((ans) => (
      `<button value=${ans} class="word">${ans}</button>`
    ))}
  </div>
  <div class="random-words-field">
    ${randomWordsArr.map((item) => (
    `<button value=${item} class="word">${item}</button>`
  )).join(' ')
  }
  </div>
  `;


const speaker = document.getElementById('speaker');

const speak = (phrase, lang) => {
  let toSpeak = new SpeechSynthesisUtterance(phrase);
  toSpeak.lang = lang;
  tts.speak(toSpeak);
};

speaker.addEventListener('click', () => {
  speak(data[incr].frPhrase, 'fr-FR');
});

const wordItems = document.querySelectorAll('.word-item');
const word = document.querySelectorAll('.word');

//console.log(wordItems)

wordItems.forEach(wordItem => wordItem.addEventListener('mouseover', (e) => {
  //console.log(e.target.value);
  speak(e.target.value, 'fr-FR');
}));

word.forEach(item => item.addEventListener('click', (e) => {
  answer.push(e.target.value)
  console.log(e.target.value);
}));

