#!/bin/bash
python mark.py
python marked2output+readscore.py
python unirec.py
python createFolder.py
python output2dockres.py
python rec2dockres.py
python create_sql.py
