const express = require('express')
const usersData = require("./MOCK_DATA.json")
const fs = require('fs')

const app = express()
const PORT = 8080

//Middleware-plugin
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
        ${usersData.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html)
})

//REST API
app.get('/api/users', (req, res) =>{
    return res.json(usersData)
})

app.get('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    const user = usersData.find((user) => user.id === id);
    return res.json(user);
})

app.post('/api/users', (req, res) =>{
    const body = req.body;
    usersData.push({...body, id:usersData.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(usersData), (err, data) =>{
        return res.json({status: "Success", id: usersData.length});

    });
})

app.delete('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    const index = usersData.findIndex((user) => user.id === id);
    if(index !== -1){
        usersData.splice(index, 1);
        return res.json(`User with id ${id} deleted`);
    }
    else{
        return res.json('User not found');
    }
})

app.patch('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    const user = usersData.find((user) => user.id === id);
    const update = req.body;
    if(!user){
        return res.json("User not found");
    }
    Object.assign(user, update);
    return res.json({message: 'update successfully'})

})

app.listen(PORT, ()=>{
    console.log(`Server Started on PORT ${PORT}`)
} )