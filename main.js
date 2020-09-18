/* import LaraWoman from './assets/lara-woman.svg';
import OlgaWoman from './assets/olga-woman.svg';
import VictorMale from './assets/victor-male.svg'; */

const data = [
  {
    pic: './assets/lara-woman.svg',
    frPhrase: 'Tu parles japonais?',
    engPhrase: 'Do you speak Japanese?',
    phraseByWord: [
      {
        word: 'Tu',
        trans: ['you']
      },
      {
        word: 'parles',
        trans: ['(you) speak', '(you) are speaking', '(you) are talking']
      },
      {
        word: 'japonais',
        trans: ['Japanese'],
        highlighted: true
      }
    ]
  },
  {
    pic: './assets/olga-woman.svg',
    frPhrase: `Il vient d'Australie`,
    engPhrase: 'He comes from Australia',
    phraseByWord: [
      {
        word: 'Il',
        trans: ['he', 'him', 'it']
      },
      {
        word: 'vient d',
        trans: ['come from', 'is from', 'has just'],
        highlighted: true
      },
      {
        word: 'Australie',
        trans: ['Australia']
      }
    ]
  },
  {
    pic: './assets/victor-male.svg',
    frPhrase: `Je suis canadien`,
    engPhrase: 'I am Canadian',
    phraseByWord: [
      {
        word: 'Je',
        trans: ['I']
      },
      {
        word: 'suis',
        trans: ['am']
      },
      {
        word: 'canadien',
        trans: ['Canadian'],
        highlighted: true
      }
    ]
  }
];

const board = document.querySelector('.board');
const tts = window.speechSynthesis;
let incr = 0;


board.innerHTML =
  `
  <div class="target-lang-container">
  <img src=${data[incr].pic} />
  <div class="speech-bubble">
    <div class="sent-container"><img id="speaker" src="/assets/speaker.svg" />
    ${data[incr].phraseByWord.map((word) => {
    return `<button value=${word.word} class="word-item ${word.highlighted && 'highlighted'}">${word.word}</button>`;
  }).join(' ')}
    </div</div></div>`;


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

//console.log(wordItems)

wordItems.forEach(wordItem => wordItem.addEventListener('mouseover', (e) => {
  //console.log(e.target.value);
  speak(e.target.value, 'fr-FR');
}));

