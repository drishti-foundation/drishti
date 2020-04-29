#!/bin/bash
#dir=`pwd`
#echo "Building $dir..."
#yarn build
#cd ..
echo "Starting Server..."
python -m webbrowser -t "localhost:5000"
python backend.py

