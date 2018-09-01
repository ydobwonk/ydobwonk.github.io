function setStorage(key, value)
{
    localStorage.setItem(key, value);
}

function getStorage(key)
{
    return localStorage.getItem(key);
}

function deleteStorage(key)
{
    localStorage.removeItem(key);
}


window.addEventListener("beforeunload", function (e) {
    if(master.saved)
        return null;
    else
    {
        var confirmationMessage = "You have made unsaved changes. If you leave without saving these changes will be lost.";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
});