var second = 00
var min = 1
var enable_counter = true
var updateCounterId = null
var state = 1
var pomoRounds = 0
var workTime = 25
var smallBreak = 5
var longBreak = 30

function change_state(id){
    if(id=='focus_btn'){
        state = 1
    }
    else if(id=='smbrk_btn'){
        state = 2
    }
    else{
        state = 3
    }
    background_styling(state)
    min = 1
    second = 00
}

function start_counter(){
    if(enable_counter){
        const counterSec = 60
        let counterMin
        switch (state){
            case(1):
                counterMin = workTime
                break
            case(2):
                counterMin = smallBreak
                break
            case(3):
                counterMin = longBreak
                break
        }
        updateCounterId = setInterval(counter,1000, counterMin, counterSec)
        enable_counter = false
    }
}

function stop_counter(){
    clearInterval(updateCounterId)
    enable_counter = true
}

function clear_counter(){
    second = 0
    min = 1
    clearInterval(updateCounterId)
    switch (state){
        case(1):
            window.document.getElementById('Counter').innerText = time_stamper(workTime)
            break
        case(2):
            window.document.getElementById('Counter').innerText = time_stamper(smallBreak)
            break
        case(3):
            window.document.getElementById('Counter').innerText = time_stamper(longBreak)
            break
    }
    enable_counter = true
}

function counter(firstMin, fullSec){ 
    if(min > firstMin){
        min = 1
        clearInterval(updateCounterId)
        enable_counter = true
        switch (state){
            case(1):
                pomoRounds++
                if(pomoRounds%4 == 0){
                    window.document.getElementById('Counter').innerText = time_stamper(longBreak)
                    state = 3
                }
                else{
                    window.document.getElementById('Counter').innerText = time_stamper(smallBreak)
                    state = 2
                }
                window.document.getElementById('PomoRounds').innerText = `Pomodoro Rounds: #${pomoRounds}`
                break
            case(2):
                state = 1
                window.document.getElementById('Counter').innerText = time_stamper(workTime)
                break
            case(3):
                state = 1
                window.document.getElementById('Counter').innerText = time_stamper(workTime)
                break
        } 
        background_styling(state)
    }
    else{
        var secTimer = fullSec-second
        var minTimer = firstMin - min
        var outputText = time_stamper(minTimer,secTimer)
        document.getElementById('Counter').innerText = outputText
        second++
        if(second > 60){
            second = 0
            min++
        }
    }
}

function time_stamper(min,second=0){
    let outputText
    if(min>=10){
        outputText = `${min}:`
    }
    else{
        outputText = `0${min}:`
    }

    if(second >= 10){
        outputText += `${second}`
    }
    else{
        outputText += `0${second}`
    }
    return outputText
}

function set_pomo(){
    var pomoAdjust = window.document.getElementById('focus_input').value
    workTime = pomoAdjust
    clear_counter()
    background_styling(state)
}

function set_break(){
    var brkAdjust = window.document.getElementById('brk_input').value
    smallBreak = brkAdjust
    clear_counter()
    background_styling(state)
}

function background_styling(state){
    var centerDiv = window.document.getElementById('center_div').style
    switch(state){
        case(1):
            window.document.getElementById('Counter').innerText = time_stamper(workTime,0)
            centerDiv.background = "url('./images/work_test.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#5E6D72'
            document.getElementById('center-text').innerText = "You Gotta Work!"
            break
        case(2):
            window.document.getElementById('Counter').innerText = time_stamper(smallBreak,0)
            centerDiv.background = "url('./images/small_break.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#90847A'
            document.getElementById('center-text').innerText = "Coffe Break!"
            break
        case(3):
            window.document.getElementById('Counter').innerText = time_stamper(longBreak,0)   
            centerDiv.background = "url('./images/nap_test.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#555938'
            document.getElementById('center-text').innerText = "Nap Break!"
            break
    }

}