import os

path = './output'
files = os.listdir(path)

s = set()

for filename in files:
    recname = filename[0:4]
    if recname in s:
        continue
    os.system('echo ' + recname + ' >> unirec.txt')
    s.add(recname)
