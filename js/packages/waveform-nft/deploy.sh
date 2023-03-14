#!/bin/bash

yarn build
rm -rf ../../../../WaveTheVoice-builded-app/dist
cp -rf dist ../../../../WaveTheVoice-builded-app/

cd ../../../../WaveTheVoice-builded-app/
git add -A
git commit -m "upd"
git push
