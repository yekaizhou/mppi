## mPPI: A Database Extension to Visualize Structural Interactome in One-to-many Manner

---
### Introduction

Protein–protein interaction (PPI) databases with structural information are useful to investigate biological functions at both systematic and atomic levels. However, most existing PPI databases only curate binary interactome. We developed mPPI, a database extension for multiway PPI structural visualization. mPPI can visualize target protein and its multiple interactors simultaneously, which facilitates multi-target drug discovery and structure prediction of protein macro-complexes. By employing a protein–protein docking algorithm, mPPI largely extends the coverage of structural interactome from experimentally resolved complexes. mPPI is customizable and convenient, which already has been used for several disease–related PPI databases.

---
### Graphical Abstract

- mPPI visualizes the structural proteome of diverse PPI databases.
- mPPI projects the overall configuration of target protein’s multiple interactors.
- mPPI facilitates multi-target drug design and protein complex structure prediction.

---
### Installation
There are two modules in mPPI: dock and viz. Each module contains two steps. By executing one command in dock module and importing results from dock module into viz module, users’ basic PPI databases will be extended with a structural visualization function.

- For proteins in user’s database, download structure files in PDB format; For pairwise interactions in user’s database, calculate their interaction conformation and docking scores from downloaded PDBs using ZDOCK.

- Segment docked protein complexes into two PDB files as two interactors. Store divided PDBs into folders in specific manner. The previous two steps are integrated into one script dock.sh.

- Using Cytoscape JavaScript library, scripts net.js and net.php are created to visualize node-and-edge PPI network.

- Employing NGLViewer, scripts mppi.js and mppi.php are designed to project the protein interaction structures in one-to-many manner.

Step-by-step installation instruction is at the [tutorial](https://github.com/yekaizhou/mppi/blob/main/tutorial.pdf).

---
### Dependencies

- [ZDOCK](https://zlab.umassmed.edu/zdockconv3d/) = 3.0.2
- [Cytoscape.js](https://js.cytoscape.org/) = 3.19.1
- [NGL viewer](https://nglviewer.org/) = v2.0.0-dev.39

---
### Usage

pic from 

---
### Quick demo

A demo can be viewed and operated at [mPPI](http://bis.zju.edu.cn/mppi/).

---
### Applications

mPPI has been employed in [NDAtlas](http://bis.zju.edu.cn/ndatlas/), ...

---
### Contact

For any problems or suggestions during the use of duet, please post on [Github Issue](https://github.com/yekaizhou/duet/issues) or contact yekai.zhou@outlook.com.
