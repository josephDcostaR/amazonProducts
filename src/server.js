const express = require('express'); // Import the Express module
const axios = require('axios'); // Import the Axios module to make HTTP requests
const { JSDOM } = require('jsdom'); // Import the JSDOM module to parse HTML

const app = express(); // Initialize the Express application
const port = 3000; // Set the server port

// Middleware to handle CORS headers
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for CORS
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Defines the allowed methods for CORS
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Defines allowed headers for CORS
  next(); // Call the next middleware function
});

// Endpoint to analyze a website and extract product details
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword; // Gets the query keyword
  if (!keyword) {
    return res.status(400).send('Keyword is required'); // Returns a 400 error if the keyword is missing
  }
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1`;

  try {
    // Make the HTTP request to the specified URL
    const response = await axios.get(url);
    const html = response.data; // Gets the HTML of the page

    // Parse HTML with JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract product details
    const products = [];
    const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

    productElements.forEach(element => {
      const title = element.querySelector('h2 .a-link-normal.a-text-normal')?.textContent.trim();
      const rating = element.querySelector('.a-icon-alt')?.textContent.trim();
      const reviews = element.querySelector('.a-size-small .a-link-normal .a-size-base')?.textContent.trim();
      const image = element.querySelector('.s-image')?.getAttribute('src');

      if (title && rating && reviews && image) {
        products.push({
          title,
          rating,
          reviews,
          image
        });
      }
    });

    // Send product details as JSON response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados'); // Returns a 500 error if the data fetch fails
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Display a message indicating that the server is running
});
