# ScoreRank
Given a data file containing scores and proper JSON documents containing an 'id' key, return N highest scores ranked in descending order.

## Dependencies
Install the following: 
* NodeJS + npm: <https://nodejs.org/en/>
* `npm` will take care of the rest

## Setup
Clone & navigate to the `score-rank` repository. 

Use a Package Manager to install further dependencies, I use `npm` (Node's Package Manager). 
```
> cd score-rank
> npm install
``` 
## Using ScoreRank
After installing all necessary dependencies using `npm install`, enter the following command within the `score-rank` repository:
```
> npm start
```
Should everything have installed properly, `ScoreRank` will start and the user will be greeted with the following prompt:
```

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

> [ Your Input Goes Here ]
```
### ~~ Happy Ranking! ~~
