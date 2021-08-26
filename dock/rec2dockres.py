import os

path = './dockRes'
files = os.listdir(path)

for filename in files:
    recname = filename + '_m.pdb'
    os.system('cp ./marked/' + recname + ' ' + path + '/' + filename + '/' + filename + '.pdb')
