# Step Four Workbook

A workbook application to facilitate the step four inventory process.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm on your machine.
- You have a MongoDB account and a cluster set up.

If you don't have a MongoDB URI, get one online at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). After setting up your cluster, create a `.env` file in your `server` directory and include your MongoDB URI.

## Setup Instructions

### Backend Setup

1. Navigate to the `server` directory from your project root:

```bash
cd root/server
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

Your server should now be running on http://localhost:3001.

### Frontend Setup

1. Navigate back to the root directory and then to the src directory where the React app is located:

```bash
cd ../src
```

2. Install the necessary dependencies for the React application:

```bash
npm install
```

3. Start the React application:

```bash
npm start
```

The application should open and run on http://localhost:3000.

### Configuration

1. Create a .env file in the server directory and add your MongoDB URI and the desired port number:

```env
MONGODB_URI=your_mongodb_uri
PORT=3001
```
Replace your_mongodb_uri with the actual URI you obtained from MongoDB Atlas.

## Usage

After starting both the server and the client, you can use the application to add, edit, and delete entries as per the Step Four inventory process.

## Support

For support, please check the [issues tab](https://github.com/mgarbs/step-four-workbook/issues) in the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.