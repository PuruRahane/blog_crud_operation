// Import the required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();
app.use(bodyParser.json());

// Define the connection details for the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'blog'
});

// Connect to the MySQL database
connection.connect();

// Route to handle the creation of a new blog post
app.post('/blogs', (req, res) => {
  // Extract the data for the new blog post from the request body
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;

  // Insert the new blog post into the database
  connection.query(
    'INSERT INTO blogs (title, content, date) VALUES (?, ?, ?)',
    [title, content, date],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send('Blog post created successfully');
    }
  );
});

// Route to handle retrieval of all blog posts
app.get('/blogs', (req, res) => {
  // Retrieve all blog posts from the database
  connection.query('SELECT * FROM blogs', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send(results);
  });
});

// Route to handle retrieval of a specific blog post
app.get('/blogs/:id', (req, res) => {
  // Retrieve the requested blog post from the database
  connection.query(
    'SELECT * FROM blogs WHERE id = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send(results[0]);
    }
  );
});

// Route to handle update of a specific blog post
app.put('/blogs/:id', (req, res) => {
  // Extract the updated data for the blog post from the request body
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;

  // Update the specified blog post in the database
  connection.query(
    'UPDATE blogs SET title = ?, content = ?, date = ? WHERE id = ?',
    [title, content, date, req.params.id],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send('Blog post updated successfully');
    }
  );
});

// Route to handle deletion of a specific blog post
app.delete('/blogs/:id', (req, res) => {
  // Delete the specified blog post from
