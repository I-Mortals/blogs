<template><div><h1 id="git使用手册" tabindex="-1"><a class="header-anchor" href="#git使用手册" aria-hidden="true">#</a> Git使用手册</h1>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>官网下载：<a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">https://git-scm.com/downloads</a> 下载完成后使用默认进行安装。</p>
<p>安装完成后，在开始菜单里找到 <code v-pre>Git</code> -&gt; <code v-pre>Git Bash</code>，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
还需要最后一步设置，在命令行输入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>git config --global user.name &quot;Your Name&quot;
git config --global user.email &quot;email@example.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。</p>
<!-- more -->
<h2 id="创建版本库-仓库" tabindex="-1"><a class="header-anchor" href="#创建版本库-仓库" aria-hidden="true">#</a> 创建版本库（仓库）</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 创建仓库
mkdir &lt;仓库name&gt; 

# 进入仓库
cd &lt;仓库name&gt;

# 此命令用于显示当前目录
pwd

# 把当前目录初始化成Git仓库
git init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>也不一定必须在空目录下创建Git仓库，选择一个已经有东西的目录直接<code v-pre>git init</code>也是可以的。</p>
</blockquote>
<h2 id="添加文件到仓库" tabindex="-1"><a class="header-anchor" href="#添加文件到仓库" aria-hidden="true">#</a> 添加文件到仓库</h2>
<p>在仓库目录下放入文件，如新建一个<code v-pre>test.txt</code>文件，然后使用<code v-pre>git add test.txt</code>命令告诉Git，把文件添加到缓存区，然后使用<code v-pre>git commit -m &quot;提交描述&quot;</code>告诉Git，把文件提交到仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 添加指定文件或文件夹到缓存区，文件需添加后缀
git add &lt;文件或文件夹name&gt;                   # 单个文件
git add &lt;文件或文件夹name&gt; &lt;文件或文件夹name&gt;  # 多个文件

# 或 全部文件同时添加到缓存区
git add .

# 把文件从缓存区提交至仓库
git commit -m &quot;提交描述&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="提交描述规范" tabindex="-1"><a class="header-anchor" href="#提交描述规范" aria-hidden="true">#</a> 提交描述规范</h4>
<p>在提交代码时输入清晰的说明有利于版本管理，建议搭配如下关键字编写提交描述</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 新建(add)
# 删除(rm)
# 更新(update)
# 改动(change)
# 实现
# 发布
# 修复
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本管理" tabindex="-1"><a class="header-anchor" href="#版本管理" aria-hidden="true">#</a> 版本管理</h2>
<h4 id="提交修改" tabindex="-1"><a class="header-anchor" href="#提交修改" aria-hidden="true">#</a> 提交修改</h4>
<p>如修改<code v-pre>test.txt</code>的内容后，运行<code v-pre>git status</code>命令看看被修改的文件，然后再使用<code v-pre>git add test.txt</code>、
<code v-pre>git commit -m &quot;修改描述&quot;</code>把修改后的文件提交到仓库，提交后可再次使用<code v-pre>git status</code>查看当前状态。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 显示 新增/删除/被改动等 的文件
git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看版本记录" tabindex="-1"><a class="header-anchor" href="#查看版本记录" aria-hidden="true">#</a> 查看版本记录</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 查看版本记录
git log   # 显示版本号、提交时间等信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>也可使用可视化工具查看Git版本历史：
在仓库目录右键 &gt; <code v-pre>Git BUI Here</code></p>
</blockquote>
<h4 id="回退版本" tabindex="-1"><a class="header-anchor" href="#回退版本" aria-hidden="true">#</a> 回退版本</h4>
<p>首先，Git必须知道当前版本是哪个版本，在Git中，用<code v-pre>HEAD</code>表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是<code v-pre>HEAD^</code>，上上一个版本就是<code v-pre>HEAD^^</code>，当然往上100个版本写100个^比较容易数不过来，所以写成<code v-pre>HEAD~100</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 回退到上一个版本
$ git reset --hard HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时查看<code v-pre>git log</code>记录发现，原来最新的版本已经没有了，想回到原来最新的版本怎么办？这就需要知道最新的版本的版本号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 跳转到指定版本
git reset --hard &lt;版本号前几位&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是不知道版本号怎么办？Git提供了一个命令<code v-pre>git reflog</code>用来记录你的每一次命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>git reflog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="撤销修改" tabindex="-1"><a class="header-anchor" href="#撤销修改" aria-hidden="true">#</a> 撤销修改</h4>
<p><a href="https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536" target="_blank" rel="noopener noreferrer">https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536</a></p>
<h4 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件" aria-hidden="true">#</a> 删除文件</h4>
<p>https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448</p>
<h2 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h2>
<h4 id="ssh验证" tabindex="-1"><a class="header-anchor" href="#ssh验证" aria-hidden="true">#</a> SSH验证</h4>
<p>使本机能关联远程仓库，首次需要SSH验证</p>
<ul>
<li>第1步：创建<code v-pre>SSH Key</code>。在用户主（C:\Users\dell）目录下，看看有没有.ssh目录，
如果有，再看看这个目录下有没有<code v-pre>id_rsa</code>和<code v-pre>id_rsa.pub</code>这两个文件，如果已经有了，可直接跳到下一步。
如果没有，打开Shell（Windows下打开Git Bash），创建<code v-pre>SSH Key</code>：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 创建SSH Key
ssh-keygen -t rsa -C &quot;邮件地址&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第2步：登陆GitHub，右上角头像 &gt; settings &gt; SSH and GPG keys &gt;Add SSH Key，在key的文本框里粘贴<code v-pre>id_rsa.pub</code>文件的内容</li>
</ul>
<h4 id="关联远程仓库" tabindex="-1"><a class="header-anchor" href="#关联远程仓库" aria-hidden="true">#</a> 关联远程仓库</h4>
<p>SSH验证完成后，在github创建仓库，创建仓库时记得取消 <code v-pre>Initialize this repository with a README</code>的勾选，然后在本地命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 关联远程仓库，仓库名一般使用origin
git remote add &lt;仓库名&gt; &lt;远程仓库地址&gt;

