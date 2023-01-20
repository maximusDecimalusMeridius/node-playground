let searchTerm = "master";
let quoteArray = [
    "What you allow you teach",
    "Educate. Enable. Empower.",
    "If you always do what you've always done, you're only going to get what you've already got",
    "Early bird gets as many worms as they want",
    "Jack of all Trades, Master of None, though sometimes better than a Master of One."
];

const arrayHas = quoteArray.filter(quote => quote.toLowerCase().includes(searchTerm.toLowerCase()));

console.log(arrayHas);