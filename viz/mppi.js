var stage = new NGL.Stage("viewport");
var ob = [],
  prot = [];
for (i = 0; i < pdb.length; i++) {
  pdb[i] = pdb[i].toLowerCase();
}
var colors = ["white", "green", "blue", "red", "yellow", "orange", "purple", "olive", "brown", "salmon", "gold", "pink", "gray",
  "darkblue", "violet", "darkgreen", "teal", "darkkhaki", "lime", "darkslategray", "orchid", "darkslateblue", "lightcyan",
  "darkolivegreen", "dimgray", "indigo", "darkcyan", "lightgreen", "orangered", "rosybrown", "crimson", "antiquewhite",
  "olivedrab", "maroon", "lightskyblue", "saddlebrown", "hotpink", "darkorange", "navajowhite", "crimson", "darkseagreen",
  "silver", "mediumvioletred", "fuchsia", "peru", "chocolate", "tan", "thistle", "lightsteelblue", "firebrick", "sandybrown",
  "khaki", "dodgerblue", "seagreen", "cadetblue", "blueviolet", "mediumpurple", "darkgoldenrod", "mediumvioletred",
  "goldenrod", "palevioletred", "burlywood", "deeppink", "black"];

window.addEventListener(
  "resize",
  function (event) {
    stage.handleResize();
  },
  false
);

function addElement(el) {
  Object.assign(el.style, {
    position: "absolute",
    zIndex: 10,
    fontFamily: "monospace",
    fontSize: "12px"
  });
  stage.viewer.container.appendChild(el);
}

function createElement(name, properties, style) {
  var el = document.createElement(name);
  Object.assign(el, properties);
  Object.assign(el.style, style);
  return el;
}

function createSelect(options, properties, style) {
  var select = createElement("select", properties, style);
  options.forEach(function (d) {
    select.add(
      createElement("option", {
        value: d[0],
        text: d[1]
      })
    )
  })
  return select
}

function loadStructure() {
  stage.removeAllComponents();
  let promiseArray = [];
  for (let i = 0; i < pdb.length; i++) {
    promiseArray[i] = stage.loadFile(
      "./dockRes/" + pdb[0] + "/" + pdb[i] + ".pdb"
    );
  }
  Promise.all(promiseArray).then(o => {
    for (let i = 0; i < pdb.length; i++) {
      ob[i] = o[i];
    }
    prot[0] = ob[0].addRepresentation(polymerSelect.value, {
      color: colors[0]
    });
    for (let i = 1; i < pdb.length; i++) {
      prot[i] = ob[i].addRepresentation(polymerSelect.value, {
        color: colors[i],
        visible: false
      });
    }
  });
}

addElement(
  createElement(
    "span",
    {
      innerText: "Receptor: "
    },
    {
      top: "12px",
      left: "12px",
      color: "red"
    }
  )
);

addElement(
  createElement(
    "span",
    {
      innerText: names[0]
    },
    {
      top: "30px",
      left: "32px",
      color: "white"
    }
  )
);

addElement(
  createElement(
    "span",
    {
      innerText: "Ligand: "
    },
    {
      top: "48px",
      left: "12px",
      color: "red",
    }
  )
);

var polymerSelect = createSelect(
  [["surface", "surface"], ["licorice", "licorice"]],
  {
    onchange: function (e) {
      for (let i = 0; i < pdb.length; i++) {
        prot[i].dispose();
      }
      prot[0] = ob[0].addRepresentation(e.target.value, {
        color: colors[0]
      });
      for (let i = 1; i < pdb.length; i++) {
        prot[i] = ob[i].addRepresentation(e.target.value, {
          color: colors[i],
          visible: showCheckbox[i].checked
        });
      }
    }
  },
  {
    top: "12px",
    left: "610px",
  }
);

var showCheckbox = [];
var compatible_span  = []
var competitive_span = []
var select_span = []
var compat = []
for (let j = 1; j < pdb.length; j++) {
  compat[j] = 0
}

