var second = 1000
var timeCounter
var seconds = 0
var minutes = 0
var flag = true

function change_counting_state(){
    var statBtn = window.document.getElementById('turn_btn')
    if (flag == true){
        window.alert("Entrou Aqui")
        statBtn.textContent = "test"
        flag = false
        var counter = window.document.getElementById("Counter").value
    }
    else{
        window.alert('Entrou no False')
        flag = true
        statBtn.innerText = "START"
    }
}