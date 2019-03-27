const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('dist'))


app.listen(process.env.PORT || 8000, () => console.log('Gator app listening on port 3000!'));
