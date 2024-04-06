import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ViewExpenses = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || '');

  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Rohan', description: 'Description 1', category: 'Category 1', date: new Date(), amount: 100, createdBy: 'user1@example.com', updatedAt: new Date() },
    { id: 2, name: 'PeerXP', description: 'Description 2', category: 'Category 2', date: new Date(), amount: 20000000, createdBy: 'user2@example.com', updatedAt: new Date() }
  ]);

  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    date: new Date(),
    amount: '',
    createdBy: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState(null);
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
  }, [currentUser]);

  const handleFilterByDate = (date) => {
    setFilterDate(date);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateExpense = () => {
    setIsModalOpen(true);
    setFormData({
      id: Date.now(),
      name: '',
      description: '',
      category: '',
      date: new Date(),
      amount: '',
      createdBy: currentUser
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveExpense = () => {
    if (isEditing) {
      const updatedExpenses = expenses.map(expense =>
        expense.id === formData.id ? { ...formData, updatedAt: new Date() } : expense
      );
      setExpenses(updatedExpenses);
    } else {
      const newExpense = { ...formData, id: Date.now(), updatedAt: new Date() };
      setExpenses([...expenses, newExpense]);
    }
    resetFormData();
    setIsModalOpen(false);
    setEditExpenseId(null);
  };

  const resetFormData = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      date: new Date(),
      amount: '',
      createdBy: ''
    });
  };

  const handleEditExpense = (expense) => {
    setFormData({
      id: expense.id,
      name: expense.name,
      description: expense.description,
      category: expense.category,
      date: new Date(expense.date),
      amount: expense.amount,
      createdBy: expense.createdBy
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setEditExpenseId(expense.id);
  };

  const handleDeleteExpense = (id) => {
    setDeleteExpenseId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteExpense = () => {
    setExpenses(expenses.filter(expense => expense.id !== deleteExpenseId));
    setIsDeleteConfirmationOpen(false);
    setDeleteExpenseId(null);
  };

  const cancelDeleteExpense = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteExpenseId(null);
  };

  const filteredExpenses = expenses.filter(expense => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(expense.name) && (!filterDate || expense.date.toDateString() === filterDate.toDateString());
  });

  const expenseRows = filteredExpenses.map(expense => (
    <tr key={expense.id}>
      <td className="px-4 py-2">{expense.name}</td>
      <td className="px-4 py-2">{expense.category}</td>
      <td className="px-4 py-2">{expense.date.toLocaleDateString()}</td>
      <td className="px-4 py-2">{expense.amount}</td>
      <td className="px-4 py-2">{expense.updatedAt.toLocaleString()}</td>
      <td className="px-4 py-2">{expense.createdBy === currentUser ? 'Me' : expense.createdBy}</td>
      <td className="px-4 py-2 flex flex-col md:flex-row justify-center items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
        <button onClick={() => handleEditExpense(expense)} className="text-red-900 hover:text-red-500 focus:outline-none"><i className="fa fa-edit"></i></button>
        <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-900 hover:text-red-500 focus:outline-none"><i className="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>
  ));
  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-black">My Expenses</h2>
        <div className="mb-4 flex flex-col md:flex-row items-center">
          <input type="text" placeholder="Search by Expense Name" value={searchQuery} onChange={handleSearch} className="p-2 border border-gray-300 rounded mb-2 md:mb-0 w-full md:w-auto" />
          <DatePicker  selected={filterDate} onChange={handleFilterByDate}  className="p-2 border border-gray-300 rounded mb-2 md:mb-0 w-full md:w-auto" />
          <button onClick={handleCreateExpense} className="p-2 bg-blue-700 text-white rounded hover:text-black hover:bg-green-500 active:bg-green-900 w-full md:w-auto">Create Expense</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Date of Expense</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Updated at</th>
                <th className="px-4 py-2">Created by</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenseRows}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gradient-to-b from-violet-300 to-violet-900 p-8 rounded shadow-md w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-black">{isEditing ? 'Edit Expense' : 'Create Expense'}</h3>
              <input type="text" name="name" placeholder="Expense Name" value={formData.name} onChange={handleInputChange} className="p-2 border border-gray-300 rounded mb-2 w-full" />
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="p-2 border border-gray-300 rounded mb-2 w-full" />
              <select name="category" value={formData.category} onChange={handleInputChange} className="p-2 border border-gray-300 rounded mb-2 w-full">
                <option value="">Select Category</option>
                <option value="Health">Health</option>
                <option value="Electronics">Electronics</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
              <DatePicker selected={formData.date} onChange={(date) => setFormData({ ...formData, date })} className="p-2 border border-gray-300 rounded mb-2 w-full" />
              <input type="number" name="amount" placeholder="Amount (INR)" value={formData.amount} onChange={handleInputChange} className="p-2 border border-gray-300 rounded mb-2 w-full" />
              <div className="flex justify-end">
                <button onClick={handleSaveExpense} className="p-2 bg-blue-400 text-black rounded-full w-[60px] hover:bg-blue-700 mr-2 active:bg-blue-900">Save</button>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-blue-400 text-black rounded-full w-[60px] hover:bg-blue-700 active:bg-blue-900">Cancel</button>
              </div>
            </div>
          </div>
        )}
        {isDeleteConfirmationOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gradient-to-b from-red-300 to-red-700 p-8 rounded shadow-md w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-black">Delete Expense</h3>
              <p className="mb-4 text-black">Are you sure you want to delete this expense?</p>
              <div className="flex justify-end">
                <button onClick={confirmDeleteExpense} className="p-2 bg-red-400 text-black rounded hover:bg-green-700 active:bg-green-900 mr-2">Yes</button>
                <button onClick={cancelDeleteExpense} className="p-2 bg-red-400 text-black rounded hover:bg-red-600 active:bg-red-900">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExpenses;
