<?php
$id = $_GET['index'];
switch ($id) {
	case 0:
		echo '{"id": "0", "name": "太阳"}';
		break;
	case 1:
		echo '{"id": "1", "name": "萝卜"}';
		break;
	case 2:
		echo '{"id": "2", "name": "便便"}';
		break;
	case 3:
		echo '{"id": "3", "name": "草鸡"}';
		break;
	case 4:
		echo '{"id": "4", "name": "灰机"}';
		break;
	case 5:
		echo '{"id": "5", "name": "五叶草"}';
		break;
}
?>