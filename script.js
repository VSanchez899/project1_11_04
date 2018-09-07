/*  Project 01_11_04

    Author: Vincent Sanchez
    Date:   9.7.18

    Filename: script.js
*/

"use strict";
//this is used when the user uses a keyboard key in the postal code field
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
}
else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}

//checks if zip is 5 numbers long
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getlocation()
    }
    else{
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

//
function getlocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
        
        httpRequest.abort();
        httpRequest.open("get", "http://api.zippoptam.us/us/" + zip, true);
        httpRequest.send(null);
        httpRequest.onreadystatechange = displayData();
    }
}

function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.respoceText);
        
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"]
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}

//
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest
    } catch (requestError) {
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        }
        else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }
        return false;
    }
    console.log(httpRequest);
    return httpRequest;
}

//global variables
var httpRequest = false;