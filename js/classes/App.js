import { dataQuote, newQuote } from '../functions.js'
import {
    petInput,
    ownerInput,
    phoneInput,
    dateInput,
    hourInput,
    symptomInput,
    form
} from '../selectors.js';

class App {

    constructor() {
        this.init();
    }

    init() {
        petInput.addEventListener('change', dataQuote);
        ownerInput.addEventListener('change', dataQuote);
        phoneInput.addEventListener('change', dataQuote);
        dateInput.addEventListener('change', dataQuote);
        hourInput.addEventListener('change', dataQuote);
        symptomInput.addEventListener('change', dataQuote);

        form.addEventListener('submit', newQuote);
    }
}

export default App;