# 示例
git remote add origin git@github.com:xugaoyi/test.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一步，就可以把本地库的所有内容推送到远程库上</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 把文件推送到远程仓库
git push -u &lt;仓库名&gt; &lt;分支名&gt;

# 示例
git push -u origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于远程库是空的，我们第一次推送<code v-pre>master</code>分支时，加上了<code v-pre>-u</code>参数，Git不但会把本地的<code v-pre>master</code>分支内容推送的远程新的<code v-pre>master</code>分支，还会把本地的<code v-pre>master</code>分支和远程的<code v-pre>master</code>分支关联起来，在以后的推送或者拉取时就可以简化命令。</p>
<blockquote>
<p>前提是目录已经<code v-pre>git init</code>初始化成仓库，并且<code v-pre>git status</code>状态是没有改动的，如果有改动则先<code v-pre>git add .</code>添加至缓存区，<code v-pre>git commit -m '提交描述'</code>提交至仓库，然后执行上面命令。</p>
<p>如创建仓库时勾选了 <code v-pre>Initialize this repository with a README</code> 则需先拉取<code v-pre>README.md</code>文件到本地仓库<code v-pre>git pull</code></p>
<p>可关联多个远程仓库，注意给不同的远程仓库取不一样的名称，提交是分别按名称提交到不一样的远程仓库。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 简化的推送命令
git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看远程仓库" tabindex="-1"><a class="header-anchor" href="#查看远程仓库" aria-hidden="true">#</a> 查看远程仓库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 查看远程仓库
git remote -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除远程仓库" tabindex="-1"><a class="header-anchor" href="#删除远程仓库" aria-hidden="true">#</a> 删除远程仓库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 删除远程仓库
git remote rm &lt;仓库名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="从远程库克隆项目" tabindex="-1"><a class="header-anchor" href="#从远程库克隆项目" aria-hidden="true">#</a> 从远程库克隆项目</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 从远程库克隆项目
git clone &lt;仓库地址&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="克隆指定分支" tabindex="-1"><a class="header-anchor" href="#克隆指定分支" aria-hidden="true">#</a> 克隆指定分支</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 克隆指定分支
git clone -b &lt;分支名&gt; &lt;仓库地址&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理" aria-hidden="true">#</a> 分支管理</h2>
<h4 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 创建分支
git checkout -b &lt;分支名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支" aria-hidden="true">#</a> 查看分支</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 查看分支
git branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看分支时，在分支前带 * 号的表示当前的分支</p>
<h4 id="切换分支" tabindex="-1"><a class="header-anchor" href="#切换分支" aria-hidden="true">#</a> 切换分支</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 切换分支
git checkout &lt;分支名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 合并本地的分支
git merge &lt;分支名&gt;

