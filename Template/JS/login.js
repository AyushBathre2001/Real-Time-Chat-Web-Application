function setError(id,message){
    element = document.getElementById(id)
    element.getElementsByClassName("errormessage")[0].innerText = message
}

function clearError(){
    let elements = document.getElementsByClassName("errormessage")
    for(let item of elements){
        item.innerText = ""
    }
}

function validate(){
    var returnval = true
    clearError()

    let eml = document.forms['loginForm']['uemail'].value
    if(eml.length == 0){
        setError('femail' , "*required!")
        returnval = false
    }

    let pss = document.forms['loginForm']['upass'].value
    if(pss.length == 0){
        setError('fpass',"*required!")
        returnval = false
    }

    return returnval
}


