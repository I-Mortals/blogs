#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
git add .
git commit -m '博客更新'
git push origin main # 推送到github 主分支
