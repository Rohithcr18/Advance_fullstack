// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    fathersName: '',
    mothersName: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`${API_URL}/${editingId}`, formData);
        alert('Student updated successfully!');
      } else {
        await axios.post(API_URL, { ...formData, age: Number(formData.age) });
        alert('Student added successfully!');
      }
      setFormData({
        name: '',
        age: '',
        class: '',
        fathersName: '',
        mothersName: ''
      });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Failed to save student');
    }
  };

  // Handle edit button click
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      age: student.age,
      class: student.class,
      fathersName: student.fathersName,
      mothersName: student.mothersName
    });
    setEditingId(student._id);
    window.scrollTo(0, 0);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
        alert('Student deleted successfully!');
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'blue', textAlign: 'center' }}>Student Management System</h1>
      
      {/* Student Form */}
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '20px', 
        marginBottom: '20px',
        borderRadius: '5px'
      }}>
        <h2>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              min="4"
              max="25"
              value={formData.age}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Father's Name:</label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Mother's Name:</label>
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <button 
              type="submit"
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '8px 15px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            
            {editingId && (
              <button 
                type="button"
                onClick={() => {
                  setFormData({
                    name: '',
                    age: '',
                    class: '',
                    fathersName: '',
                    mothersName: ''
                  });
                  setEditingId(null);
                }}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Students List */}
      <div>
        <h2>Students List</h2>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Age</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Class</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Father's Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mother's Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} style={{ border: '1px solid #ddd' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{student.age}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.class}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.fathersName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.mothersName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(student)}
                      style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '3px',
                        marginRight: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No students found. Add your first student!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;