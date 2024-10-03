const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const LAYOUT_FILE = 'layout.json';

// Save layout
app.post('/save-layout', (req, res) => {
    const layout = req.body;
    fs.writeFile(LAYOUT_FILE, JSON.stringify(layout, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving layout');
        }
        res.send('Layout saved successfully');
    });
});

// Load layout
app.get('/load-layout', (req, res) => {
    if (fs.existsSync(LAYOUT_FILE)) {
        const layout = fs.readFileSync(LAYOUT_FILE, 'utf-8');
        res.json(JSON.parse(layout));
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
