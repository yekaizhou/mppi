<!-- Function module for database connection. -->
<?php
  // fill in with your own database information
  $servername = "";
  $username = "";
  $password = "";
  $database = "";

  $conn = new mysqli($servername, $username, $password);

  if ($conn->connect_error) {
    die("Failed: " . $conn->connect_error);
  }

  mysqli_query($conn, "set names 'UTF8'");
  mysqli_select_db($conn, $database);
  error_reporting(E_ALL^E_NOTICE);
?>
