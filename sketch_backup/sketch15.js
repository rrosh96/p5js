let w;
let columns;
let rows;
let board;
let next;

function setup (){
    createCanvas(800,800);
    w = 20;
    columns = floor(width/w);
    rows = floor(height/w);
    board = new Array(columns);
    for (let i = 0; i < columns; i++){
        board[i] = new Array(rows);
    }
    next = new Array(columns);
    for (let i = 0; i < columns; i++){
        next[i] = new Array(rows);
    }
    init();
    // console.log(board);
}

function draw(){
    background(255);
    generate();
    for (let i = 0 ; i < columns; i++){
        for (let j = 0; j < rows; j++){
            if(board[i][j]===0){
                fill (255);
            } else {
                fill (0)
            }
            stroke(2)
            rect (i * w, j * w, w-1, w-1); 
        }
    }

}

function init() {
    for (let i = 0; i < columns; i++){
        for (let j = 0; j < rows; j++){
            if (i === 0 || j === 0 || i === columns -1 || j === rows -1){
                board[i][j] = 0;
            } else {
                board[i][j] = floor(random(2));
            }
            next[i][j] = 0;
        }
    }
}

function generate(){
    for (let i = 1; i < columns-1; i++){
        for (let j = 1; j < rows-1; j++){
            let neighbours =0;
            for (let k = -1; k <=1; k++){
                for (let l = -1; l <=1 ; l++){
                    // console.log(board);
                    neighbours += board[i + k][j + l];
                }
            }
            neighbours -= board[i][j];

            if(board[i][j]=== 1 && neighbours < 2){ next[i][j]=0}
            else if (board[i][j] === 1 && neighbours > 3){next[i][j] =0}
            else if (board[i][j] === 0 && neighbours === 3){next[i][j] = 1}
            else { next[i][j] = board[i][j]
            }
        }
    }
    let temp = board;
    board = next;
    next = temp;
}