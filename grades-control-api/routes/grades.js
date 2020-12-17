import express, { json } from "express"; //4 |passo  13
import {promises as fs} from "fs"; // 4 |passo 13

const {readFile, writeFile} = fs; // 5 |passo 13
const gradesRouter = express.Router(); // 7 |passo 14

gradesRouter.post("/", async (req, res) => { //PASSO 18 (EXERCICIO 1 INICIO) //endpoint criado
    let grade = req.body; //grade recebe os valores json inseridos como parametro no corpo da requisição (Insomnia)
    let horario = new Date(); //horario recebe o horario atual

    const data = JSON.parse(await readFile(global.gradesJson)); //data recebe o arquivo grades.json da variavel global localizada no index.js
    grade = { //expandindo o objeto grade criado na linha 8
        id: data.nextId++, //valor id de grade recebe o valor de nextId + 1 do arquivo json representado por data
        student: grade.student, //valor student de grade recebe o valor que foi inserido nele mesmo
        subject: grade.subject, //valor subject de grade recebe o valor que foi inserido nele mesmo
        type: grade.type, //valor type de grade recebe o valor que foi inserido nele mesmo
        value: grade.value,
        timestamp: horario //valor recebe o horario atual
    }
    data.grades.push(grade); //objeto data que contém os registros do arquivo json recebe valores de grade
    await writeFile(global.gradesJson, JSON.stringify(data)); //arquivo json é substituido pelo novo conteúdo

    res.send(grade); //resposta retornada
    console.log(grade); //resposta retrnada no console.

}); //PASSO 18 (EXERCICIO 1 INICIO)

/* //exercicio 2
gradesRouter.put("/:id/:student/:subject/:type/:value", async (req, res) => {
    const data = JSON.parse(await readFile(global.gradesJson));
    const id = req.params.id;

    const index = data.grades.findIndex(a => a.id === req.params.id);   

        data.accounts[index].student = req.params.student;
        data.accounts[index].subject = req.params.subject;
        data.accounts[index].type = req.params.type;
        data.accounts[index].value = req.params.value;

        await writeFile(global.gradesJson, JSON.stringify(data, null,4))
        console.log(JSON.stringify(data));

    res.send(JSON.stringify(data));
});*/ //exercicio 2

gradesRouter.delete("/:id", async (req, res) => {
    const data = JSON.parse(await readFile(global.gradesJson)); //data recebe o arquivo grades.json da variavel global localizada no index.js

    data.grades = data.grades.filter(  //data recebe um filtro sobre os valores que não contenham o ID
        grade => grade.id !== parseInt(req.params.id)
    );
    await writeFile(global.gradesJson, JSON.stringify(data)); //arquivo é substituido pelo vetor atual
    res.end(); //fim da resposta
    console.log(JSON.stringify(data));  //retorno via console.
});//exercicio 3

gradesRouter.get("/:id", async (req, res) => {
    const data = JSON.parse(await readFile(global.gradesJson)); //data recebe o arquivo grades.json da variavel global localizada no index.js
    const filtro = data.grades = data.grades.filter(  //data recebe um filtro sobre os valores que não contenham o ID
        grade => grade.id == parseInt(req.params.id)
    );
    res.send(JSON.stringify(filtro)); //filtro exibe o registro que contenha o id

}); //exercicio 4

gradesRouter.get("/:student/:subject", async (req, res) =>{
    const data = JSON.parse(await readFile(global.gradesJson)); //data recebe o arquivo grades.json da variavel global localizada no index.js
    const total = data.grades.filter( //total recebe os valores do json com reduce para soma e filtro
        (grade) => {
            return grade.student == req.params.student && grade.subject == req.params.subject
        }
    )
    .reduce((accumulator, current) => {
        return (accumulator += current.value);
    }, 0);

    res.send(JSON.stringify(total));
    console.log(JSON.stringify(total));
}); //exercicio 5

gradesRouter.get("/media/:subject/:type", async (req, res) => {
    const data = JSON.parse(await readFile(global.gradesJson)); //data recebe o arquivo grades.json da variavel global localizada no index.js
    const totalFiltro = data.grades.filter((grade) =>{
        grade.subject === req.params.subject && grade.type === req.params.type;
    });
    const total = totalFiltro.reduce((accumulator, current) => {
        return (accumulator += current.value);
    }, 0);

    const media = (total / totalFiltro.length);
    console.log(totalFiltro)
    console.log(total)
    res.send("Media é " + JSON.stringify(media));
}) //exercicio 6






export default gradesRouter; //passo 15