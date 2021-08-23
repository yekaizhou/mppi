import os, linecache

os.system('mkdir ./output')
os.system('touch score.txt')
openf = open('./score.txt','a')
filenum = 0

for line in open('./interaction.txt'):
    rec, lig = line.split()
    rec, lig = rec.lower(), lig.lower()

    # zdock rec_lig.out & lig_rec.out
    os.system('./zdock -R ./marked/' + rec + '_m.pdb -L ./marked/' + lig + '_m.pdb -N 1 -o ./output/' + rec + '_' + lig + '.out')
    os.system('./zdock -L ./marked/' + rec + '_m.pdb -R ./marked/' + lig + '_m.pdb -N 1 -o ./output/' + lig + '_' + rec + '.out')

    fpath = './output/' + rec + '_' + lig + '.out'
    with open(fpath, 'r') as f:
        lines = f.readlines()
        lastline = lines[-1].split()
        score = lastline[-1]

    openf.write(rec + ' ' + lig + ' ' + score + '\n')
