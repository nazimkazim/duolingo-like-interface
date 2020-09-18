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

const tts = window.speechSynthesis;
const board = document.querySelector('.board');
let voices = [];
let incr = 0;

const GetVoices = () => {
  voices = tts.getVoices()[8];
  //console.log(voices)
};

GetVoices()

if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = GetVoices;
}
//console.log(voices);


  board.innerHTML =
    `
  <div class="target-lang-container">
  <img src=${data[incr].pic} />
  <div class="speech-bubble">
    <div class="sent-container"><img id="speaker" src="/assets/speaker.svg" />
    ${data[incr].phraseByWord.map((word) => {
      return `<span>${word.word}</span>`;
    }).join(' ')}
    </div</div></div>`;


const speaker = document.getElementById('speaker');
speaker.addEventListener('click', () => {
  let toSpeak = new SpeechSynthesisUtterance(data[incr].frPhrase);
  toSpeak.lang = 'fr-FR';
  tts.speak(toSpeak);
});

