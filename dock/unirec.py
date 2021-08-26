import os

path = './output'
files = os.listdir(path)

s = set()

for filename in files:
    recname = filename[0:filename.find('___')]
    if recname in s:
        continue
    os.system('echo ' + recname + ' >> unirec.txt')
    s.add(recname)
