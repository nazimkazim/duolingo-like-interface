window.addEventListener('load', function () {
  const avatarImg = document.querySelector('.avatar-img');
  const sentContainer = document.querySelector('.sent-container');
  const speakerEl = document.createElement('img');
  const randomWordsField = document.querySelector('.random-words-field');
  const answerField = document.querySelector('.answer-field');
  speakerEl.setAttribute('id', 'speaker');
  speakerEl.src = '/assets/speaker.svg';


  const tts = window.speechSynthesis;
  let incr = 0;
  const randomWordsArr = [];


  data.map((obj) => {
    splittedStr = obj.engPhrase.split(" ");
    return randomWordsArr.push(...splittedStr);
  });
  //console.log(randomWordsArr);

  randomWordsArr.map((randWord) => {
    const el = document.createElement('button');
    el.textContent = randWord;
    el.className = 'word';
    el.setAttribute('value', randWord)
    randomWordsField.appendChild(el);
  });

  const wordList = document.querySelectorAll('.word');
  //console.log(wordList);

  wordList.forEach(w => {
    w.addEventListener('click', (e) => {
      console.log(e.target.value)
      answerField.removeChild(1)
    })
  });



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




  const resetQuestion = () => {
    sentContainer.innerHTML = '';
  };

  const iterateEachWord = (i) => {
    const questions = [...data];
    //console.log(questions[i])
    avatarImg.src = questions[i].pic;
    sentContainer.appendChild(speakerEl);
    questions[i].phraseByWord.map((word) => {
      let wordEl = document.createElement('button');
      wordEl.innerText = word.word;
      wordEl.setAttribute('class', 'word-item');
      wordEl.setAttribute('value', word.word);
      sentContainer.appendChild(wordEl);
    });
  };

  const getNewQuestion = (i) => {
    const questions = [...data];
    //console.log(questions[i])
    avatarImg.src = questions[i].pic;
    resetQuestion();
    iterateEachWord(i);
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(wordItem => wordItem.addEventListener('mouseover', (e) => {
      console.log(e.target.value);
      speak(e.target.value, 'fr-FR');
    }));
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

  window.addEventListener('keydown', (key) => {
    if (key.keyCode == "39") {
      incr += 1;
      getNewQuestion(incr);
    }
    if (key.keyCode == "37") {
      incr -= 1;
      getNewQuestion(incr);
    }
  });
});











