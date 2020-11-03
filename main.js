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

  checkButton.addEventListener('click', () => {
    console.log('clicked');
  });


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
    randomWordsArrDom.push(el);
    randomWordsField.appendChild(el);
  });

  //const randomWordsList = document.querySelectorAll('.word');
  //console.log(randomWordsList);

  //console.log(randomWordsArrDom);

  // append random words to the randomWordsField
  randomWordsArrDom.forEach(w => {
    randomWordsField.appendChild(w);
  });

  // this function is responsible for adding words to the answer field
  function randomEls() {
    // get arr of words in random words field
    let arr = Array.from(randomWordsField.children);
    // iterate and add them to the answer field on click
    arr.forEach(w => {
      //console.log(w)
      w.addEventListener('click', (e) => {
        answerField.appendChild(e.target);
        //console.log(e.target)
        let index = randomWordsArrDom.indexOf(e.target);
        //console.log(index)
        //randomWordsArrDom.splice(index, 1);
        //console.log(randomWordsArrDom)
        /* if (answerWordsArrDom.length > randomWordsArr.length || answerWordsArrDom.includes(e.target)) {
          answerWordsArrIsFull = true;
        } */

        /* if (!answerWordsArrIsFull) {
          answerWordsArrDom.push(e.target);
        } */
        //console.log(answerWordsArrDom);
        //console.log(randomWordsArrDom);
        upd();
        arr.splice(index, 1);
        console.log(randomWordsField.children);
      });
    });
  }

  randomEls();


  /* answerWordsArrDom.forEach(w => {
    showWords();
    console.log('hey');
    w.addEventListener('click', (e) => {
      console.log(e.target);
      console.log('hhh');
      let index = answerWordsArrDom.indexOf(e.target);
      answerWordsArrDom.splice(index, 1);
      randomWordsField.appendChild(e.target);
    });
  }); */

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
    /* if (answerFieldWordsArr.length === 1) {
      console.log('empty')
      answerFieldWordsArr.length = 0
      answerField.children.innerHTML = ''
      randomEls()
      console.log(answerFieldWordsArr)
    } */
  }



  /* randomWordsList.forEach(w => {
    // create empty array to push list nodes value
    let wordsListRandomArr = [];
    let anwersArr = [];
    w.addEventListener('click', (e) => {
      // define value we click
      let val = e.target.value;
      // get list nodes of random words field
      let listNodes = randomWordsField.childNodes;
      // make array of nodes
      let listNodesArr = Array.from(listNodes);
      // iterate nodes and push values to wordsListRandomArr
      listNodesArr.map((el, index) => {
        //console.log(el.value)
        wordsListRandomArr.push({ val: el.value, idx: index });
        //console.log(wordsListRandomArr);
      });

      console.log(wordsListRandomArr);

      // get index func
      function getVal(v) {
        let val = wordsListRandomArr.filter(obj => {
          return obj.val === v;
        });

        return val[0].idx;
      }

      // get index of clicked word
      let idx = getVal(val);
      console.log(idx);
      // remove words from answer field by index
      randomWordsField.removeChild(randomWordsField.childNodes[idx]);
      //wordsListRandomArr.splice(idx, 1)
      console.log(wordsListRandomArr);
      // get word that is going to append to answer field 
      let appendedWord = wordsListRandomArr[idx].val;
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

      anwersArr.push({ val: val, idx: idx })

      console.log(anwersArr)

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
  }); */

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











