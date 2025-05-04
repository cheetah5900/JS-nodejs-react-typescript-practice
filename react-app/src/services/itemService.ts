interface Item {
 id: string;
 name: string;
 description: string;
 price: number;
 category: string;
 stock: number;
 rating: number;
 onSale: boolean;
}

export const fetchItems = async (): Promise<Item[]> => {
 try {
  const response = await fetch('http://localhost:3000/api/items');
  if (!response.ok) {
   throw new Error('Network response was not ok');
  }
  return await response.json();
 } catch (error) {
  console.error('Error fetching data:', error);
  throw error;
 }
};


// addItem function by getting array object
export const addItem = async (item: Item): Promise<Item> => {
 // auto increment id for a new item
 const response = await fetch('http://localhost:3000/api/items', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(item)
 });

 if (!response.ok) {
  throw new Error('Network response was not ok');
 }

 return response.json();
};

export const updateItem = async (id: string, item: Partial<Item>): Promise<Item> => {
 const response = await fetch(`http://localhost:3000/api/items/${id}`, {
  method: 'PUT',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(item)
 });

 if (!response.ok) {
  throw new Error('Network response was not ok');
 }

 return response.json();
};

export const deleteItem = async (id: string): Promise<void> => {

 const response = await fetch(`http://localhost:3000/api/items/${id}`, {
  method: 'DELETE'
 });
 console.log(response);

 if (!response.ok) {
  throw new Error('Failed to delete item');
 }
};
