import  UI  from './classes/UI.js';
import  Quote  from './classes/Quote.js';
import {
    petInput,
    ownerInput,
    phoneInput,
    dateInput,
    hourInput,
    symptomInput,
    form
} from './selectors.js';

const ui = new UI();
const quotesManager = new Quote();

let editing = false;

const quote = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    hour: '',
    symptom: ''
}

export const dataQuote = (event) => {
    quote[event.target.name] = event.target.value;
}

export const newQuote = (event) => {
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

export const deleteQuote = (id) => {
    //Delete quote from array
    quotesManager.deleteQuote(id);
    //Menage UI
    ui.printAlert('Cita eliminada correctamente');
    //Delete quote from html
    ui.printQuotes(quotesManager);
}

export const editQuote = ({ pet, owner, phone, date, hour, symptom, id }) => {
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

export const restartQuote = () => {
    quote.pet = '';
    quote.owner = '';
    quote.phone = '';
    quote.date = '';
    quote.hour = '';
    quote.symptom = '';
}