<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once './vendor/autoload.php';

use FormGuide\Handlx\FormHandler;

$pp = new FormHandler(); 

$validator = $pp->getValidator();
$validator->fields(['username','phone'])->areRequired()->maxLength(50);

$pp->sendEmailTo('seniorserzhan@gmail.com'); // ← Your email here

echo $pp->process($_POST);
?>