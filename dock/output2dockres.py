import os

path = './output'
files = os.listdir(path)

for filename in files:
    os.system('./create.pl ' + filename + ' 1')
