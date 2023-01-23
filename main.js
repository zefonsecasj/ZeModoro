var second = 00
var min = 1
var enable_counter = true
var updateCounterId = null
var state = 1
var pomoRounds = 0

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
                counterMin = 25
                break
            case(2):
                counterMin = 5
                break
            case(3):
                counterMin = 30
                break
        }
        updateCounterId = setInterval(counter,10, counterMin, counterSec)
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
            window.document.getElementById('Counter').innerText = "25:00"
            break
        case(2):
            window.document.getElementById('Counter').innerText = "05:00"
            break
        case(3):
            window.document.getElementById('Counter').innerText = "30:00"
            break
    }
    enable_counter = true
}

function counter(firstMin, fullSec){ 
    if(min > firstMin){
        min = 0
        clearInterval(updateCounterId)
        enable_counter = true
        switch (state){
            case(1):
                pomoRounds++
                if(pomoRounds%4 == 0){
                    window.document.getElementById('Counter').innerText = "30:00"
                    state = 3
                }
                else{
                    window.document.getElementById('Counter').innerText = "05:00"
                    state = 2
                }
                window.document.getElementById('PomoRounds').innerText = `Pomodoro Rounds: #${pomoRounds}`
                break
            case(2):
                state = 1
                window.document.getElementById('Counter').innerText = "25:00"
                break
            case(3):
                state = 1
                window.document.getElementById('Counter').innerText = "25:00"
                break
        }
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


function time_stamper(min,second){
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

function change_settings(){
    window.alert('TEste')
}


function background_styling(state){
    var centerDiv = window.document.getElementById('center_div').style
    switch(state){
        case(1):
            window.document.getElementById('Counter').innerText = "25:00"
            centerDiv.background = "url('./work_test.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#5E6D72'
            break
        case(2):
            window.document.getElementById('Counter').innerText = "05:00"
            centerDiv.background = "url('./small_break.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#9BBBDB'
            break
        case(3):
            window.document.getElementById('Counter').innerText = "30:00"    
            centerDiv.background = "url('./nap_test.jpg')"
            centerDiv.backgroundSize = "cover"
            document.body.style.backgroundColor = '#555938'
            break
    }

}