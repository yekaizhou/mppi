<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>mPPI DEMO</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/css/bootstrap.min.css">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.css" rel="stylesheet" type="text/css" />
    <!-- <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/css/dataTables.bootstrap.min.css"> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cytoscape-panzoom/2.5.3/cytoscape.js-panzoom.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- <script src="packages/popper/popper.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.min.js"></script>
    <!-- <script type="text/javascript" charset="utf8" src="packages/DataTables/DataTables-1.10.16/js/jquery.dataTables.js"></script> -->
    <!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/dataTables.bootstrap.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.19.1/cytoscape.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape-panzoom/2.5.3/cytoscape-panzoom.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/cytoscape-qtip@2.8.0/cytoscape-qtip.js" type="text/javascript"></script>
  </head>

<div class="card">
  <div class="card-body">
    <style>
      #cy {
        height: 600px;
        display: block;
        top: 0px;
        left: 0px;
      }
    </style>
    <h2 id="error-message-1" class="text-center" style="display: none;">Error Message: empty input</h2>
    <?php
      require('DBConnect.php');
      $node_label_sql = mysqli_query($conn, "SELECT * FROM `ppi_node`");
      $node_label_array = array();
      while ($node_label = mysqli_fetch_assoc($node_label_sql)) {
        $node_label_array[$node_label['id']] = $node_label;
      }
      $nodes = array();
      $edges = array();
      $cytoscape_nodes = array();
      $net = mysqli_query($conn, "SELECT * FROM `ppi_edge`");
      while ($network = mysqli_fetch_assoc($net)) {
        $nodes = array_merge($nodes,array($network['p1id']));
        $nodes = array_merge($nodes,array($network['p2id']));
      }
      $nodes = array_flip($nodes);
      $nodes = array_flip($nodes);
      foreach ($nodes as $key) {
        array_push($cytoscape_nodes, array('data' => array('id' => $key, 'name' => $node_label_array[$key]['label'], 'pdb' => $node_label_array[$key]['pdb'], 'uniprot' => $node_label_array[$key]['uniprot'])));
        $int = mysqli_query($conn, "SELECT * FROM `ppi_edge`");
        while ($interaciton = mysqli_fetch_assoc($int)) {
          $src = $interaciton['p1id'];
          $tgt = $interaciton['p2id'];
          if (is_integer(array_search($src, $nodes)) AND is_integer(array_search($tgt, $nodes))) {
            array_push($edges,array('data' => array('id' => $src.'-'.$tgt, 'source' => $src, 'target' => $tgt)));
          }
        }
      }
      $nets = array_merge($cytoscape_nodes, $edges); // add compatible
      $myelements = json_encode($nets);
      echo "<script>var myelements = ".$myelements.";</script>";
    ?>
        
    <div><h5>Click any target protein to structurally visualize its interactors in <b>one-to-many</b> manner</h5></div>    
    <!-- <button type="button" class="btn btn-outline-danger" id="thislayout" value="cose" onclick="reloadLayout()"><i class="fa fa-refresh" aria-hidden="true"></i> RELOAD</button>
    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-download" aria-hidden="true"></i> EXPORT
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" onclick="createAndDownloadFile('png')">PNG</a>
          <a class="dropdown-item" onclick="createAndDownloadFile('jpg')">JPG</a>
        </div>
      </div>
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-cogs" aria-hidden="true"></i> LAYOUTS
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" onclick="switchLayout('cose')"><i class="fa fa-asterisk" aria-hidden="true"></i> Cose</a>
          <a class="dropdown-item" onclick="switchLayout('grid')"><i class="fa fa-th" aria-hidden="true"></i> Grid</a>
          <a class="dropdown-item" onclick="switchLayout('circle')"><i class="fa fa-circle-o" aria-hidden="true"></i> Circle</a>
          <a class="dropdown-item" onclick="switchLayout('random')"><i class="fa fa-random" aria-hidden="true"></i> Random</a>
        </div>
      </div>
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-code-fork" aria-hidden="true"></i> RESOURCES
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" href="https://js.cytoscape.org/" target="_blank">cytoscape.js</a>
          <a class="dropdown-item" href="https://github.com/cytoscape/cytoscape.js-panzoom" target="_blank">cytoscape-panzoom</a>
          <a class="dropdown-item" href="https://github.com/cytoscape/cytoscape.js-qtip" target="_blank">cytoscape-qtip</a>
          <a class="dropdown-item" href="https://fontawesome.com/free" target="_blank">Font Awesome</a>
        </div>
      </div>
    </div>
    <hr class="my-4"> -->
    <div id="cy"></div>
    <script src="net.js"></script>
  </div>
</div>
