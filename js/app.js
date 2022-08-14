// Form data
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomInput = document.querySelector('#sintomas');

//UI
const form = document.querySelector('#nueva-cita');
const quotesContainer = document.querySelector('#citas');


//Objects
const quote = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    hour: '',
    symptom: ''
}

//Events
const eventListeners = () => {
    petInput.addEventListener('change', dataQuote);
    ownerInput.addEventListener('change', dataQuote);
    phoneInput.addEventListener('change', dataQuote);
    dateInput.addEventListener('change', dataQuote);
    hourInput.addEventListener('change', dataQuote);
    symptomInput.addEventListener('change', dataQuote);
}

//Classes



//functions
const dataQuote = (event) => {
    quote[event.target.name] = event.target.value;
    console.log(quote);
}





//Inicialice listeners
eventListeners();