const express = require('express'); 
const multer = require('multer');  
const path = require('path');       
const fs = require('fs');           

const app = express(); 


app.use(express.static('public')); 


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeFilename = file.originalname.replace(/\s+/g, '_'); 
    cb(null, `${timestamp}-${safeFilename}`); 
  },
});

const upload = multer({ storage });


app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }
  

  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});


app.use('/uploads', express.static(uploadDir));


const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

















































// const express = require('express');
// const multer = require('multer');
// const path = require('path');


// const app = express();

// app.use(express.static('public'));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });


// const fs = require('fs');
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }


// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.json({ imageUrl: `/uploads/${req.file.filename}` });
// });


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

