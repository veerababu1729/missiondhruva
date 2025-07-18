const express = require('express');
const cors = require('cors');
const monk = require('monk');
const server = express();
const PORT = 8090;
server.use(cors());
server.use(express.json());
const urll = ('mongodb+srv://sivateja:sivateja@facultydairy.wqm3eo7.mongodb.net/Drugs');
const db = monk(urll);
const entr = db.get('Medicines');
db.then(() => {
    console.log("db connected");
})
server.get('/', (req, res) => {
    res.status(200);
    res.send(" server is running ");
});


server.get('/entry', (req, res) => {
    entr.find({}).then((docs) => {
        res.json(docs);
        console.log(res);
    });
})

// server.get('/medcine', (req, res) => {
//     entr.find({}).then((docs) => {
//         res.json(docs);
//         console.log(res);
//     });
// })

const logg = db.get('Logins');
server.get('/loggn', (req, res) => {
    logg.find({}).then((docs) => {
        res.json(docs);

    });
})
const patie = db.get('Patient');
server.get('/patient', (req, res) => {
    patie.find({}).then((docs) => {
        res.json(docs);

    });
})

const Meds = db.get('Medicines');
server.get('/Medcine', (req, res) => {
    Meds.find({}).then((docs) => {
        res.json(docs);

    });
})
const Inf = db.get('Hospital_Info');
server.get('/info', (req, res) => {
    Inf.find({}).then((docs) => {
        res.json(docs);

    });
})
const Dct = db.get('Doctors');
server.get('/dct', (req, res) => {
    Dct.find({}).then((docs) => {
        res.json(docs);

    });
})



server.post('/patient', (req, res) => {
    const datad = db.get('Patient')
    // console.log(req.body.username);
    datad.insert({ name: req.body.name, age: req.body.age,mobi:req.body.mobi,aadh:req.body.aadh, gender: req.body.gender, problem: req.body.problem, status: req.body.status, number: req.body.number, doctor: req.body.doctor,date:req.body.date,link:req.body.link,type:req.body.type,meetlink:req.body.meetlink });
    
})


const Offace = db.get('Patient');
server.post('/patientt', async (req, res) => {
    // console.log("true")
    try {
      const datar = db.get('Patient'); // Get the collection named 'Patient'

      // Log the request body
      console.log(req.body);

      // Perform the update operation
      await datar.update({ _id: req.body._id }, { $set: req.body });

      // Send a success response back to the client
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


server.post('/loggn', (req, res) => {
    const data = db.get('Logins')
    // console.log(req.body.username);
    data.insert({ username: req.body.username, email: req.body.email, Password: req.body.password,aadh:req.body.aadh });
    // console.log(userData);
})
const logge = db.get('Docr');
server.get('/Docs', (req, res) => {
    logge.find({}).then((docs) => {
        res.json(docs);

    });
})

server.post('/Docs', (req, res) => {
    const data = db.get('Docr')
    // console.log(req.body.username);
    data.insert({ date: req.body.date, desc: req.body.desc, file: req.body.file,type:req.body.recordType });
    // console.log(userData);
})

server.delete('/patient/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }
        if (!isAuthorizedToDelete(req, id)) {
            return res.status(403).json({ error: 'Unauthorized to delete patient' });
        }

        const deletedCount = await collection.remove({ _id: monk.id(id) }); // Use monk.id() for MongoDB ID conversion

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(204).json({ message: 'Patient deleted successfully' }); // No content response
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
});


server.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and server is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);



//     console.log(`Server is running, and listening on port ${PORT}`);
//     console.log("connected");
// });
