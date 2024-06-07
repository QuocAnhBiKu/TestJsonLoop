const express = require('express');
const bodyParser = require('body-parser');
const {db} = require('./config')
const { doc, getDoc, setDoc } = require('firebase/firestore');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/options', async (req, res) => {
    try {
        const docRef = doc(db, 'options', 'data');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const optionsData = docSnap.data().options;
            const subjects = Object.keys(optionsData);
            const chapters = {};
            const questions = {};

            for (const subject in optionsData) {
                chapters[subject] = Object.keys(optionsData[subject]);
                questions[subject] = {};
                for (const chapter in optionsData[subject]) {
                    questions[subject][chapter] = {};
                    for (const questionKey in optionsData[subject][chapter]) {
                        const question = optionsData[subject][chapter][questionKey].question;
                        questions[subject][chapter][questionKey] = question;
                    }
                }
            }

            // Trả về dữ liệu theo định dạng yêu cầu
            const formattedData = { subjects, chapters, questions };
            res.json(formattedData);
        } else {
            res.status(404).json({ error: 'No such document!' });
        }
    } catch (error) {
        console.error('Error getting document:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint để xử lý yêu cầu gửi câu trả lời
app.post('/submit', async (req, res) => {
    try {
      const { subject, chapter, question } = req.body;
  
      // Lấy dữ liệu options từ Firestore
      const docRef = doc(db, 'options', 'data');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const options = docSnap.data().options;
        const answer = options[subject]?.[chapter]?.[question];
  
        if (answer) {
          res.json({ success: true, answer });
        } else {
          res.status(404).json({ success: false, message: 'Answer not found' });
        }
      } else {
        res.status(404).json({ success: false, message: 'Options data not found' });
      }
    } catch (error) {
      console.error('Error getting answer:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });