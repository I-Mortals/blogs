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
   githubUrl=git@github.com:not-trace/blogs.git
 else
   msg='来自github actions的自动部署'
   echo 个人令牌Github
   githubUrl=https://not-trace:${GITHUB}@github.com/not-trace/blogs.git
   git config --global user.name "Mortal红尘"
   git config --global user.email "not_trace@163.com"
 fi
 git init
 git add -A
 git commit -m "${msg}"
 git push -f $githubUrl master:pages # 推送到github pages分支

# 部署到服务器
# echo ${SERVERADDRESS} > ./scpfile.txt
# mv ./scpfile.txt ./scpfile
# scp -r ./* root@81.68.120.54:/www/pages/ -i ./scpfile

# echo 同步至Coding pages仓库
# echo 同步至Coding pages仓库
# if [ -z "$CODING" ]; then  # -z 字符串 长度为0则为true；$CODING来自于github仓库`Settings/Secrets`设置的私密环境变量
#    echo 秘钥Coding
#    codingUrl=git@e.coding.net:zszl/blog/blog.git
# else
#    codingUrl=https://WxQGVvHQav:${CODING}@e.coding.net/zszl/blog/pages.git
#    echo 个人令牌Coding
# fi
# git push -f $codingUrl master # 推送到coding pages仓库
# cd -
# echo 删除dist
# rm -rf docs/.vuepress/dist
# echo 完成
