
const sub = document.getElementById("Submit")

function clearError() {
    let elem = document.getElementsByClassName('errormessage')

    for (let item of elem) {
        item.innerText = ""
    }
}

function setError(id, text) {
    let element = document.getElementById(id)
    element.getElementsByClassName("errormessage")[0].innerText = text
}

function formValidate() {
    var returnVal = true
    clearError()

    let name = document.forms['Myform']['uname'].value
    if (name.length < 5) {
        setError("fname", "*length of name is too short!")
        returnVal = false
    }

    if (name.length == 0) {
        setError("fname", "*required!")
        returnVal = false
    }

    let number = document.forms['Myform']['unumber'].value
    if (number.length != 10) {
        setError("fnumber", "*phone number must contain 10 digits!")
        returnVal = false
    }

    if (number.length == 0) {
        setError("fnumber", "*required!")
        returnVal = false
    }

    let email = document.forms['Myform']['uemail'].value
    if (email.length == 0) {
        setError("femail", "*required!")
        returnVal = false
    }

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    let pass = document.forms['Myform']['upass'].value
    if (!((pass.match(lowerCaseLetters)) && (pass.match(upperCaseLetters)) && (pass.match(numbers)))) {
        setError("fpass", "*password should contain atleast one uppercase, one lowercase and one number!")
        returnVal = false
    }

    if (pass.length == 0) {
        setError("fpass", "*required!")
        returnVal = false
    }

    if (pass.length < 6) {
        setError("fpass", "*minimum length should be six!")
        returnVal = false
    }

    let cpass = document.forms['Myform']['ucpass'].value
    if (cpass != pass) {
        setError("fcpass", "*please enter correct password!")
        returnVal = false
    }

    if (cpass.length == 0) {
        setError("fcpass", "*required!")
        returnVal = false
    }



    return returnVal
}