#!/bin/bash

#build
npm run build:gh

cd dist

git init
git add -A
git commit -m "deploy"

git push -f git@github.com:xlasercut/anime-music-quiz.git master:gh-pages

cd -