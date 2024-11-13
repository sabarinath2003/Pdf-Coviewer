
# PDF Co-Viewer

A real-time, synchronized PDF viewer that allows multiple users to view and navigate PDF slides together. When the presenter or admin changes the page, all viewers see the same page. This is ideal for remote presentations, virtual classrooms, or shared document reading.

### Features

- Real-time page synchronization across multiple users.
- PDF rendering using [PDF.js].
- WebSocket-based communication for live updates.

### Technologies Used

- **Frontend**: HTML, CSS, JavaScript, PDF.js
- **Backend**: Node.js, Express, Socket.io


### Setup Instructions

#### 1. Clone the Repository

git clone https://github.com/sabarinath2003/Pdf-Coviewer


#### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed, then run:

npm install


#### 3. Set Up the PDF Worker

PDF.js requires a worker file, `pdf.worker.min.js`, to load PDFs efficiently in the background.

In your project code (`public/client.js`), make sure to include the worker as follows:

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

#### 4. Add Your PDF File

const url = "./sample.pdf";

#### 5. Start the Server

Run the following command to start the backend server:

node server.js

This will start the app on `http://localhost:3000`. Open that URL in multiple browser windows to see real-time synchronization.

### Usage

- When the presenter moves through the PDF pages, all viewers will automatically synchronize to the same page.
- Admin can control the slide/page changes, and all users will see the same page in real-time.
