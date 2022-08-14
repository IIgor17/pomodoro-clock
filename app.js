// Initializing buttons & timer
const decWork = document.querySelector('.dec-work')
const incWork = document.querySelector('.inc-work')
const decBreak = document.querySelector('.dec-break')
const incBreak = document.querySelector('.inc-break')

const timeWork = document.querySelector('.time-work')
const timeBreak = document.querySelector('.time-break')

let timeWorkValue = parseInt(timeWork.textContent)
let timeBreakValue = parseInt(timeBreak.textContent)


// Decrement and incrememt buttons logic
decWork.addEventListener('click', () => {
    timeWorkValue--
    timeWork.textContent = `${timeWorkValue}`
    if (timeWorkValue < 10) {
        timeWork.textContent = ` ${timeWorkValue}`
    }
    if (timeWorkValue <= 0) {
        timeWorkValue = 0
        timeWork.textContent = ` ${timeWorkValue}`
    }
    
})

incWork.addEventListener('click', () => {
    timeWorkValue++
    if (timeWorkValue > 99) {
        timeWorkValue = 99
    }
    timeWork.textContent = `${timeWorkValue}`
    if (timeWorkValue < 10) {
        timeWork.textContent = ` ${timeWorkValue}`
    }
})

decBreak.addEventListener('click', () => {
    timeBreakValue--
    timeBreak.textContent = `${timeBreakValue}`
    if (timeBreakValue < 10) {
        timeBreak.textContent = ` ${timeBreakValue}`
    }
    if (timeBreakValue <= 0) {
        timeBreakValue = 0
        timeBreak.textContent = ` ${timeBreakValue}`
    }
})

incBreak.addEventListener ('click', () => {
    timeBreakValue++
    if (timeBreakValue > 99) {
        timeBreakValue = 99
    }
    timeBreak.textContent = `${timeBreakValue}`
    if (timeBreakValue < 10) {
        timeBreak.textContent = ` ${timeBreakValue}`
    }
})

// Default timer state
let timerState = 'work'

// Timer starter
const playButton = document.querySelector('#playButton')
playButton.addEventListener('click', () => {
    if (timerState != 'in progress') {
        startTimer()
        playButton.textContent = '❚❚'
    }
    else {
        timerState = 'paused'
        clearInterval(timerLoop)
        console.log(timerLoop)
        timerLoop = undefined
        playButton.textContent = '▶'
    }
})

var timerLoop = undefined
//TImer logic
function startTimer() {

        if (timerState == 'work') {
            totalTime = timeWorkValue*6000
            document.querySelector('.circle-blue').classList.remove('green')
            document.querySelector('.ready').textContent = 'Time to work!'
            timerStateMem = timerState

        }
        if (timerState == 'break') {
            totalTime = timeBreakValue*6000
            document.querySelector('.circle-blue').classList.add('green')
            document.querySelector('.ready').textContent = 'Time to break!'
            timerStateMem = timerState
        }

        if (timerLoop == undefined) {
            console.log(timerLoop)
            timerLoop = setInterval(updateTimer, 10)
            console.log(timerLoop)
        }
        
        
        

        

        // Preventing creating multiple timers at once (by multiclicking the button)
        timerState = 'in progress'

        function updateTimer() {
            // Counting mins, secs and ms
            let minutes = Math.floor(totalTime/6000)
            let milsecs = totalTime%100
            let seconds = (totalTime - minutes*6000 - milsecs)/100

            if (timerState != 'paused'){
                totalTime--
            }
            


            if (minutes < 10) {
                minutes = '0'+minutes
            }
            if (seconds < 10) {
                seconds = '0'+seconds
            }
            if (milsecs < 10) {
                milsecs = '0' + milsecs
            }

            //Restarting the timer
            if (minutes == 0 & seconds == 0 & milsecs == 0) {
                
                timerState = (timerStateMem == 'work') ? 'break' : 'work'

                clearInterval(timerLoop)
                timerLoop = undefined

                startTimer()
            }
            // Rendering timer
            document.querySelector('.timer').textContent = `${minutes}:${seconds}:${milsecs}`
            
        }
    }

// Animation 
gsap.from('.header', {y: -50, opacity:0 , duration: 1, ease: 'power4', stagger:.3})
gsap.from('.container', {opacity: 0, duration: 1, y: 100})





