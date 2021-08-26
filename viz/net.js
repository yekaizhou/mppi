var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: myelements,
  style: [{
    selector: 'node',
    style: {
      'background-color': '#99CCFF',
      "border-width": "2px",
      "border-opacity": "0.5",
      "border-color": "#CCCCCC",
      'label': 'data(name)',
      "text-valign": "center",
      "text-halign": "center",
      "text-outline-color": "#CCCCCC",
      "text-outline-width": "2px",
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'label': 'data(disease)',
      'color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="C"]',
    style: {
      'width': 3,
      'line-color': '#009999',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="PD"]',
    style: {
      'width': 3,
      'line-color': '#3333FF',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="HD"]',
    style: {
      'width': 3,
      'line-color': '#6600CC',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="ASD"]',
    style: {
      'width': 3,
      'line-color': '#333333',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="ALS"]',
    style: {
      'width': 3,
      'line-color': '#990033',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[disease="AD"]',
    style: {
      'width': 3,
      'line-color': '#99CC66',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'edge[type="isoform"]',
    style: {
      'width': 3,
      'line-style': 'dashed',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    "selector": "node[rbp='1']",
    "style": {
      'label': 'data(name)',
      "border-opacity": "0.5",
      "border-width": "2px",
      "border-color": "#CCCCCC",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#CCCC33",
      "text-outline-color": "#CCCCCC",
      "text-outline-width": "2px",
    }
  },
  {
    selector: 'node[isoform="1"]',
    style: {
      'label': 'data(name)',
      "border-opacity": "0.5",
      "border-width": "2px",
      "border-color": "#CCCCCC",
      "border-style": "dashed",
      "text-valign": "center",
      "text-halign": "center",
      "text-outline-color": "#CCCCCC",
      "text-outline-width": "2px",
    }
  },
  {
    "selector": "node[mol='rna']",
    "style": {
      'label': 'data(name)',
      "border-opacity": "0.5",
      "border-width": "2px",
      "shape": "rectangle",
      "border-color": "#CCCCCC",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#9999FF",
      "text-outline-color": "#CCCCCC",
      "text-outline-width": "2px",
    }
  },
  {
    "selector": "node[mol='core']",
    "style": {
      'label': 'data(name)',
      "border-opacity": "0.5",
      "border-width": "2px",
      "border-color": "#CCCCCC",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#FF6666",
      "text-outline-color": "#CCCCCC",
      "text-outline-width": "2px",
    }
  },
  {
    "selector": "node:selected",
    "style": {
      'label': 'data(name)',
      "border-opacity": "0.5",
      "border-width": "2px",
      "border-color": "#CCCCCC",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#FFCC66",
      "text-outline-color": "#FFFF99",
      "text-outline-width": "2px",
    }
  },
  ],
  layout: {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  },
  zoom: 1,
  pan: {
    x: 0,
    y: 0
  },

  minZoom: 0.1,
  maxZoom: 1e10,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: false,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,

  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  hideLabelsOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto'
});

cy.nodes().forEach(function (n) {
  var g = n.data('uniprot');
  let u = './mppi.php?id=' + n.data('id');
  n.qtip({
    // content: [{
    //   name: 'Interaction Structure',
    //   url: u
    // }].map(function (link) {
    //   return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
    // }).join('<br />\n'),
    // position: {
    //   my: 'top center',
    //   at: 'bottom center'
    // },
    // style: {
    //   classes: 'qtip-bootstrap',
    //   tip: {
    //     width: 16,
    //     height: 8
    //   }
    // }
    content: [
    {
      name: 'Interaction Structure',
      url: u
    },
    {
      name: 'RCSB PDB: ' + n.data('pdb'),
      url: 'https://www.rcsb.org/structure/' + n.data('pdb')
    },
    {
      name: 'Uniprot: ' + g,
      url: 'https://www.uniprot.org/uniprot/' + g
    },
    {
      name: 'Swiss Model: ' + g,
      url: 'https://swissmodel.expasy.org/repository/uniprot/' + g
    }
  ].map(function (link) {
      return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
    }).join('<br />\n'),
    position: {
      my: 'top center',
      at: 'bottom center'
    },
    style: {
      classes: 'qtip-bootstrap',
      tip: {
        width: 16,
        height: 8
      }
    }
  }
  );
});

cy.edges().forEach(function (n) {
  let u = './mppi.php?id=' + n.data('source') + '+' + n.data('target');
  n.qtip({
    content: [{
      name: 'Interaction Structure',
      url: u
    }].map(function (link) {
      return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
    }).join('<br />\n'),
    position: {
      my: 'top center',
      at: 'bottom center'
    },
    style: {
      classes: 'qtip-bootstrap',
      tip: {
        width: 16,
        height: 8
      }
    }
  });
})

cy.panzoom();

function createAndDownloadFile(filetype) {
  if (filetype == 'png') {
    var image = cy.png();
  };
  if (filetype == 'jpg') {
    var image = cy.jpg({
      quality: 1
    });
  }
  var arr = image.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  blob = new Blob([u8arr], {
    type: mime
  });
  var aTag = document.createElement('a');
  aTag.download = 'mynetwork.' + filetype;
  aTag.href = window.URL.createObjectURL(blob);
  aTag.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }));
  setTimeout(function () {
    aTag.remove();
    window.URL.revokeObjectURL(blob);
  }, 200);
};

function switchLayout(layoutis) {
  var layout = cy.layout({
    name: layoutis,
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  });
  layout.run();
  $('#thislayout').attr('value', layoutis);
};

function reloadLayout() {
  var thislayout = document.getElementById("thislayout").value;
  var layout = cy.layout({
    name: thislayout,
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  });
  layout.run();
};