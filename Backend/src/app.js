require('dotenv').config();
const express = require("express")
const cors = require("cors")
const userModel = require("./models/user-model.js")
const noteModel = require("./models/note-model.js")
const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())

// User Logic:

app.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await userModel.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: `User '${username}' not Found, Sign Up to create an Account`
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                message: "Incorrect password! Try Again"
            })
        }

        return res.status(200).json({
            message: "User Logged In succesfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const user = await userModel.findOne({ username: username.toLowerCase() });

    if (user) {
      return res.status(409).json({
        message: "User already exists!"
      });
    }

    await userModel.create({
      username: username,
      password: password
    });

    return res.status(201).json({
      message: `User '${username}' created successfully! Kindly Login to your new Account`
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

// Notes logic:

app.get("/notes", async (req, res) => {

    try {

        const username = req.query.username

        const notes = await noteModel.find({ username }); // find notes belonging to a specific user
        // if (notes.length < 1) {
        //     return res.status(200).json({
        //         message: "No Notes Found"
        //     })
        // }

        const notesArray = notes.map((note) => {
            const { title, body, _id } = note
            return ({ title, body, _id })
        })

        return res.status(200).json({
            notesArray
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.get("/notes/:id", async (req, res) => {

    try {
        const id = req.params.id
        const note = await noteModel.findById(id)

        const { title, body } = note;

        if (note) {
            return res.status(200).json({
                title,
                body
            })
        }

        return res.status(400).json({
            message: "Note doesn't exist"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.post("/create-note", async (req, res) => {

    try {

        const { title, body, username } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Both Title and Body are required"
            })
        }

        await noteModel.create({
            title,
            body,
            username
        })

        return res.status(201).json({
            message: "Note created successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.delete("/delete/:id", async (req, res) => {

    try {

        const id = req.params.id
        await noteModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Note successfully Deleted"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.patch("/update/:id", async (req, res) => {

    try {

        const { title, body } = req.body
        const id = req.params.id

        if (!title && !body){
            return res.status(400).json({
                message: "Either Title or Body are required"
            })
        }

        const updateFields = {}

        if (title) updateFields.title = title
        if (body) updateFields.body = body

        await noteModel.findByIdAndUpdate(id, updateFields)

        res.status(200).json({
            message: "Note Updated successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

module.exports = app;