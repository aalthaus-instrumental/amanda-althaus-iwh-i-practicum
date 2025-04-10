const axios = require('axios');
const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const customObjectId = '2-167114549';
const hubspotApi = 'https://api.hubspot.com';
const customObjectRootApi = `${hubspotApi}/crm/v3/objects/${customObjectId}`;
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/', async (req, res) => {
    
    const headers = { Authorization: `Bearer ${PRIVATE_APP_ACCESS}`, 'Content-Type': 'application/json'};
    const params = { properties: 'name,program_date,program_status'};
    
    try {
        
        const response = await axios.get(customObjectRootApi, { headers, params });
        const programs = response.data.results;
        res.render('homepage', { title: 'Custom Object Table', programs });
    } catch (error) { res.status(500).send('Error loading data') }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));