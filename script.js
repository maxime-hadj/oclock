document.addEventListener("DOMContentLoaded", () => {
//// HORLOGE ////
    function currentTime() {
        let date = new Date()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()

        h = (h < 10) ? "0" + h : h
        m = (m < 10) ? "0" + m : m
        s = (s < 10) ? "0" + s : s
        
        let time = h + " : " + m + " : " + s
    
        document.getElementById("clock").innerText = time
        let t = setTimeout(function(){ currentTime() }, 1000)
    }

    currentTime()

//// ALARME ////
    const audio = new Audio("Diablo I & II Soundtrack - Tristram Village.mp3")
    audio.loop = true
    let alarmTime = null
    let alarmTimeout = null
    let msg = null
    let alarm = document.getElementById("alarm")
    let message = document.getElementById("message")
    let aSet = document.getElementById("aSet")
    let aClear = document.getElementById("aClear")

    function setAlarmTime(){
        alarm.addEventListener("change",() =>{
            //console.log("setAlarmTime")
            alarmTime = alarm.value
            alarmBis = alarmTime
            let alarmP = document.createElement("p")
            alarming.appendChild(alarmP)
            alarmP.id = alarmBis
            alarmP.innerHTML = alarmTime
        })
    }
    
    setAlarmTime()

    function setMessage(){
        message.addEventListener("focusout",() =>{
            msg = message.value
        })
    }

    setMessage()

    function setAlarm(){
        aSet.addEventListener("click",() =>{
        if(alarmTime){
            let current = new Date()
            let timeToAlarm = new Date(alarmTime)

        if (timeToAlarm > current){
            let timeout = timeToAlarm.getTime() - current.getTime()
            let msgAlert = setTimeout(() => alert(msg), timeout)
            alarmTimeout = setTimeout(() => audio.play(), timeout)
            alert("Alarm set for the " + alarmTime )
        }
        }
    })
    }

    setAlarm()

    function clearAlarm(){
        aClear.addEventListener("click",() =>{
        audio.pause()
        if(alarmTimeout){
            clearTimeout(alarmTimeout)
            alert('Alarm cleared !')
        }
    })
}

    clearAlarm()

//// CHRONO ////
    let timer = document.getElementById("chrono")
    let start = document.getElementById("start")
    let stop = document.getElementById("stop")
    let reset = document.getElementById("reset")
    let lap = document.getElementById("lap")

    let min = 0
    let sec = 0
    let stoptime = true 

    function startTimer(){
        start.addEventListener("click",() =>{
            if(stoptime == true){ 
                stoptime = false
                timerCycle()
            }
        })
        
    }
        startTimer()

    function timerCycle(){
        if(stoptime == false){ 
            min = parseInt(min)
            sec = parseInt(sec)

    sec ++ 

    if(sec > 60){ 
        min ++
        sec = 0
    }

    if(sec < 10 || sec == 0){ 
        sec = '0' + sec
    }
    if(min > 0 || min == 0){ 
        min = '0' + min
    }
    if(min > 10 || min == 10){
        min = min + sec
    }

    timer.innerHTML = min + ':' + sec 
    setTimeout(timerCycle, 1000)
    }
}

    function stopTimer(){
        stop.addEventListener("click",() =>{
            if(stoptime == false){
            stoptime = true
            }
        })
    }
        stopTimer() 

    function resetTimer(){
        reset.addEventListener("click",() =>{
            timer.innerHTML = (min = '00') + ':' + (sec = '00') 
        })
    }
        resetTimer() 

    function lapTimer(){
        lap.addEventListener("click",()=>{
            lap.innerHTML += "<div>" + min + ":" + sec + "</div>";
        })
    }
        lapTimer() 
    
//// MINUTEUR ////
    let bStart = document.getElementById("bStart")
    let bReset = document.getElementById("bReset")
    let bHours = document.getElementById("bHours")
    let bMinutes = document.getElementById("bMinutes")
    let bSeconds = document.getElementById("bSeconds")
    let beginTimer = null

    function minuteurTimer(){
        if(bHours.value == 0 && bMinutes.value == 0 && bSeconds.value == 0){
            minuteurStopAlert()
            bHours.value = 0;
            bMinutes.value = 10;
            bSeconds.value = 0;
            minuteurStop()
        } else if(bSeconds.value != 0){
            bSeconds.value--;
        } else if(bMinutes.value != 0 && bSeconds.value == 0){
            bSeconds.value = 59;
            bMinutes.value--;
        } else if(bHours.value != 0 && bMinutes.value == 0){
            bMinutes.value = 60;
            bHours.value--; 
        }
        return
        
    }

    function minuteurStopAlert(){
        if(bHours.value == 0 && bMinutes.value == 0 && bSeconds.value == 0){
            alert("Time's up !")
            return
        }
    }

    function minuteurStop(){
        clearInterval(beginTimer)
    }

    bStart.addEventListener('click', function(){
        function startInterval(){
            beginTimer = setInterval(function(){
                minuteurTimer();
            }, 1000)
        }
        startInterval()
    })

    bReset.addEventListener('click', function(){
        bHours.value = 0
        bMinutes.value = 10
        bSeconds.value = 0
        minuteurStop()
    })

})