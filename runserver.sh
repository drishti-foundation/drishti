#! /bin/bash

cd Frontend
dir=`pwd`
echo "Building $dir..."
yarn build
cd ..
echo "Starting Server..."
python3 -m webbrowser -t "localhost:5000"
python3 backend.py

