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

const board = document.querySelector('.board');

data.map((item) => {
  board.innerHTML =
    `
  <div class="target-lang-container">
  <img src=${item.pic} />
  <div class="speech-bubble">
    <div class="sent-container"><img src="/assets/speaker.svg" />
    ${item.phraseByWord.map((word) => {
      return `<span>${word.word}</span>`;
    }).join(' ')}
    </div</div></div>`;
});