// Modal Script
// ~Samuel Shelley 2024-05-01
let modal_container = document.getElementById("modal_container");
let modal_open = false;
// Modal Sections
let modal_title = document.getElementById("modal_title");
let modal_data = document.getElementsByClassName("modal_data");

// Close Modal function called by close button
function closeModal() {
    modal_container.style.display = "none";
    modal_open = false;
    // Nullifies the data section so that appending doesn't repeat
    modal_data[0].innerHTML = "";
}

/*  
 *  Show modal called by event listener on any array of items
 *  Parameters are: @param item - array of attributes of specified item such as user or project
 *                                  Item must be an associative array. Could include @title and @image
 *                                  Image is stored locally in `/assets/photos/` directory. Data of 
 *                                  image varibale is the name of the image including file type.
 *                  @param type - string specified when calling the function to determine how modal is built
 */
function showModal(item = {"title":"Modal"}) {
    if (!modal_open) {
        modal_container.style.display = "flex";
        modal_open = true;

        // Loop through values of associative array
        item.forEach(value => {
            if(value === "title"){
                // Add title to Modal
                modal_title.innerHTML = item.title;
            }
            else if(value === "image"){
                // Item Image
                let modal_image = document.createElement("div");
                modal_image.classList = "image";
                modal_image.innerHTML = `<img src='/assets/photos/` + item.image + ` alt='Photo' onerror="this.src='/assets/photos/not-found.jpg'" draggable="false">`;
                // Add to Data Block
                modal_data[0].appendChild(modal_image);
            }
            else {
                // Other data
                let modal_info = document.createElement("span");
                modal_info.classList = "modal_text";
                modal_info.innerHTML = item[value];
                // Add to Data Block
                modal_data[0].appendChild(modal_info);
            }
        });
        return true;
    }
    else {
        return false;
    }
}