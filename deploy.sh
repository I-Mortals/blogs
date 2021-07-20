#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github pages


 if [ -z "$GITHUB" ]; then
   msg='deploy'
   githubUrl=git@github.com:not-trace/blogs.git
 else
   msg='来自github actions的自动部署'
   githubUrl=https://not-trace:${GITHUB}@github.com/not-trace/blogs.git
 fi
 git init
 git add -A
 git commit -m "${msg}"
 git push -f $githubUrl master:pages # 推送到github pages分支

cd -
rm -rf docs/.vuepress/dist

# deploy to coding pages
# 使用Coding的Actions(持续集成) github主分支推送时触发自动部署至coding pages
bash ./pushMaster.sh
