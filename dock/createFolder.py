import os

os.system('mkdir ./dockRes')

fname = './unirec.txt'
with open(fname, 'r') as f:
    lines = f.readlines()
    for i in range(len(lines)):
        os.system('mkdir ./dockRes/' + lines[i][0:4])
