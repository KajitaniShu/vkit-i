
//********************************************************//
// main.js                                                //
// → 接続確立時の処理を記述                              //
//********************************************************//
'use strict';
const socket = io();
const canvas = $('#canvas1')[0];
const d_canvas = $('#canvas2')[0];
const world = new World(socket, canvas, d_canvas);

socket.on('connect', async () =>{
    await world.init();
    $('#loading').hide();
    $('body').css('background-color','white');
    $('#canvas1').show();
    $('#canvas2').show();
    $('#desc-btn').show();
    world.Start();
    
    setInterval(() => {
        world.Animate();
    },1000/30);
});
