// Page List Script
// ~Samuel Shelley 2024-09-05

let objects_data = [];

// GET OBJECT DATA
async function getObjects() {
    // GET Objects from API
    let rtn = await fetch("/api/objects/get/", {
        method:"GET"
    });
    // Parse Text Return
    let res = await rtn.text();

    // Attempt API Deconstruction
    try {
        res = await JSON.parse(res);
    
        if (res.state == "Okay" ) {
            objects_data = res.data["role_based_return"];
            printObjects();
        } 
        else {
            add_notification("err", res.error);
        }
    } 
    catch {
        console.log("API Parse Failure");
        add_notification("err", "Internal Server Error");
    }
}

// VIEW OBJECTS
async function printObjects() {
    let table = document.getElementById("object_list");

    objects_data.forEach((object, id) => {
        let row = document.createElement("tr");
        row.id = "object_row-" + id;
        row.addEventListener("click", updateThisObject);

        let name = document.createElement("td");
        name.innerHTML = object["object_name"];
        name.className = "first_col";
        row.appendChild(name);
        let attribute = document.createElement("td");
        attribute.innerHTML = object["attribute"];
        row.appendChild(attribute);
        let visibility = document.createElement("td");
        visibility.innerHTML = object["visibility"] == 1 ? "True" : "False";
        row.appendChild(visibility);

        table.appendChild(row);
    });

    let row = document.createElement("tr");
    row.id = "object_row_add";

    let first_col = document.createElement("td");
    first_col.innerHTML = "";
    first_col.className = "first_col";
    row.appendChild(first_col);
    let blank = document.createElement("td");
    blank.innerHTML = "";
    row.appendChild(blank);
    let add_new = document.createElement("td");
    add_new.id = "add_new_button";
    add_new.className = "last_col";
    add_new.innerHTML = "Add New Object +";
    add_new.addEventListener("click", toggleAddObject);
    row.appendChild(add_new);

    table.appendChild(row);
}

// OPEN ADD OBJECT VIEW
let add_open = false;
async function toggleAddObject() {
    if (add_open) {
        document.getElementById("add_object_container").style.display = "none";
        document.getElementById("add_new_button").innerHTML = "Add New Object +";
        add_open = false;
    } else {
        document.getElementById("add_object_container").style.display = "flex";
        document.getElementById("add_new_button").innerHTML = "Close New Object -";
        add_open = true;
        document.getElementById("update_object_container").style.display = "none";
        update_open = false;
        update_uuid = null;
    }
}

// OPEN UPDATE OBJECT VIEW
let update_open = false;
let update_uuid;
async function updateThisObject(evt) {
    if (update_open) {
        document.getElementById("update_object_container").style.display = "none";
        update_open = false;
        update_uuid = null;
    } else {
        document.getElementById("update_object_container").style.display = "flex";
        update_open = true;
        document.getElementById("add_object_container").style.display = "none";
        document.getElementById("add_new_button").innerHTML = "Add New Object +";
        add_open = false;

        let object_id = evt.srcElement.parentElement.id.split("-")[1];
        update_uuid = objects_data[object_id].object_uuid;
        document.getElementById("u_name").value = objects_data[object_id].object_name;
        document.getElementById("u_attr").value = objects_data[object_id].attribute;
        document.getElementById("u_visbl").checked = objects_data[object_id].visibility == 1 ? true : false;
    }
}

// Pulls Data From API
getObjects();

// ADD OBJECT
async function submitObjectAdd() {
    let name = document.getElementById("a_name").value;
    let attribute = document.getElementById("a_attr").value;
    let visibility = document.getElementById("a_visbl").checked;
    let data = new URLSearchParams();
    data.append('object_name', name);
    data.append('attribute', attribute);
    data.append('visibility', visibility);

    let rtn = await fetch("/api/objects/post/", {
        method:"POST",
        body: data
    });
    // Parse Text Return
    let res = await rtn.text();

    // Attempt API Deconstruction
    try {
        res = await JSON.parse(res);
    
        if (res.state == "Okay" ) {
            objects_data = res.data;
            window.location.reload();
        } 
        else {
            add_notification("err", res.error);
        }
    } 
    catch {
        console.log("API Parse Failure");
        add_notification("err", "Internal Server Error");
    }
}

// UPDATE OBJECT
async function submitObjectUpdate() {
    let name = document.getElementById("u_name").value;
    let attribute = document.getElementById("u_attr").value;
    let visibility = document.getElementById("u_visbl").checked;
    let data = new URLSearchParams();
    data.append('uuid', update_uuid);
    data.append('object_name', name);
    data.append('attribute', attribute);
    data.append('visibility', visibility);

    let rtn = await fetch("/api/objects/put/", {
        method:"POST",
        body: data
    });
    // Parse Text Return
    let res = await rtn.text();

    // Attempt API Deconstruction
    try {
        res = await JSON.parse(res);
    
        if (res.state == "Okay" ) {
            objects_data = res.data;
            window.location.reload();
        } 
        else {
            add_notification("err", res.error);
        }
    } 
    catch {
        console.log("API Parse Failure");
        add_notification("err", "Internal Server Error");
    }
}

// DELETE OBJECT
async function deleteObject() {
    let data = new URLSearchParams();
    data.append('uuid', update_uuid);

    let rtn = await fetch("/api/objects/delete/", {
        method:"POST",
        body: data
    });
    // Parse Text Return
    let res = await rtn.text();

    // Attempt API Deconstruction
    try {
        res = await JSON.parse(res);
    
        if (res.state == "Okay" ) {
            objects_data = res.data;
            window.location.reload();
        } 
        else {
            add_notification("err", res.error);
        }
    } 
    catch {
        console.log("API Parse Failure");
        add_notification("err", "Internal Server Error");
    }
}