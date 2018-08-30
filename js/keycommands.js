keyboardJS.pause();
keyboardJS.on("shift", function(e){
    e.preventRepeat();
    if(master.track !== null && master.track !== undefined)
    {
        master.state.mode = "add";
        for(var uid in master.trackList)
        {
            master.trackList[uid].state.mode = "add";
        }
    }
},
function(){
    if(master.track !== null && master.track !== undefined)
    {
        master.state.reset();
        for(var uid in master.trackList)
        {
            master.trackList[uid].state.resetMode();
        }
    }
});

keyboardJS.on("s", function(e){
    e.preventRepeat();
    master.state.mode = "seek";
},
function(){
    master.state.reset();
});

keyboardJS.on(["up", "down", "right", "left"], function(e){
    let newPos = {
        x: master.positioning.x,
        y: master.positioning.y
    };

    switch(e.key)
    {
        case "ArrowLeft":
            newPos.x += 20;
            break;
        case "ArrowRight":
            newPos.x -= 20;
            break;
        case "ArrowUp":
            newPos.y += 20;
            break;
        case "ArrowDown":
            newPos.y -= 20;
            break;
    }

    if(newPos.x + master.background.w < canvas.width)
    {
        newPos.x = canvas.width - master.background.w;
    }
    
    if(newPos.x > 0 && master.background.w > canvas.width)
    {
        newPos.x = 0;
    }

    if(newPos.y + master.background.h < canvas.height)
    {
        newPos.y = canvas.height - master.background.h;
    }
    
    if(newPos.y > 0 && master.background.h > canvas.height)
    {
        newPos.y = 0;
    }

    if(master.background.w > canvas.width)
    {
        master.positioning.x = newPos.x;
        master.positioning.stuck = false;
    }

    if(master.background.h > canvas.height)
    {
        master.positioning.y = newPos.y;
        master.positioning.stuck = false;
    }
});

keyboardJS.on(["ctrl + =", "ctrl + +", "cmd + =", "cmd + +"], function(e){
    e.preventDefault();
    master.positioning.zoom += 0.01;
});

keyboardJS.on(["ctrl + -", "cmd + -"], function(e){
    e.preventDefault();
    if(master.positioning.zoom > 0.02)
        master.positioning.zoom -= 0.01;
    else
        master.positioning.zoom = 0.01;
});

keyboardJS.on(["=", "+"], function(e){
    master.positioning.zoom += 0.05;
});

keyboardJS.on("-", function(e){
    if(master.positioning.zoom > 0.1)
        master.positioning.zoom -= 0.05;
    else
        master.positioning.zoom = 0.05;
});

keyboardJS.on(["ctrl + 0", "cmd + 0"], function(e){
    e.preventDefault();

    master.positioning.zoom = 1;
    master.positioning.autoZoom = true;
    master.positioning.stuck = true;
    drawGraphics();
    document.getElementById("screen-fit-button").classList.add("disabled");
});

keyboardJS.on("ctrl", function(e){
    e.preventRepeat();
    master.state.mode = "positioning";
},
function(){
    master.state.reset();
});

keyboardJS.on(["ctrl+z", "cmd+z"], function(){
    master.undo();
});

keyboardJS.on(["ctrl+y", "cmd+z"], function(){
    master.redo();
});

keyboardJS.on(["ctrl+s", "cmd+s"], function(e){
    e.preventRepeat();
    e.preventDefault();
    saveProject.show();
});