for (let i = 1; i < pdb.length; i++) {
  // compatibility[i] = 'visible'
  if (i <= 39) {
    toppx = 48 + i * 18;
    leftpx = 0;
  } else {
    toppx = 48 + (i - 39) * 18;
    leftpx = 1418 - 240;
  }

  addElement(
    createElement(
      "span",
      {
        innerText: names[i]
      },
      {
        top: toppx + "px",
        left: leftpx + 32 + "px",
        color: colors[i]
      }
    )
  );

  addElement(
    createElement(
      "span",
      {
        innerText: scores[i - 1]
      },
      {
        top: toppx + "px",
        left: leftpx + 200 + "px",
        color: "white"
      }
    )
  );

  compatible_span[i] = createElement(
    "span",
    {
      innerText: 'COMPATIBLE'
    },
    {
      top: toppx + "px",
      left: leftpx + 280 + "px",
      color: "green",
      visibility: 'visible'
    }
  );

  competitive_span[i] = createElement(
    "span",
    {
      innerText: 'COMPETITIVE'
    },
    {
      top: toppx + "px",
      left: leftpx + 280 + "px",
      color: "red",
      visibility: 'hidden'
    }
  );

  select_span[i] = createElement(
    "span",
    {
      innerText: 'SELECTED'
    },
    {
      top: toppx + "px",
      left: leftpx + 280 + "px",
      color: "white",
      visibility: 'hidden'
    }
  );

  addElement(
    createElement(
      "input",
      {
        type: "button",
        value: pdb[i].toUpperCase() + '.PDB',
        onclick: function () {
          NGL.download("./dockRes/" + pdb[0] + "/" + pdb[i] + ".pdb", pdb[i] + '.pdb')
        }
      },
      {
        top: toppx - 3 + "px",
        left: leftpx + 100 + "px",
      }
    )
  );
}

addElement(
  createElement(
    "input",
    {
      type: "button",
      value: pdb[0].toUpperCase() + '.PDB',
      onclick: function () {
        NGL.download("./dockRes/" + pdb[0] + "/" + pdb[0] + ".pdb", pdb[0] + '.pdb')
      }
    },
    {
      top: "27px",
      left: "100px",
    }
  )
);

var centerButton = createElement(
  "input",
  {
    type: "button",
    value: "center",
    onclick: function () {
      stage.autoView(1000);
    }
  },
  {
    top: "12px",
    left: "720px",
    height: "18px"
  }
);

addElement(
  createElement(
    "span",
    {
      innerText: "click 'center' to LOAD or POSITION protein interaction structures"
    },
    {
      top: "15px",
      left: "805px",
      color: "white",
    }
  )
);

for (let i = 1; i < pdb.length; i++) {
  // compatibility[i] = 'visible'
  if (i <= 39) {
    toppx = 48 + i * 18;
    leftpx = 0;
  } else {
    toppx = 48 + (i - 39) * 18;
    leftpx = 1418 - 240;
  }

  showCheckbox[i] = createElement(
    "input",
    {
      type: "checkbox",
      checked: false,
      onchange: function (e) {
        prot[i].setVisibility(e.target.checked);
        if (e.target.checked) {
          // select_span[i].style.visibility = 'visible'
          for (let j = 1; j < pdb.length; j++) {
              compat[j] += compatible_matrixs[i][j]
          }
        } else {
          // select_span[i].style.visibility = 'hidden'
          for (let j = 1; j < pdb.length; j++) {
              compat[j] -= compatible_matrixs[i][j]
          }
        }
        for (let j = 1; j < pdb.length; j++) {
          if (showCheckbox[j].checked) {
            select_span[j].style.visibility = 'visible'
            compatible_span[j].style.visibility = 'hidden'
            competitive_span[j].style.visibility = 'hidden'
            continue
          }
          select_span[j].style.visibility = 'hidden'
          if (compat[j] == 0) {
            compatible_span[j].style.visibility = 'visible'
            competitive_span[j].style.visibility = 'hidden'
          }
          if (compat[j] > 0) {
            compatible_span[j].style.visibility = 'hidden'
            competitive_span[j].style.visibility = 'visible'
          }
        }
      }
    },
    {
      top: toppx - 3 + "px",
      left: leftpx + 12 + "px"
    }
  );
}

loadStructure()
addElement(polymerSelect);
for (let i = 1; i < pdb.length; i++) {
  addElement(showCheckbox[i]);
  addElement(compatible_span[i]);
  addElement(competitive_span[i]);
  addElement(select_span[i]);
}
addElement(centerButton);