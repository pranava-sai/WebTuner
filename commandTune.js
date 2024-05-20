// Subrahmanya Sree Pranava Sai Maganti
// Assignment 7
// Creative Idea Assignment
// PlayMusic
// 12-03-2022

/* The below written code works on reading the text file with the list mp3 music files stored in the computer.
After reading the text file, upon running the code, it prints the list of songs. It then plays the song that has been selected.
To make the code complex, I have also put in the pause, resume and stop options which work like pausing, resuming from the paused spot, and stopping the currently playing song.
I have used Howler.js to play the mp3 music files stored into different folders with the respective artist name.
Upon selection of the song in the terminal after the list is printed, firstly it prints the song that is played along with the name of the artist.
To avoid error in the code while using in different device, I used the relative path feature which avoids the use of the entire path of the code.
*/

const fs = require('fs');
const { Howl, Howler } = require('howler');

// This section of the code below read all the line in the text file and separate the entire text with (comma ','). 
// It also prints the number of lines in the text file by reading the entire file and in the main function asks to select one song from the list. 
// The empty list is created to append each element in the text file.

function loadFile(fileName) {
    fileName = "." + fileName;
    const contents = fs.readFileSync(fileName, 'utf-8').split('\n');

    let data = [];
    for (let line of contents) {
        line = line.trim();
        if (line) {
            let line1 = line.split(',').map(element => element.trim());
            data.push(line1);
        }
    }
    return data;
}

// This function is created to read and print the list of songs for selection among all of them.

function display(songs) {
    console.log();
    for (let music of songs) {
        console.log(`${music[0]}, ${music[1]}, ${music[2]}`);
        console.log();
    }
}

// This function is created for playing the song from the relative path mentioned in the code. 
// It not only plays the song, but it also prints the name of the song and that of the artist. 
// This section of code also has a 'while' section wherein it is used to pause or stop the current playing song and resume the song from the spot where it was paused. 
// If any other option apart from the [p]ause, [r]esume or [s]top are given, it prints out "Invalid Statement" .
// Also, I have used the (lower) string function which is used to convert the choice [p], [r], and [s] if given in uppercase to lowercase.

function playSong(songPath, songName, songArtist, fileName) {
    console.log();
    console.log(`Now Playing ${songName} by ${songArtist}`);

    const sound = new Howl({
        src: [songPath]
    });

    sound.play();

    let choice1 = '';
    while (true) {
        console.log();

        if (choice1 === "") {
            choice1 = prompt("Do you wish [p]ause the current song? or [s]top playing the song or [f]restart the song ?");
        } else {
            choice1 = prompt("Do you wish [r]esume the current song? or [s]top playing the song?");
        }

        choice1 = choice1.toLowerCase();
        if (choice1 === "p") {
            sound.pause();
        } else if (choice1 === "r") {
            sound.play();
            choice1 = '';
        } else if (choice1 === "f") {
            sound.seek(0);
            sound.play();
            choice1 = '';
        } else if (choice1 === "s") {
            sound.stop();
            break;
        } else {
            console.log("Invalid input... Please try again");
            choice1 = "";
        }
    }
}

// The main function in the code has code that loads the text file with the list of songs, prints the list of songs. 
// It also has a section of code that asks for input of the choice for which song to play among the specified range in the terminal upon running. 
// In the choice section, if the choice is 0, the code breaks and anything else in the range, it prints out the song name, artist and plays the song.

function main() {
    console.log();
    console.log("Welcome to Musical Party");
    console.log();

    console.log("By: <Pranava Sai Maganti>");
    console.log();

    const fnSongs = loadFile("/songs.txt");
    const totalSongs = fnSongs.length - 1;

    while (true) {
        display(fnSongs);
        console.log();
        let choice;
        try {
            choice = parseInt(prompt(`Select a song from the List Displayed [1]-[${totalSongs}], [0]quit : `));
        } catch (e) {
            console.log("Invalid Input !!!");
            console.log("Please enter an input between the mentioned range above !!! Try Again");
            choice = parseInt(prompt(`Select a song from the List Displayed [1]-[${totalSongs}], [0]quit : `));
        }

        if (choice === 0) {
            console.log("Good Bye !!!");
            break;
        } else {
            playSong(fnSongs[choice][3], fnSongs[choice][2], fnSongs[choice][1], fnSongs);
        }
    }
}

main();