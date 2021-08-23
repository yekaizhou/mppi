#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import numpy as np
from scipy.spatial import distance


# In[2]:


proteins_file = './proteins.txt' # change it to ./proteins.txt
scores_file = './score.txt' # change it to ./score.txt
dockres_dir = './dockRes/' # './dockRes'
sql_path = './ppi.sql'

with open(proteins_file, 'r') as file:
    raw = file.readlines()
raw = [s.strip() for s in raw]
node = [s.split() for s in raw]


# In[3]:


for i in range(len(node)):
    node[i].append(i+1)
node = [(n[3], n[0], n[1], n[2]) for n in node]


# In[4]:


pdb2num = dict()
for i in node:
    pdb2num[i[2]] = {}
    pdb2num[i[2]] = i[0]


# In[5]:


with open(scores_file, 'r') as file:
    raw = file.readlines()
raw = [s.strip() for s in raw]
score = [s.split() for s in raw]
score = [(s[0].upper(), s[1].upper(), s[2]) for s in score]

edge = [(pdb2num[sc[0]], pdb2num[sc[1]], sc[2]) for sc in score]


# In[6]:


dirlist = os.listdir(dockres_dir)
dirlist = [s for s in dirlist if s[0] != '.']

pdblist = []
for dirno in range(len(dirlist)):
    pdblist.append(os.listdir(dockres_dir + dirlist[dirno]))
    pdblist[dirno] = [s for s in pdblist[dirno] if s[0] != '.']


# In[7]:


atom = [[[] for i in range(len(pdblist[j]))] for j in range(len(dirlist))]

for dirno in range(len(dirlist)):
    for pdbno in range(len(pdblist[dirno])):
        with open(dockres_dir + dirlist[dirno] + '/' + pdblist[dirno][pdbno], 'r') as file:
            raw = file.readlines()
        raw = [s for s in raw if s[:4] == 'ATOM']
        raw = [s[30:54] for s in raw]
        atom[dirno][pdbno] = [[float(s[:8]), float(s[8:16]), float(s[16:24])] for s in raw]


# In[8]:


mindis = [[[100000000 for i in range(len(pdblist[k]))] for j in range(len(pdblist[k]))] for k in range(len(dirlist))]
# cutoff = 2
for dirno in range(len(dirlist)):
    for pdb1 in range(len(pdblist[dirno])):
        for pdb2 in range(len(pdblist[dirno])):
            s1, s2 = np.array(atom[dirno][pdb1]), np.array(atom[dirno][pdb2])
            mindis[dirno][pdb1][pdb2] = np.min(distance.cdist(s1,s2).min(axis=1))


# In[9]:


compatible_interactions = []
compatible = []

for dirno in range(len(dirlist)):
    for pdb1 in range(len(pdblist[dirno]) - 1):
        for pdb2 in range(pdb1 + 1, len(pdblist[dirno])):
            if mindis[dirno][pdb1][pdb2] >= 2:
                compatible_interactions.append((dirlist[dirno], pdblist[dirno][pdb1][:4], pdblist[dirno][pdb2][:4]))
                
for s in compatible_interactions:
    if s[0].upper() in pdb2num and s[1].upper() in pdb2num and s[2].upper() in pdb2num:
        compatible.append((pdb2num[s[0].upper()], pdb2num[s[1].upper()], pdb2num[s[2].upper()]))


# In[10]:


header = """CREATE TABLE `ppi_edge` (
  `p1id` int(5) DEFAULT NULL,
  `p2id` int(5) DEFAULT NULL,
  `docking_score` decimal(9,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `ppi_compatible` (
  `receptor` int(5) DEFAULT NULL,
  `p1id` int(5) DEFAULT NULL,
  `p2id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `ppi_node` (
  `id` int(5) DEFAULT NULL,
  `label` varchar(11) DEFAULT NULL,
  `pdb` varchar(6) DEFAULT NULL,
  `uniprot` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""


# In[11]:


edge_line = "INSERT INTO `ppi_edge` (`p1id`, `p2id`, `docking_score`) VALUES"
compatible_line = "INSERT INTO `ppi_compatible` (`receptor`, `p1id`, `p2id`) VALUES"
node_line = "INSERT INTO `ppi_node` (`id`, `label`, `pdb`, `uniprot`) VALUES"


# In[13]:


sql_file = open(sql_path, 'w')
sql_file.write(header + '\n')
sql_file.write(node_line + '\n')
sql_file.write(str(node)[1:-1] + ';' + '\n')
sql_file.write(edge_line + '\n')
sql_file.write(str(edge)[1:-1] + ';' + '\n')
sql_file.write(compatible_line + '\n')
sql_file.write(str(compatible)[1:-1] + ';' + '\n')
sql_file.close()

