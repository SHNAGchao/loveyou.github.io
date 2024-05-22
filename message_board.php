<?php
$db = new mysqli("127.0.0.1","root","","yao");
$res = $db->query("SELECT `content`, `date` FROM `1208`");
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>瑶瑶</title>
    <link rel="stylesheet" href="css/comments.css">
</head>
<body style="background: #fff3f3">
<h1>欢迎留言页面，留下你和你喜欢的人名字吧！！！</h1>
<form action="comments.php" method="post">
    <textarea name="content" maxlength="20" placeholder="祝愿有情人终成眷属！！！祝愿你们长长久久！！！"></textarea>
    <button type="submit">留言</button>
</form>
<h2>留言记录：</h2>
<ul>
    <?php
        while($row = $res->fetch_assoc()){
            echo <<<EOT
                <li>
                $row[content]
                <span>$row[date]</span>
</li>
EOT;

        }

    ?>

</ul>

<script src="js/jquery-3.7.1.js"></script>
<script src="js/comments.js"></script>
</body>
</html>