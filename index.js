var fs = require('fs');
var Midi = require('jsmidgen');

var file = new Midi.File();
var track = new Midi.Track();
file.addTrack(track);

var content = fs.readFileSync("output.json");
var data = JSON.parse(content);

// console.log(data);

var trim=150; //removes notes too low
var min=999;
var max=0;

for (var i = 0; i < data.length; i++) {
	if(data[i] < min && data[i] > trim)
		min=data[i];
	if(data[i] > max)
		max=data[i];
}

//setup note table
var notes=['c','c#','d', 'd#', 'e','f', 'f#','g','g#','a','a#','b'];
var notesTable=[];
//c c#
for (var i = 0; i < 88; i++) {
	var note  = i%12;
	var scale = Math.floor(i/12 + 1);
	notesTable[i]=notes[note] + scale;
}
console.log(notesTable);
console.log("min : " + min + " and max:" + max + "for a range of: "  + (max-min)/2);

for (var i = 0; i < data.length; i++) {
	
	var noteNumber = (Math.floor((data[i] - min) /2));
	console.log(noteNumber + ' ' + notesTable[noteNumber]);
	if(noteNumber>0)
	track.addNote(0, notesTable[noteNumber], 64);


}

// track.addNote(0, 'c4', 64);
// track.addNote(0, 'd4', 64);
// track.addNote(0, 'e4', 64);
// track.addNote(0, 'f4', 64);
// track.addNote(0, 'g4', 64);
// track.addNote(0, 'a4', 64);
// track.addNote(0, 'b4', 64);
// track.addNote(0, 'c5', 64);

fs.writeFileSync('test.mid', file.toBytes(), 'binary');
