<?php
var_dump($file_name);
$file_name = $_FILES['file']['name'];                           // Nombre fichero
$tmp_name = $_FILES['file']['tmp_name'];                        // Nombre archivo temporal
$file_up_name = time().$file_name;                              // Creamos un nombre único
move_uploaded_file($tmp_name, "../download/".$file_up_name);    // Movemos el archivo a la carpeta
?>