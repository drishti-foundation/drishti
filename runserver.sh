#!/bin/bash
dir=`pwd`
echo "Building $dir..."
cd Frontend
yarn build
cd ..
echo "Starting Server..."
python3 backend.py

