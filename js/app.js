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

//Classes
class Quote {
    constructor() {
        this.quotes = [];
    }

    addQuote(quote) {
        this.quotes = [...this.quotes, quote];
        console.log('Cita agregada correctamente', this.quotes);
    }
}

class UI {

    printAlert(message, className = 'alert-success') {
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert', 'd-block', 'col-12',className);
        div.textContent = message;
        const container = document.querySelector('#contenido');
        const form = document.querySelector('.agregar-cita');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000);
    }

    printQuotes({ quotes }) {
        this.cleanHTML();

        quotes.forEach(quote => {
            const { pet, owner, phone, date, hour, symptom, id } = quote;
            const divQuote = document.createElement('div');
            divQuote.classList.add('cita', 'p-3');
            divQuote.dataset.id = id;

            const petParagraph = document.createElement('h2');
            petParagraph.classList.add('card-title', 'font-weight-bolder');
            petParagraph.textContent = pet;

            const ownerParagraph = document.createElement('p');
            ownerParagraph.innerHTML = `<span class="font-weight-bolder">Propietario: </span>${owner}`;

            const phoneParagraph = document.createElement('p');
            phoneParagraph.innerHTML = `<span class="font-weight-bolder">Teléfono: </span>${phone}`;

            const dateParagraph = document.createElement('p');
            dateParagraph.innerHTML = `<span class="font-weight-bolder">Fecha: </span>${date}`;

            const hourParagraph = document.createElement('p');
            hourParagraph.innerHTML = `<span class="font-weight-bolder">Hora: </span>${hour}`;

            const symptomParagraph = document.createElement('p');
            symptomParagraph.innerHTML = `<span class="font-weight-bolder">Síntomas: </span>${symptom}`;

            //Add pet to divQuote
            divQuote.appendChild(petParagraph);
            divQuote.appendChild(ownerParagraph);
            divQuote.appendChild(phoneParagraph);
            divQuote.appendChild(dateParagraph);
            divQuote.appendChild(hourParagraph);
            divQuote.appendChild(symptomParagraph);

            //Add pet to html
            quotesContainer.appendChild(divQuote);
        });
    }

    cleanHTML() {
        while (quotesContainer.firstChild) {
            quotesContainer.removeChild(quotesContainer.firstChild);
        }
    }
}

const ui = new UI();
const quotesManager = new Quote();

//Events
const eventListeners = () => {
    petInput.addEventListener('change', dataQuote);
    ownerInput.addEventListener('change', dataQuote);
    phoneInput.addEventListener('change', dataQuote);
    dateInput.addEventListener('change', dataQuote);
    hourInput.addEventListener('change', dataQuote);
    symptomInput.addEventListener('change', dataQuote);

    form.addEventListener('submit', newQuote);
}

//functions
const dataQuote = (event) => {
    quote[event.target.name] = event.target.value;
    console.log(quote);
}

const newQuote = (event) => {
    event.preventDefault();

    const { pet, owner, phone, date, hour, symptom } = quote;

    //validate
    if (pet === '' || owner === '' || phone === '' || date === '' || hour === '' || symptom === '') {
        ui.printAlert('Todos los campos son obligatorios', 'alert-danger');
        return;
    }

    //Generate Quote id
    quote.id = Date.now();
    quotesManager.addQuote({ ...quote });

    restartQuote();
    form.reset();

    ui.printQuotes(quotesManager);
}

const restartQuote = () => {
    quote.pet = '';
    quote.owner = '';
    quote.phone = '';
    quote.date = '';
    quote.hour = '';
    quote.symptom = '';
}





//Inicialice listeners
eventListeners();