# 合并远程的分支
git merge &lt;远程仓库名&gt;/&lt;分支名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>，是将指定分支合并到当前分支，并非当前分支合并到指定分支。</p>
<p>一般情况下是把当前分支切换到<strong>主分支</strong>，然后把<strong>子分支</strong>合并到<strong>主分支</strong>。</p>
<h4 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 删除分支
git branch -d &lt;分支名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改分支名" tabindex="-1"><a class="header-anchor" href="#修改分支名" aria-hidden="true">#</a> 修改分支名</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 修改分支名
git branch -m &lt;原分支名&gt; &lt;新分支名&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="帮助命令" tabindex="-1"><a class="header-anchor" href="#帮助命令" aria-hidden="true">#</a> 帮助命令</h2>
<p>如对命令不清楚时，可使用<code v-pre>git help</code>命令显示出git命令介绍。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code># 帮助命令
git help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git help
usage: git [--version] [--help] [-C &lt;path&gt;] [-c &lt;name&gt;=&lt;value&gt;]
           [--exec-path[=&lt;path&gt;]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=&lt;path&gt;] [--work-tree=&lt;path&gt;] [--namespace=&lt;name&gt;]
           &lt;command&gt; [&lt;args&gt;]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Use binary search to find the commit that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Reapply commits on top of another base tip
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help &lt;command&gt;' or 'git help &lt;concept&gt;'
to read about a specific subcommand or concept.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译工具翻译中文</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git help
使用：git [--version] [--help] [-C &lt;path&gt;] [-c &lt;name&gt;=&lt;value&gt;]
           [--exec-path[=&lt;path&gt;]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=&lt;path&gt;] [--work-tree=&lt;path&gt;] [--namespace=&lt;name&gt;]
           &lt;command&gt; [&lt;args&gt;]

这些是在各种情况下使用的通用Git命令：

start a working area (参见命令: git help tutorial)
   clone      将存储库克隆到新目录中
   init       创建一个空的Git存储库或重新初始化一个现有的存储库

work on the current change (参见命令: git help everyday)
   add        将文件内容添加到索引中
   mv         移动或重命名文件、目录或符号链接
   reset      将当前磁头重置为指定状态
   rm         从工作树和索引中删除文件

examine the history and state (参见命令: git help revisions)
   bisect     使用二分查找查找引入错误的提交
   grep       打印与模式匹配的行
   log        显示提交日志
   show       显示各种类型的对象
   status     显示工作树状态

grow, mark and tweak your common history
   branch     列出、创建或删除分支
   checkout   切换分支或还原工作树文件
   commit     记录对存储库的更改
   diff       显示提交、提交和工作树等之间的更改
   merge      将两个或多个开发历史连接在一起
   rebase     在另一个基本提示之上重新应用提交
   tag        创建、列表、删除或验证用GPG签名的标记对象

collaborate (参见命令: git help workflows)
   fetch      从另一个存储库下载对象和引用
   pull       从另一个存储库或本地分支获取并与之集成
   push       更新远程引用和相关对象

'git help -a' 和 'git help -g' 列出可用的子命令和一些概念指导。
命令'git help &lt;command&gt;' 或 'git help &lt;concept&gt;' 查看特定子命令或概念.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>
<p><a href="https://www.liaoxuefeng.com/wiki/896043488029600" target="_blank" rel="noopener noreferrer">https://www.liaoxuefeng.com/wiki/896043488029600</a></p>
</div></template>
