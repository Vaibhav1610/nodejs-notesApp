const notes = require("./notes.js");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const { command } = require("yargs");

yargs.command({
    command:'add',
    describe:'Add a new Note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'content of note',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
       notes.addNotes(argv.title,argv.body);
    }
}).command({
    command:'remove',
    describe:'removes note',
    builder:{
        title:{
            describe:'title to remove',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.removeNote(argv.title)
    }
}).command({
    command:'list',
    describe:'list all note',
    handler:function(){
        notes.listAllNotes();
    }
}).command({
    command:'read',
    describe:'read notes',
    builder:{
        title:{
            describe:"fetches note to read",
            demanOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.readNote(argv.title);
    }
}).argv;