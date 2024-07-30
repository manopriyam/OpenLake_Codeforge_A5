const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const submissions = [];

app.use(express.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.post('/submit-form', (req, res) => {
    const { studentName, studentId, branch, batch } = req.body;
    submissions.push({ studentName, studentId, branch, batch });
    res.redirect('/submissions');
});

app.get('/submissions', (req, res) => {
    res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/public/submissions.css">
            <title>Student Information</title>
            <style>
                * {
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                }

                body {
                    height: 100vh; 
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 0px 20px;
                }

                table {
                    margin: 50px;
                }

                table * {
                    font-size: 16px;
                }

                tr {
                    padding: 5px;
                }
                
                th, td {
                    border: 1px solid black;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <h1>Form Submissions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Branch</th>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                    ${submissions.map(submission => `
                        <tr>
                            <td>${submission.studentName}</td>
                            <td>${submission.studentId}</td>
                            <td>${submission.branch}</td>
                            <td>${submission.batch}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <a href="/form">Go back to the form</a>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
