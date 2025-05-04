"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const items_1 = __importDefault(require("./data/items"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Enable CORS middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
// Routes
// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Get all items
app.get('/api/items', (req, res) => {
    res.json(items_1.default);
});
// Get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = items_1.default.find(item => item.id === itemId);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// Create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    items_1.default.push(newItem);
    res.status(201).json(newItem);
});
// update an existing item
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const index = items_1.default.findIndex(item => item.id === itemId);
    if (index !== -1) {
        const updatedItem = Object.assign(Object.assign({}, items_1.default[index]), req.body);
        items_1.default[index] = updatedItem;
        res.json(updatedItem);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// delete an item
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const index = items_1.default.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items_1.default.splice(index, 1);
        res.status(204).send('Successfully deleted');
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
