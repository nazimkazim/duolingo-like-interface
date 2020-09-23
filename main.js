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

  shuffle(randomWordsArr).map((randWord) => {
    const el = document.createElement('button');
    el.textContent = randWord;
    el.className = 'word';
    el.setAttribute('value', randWord);
    randomWordsField.appendChild(el);
  });

  const randomWordsList = document.querySelectorAll('.word');
  //console.log(randomWordsList);

  randomWordsList.forEach(w => {
    // create empty array to push list nodes value
    let wordsListRandomArr = [];
    w.addEventListener('click', (e) => {
      // define value we click
      let val = e.target.value;
      // get list nodes of random words field
      let listNodes = randomWordsField.childNodes;
      // make array of nodes
      let listNodesArr = Array.from(listNodes);
      // iterate nodes and push values to wordsListRandomArr
      listNodesArr.map((el) => {
        //console.log(el.value)
        wordsListRandomArr.push(el.value);
      });

      console.log(wordsListRandomArr);

      // get index of clicked word
      let idx = wordsListRandomArr.indexOf(val);
      // remove words from answer field by index
      randomWordsField.removeChild(randomWordsField.childNodes[idx]);
      //wordsListRandomArr.splice(idx, 1)
      console.log(wordsListRandomArr);
      // get word that is going to append to answer field 
      let appendedWord = wordsListRandomArr[idx];
      //console.log(appendedWord)
      //console.log(answerField)
      // create button el
      let el = document.createElement("button");
      // assign class
      el.className = 'word-answer';

      el.setAttribute('value', val);
      // assign text
      el.innerText = appendedWord;
      // append word to answer field                              
      answerField.appendChild(el);


      let answerWordsList = document.querySelectorAll('.word-answer');
      answerWordsList.forEach(w => {
        w.addEventListener('click', (e) => {
          let val = e.target.value;
          wordsListRandomArr.push(val);
          let el = document.createElement("button");
          // assign class
          el.className = 'word';

          el.setAttribute('value', val);
          // assign text
          el.innerText = appendedWord;
          // append word to answer field                              
          randomWordsField.appendChild(el);
          console.log(wordsListRandomArr);
        });
      });

    });
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
      if (word.highlighted) {
        wordEl.setAttribute('class', 'word-item highlighted');
      }
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











