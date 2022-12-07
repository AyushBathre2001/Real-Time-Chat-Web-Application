const socket = io()

const form = document.getElementById("messageForm")
const input = document.getElementById("messageInput")
const chatbox = document.querySelector(".overlay")

const append = (message, position)=>{
    const newMessage = document.createElement('div')
    newMessage.innerHTML = `<h2>${message}</h2>`
    newMessage.classList.add('messagebox')
    newMessage.classList.add(position)
    chatbox.append(newMessage)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = input.value
    append(`You: ${message}`, 'right')
    socket.emit('send',message)
    input.value = ""
})

const user = prompt("Enter your name")
socket.emit('new-user-joined', user)

socket.on('user-joined', user=>{
    append(`${user} joined the chat`, 'right')
})

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left',user=>{
    append(`${user} left the chat`,'left')
})