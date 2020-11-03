window.addEventListener('load', function () {
  const avatarImg = document.querySelector('.avatar-img');
  const sentContainer = document.querySelector('.sent-container');
  const speakerEl = document.createElement('img');
  const randomWordsField = document.querySelector('.random-words-field');
  const answerField = document.querySelector('.answer-field');
  let = checkButton = document.querySelector('.check-button');
  checkButton.disabled = true;
  speakerEl.setAttribute('id', 'speaker');
  speakerEl.src = '/assets/speaker.svg';


  const tts = window.speechSynthesis;
  let incr = 0;
  const randomWordsArr = [];
  const randomWordsArrDom = [];
  let answerFieldWordsArr = [];
  //let answerWordsArrIsFull = false;

  console.log('random words arr', randomWordsArr)

  
  data.map((obj) => {
    splittedStr = obj.engPhrase.split(" ");
    return randomWordsArr.push(...splittedStr);
  });
  //console.log(randomWordsArr);
  console.log('random words arr', randomWordsArr)

  shuffle(randomWordsArr).map((randWord) => {
    const el = document.createElement('button');
    el.textContent = randWord;
    el.className = 'word';
    el.setAttribute('value', randWord);
    randomWordsArrDom.push(el);
    randomWordsField.appendChild(el);
  });

  randomWordsArrDom.forEach(w => {
    randomWordsField.appendChild(w);
  });

  console.log('random words dom', randomWordsArrDom);

  function randomEls() {
    let arr = Array.from(randomWordsField.children);
    arr.forEach(w => {
      //console.log(w)
      w.addEventListener('click', (e) => {
        answerField.appendChild(e.target);
        //console.log(e.target)
        let index = randomWordsArrDom.indexOf(e.target);
        upd();
        arr.splice(index, 1);
        console.log(randomWordsField.children);
      });
    });
  }

  randomEls();

  //console.log(answerField.children.length) 
  function upd() {
    answerFieldWordsArr = Array.from(answerField.children);
    console.log(answerFieldWordsArr);

    answerFieldWordsArr.map(w => {
      w.addEventListener('click', (e) => {
        console.log(e.target);
        let index = answerFieldWordsArr.indexOf(e.target);
        randomWordsField.appendChild(e.target);
        answerFieldWordsArr.splice(index, 1);
        console.log(answerFieldWordsArr.length);
      });
    });

    if (answerFieldWordsArr.length > 0) {
      checkButton.disabled = false;
      checkButton.classList.add("enabled-check-button");
    }

    if (answerFieldWordsArr.length === 0) {
      checkButton.disabled = true;
      checkButton.classList.remove("enabled-check-button");
    }
  }

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
      if (word.highlighted) {
        wordEl.setAttribute('class', 'word-item highlighted');
      }
      wordEl.setAttribute('value', word.word);
      sentContainer.appendChild(wordEl);
    });
  };

  iterateEachWord(0);

  const getNewQuestion = (i) => {
    const questions = [...data];
    //console.log(questions[i])
    avatarImg.src = questions[i].pic;
    resetQuestion();
    iterateEachWord(i);
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(wordItem => wordItem.addEventListener('mouseover', (e) => {
      //console.log(e.target.value);
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











