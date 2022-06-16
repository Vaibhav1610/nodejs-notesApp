const fs = require("fs");
const chalk = require("chalk");
const getNotes = function(){
  return "get notes";
}

const addNotes = function(title,body){

    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title===title;
    });
    if(duplicateNotes.length===0)
    {
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log("Note added successfully");
    }
    else{
        console.log("duplicate Note with same title exists");
    }

}

const saveNotes=function(notes){

    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = function(){

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }catch(e)
    {
        return [];
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    const noteSTokeep = notes.filter(function(note){
        return note.title !== title;
    });
    
    if(notes.length>noteSTokeep.length)
    {
        console.log(chalk.bold.green("Note Deleted Successfully"));
        saveNotes(noteSTokeep);
    }
    else
    {
        console.log(chalk.bold.red("Note Not Found with Titile: "+ title));
    }
}

const listAllNotes = function(){

    const notes = loadNotes();
    if(notes.length>0)
    {
        console.log(chalk.bold.italic.yellow("List Of All Notes"));
        notes.forEach(note => {
            console.log(chalk.bold.blue("Note Titile: "+note.title));
        });
    }
    else
    {
        console.log(chalk.bold.red("No Notes Found"));
    }

}

const readNote=function(title){

    const notes = loadNotes();
    const noteToRead = notes.find((note)=>note.title===title)
    if(noteToRead)
    {
        console.log(chalk.bold.italic.yellow("Note Title : "+noteToRead.title));
        console.log(chalk.italic.green("Contents of Note :-"));
        console.log(chalk.italic.blue(noteToRead.body));
    }
    else{
        console.log(chalk.bold.red("Note Not Found"));
    }

}

module.exports = {
    addNotes:addNotes,
    listAllNotes:listAllNotes,
    removeNote:removeNote,
    readNote:readNote
}