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

let editing;

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
    }

    deleteQuote(id) {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
    }

    editQuote(currentQuote) {
        this.quotes = this.quotes.map(quote => quote.id === currentQuote.id ? currentQuote : quote);
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

            //Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'mr-2');
            deleteButton.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            deleteButton.onclick = () => deleteQuote(id);

            //Edit button
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-info', 'mr-2');
            editButton.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            editButton.onclick = () => editQuote(quote);

            //Add pet to divQuote
            divQuote.appendChild(petParagraph);
            divQuote.appendChild(ownerParagraph);
            divQuote.appendChild(phoneParagraph);
            divQuote.appendChild(dateParagraph);
            divQuote.appendChild(hourParagraph);
            divQuote.appendChild(symptomParagraph);
            divQuote.appendChild(deleteButton);
            divQuote.appendChild(editButton);

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
}

const newQuote = (event) => {
    event.preventDefault();

    const { pet, owner, phone, date, hour, symptom } = quote;

    //validate
    if (pet === '' || owner === '' || phone === '' || date === '' || hour === '' || symptom === '') {
        ui.printAlert('Todos los campos son obligatorios', 'alert-danger');
        return;
    }

    if (editing) {
        ui.printAlert('Cita editada correctamente');

        form.querySelector('button[type="submit"]').textContent = 'Crear cita';
        quotesManager.editQuote({...quote});
        //Desactivate editing
        editing = false;
    } else {
        //Generate Quote id
        quote.id = Date.now();
        quotesManager.addQuote({ ...quote });
        ui.printAlert('Cita agregada correctamente');
    }

    restartQuote();
    form.reset();

    ui.printQuotes(quotesManager);

}

const deleteQuote = (id) => {
    //Delete quote from array
    quotesManager.deleteQuote(id);
    //Menage UI
    ui.printAlert('Cita eliminada correctamente');
    //Delete quote from html
    ui.printQuotes(quotesManager);
}

const editQuote = ({ pet, owner, phone, date, hour, symptom, id }) => {
    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    hourInput.value = hour;
    symptomInput.value = symptom;

    //Add to object
    quote.id = id;
    quote.pet = pet;
    quote.owner = owner;
    quote.phone = phone;
    quote.date = date;
    quote.hour = hour;
    quote.symptom = symptom;

    //Change button text
    form.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    editing = true;
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