const announcedQuiz = document.getElementById('announced-quiz');
let positionQuiz = localStorage.getItem('position-quiz');
const optionsQuiz = document.getElementById('options-quiz');
const buttonSendQuiz = document.getElementById('button-send-quiz'); 
const currentBalance = document.getElementById('current-balance');
const screen01 = document.getElementById("screen-01");
const screen02 = document.getElementById("screen-02");
const screen03 = document.getElementById("screen-03");
const screen04 = document.getElementById("screen-04");

const quiz = [{
  id: '1',
  title: 'Qual dessas marcas de refrigerante voce consome com mais frequência? 🥤',
  options: [
    {
      description: 'Schin',
      isSelected: false, 
    },
    {
      description: 'Guarana Antartica',
      isSelected: false, 
    },
    {
      description: 'Sprite',
      isSelected: false, 
    },
    {
      description: 'Coca-Cola',
      isSelected: false, 
    },
    {
      description: 'Nenhuma das anteriores',
      isSelected: false, 
    },
  ]
}, {
  id: '2',
  title: 'Qual desses serviços de streaming você mais assiste em seu dia a dia? 📽️',
  options: [
  {
    description: 'Netflix',
    isSelected: false,
  },
  {
    description: 'Amazon Prime Video',
    isSelected: false,
  },
  {
    description: 'Disney+',
    isSelected: false,
  },
  {
    description: 'HBO Max',
    isSelected: false,
  },
  {
    description: 'Nenhuma das anteriores',
    isSelected: false
  }]
}, {
  id: '3',
  title: 'Qual dessas marcas de celular voce escolheria para comprar hoje? 📱',
  options: [
    {
      description: 'Apple',
      isSelected: false,
    },
    {
      description: 'Samsung',
      isSelected: false,
    },
    {
      description: 'Xiaomi',
      isSelected: false,
    },
    {
      description: 'Motorola',
      isSelected: false,
    },
    {
      description: 'Nenhuma das anteriores',
      isSelected: false,
    },
  ]
}];

function isValidForm(selectedQuiz) {
  const isTrueSelected = selectedQuiz.options.filter((option) => (option.isSelected === true));

  if(isTrueSelected.length <= 0) {
    console.log(isTrueSelected.length <= 0, 'primeiro');

    const isButtonDisabled = buttonSendQuiz.getAttribute('disabled');

    if(!isButtonDisabled) {
      buttonSendQuiz.setAttribute('disabled', 'false')
    }
  }

  if(isTrueSelected?.length > 0) {
    console.log(isTrueSelected?.length > 0, 'segundo');

    buttonSendQuiz.removeAttribute('disabled', 'false')
  }
}

function handleSelectedOption(id, description) {
  const selectedQuiz = quiz.find((value) => value.id === id);

  if(selectedQuiz) {
    const options = selectedQuiz.options.map((option) => {
      if(option.description.toLocaleLowerCase() === description.toLocaleLowerCase()) {
        option.isSelected = !option.isSelected;
      } 
      return option;
    });
    selectedQuiz.options = options;
  }
  
  isValidForm(selectedQuiz);
  alterScreenQuiz();
}

function alterScreenQuiz() {
  if(positionQuiz === '1') {
    screen01.className = 'none'
    screen02.classList = 'quiz-container'
    const quizSelected = quiz[0];
    announcedQuiz.innerText = quizSelected.title;
    optionsQuiz.innerHTML = quizSelected.options.map((option) => `
      <div onclick="handleSelectedOption('${quizSelected.id}', '${option.description}')" class="${option.isSelected ? 'option-selected' : 'option'}">
        <p>${option.description}</p>
      </div>`
    ).join(''); 
  }

  if(positionQuiz === '2') {
    screen01.className = 'none'
    screen02.classList = 'quiz-container'

    currentBalance.innerText = 'R$ 120';
    const quizSelected = quiz[1];
    announcedQuiz.innerText = quizSelected.title;
    optionsQuiz.innerHTML = quizSelected.options.map((option) => `
      <div onclick="handleSelectedOption('${quizSelected.id}', '${option.description}')" class="${option.isSelected ? 'option-selected' : 'option'}">
        <p>${option.description}</p>
      </div>`
    ).join(''); 
  }

  if(positionQuiz === '3') {
    screen02.classList = 'quiz-container'

    currentBalance.innerText = 'R$ 180';
    screen01.className = 'none'

    const quizSelected = quiz[2];
    announcedQuiz.innerText = quizSelected.title;
    optionsQuiz.innerHTML = quizSelected.options.map((option) => `
      <div onclick="handleSelectedOption('${quizSelected.id}', '${option.description}')" class="${option.isSelected ? 'option-selected' : 'option'}">
        <p>${option.description}</p>
      </div>`
    ).join(''); 
  }

  if(positionQuiz === '4') {
    currentBalance.innerText = 'R$ 180';

    screen01.classList = 'none';
    screen02.classList = 'none';
    screen03.classList = 'content-container'
  }

  if(positionQuiz === '5') {
    currentBalance.innerText = 'R$ 180';
    screen01.classList = 'none';
    screen02.classList = 'none';
    screen03.classList = 'none';
    screen04.classList = '';
  }

}

if(positionQuiz) {  
  alterScreenQuiz();
} else {
  positionQuiz = '0'
  localStorage.setItem('position-quiz', positionQuiz);
  alterScreenQuiz();
}

function handleAlterQuiz() {
  
  const totalPosition = Number(JSON.parse(positionQuiz)) + 1;
  
  localStorage.setItem('position-quiz', JSON.stringify(totalPosition));

  positionQuiz = JSON.stringify(totalPosition);

  alterScreenQuiz();
  buttonSendQuiz.setAttribute('disabled', 'false')
  playAudio();
}



function handleStartQuiz() {
  screen01.classList = 'none';
  screen02.classList = 'quiz-container';
  positionQuiz = '1'
  localStorage.setItem('position-quiz', positionQuiz);
  alterScreenQuiz();
}


function handleRedirectVideo() {
  screen03.classList = 'none ';
  screen04.classList = 'block';
  localStorage.setItem('position-quiz', '5');
}

function playAudio() {
  // Cria um novo objeto de áudio
  const audio = new Audio('./audio/cash.mp3');
  
  // Inicia a reprodução do áudio
  audio.play();
}