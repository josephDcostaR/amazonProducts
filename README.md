#AmazonProducts

This is a web application that replicates an Amazon page and captures products based on a user-supplied keyword.

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript (Vanilla)**
- **Node.js**
- **Express**
- **Axios**
- **JSDOM**

## Configuration and Execution Instructions

1. Clone the repository:

```bash
git clone https://github.com/seu-usuario/AmazonProducts.git
```
2. Install server dependencies:

```bash
cd AmaonProducts
npm install
```
3. Run the server:

```bash
npm start
```
4. Open the browser and access http://localhost:3000 to use the application.

## How to use

1. On the home page, enter a keyword in the search box.

2. Click the "Search" button to start the search.

3. The results will be displayed below, showing the title, rating, number of reviews and image of the products matching the keyword.

## How the Code Works

The Code consists of three parts that are interconnected to form the result, that is, the page:

`server.js`: The Node.js server uses Express to create an /api/scrape endpoint that fetches product details and information from Amazon based on a keyword provided in the query. It uses Axios to make the HTTP request and JSDOM to parse and capture the HTML of the Amazon results page.

`script.js`: The client-side script defines the startScraping() function that is called when the user clicks the "Search" button. This function makes a request to the server to fetch data based on the keyword provided by the user. The results are transformed and assembled into Html and then displayed on the page.

`index.html and style.css`: HTML defines the structure of the page and CSS defines the style of the elements.

## Project Dependencies

{
  "dependencies": {
    "axios": "^1.7.2",
    "express": "^4.19.2",
    "jsdom": "^24.1.0"
  }
}
