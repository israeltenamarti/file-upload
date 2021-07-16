const form = document.querySelector("form");
fileinput = form.querySelector(".file-input");
progressArea = document.querySelector(".progress-area");
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", ()=>{
    fileinput.click();
});

fileinput.onchange = ({target}) =>{
    //console.log(target.files);
    let file = target.files[0]; 
    if (file){
        //Si se ha seleccionado un fichero
        let fileName = file.name;  //Obtenemos el nombre
        //Si es un nombre largo lo ajustamos
        if ( fileName.length >= 12  ){
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0,12) + "... ." + splitName[1];
        }
        uploadFile(fileName);
    }
}

function uploadFile(name){
    //Creamos el objeto AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/upload.php");   //Enviamos por POST 
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
        //console.log(e);
        let fileLoaded = Math.floor((loaded/total) * 100); //Obtenemos el porcentaje subido del archivo
        let fileTotal = Math.floor(total/ 1024); //Obtenemos el tamaño en Kb 
        let filesize;
        (fileTotal < 1024) ? filesize = fileTotal + " Kb" : filesize = (loaded / (1024 * 1024)).toFixed(2) + " Mb";
        //Mostramos la progresión en la pantalla dentro de la seccion "progress-area"
        let progressHTML=`<li class="row">
                            <div class="content">
                                <div class="details">
                                    <span class="name"> <i class="fas fa-file-alt"></i> ${name}</span>
                                    <span class="percent">${fileLoaded}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${fileLoaded}%"></div>
                                </div>
                            </div>
                        </li>`;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;
        //Cuante este cargado, agregamos el fichero a la lista dentro de la "uploaded-area" y limpiamos la seción "progress-area"
        if ( loaded == total ){
            progressArea.innerHTML = "";
            let uploadedHTML =`<li class="row">
                            <div class="content">
                                <div class="details">
                                    <span class="name"><i class="fas fa-file-alt"></i> ${name}</span>
                                    <span class="size">${fileTotal} Kb</span>
                                    <i class="fas fa-check"></i>
                                </div>
                            </div>
                        </li>`;
            //uploadedArea.innerHTML = uploadedHTML;
            //Agrega a la lista de ficheros
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
        //console.log(fileLoaded, fileTotal);
    });

    let formData = new FormData(form);  //Formdata es un objeto para enviar datos facilmente
    xhr.send(formData);  //enviamos los datos a PHP
}