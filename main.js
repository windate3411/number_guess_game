const msg = document.getElementById('msg')

// get a random num 
const randomNum = getRandomNum();

function getRandomNum() {
  return Math.floor(Math.random() * 101)
}

// set up speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()
recognition.lang = 'en-US';

// start recognition
recognition.start()

// speak result
recognition.addEventListener('result', onSpeak)

// start the recognition again
recognition.addEventListener('end', () => recognition.start())

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(randomNum);
  writeNum(msg)
}

function writeNum(num) {
  const hint = checkNum(num) ?
    (parseInt(num) > randomNum ? 'Lower' : 'Higher') : 'it\'s not a valid number'

  if (parseInt(num) === randomNum) {
    document.body.innerHTML = `
      <h1>Congrats! You win!</h1>
      <button class="play-btn" id="play-btn">Play again</button>
    `;
  } else {
    msg.innerHTML = `
       <h3>You said</h3>
       <span class='box'>${num}</span>
       <div>${hint}</div>
    `
  }
}

// check if thats a valid number
function checkNum(num) {
  if (!isFinite(num) || parseInt(num) > 100 || parseInt(num) < 1) {
    return false
  }
  return true
}


// play again 
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-btn') location.reload()
})