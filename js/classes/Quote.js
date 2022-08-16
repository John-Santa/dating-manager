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

export default Quote;