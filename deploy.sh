#!/usr/bin/env sh

# abort on errors


# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -u -f https://github.com/SzymonLisowiec/auth-microservice-page master

cd -