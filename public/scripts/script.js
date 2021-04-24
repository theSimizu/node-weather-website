const search = window.document.querySelector('input')
const weatherForm = window.document.querySelector('form')
const locationText = window.document.querySelector('#location')
const messageText = window.document.querySelector('#message')

console.log('Client side script')

const locationFetch = (value, locationText, messageText) => {
    fetch(`/weather?address=${value}`).then((res) => {
        res.json().then(({error, place_name, temperature, precip} = data) => {
            if (error) {
                locationText.innerHTML = error
            } else {
                locationText.innerHTML = place_name
                messageText.innerHTML = `It is currently ${temperature} degress out. There is a ${precip}% chance of rain`
            }
            
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    locationText.innerHTML = 'Loading...'
    messageText.innerHTML = ''
    e.preventDefault()
    locationFetch(search.value, locationText, messageText)
    
})