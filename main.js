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
  let randomWordsArr = [];
  let randomWordsArrDom = [];
  let answerFieldWordsArr = [];
  let copy_array = [];
  const widthHeightArr = [];
  var index = 0;
  //let answerWordsArrIsFull = false;

  // console.log('random words arr', randomWordsArr)


  data.map((obj) => {
    // console.log(obj)
    splittedStr = obj.engPhrase.split(" ");
    // console.log(splittedStr)
    // console.log(randomWordsArr);
    // console.log(randomWordsArrDom)
    copy_array = randomWordsArr;

    return randomWordsArr.push(...splittedStr);

  });
  // console.log(randomWordsArr);
  // console.log('random words arr', randomWordsArr)

  shuffle(randomWordsArr).map((randWord) => {

    //placeholder
    const parent_button = document.createElement('div');
    parent_button.className = 'placeholder';
    parent_button.id = index;


    //random word
    randomWordsField.appendChild(parent_button);
    const button_element = document.createElement('button');

    button_element.textContent = randWord;
    button_element.className = 'word';
    button_element.id = index;
    button_element.setAttribute('value', randWord);

    var current_placeholder = document.getElementById(index);
    current_placeholder.appendChild(button_element);

    //setting height and width of parent element equal to child element
    var childHeight = button_element.offsetHeight * 1.5;
    var childWidth = button_element.offsetWidth * 1.5;
    parent_button.style.height = childHeight + "px";
    parent_button.style.width = childWidth + "px";
    widthHeightArr[index] = [childHeight, childWidth];
    /* added.style.height = childHeight + "px"
    added.style.width = childWidth + "px" */
    index++;

    // randomWordsField.appendChild(ek);
  });

  randomWordsArrDom.forEach(w => {
    randomWordsField.appendChild(w);
  });

  //console.log(widthHeightArr)

  //function to push target into answer and changing eventlistner
  function pushIntoAnswer(e) {
    index = e.target.id;
    //console.log(e.target);
    answerFieldWordsArr.push(e.target);
    answerField.appendChild(e.target);
    randomWordsArr[index] = "";
    //console.log(e.target);
    e.target.removeEventListener('click', pushIntoAnswer);
    e.target.classList.remove('word');
    e.target.classList.add('added');
    e.target.style.height = widthHeightArr[index][0] + 'px';
    e.target.style.width = widthHeightArr[index][1] + 'px';
    e.target.addEventListener('click', removingElement);
  }

  //function to push answer into random array and changing eventlistner
  function removingElement(e) {
    let index = e.target.id;
    let parentDiv = randomWordsField.children[index];
    parentDiv.appendChild(e.target);
    randomWordsArr[index] = e.target.value;
    answerFieldWordsArr.pop();

    e.target.removeEventListener('click', removingElement);
    e.target.classList.add('word');
    e.target.classList.remove('added');
    e.target.style.height = widthHeightArr[index][0] - 3 + 'px';
    e.target.style.width = widthHeightArr[index][1] - 3 + 'px';
    e.target.addEventListener('click', pushIntoAnswer);
  }

  //map random array and add eventlister
  let arr = Array.from(randomWordsField.children);
  let childArr = arr.map((arr) => arr.children[0]);
  childArr.forEach(w => {
    w.addEventListener('click', pushIntoAnswer);

  });

  //map answer array and add eventlister
  answerFieldWordsArr = Array.from(answerField.children);
  answerFieldWordsArr.map(w => {
    w.addEventListener('click', removingElement);
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