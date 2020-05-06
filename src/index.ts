import fs from 'fs';
import readline from 'readline';

import http from 'http';
import stream from 'stream';
import { buildSchema, graphql, responsePathAsArray } from 'graphql';


var FORMAT_ERROR = (score: any, data: any) => {
  var correctJSON = false;
  return `FORMATTING ERROR: INVALID JSON FORMAT for "SCORE": ${score}
  "data": ${data}`;
}
var input;
var filepath: string;
var n: number;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var scoreData = new Map;

function getFileData() {

  rl.question(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

!------------------------- SCORE RANK ------------------------!

    Given < File-Path > to Scores to be Ranked, 
    Outputs < N > TOP Scores in Descending Order

  | Formatting       
    - Input Format: <file-path> <n-scores> 
    - File Format(s): .data, .txt
    - Line Format: <score>: <JSON-Object> 

  | Constraints
    - <n-scores>:   Non-Negative Integer (<= file.length)
    - <score>:  Non-Negative 32-Bit Integer
    - <JSON-Object>:  Valid JSON containing Score's "id"
    - "id": Unique GUID at Top Level of JSON Object   
  
  | Example
    > ./scores.data 3

!------------------------ TOP 3 SCORES ------------------------!
    
    [
      { score: 13214012, id: '085a11e1b82b441184f4a193a3c9a13c' },
      { score: 11446512, id: '84a0ccfec7d1475b8bfcae1945aea8f0' },
      { score: 11269569, id: '7ec85fe3aa3c4dd599e23111e7abf5c1' }
    ]
    
  Successful Run: Error Code 0   

!------------------- LET'S RANK SOME SCORES -------------------!

> `, (query) => {
  
    input = query.split(' ');
    filepath = input.shift();
    n = Number(input);
    let instream = fs.createReadStream(filepath);
    let readfile = readline.createInterface({
      input: instream
    });
    var response = readfile.on('line', function (line: any) {
      var entry = String(line);
      let separator = entry.indexOf("{");
      var score = String(entry.split(': ', 1));
      var val = entry.substring(separator);
      scoreData.set(score, val);
    });
    response.on("close", () => {
      let keys = Array.from(scoreData.keys());

      keys.sort(function(a,b) {
        let i = parseInt(a, 10);
        let j = parseInt(b, 10);
        return i-j;
      }).reverse();
      
      var entries = new Array;
      for (let i = 0; i < n && i < keys.length; i++) {
        var score = keys[i];
        var data = scoreData.get(score);
        try {
          var json = JSON.parse(data);
          let id = String(json.id);
          if (!id) throw `Formatting Error: Score's 'id' NOT present in JSON's Top Level`;
          let entry = {
            "score": score,
            "id": json.id
          }
          entries.push(entry);
        } catch (err) {
          throw new Error(FORMAT_ERROR(score, data));
        }
      }
      const scoresRanked = JSON.parse(JSON.stringify(entries));
      console.log(`\n!---------------------- TOP ${n} SCORES ----------------------!\n`);
      console.log(scoresRanked);
      console.log('\nSuccessful Run: Error Code 0');
    })
    rl.close();
  });
};

getFileData();