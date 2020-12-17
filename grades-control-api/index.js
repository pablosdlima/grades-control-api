import express from "express"; //passo 4
import {promises as fs} from "fs"; //passo 4
import gradesRouter from "./routes/grades.js"; //passo 11

const {readFile, writeFile} = fs; //passo 5
global.gradesJson = "grades.json"; //passo 6
const app = express(); //passo 7

app.use(express.json()); //passo 8
app.use("/grades", gradesRouter);  //passo 16


app.listen(3000, async () =>{ //passo 9
    try{ //passo 10
        await readFile(global.gradesJson);
        console.log("API iniciada!")
    } catch(err){
        const initialJson = {
            nextId: 1,
            grades: [
                "id",
                "student",
                "subject",
                "type",
                "value",
                "timestamp"
            ]
        } //controla as requisições passando para o array
        writeFile("grades.json", JSON.stringify(initialJson)).then(() => {
            console.log("API iniciada e arquivo criado!")
        }).catch(err => {
            console.log(err);
        });
    }
});