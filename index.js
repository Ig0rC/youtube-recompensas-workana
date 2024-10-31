document.addEventListener('contextmenu', function (e) {
  e.preventDefault(); // Impede o menu de contexto padrão
});
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault(); // Impede a ação padrão
  }
});
const announcedQuiz = document.getElementById('announced-quiz');
let positionQuiz = localStorage.getItem('position-quiz');
const optionsQuiz = document.getElementById('options-quiz');
const buttonSendQuiz = document.getElementById('button-send-quiz');
const currentBalance = document.getElementById('current-balance');
const screen01 = document.getElementById("screen-01");
const screen02 = document.getElementById("screen-02");
const screen03 = document.getElementById("screen-03");
const screen04 = document.getElementById("screen-04");
const screen05 = document.getElementById("screen-05");
const content = document.getElementById("content");
const currentBalanceHeader = document.getElementById("current-balance-header");
const header = document.getElementById("header");
const goRedirectKirvano = document.getElementById("go-redirect-kirvano");
goRedirectKirvano.className = 'none';
// 100 nomes brasileiros
let ms = 100;
const nomes = [
  "Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Helena", "Igor", "Juliana",
  "Lucas", "Mariana", "Nicolas", "Olivia", "Paulo", "Quintino", "Rafael", "Sofia", "Thiago", "Ursula",
  "Vinicius", "Wellington", "Ximena", "Yara", "Zeca", "Amanda", "Bernardo", "Camila", "Diego", "Elisa",
  "Felipe", "Giovanna", "Henrique", "Isabela", "João", "Larissa", "Marcelo", "Natalia", "Otávio", "Patrícia",
  "Renato", "Simone", "Tatiana", "Ubirajara", "Valentina", "Walter", "Xavier", "Yasmin", "Zuleica", "Alessandra",
  "Benício", "Catarina", "Davi", "Evelyn", "Fabiana", "Gustavo", "Heloísa", "Iara", "José", "Luana",
  "Miguel", "Natália", "Oscar", "Priscila", "Rita", "Samuel", "Tereza", "Ulisses", "Vera", "Wesley",
  "Xuxa", "Yuri", "Zilda", "Arthur", "Bianca", "Clara", "Danilo", "Esther", "Fábio", "Guilherme",
  "Hugo", "Inês", "Júlia", "Leandro", "Melissa", "Nícolas", "Otávia", "Pedro", "Raquel", "Silvia"
];

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

  if (isTrueSelected.length <= 0) {
    const isButtonDisabled = buttonSendQuiz.getAttribute('disabled');

    if (!isButtonDisabled) {
      buttonSendQuiz.setAttribute('disabled', 'false')
    }
  }

  if (isTrueSelected?.length > 0) {
    buttonSendQuiz.removeAttribute('disabled', 'false')
  }
}

function handleSelectedOption(id, description) {
  const selectedQuiz = quiz.find((value) => value.id === id);

  if (selectedQuiz) {
    const options = selectedQuiz.options.map((option) => {
      if (option.description.toLocaleLowerCase() === description.toLocaleLowerCase()) {
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
  const screenConfigs = {
    '1': {
      hideScreens: [screen01],
      showScreen: screen02,
      balance: null,
      quizIndex: 0,
    },
    '2': {
      hideScreens: [screen01],
      showScreen: screen02,
      balance: 'R$ 120',
      quizIndex: 1,
    },
    '3': {
      hideScreens: [screen01],
      showScreen: screen02,
      balance: 'R$ 168',
      quizIndex: 2,
    },
    '4': {
      hideScreens: [screen01, screen02],
      showScreen: screen03,
      balance: 'R$ 180',
      containerClass: 'content-container',
    },
    '5': {
      hideScreens: [screen01, screen02, screen03],
      showScreen: screen04,
      balance: 'R$ 180',
    },
    '6': {
      hideScreens: [screen01, screen02, screen03, screen04],
      showScreen: screen05,
      balance: 'R$ 180',
      finalScreen: true,
    }
  };

  const config = screenConfigs[positionQuiz];

  if (config) {
    config.hideScreens.forEach(screen => screen.classList.add('none'));

    config.showScreen.classList.remove('none');
    if (config.containerClass) {
      config.showScreen.classList.add(config.containerClass);
    } else {
      config.showScreen.classList.add('quiz-container');
    }

    if (config.balance) {
      currentBalance.innerText = config.balance;
    }

    if (config.quizIndex !== undefined) {
      const quizSelected = quiz[config.quizIndex];
      announcedQuiz.innerText = quizSelected.title;
      optionsQuiz.innerHTML = quizSelected.options.map((option) => `
        <div onclick="handleSelectedOption('${quizSelected.id}', '${option.description}')" class="${option.isSelected ? 'option-selected' : 'option'}">
          <p>${option.description}</p>
        </div>`
      ).join('');
    }

    if (config.finalScreen) {
      currentBalanceHeader.classList.add('none');
      content.classList.add('none');
      header.style.justifyContent = 'center';
      screen05.classList.add('promotion');
      localStorage.removeItem('position-quiz');
    }
  }
}

if (positionQuiz) {
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

// Função para mostrar o toast com um nome aleatório
function mostrarToast() {
  const indiceAleatorio = Math.floor(Math.random() * nomes.length);
  const nomeAleatorio = nomes[indiceAleatorio];
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  toastMessage.innerText = `${nomeAleatorio} acabou de resgatar seu saldo.`;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}

// Configura para exibir o toast a cada 3 segundos
setInterval(mostrarToast, 3000);

function goPay() {
  localStorage.setItem('position-quiz', '6');
}

const targetNode = document.body;

const config = { childList: true, subtree: true };

// Função para lidar com o evento de metadata carregada
function onLoadedMetadata(video) {
  const duracao = video.currentTime; // Duração em segundos

  if (duracao >= 780) {
    goRedirectKirvano.className = '';
  }
}


// Função para verificar e adicionar/remover listener aos vídeos
function checkForVideos() {
  ms = 4000;
  const videoElements = document.getElementsByClassName('smartplayer-video-current');

  // Loop através dos vídeos encontrados
  Array.from(videoElements).forEach(video => {
    positionQuiz = localStorage.getItem('position-quiz');
    if (Number(positionQuiz) < 5 || !positionQuiz || positionQuiz === '6') {
      const test = document.getElementById('smartplayer');
      if (test) {
        video.pause();
        ms = 4000
      }
    };

    // Adiciona listener se ainda não foi adicionado
    if (!video.dataset.listenerAdded) {
      video.addEventListener('loadedmetadata', onLoadedMetadata(video));
      video.dataset.listenerAdded = true; // Marca o vídeo como já tratado
    }

    if (video.dataset.listenerAdded) {
      onLoadedMetadata(video);

    }


  });

  // Opcional: Remover event listeners de vídeos que não estão mais no DOM
  const existingVideos = Array.from(videoElements);
  document.querySelectorAll('.smartplayer-video-current').forEach(video => {
    if (!existingVideos.includes(video)) {
      video.removeEventListener('loadedmetadata', onLoadedMetadata.bind(video));
      video.dataset.listenerAdded = false; // Remove a marcação
    }
  });
}

// Verifica a cada 10 segundos
setInterval(checkForVideos, ms);

// Chamada inicial para verificar imediatamente
checkForVideos();

