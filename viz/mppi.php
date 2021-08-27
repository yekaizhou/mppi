<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <style>
    html,
    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ngl/2.0.0-dev.39/ngl.min.js"></script>
</head>

<body>
  <?php
    require("./DBConnect.php");
    $available = 0;
    $st = $_GET['id'];
    if (strpos($st, ' ') == 0) { // select node
      $num[0] = (int)$st;
      $result = mysqli_query($conn, "SELECT * FROM `ppi_node` WHERE `id` = '$num[0]'");
      while ($row = mysqli_fetch_assoc($result)) {
        $rec = strtolower($row['pdb']);
      }
      $n = 0;
      $dir="./dockRes/".$rec;
      if (is_dir($dir) != FALSE && $rec != '') {
        $available = 1;
        $file=scandir($dir);
        for ($i = 0; $i < count($file); $i++) {
          if ($file[$i][0] != ".") {
            $pdb_name[$n] = substr($file[$i], 0, -4);
            $n++;
          }
        }
        for ($i = 0; $i < $n; $i++) {
          if ($pdb_name[$i] == $rec) {
            $tmp = $pdb_name[$i];
            $pdb_name[$i] = $pdb_name[0];
            $pdb_name[0] = $tmp;
            break;
          }
        } // until now the pdb_name index is not the reference id in sql
        for ($i = 0; $i < $n; $i++) {
          $pdb_query = strtoupper($pdb_name[$i]);
          $result = mysqli_query($conn, "SELECT * FROM `ppi_node` WHERE `pdb` = '$pdb_query'");
          while ($row = mysqli_fetch_assoc($result)) {
            $gene_name[$i] = $row['label']; // 
            $num[$i] = $row['id']; // num[i] is the ref id in sql, i gonna use this one
          }
        }
        for ($i = 1; $i < $n; $i++) {
          $result = mysqli_query($conn, "SELECT * FROM `ppi_edge` WHERE `p1id` = '$num[0]' AND `p2id` = '$num[$i]' OR `p1id` = '$num[$i]' AND `p2id` = '$num[0]'");
          while ($row = mysqli_fetch_assoc($result)) {
            $score[$i-1] = $row['docking_score'];
          }
        }
        if (empty($gene_name[0])) $available = 0;
        $pdb_name1[0] = $pdb_name[0];
        $gene_name1[0] = $gene_name[0];
        $num1[0] = $num[0];
        $total = 0;
        for ($i = 1; $i < $n; $i++) {
          if ($gene_name[$i] and $score[$i-1]) {
            $total++;
            $gene_name1[$total] = $gene_name[$i];
            $score1[$total-1] = $score[$i-1];
            $pdb_name1[$total] = $pdb_name[$i];
            $num1[$total] = $num[$i];
          }
        }
        for ($i = 0; $i <= $total; $i++) {
          for ($j = 0; $j <= $total; $j++) {
            $compatible_matrix[$i][$j] = 1; // 1 means competitive, 0 means compatible
          }
        }
        $result = mysqli_query($conn, "SELECT * FROM `ppi_compatible` WHERE `receptor` = '$num1[0]'");
        // $tot_compatible = 0;
        while ($row = mysqli_fetch_assoc($result)) {
          $compatible_int1 = $row['p1id'];
          $compatible_int2 = $row['p2id'];
          for ($i = 1; $i <= $total; $i++) {
            if ($compatible_int1 == $num1[$i]) {
              $compatible_int1 = $i;
              break;
            }
          }
          for ($i = 1; $i <= $total; $i++) {
            if ($compatible_int2 == $num1[$i]) {
              $compatible_int2 = $i;
              break;
            }
          }
          $compatible_matrix[$compatible_int1][$compatible_int2] = 0;
          $compatible_matrix[$compatible_int2][$compatible_int1] = 0;
          // $score[$tot_compatible] = $row['docking_score'];
          // $tot_compatible++;
        }
      }
    } else { // select edge: 1+2 -> 1 2
      $available = 1;
      $pdb_id = explode(" ", $st);
      for ($i = 0; $i < 2; $i++) {
        $num[$i] = (int)$pdb_id[$i];
        $result = mysqli_query($conn, "SELECT * FROM `ppi_node` WHERE `id` = '$num[$i]'");
        if (empty($result)) {$available = 0; break;}
        while ($row = mysqli_fetch_assoc($result)) {
          $pdb_name1[$i] = strtolower($row['pdb']);
          $gene_name1[$i] = $row['label'];
        }
      }
      $result = mysqli_query($conn, "SELECT * FROM `ppi_edge` WHERE `p1id` = '$num[0]' AND `p2id` = '$num[1]' OR `p1id` = '$num[1]' AND `p2id` = '$num[0]'");
      while ($row = mysqli_fetch_assoc($result)) {
        $score1[0] = $row['docking_score'];
      }
      $dir1 = "./dockRes/".$pdb_name[0];
      $dir2 = "./dockRes/".$pdb_name[1];
      if (is_dir($dir1) == FALSE or is_dir($dir2) == FALSE or empty($score1[0])) $available = 0;

      for ($i = 0; $i < 2; $i++) {
        for ($j = 0; $j < 2; $j++) {
          $compatible_matrix[$i][$j] = 1; // 0 means competitive, 1 means compatible
        }
      }

    }
    $pdb = json_encode($pdb_name1);
    $names = json_encode($gene_name1);
    $scores = json_encode($score1);
    $compatible_matrixs = json_encode($compatible_matrix);
    echo "<script>var pdb = ".$pdb.";</script>";
    echo "<script>var names = ".$names.";</script>";
    echo "<script>var scores = ".$scores.";</script>";
    echo "<script>var compatible_matrixs = ".$compatible_matrixs.";</script>";
    if ($available == 1) {
      echo '<div id="viewport" style="width:100%; height:100%;"></div>';
      echo '<script src="./mppi.js"></script>';
    } else { echo 'no available pdb files'; }
  ?>
</body>
</html>
