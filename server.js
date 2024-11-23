const express = require('express');
const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Task 1: Greeting the user
app.get('/greetings/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello there, ${username}!`);
});

// Task 2: Roll the dice
app.get('/roll/:number', (req, res) => {
    const { number } = req.params;

    if (isNaN(number)) {
        return res.send('You must specify a number.');
    }

    const max = parseInt(number, 10);
    const randomNumber = Math.floor(Math.random() * (max + 1));
    res.send(`You rolled a ${randomNumber}.`);
});

// Task 3: Get a collectible item by index
app.get('/collectibles/:index', (req, res) => {
    const { index } = req.params;

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!");
    }

    const item = collectibles[parseInt(index, 10)];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// Task 4: Filter shoes by query parameters
app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;

    
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }

    res.json(filteredShoes);
});

app.get('/hello', (req, res) => {
    const { name, age } = req.query;

    if (!name || !age) {
        return res.send("Please provide both name and age query parameters.");
    }

    res.send(`Hello there, ${name}! I hear you are ${age} years old.`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));