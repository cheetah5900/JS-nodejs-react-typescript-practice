import express from 'express';
import cors from 'cors';
import items from './data/items';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS middleware
app.use(cors({
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
 res.json(items);
});

// Get a single item by ID
app.get('/api/items/:id', (req, res) => {
 const itemId = req.params.id;
 const item = items.find(item => item.id === itemId);
 if (item) {
  res.json(item);
 } else {
  res.status(404).json({ message: 'Item not found' });
 }
});

// Create a new item
app.post('/api/items', (req, res) => {
 const newItem = req.body;
 items.push(newItem);
 res.status(201).json(newItem);
});

// update an existing item
app.put('/api/items/:id', (req, res) => {
 const itemId = req.params.id;
 const index = items.findIndex(item => item.id === itemId);
 if (index !== -1) {
  const updatedItem = { ...items[index], ...req.body };
  items[index] = updatedItem;
  res.json(updatedItem);
 } else {
  res.status(404).json({ message: 'Item not found' });
 }
});

// delete an item
app.delete('/api/items/:id', (req, res) => {
 const itemId = req.params.id;
 const index = items.findIndex(item => item.id === itemId);
 if (index !== -1) {
  items.splice(index, 1);
  res.status(204).send('Successfully deleted');
 } else {
  res.status(404).json({ message: 'Item not found' });
 }
});

// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});