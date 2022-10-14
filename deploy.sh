#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo 开始编译
# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 同步至github pages 分支
echo 同步至github pages 分支
 if [ -z "$GITHUB" ]; then
   msg='deploy'
   echo 秘钥Github
   githubUrl=git@github.com:I-Mortals/blogs.git
 else
   msg='来自github actions的自动部署'
   echo 个人令牌Github
   githubUrl=https://I-Mortals:${GITHUB}@github.com/I-Mortals/blogs.git
   git config --global user.name "Mortal红尘"
   git config --global user.email "not_trace@163.com"
 fi
 git init
 git add -A
 git commit -m "${msg}"
 git push -f $githubUrl master:pages # 推送到github pages分支
