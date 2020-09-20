const board = document.querySelector('.board');
const avatarImg = document.querySelector('.avatar-img');
const sentContainer = document.querySelector('.sent-container');
const speakerEl = document.createElement('img');
const word = document.querySelectorAll('.word');
speakerEl.setAttribute('id', 'speaker')
speakerEl.src = '/assets/speaker.svg';

const tts = window.speechSynthesis;
let incr = 0;
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

const incrementer = () => {
  return incr += 1;
};

const resetQuestion = () => {
  sentContainer.innerHTML = ''
}

const iterateEachWord = (i) => {
  const questions = [...data];
  //console.log(questions[i])
  avatarImg.src = questions[i].pic;
  sentContainer.appendChild(speakerEl)
  questions[i].phraseByWord.map((word) => {
    const wordEl = document.createElement('button');
    wordEl.innerText = word.word;
    wordEl.setAttribute('class', 'word-item')
    wordEl.setAttribute('value', word.word)
    sentContainer.appendChild(wordEl)
  });
};

const getNewQuestion = (i) => {
  const questions = [...data];
  //console.log(questions[i])
  avatarImg.src = questions[i].pic;
  resetQuestion();
  iterateEachWord(i)
};


const speak = (phrase, lang) => {
  let toSpeak = new SpeechSynthesisUtterance(phrase);
  toSpeak.lang = lang;
  tts.speak(toSpeak);
};

speakerEl.addEventListener('click', () => {
  speak(data[incr].frPhrase, 'fr-FR');
});

//console.log(wordItems)



function answerFunc(val) {
  return answer.push(val);
}

word.forEach(item => item.addEventListener('click', (e) => {
  answerFunc(e.target.value);
  console.log(e.target.value);
}));

window.addEventListener('keydown', (key) => {
  if (key.keyCode == "39") {
    let i = incrementer();
    getNewQuestion(i);
    console.log(i);
  }
});

const wordItems = document.querySelectorAll('.word-item');

wordItems.forEach(wordItem => wordItem.addEventListener('mouseover', (e) => {
  console.log(e.target.value);
  speak(e.target.value, 'fr-FR');
}));



