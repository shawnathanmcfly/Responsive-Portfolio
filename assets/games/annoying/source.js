////////////////////////////////////////////////////////////
//
//                       Annoying
//
//                 An RPG by Shawn Achimasi
//
//
////////////////////////////////////////////////////////////

// GLOBALS
var px = 10;
var py = 10;
var px_snap = 0;
var py_snap = 0;
var c = document.getElementById("gameWindow");
var ctx = c.getContext("2d");
var music = document.getElementById("dun1");
var brick_side1 = document.getElementById("brick_side1");
var brick_side2 = document.getElementById("brick_side2");
var brick = document.getElementById("brick");
var bg = document.getElementById("bg");
var keyPressed = [0, 0, 0, 0];
var px = 2;
var py = 1;
var dir = 1; //EAST

var level = [

    [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

];

var pView = [

    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0

];

function drawView(){

    document.getElementById("msgBox").innerHTML = 

    "" +
    pView[6] + " " + pView[7] + " " + pView[8] + "<br>" +
    pView[3] + " " + pView[4] + " " + pView[5] + "<br>" +
    pView[0] + " " + pView[1] + " " + pView[2];
}

function drawMap(){

    let mapx = 0;
    while( mapx < px - 8 ){
        mapx++;
    }

    let mapy = 0;
    while( mapy < py - 8 ){
        mapy++;
    }    

}

function getView(){

    //south
    if( dir == 0){

        for(let yy = 0; yy > -6 && py + yy >= 0; yy-- ){

            pView[Math.abs(yy)*3] = level[py+yy][px-1];
            pView[Math.abs(yy)*3+1] = level[py+yy][px];
            pView[Math.abs(yy)*3+2] = level[py+yy][px+1];

        }

    }else if( dir == 1 ){
        
        for(let yy = 0; yy < 6 && py + yy < level.length; yy++ ){

            pView[yy*3] = level[py+yy][px+1];
            pView[yy*3+1] = level[py+yy][px];
            pView[yy*3+2] = level[py+yy][px-1];
 
        }
        
    }else if( dir == 2 ){
        
        let i = 0;
        for(let x = 0; x < 6; x++ ){

            pView[ i++ ] = level[py - 1][px+x];
            pView[ i++ ] = level[py][px+x];
            pView[ i++ ] = level[py + 1][px+x];
            
        }
        
    }else if( dir == 3 ){

        let i = 0;
        for(let x = 0; x > -6; x-- ){

            pView[ i++ ] = level[py + 1][px+x];
            pView[ i++ ] = level[py][px+x];
            pView[ i++ ] = level[py - 1][px+x];
            
        }
    }
}

function drawSurround(){

    ctx.drawImage(bg, 0, 0);
    

        //check left size of player
        if( pView[ 0 ] == 1 ){
            ctx.drawImage(brick_side1, 0, 0);
        }
        if( pView[ 3 ] == 1 ){
            ctx.drawImage(brick_side2, 68, 0);
        }
        if( pView[ 6 ] == 1 ){
            ctx.drawImage(brick_side3, 111, 0);
        }
        if( pView[ 9 ] == 1 ){
            ctx.drawImage(brick_side4, 136, 0);
        }
        if( pView[ 12 ] == 1 ){
            ctx.drawImage(brick_side5, 147, 0);
        }

        ctx.save();
        ctx.translate(67, 0);
        ctx.scale( -1, 1 );
        //check right side of player
        if( pView[ 2 ] == 1 ){
            ctx.drawImage(brick_side1, -400 + 67, 0);
        }
        if( pView[ 5 ] == 1 ){
            
            ctx.drawImage(brick_side2, -333 + 67, 0);
        }
        if( pView[ 8 ] == 1 ){
            
            ctx.drawImage(brick_side3, -290 + 67, 0);
        }
        if( pView[ 11 ] == 1 ){
            
            ctx.drawImage(brick_side4, -265 + 67, 0);
        }
        if( pView[ 14 ] == 1 ){
            
            ctx.drawImage(brick_side5, -254 + 67, 0);
        }
        
        ctx.restore();

        if( pView[ 16 ] == 1 ){
            ctx.drawImage(brick, 154, 177, 93, 58 );
        }
        if( pView[ 13 ] == 1 ){
            ctx.drawImage(brick, 147, 169, 107, 70 );
        }
        if( pView[ 10 ] == 1 ){
            ctx.drawImage(brick, 136, 158, 129, 94 );
        }
        if( pView[ 7 ] == 1 ){
            ctx.drawImage(brick, 111, 127, 179, 148 );
        }

        if( pView[ 4 ] == 1 ){

            ctx.drawImage(brick, 68 , 78, 264, 236 );
    
        }

        if( pView[2] == 0 && pView[5] == 1 ){
            ctx.drawImage(brick, 332 , 78, 264, 236 );
        }

        if( pView[0] == 0 && pView[3] == 1 ){
            ctx.drawImage(brick, 68 - 264 , 78, 264, 236 );
        }
            
}

document.addEventListener("keydown", function(event){

    if( event.keyCode == 40 ){
        
        //facing south
        if( dir == 1 && py != 0 && level[ py - 1 ][px] != 1){
            py--;

            
        }else if( dir == 2 && level[ py ][ px - 1] != 1 ){
            px--;
        }else if( dir == 3 && level[ py ][ px + 1] != 1 ){
            px++;
        }else if( dir == 0 && level[ py + 1][ px ] != 1 ){
            py++;
        }

        document.getElementById("msgBox").innerHTML = "X: "+ px + " Y: " + py;
    }

    if( event.keyCode == 38 ){
        
        //if facing south
        if( dir == 1 && pView[ 4 ] != 1 ){
            py++;
        }else if( dir == 2 && pView[4] != 1 ){
            px++;
        }else if( dir == 3 && pView[4] != 1 ){
            px--;
        }else if( dir == 0 && pView[4] != 1 ){
            py--;
        }
        
        document.getElementById("msgBox").innerHTML = "X: "+ px + " Y: " + py;
    }

    if( event.keyCode == 37 ){
        
        if( dir == 1 ){
            document.getElementById("msgBox").innerHTML = "Facing East";
            dir = 2;
        }else if( dir == 3 ){
            document.getElementById("msgBox").innerHTML = "Facing South";
            dir = 1;
        }else if( dir == 2 ){
            dir = 0;
            document.getElementById("msgBox").innerHTML = "Facing North";
        }else if( dir == 0){
            dir = 3;
            document.getElementById("msgBox").innerHTML = "Facing West";
        }
    }

    if( event.keyCode == 39 ){
        
        if( dir == 2 ){
            document.getElementById("msgBox").innerHTML = "Facing South";
            dir = 1;
        }else if( dir == 1 ){
            dir = 3;
            document.getElementById("msgBox").innerHTML = "Facing West";
        }else if( dir == 3 ){
            dir = 0;
            document.getElementById("msgBox").innerHTML = "Facing North";
        }else if( dir == 0){
            dir = 2;
            document.getElementById("msgBox").innerHTML = "Facing East";
        }

    }

    getView();
    
    drawSurround();
    
}, false);


window.onload = (function() { 

    for( let wait = 0; wait < 10000; wait++ ){
        //loser attempt add implementing wait for resources load
    }

    
    getView();
    drawMap();
    drawSurround();
    for( let wait = 0; wait < 50000; wait++ ){
        //loser attempt add implementing wait for resources load
    }

});



    /*ctx.drawImage(p_down, px, py);*/


/*window.onkeyup = function(event){

    if( event.keyCode == 40 ){
        keyPressed[0] = 0;
    }

    if( event.keyCode == 38 ){
        keyPressed[1] = 0;
    }

    if( event.keyCode == 37 ){
        keyPressed[2] = 0;
    }

    if( event.keyCode == 39 ){
        keyPressed[3] = 0;
    }
}

function loop(timestamp){

    if( keyPressed[0] == 1 ){
        py += 2;
    }

    if( keyPressed[1] == 1 ){
        py -= 2;
    }

    if( keyPressed[2] == 1 ){
        px -= 2;
    }

    if( keyPressed[3] == 1 ){
        px += 2;
    }

    

    requestAnimationFrame(loop);
}

window.requestAnimationFrame( loop );*/