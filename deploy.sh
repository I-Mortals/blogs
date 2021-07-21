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

# git@e.coding.net:zszl/blog/blog.git
# deploy to coding
if [ -z "$CODING" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  codingUrl=git@git.dev.tencent.com:zszl/blog/blog.git
else
  codingUrl=https://xugaoyi:${CODING}@git.dev.tencent.com/zszl/blog/blog.git
fi
git add -A
git commit -m "${msg}"
git push -f $codingUrl master # 推送到coding
cd -
rm -rf docs/.vuepress/dist
