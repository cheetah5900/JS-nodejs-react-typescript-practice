import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { fetchItems, addItem, updateItem, deleteItem } from './services/itemService';

function App() {
  const [items, setItems] = useState<{ id: string, name: string, description: string, price: number, category: string, stock: number, rating: number, onSale: boolean }[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  // Handle adding a new item
  const handleAddItem = async () => {
    try {
      // add a new item with form
      const result = await Swal.fire({
        title: 'Add New Item',
        html: `
          <input id="name" class="swal2-input" placeholder="Name">
          <input id="description" class="swal2-input" placeholder="Description">
          <input id="price" class="swal2-input" placeholder="Price" type="number">
          <input id="category" class="swal2-input" placeholder="Category">
          <input id="stock" class="swal2-input" placeholder="Stock" type="number">
          <input id="rating" class="swal2-input" placeholder="Rating" type="number">
          <input id="onSale" class="swal2-input" placeholder="On Sale (true/false)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            id: uuidv4(),
            name: (document.getElementById('name') as HTMLInputElement).value,
            description: (document.getElementById('description') as HTMLInputElement).value,
            price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
            category: (document.getElementById('category') as HTMLInputElement).value,
            stock: parseInt((document.getElementById('stock') as HTMLInputElement).value),
            rating: parseFloat((document.getElementById('rating') as HTMLInputElement).value),
            onSale: (document.getElementById('onSale') as HTMLInputElement).value === 'true'
          }
        }
      });
      if (!result.isConfirmed) return;
      const data = await addItem(result.value);
      if (!data) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add item',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      setItems([...items, data]);
      Swal.fire({
        title: 'Success!',
        text: 'Item added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Handle updating an item
  const handleUpdateItem = async (id: string) => {
    try {
      const item = items.find(item => item.id === id);
      if (!item) return;
      const result = await Swal.fire({
        title: 'Update Item',
        html: `
          <input id="name" class="swal2-input" placeholder="Name" value="${item.name}">
          <input id="description" class="swal2-input" placeholder="Description" value="${item.description}">
          <input id="price" class="swal2-input" placeholder="Price" type="number" value="${item.price}">
          <input id="stock" class="swal2-input" placeholder="Stock" type="number" value="${item.stock}">
          <input id="category" class="swal2-input" placeholder="Category" value="${item.category}">
          <input id="rating" class="swal2-input" placeholder="Rating" type="number" value="${item.rating}">
          <input id="onSale" class="swal2-input" placeholder="On Sale (true/false)" value="${item.onSale}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            name: (document.getElementById('name') as HTMLInputElement).value,
            description: (document.getElementById('description') as HTMLInputElement).value,
            price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
            stock: parseInt((document.getElementById('stock') as HTMLInputElement).value),
            category: (document.getElementById('category') as HTMLInputElement).value,
            rating: parseFloat((document.getElementById('rating') as HTMLInputElement).value),
            onSale: (document.getElementById('onSale') as HTMLInputElement).value === 'true'
          }
        }
      });
      if (result.isConfirmed) {
        const updatedItem = await updateItem(id, result.value);
        setItems(items.map(item => item.id === id ? updatedItem : item));
        Swal.fire('Updated!', 'The item has been updated.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to update the item.', 'error');
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire('Error!', 'Failed to delete the item.', 'error');
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Items</h1>
        <button className="btn btn-primary" onClick={handleAddItem}>Add Item Test</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>On Sale</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
              <td>{item.rating.toFixed(1)}</td>
              <td>{item.onSale ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleUpdateItem(item.id)}
                >
                  Update
                </button>
                {/* a button to delete the item */}
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
