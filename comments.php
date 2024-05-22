<?php
$db = new mysqli("127.0.0.1","root","","yao");
$db->query("INSERT INTO `1208`(`content`) VALUES ('$_POST[content]')");
header("Location:message_board.php");