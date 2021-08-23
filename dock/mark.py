import os, linecache

files = os.listdir('./pdb')
os.system('mkdir ./marked')

for filename in files:
    pdbname = filename[0:4].lower()
    os.system('./mark_sur ./pdb/' + pdbname + '.pdb ./marked/' + pdbname + '_m.pdb')
