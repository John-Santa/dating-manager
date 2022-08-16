import { editQuote, deleteQuote } from '../functions.js';
import { quotesContainer } from '../selectors.js';

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

export default UI;