function startScraping() {
    // Gets the value of the keyword entered by the user
    const keyword = document.getElementById('keyword').value;
    console.log('Keyword:', keyword);

    // Make a request to the server to fetch data based on the keyword
    fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`)
        .then(response => {
            // Checks whether the request response is successful (status 200-299)
            if (!response.ok) {
                throw new Error('Erro ao buscar dados'); // // Throws an error if the response is unsuccessful
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // When data is received successfully
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear the previous contents of the results div

            // Iterates over the received data and creates HTML elements for each item
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'result-item'; // Defines the class of the div element
                // Inserts HTML with item details inside the div element
                div.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>Rating: ${item.rating}</p>
                    <p>Reviews: ${item.reviews}</p>
                    <img src="${item.image}" alt="${item.title}">
                `;
                resultsDiv.appendChild(div); // Add the div element to the results div
            });
        })
        .catch(error => console.error('Error:', error)); // Capture and display any errors that occurred during the process
}
