#! /bin/bash

cd Frontend
dir=`pwd`
echo "Building $dir..."
yarn build
cd ..
echo "Starting Server..."
python3 backend.py