<template><div><h1 id="git分支的新建与合并-分支操作" tabindex="-1"><a class="header-anchor" href="#git分支的新建与合并-分支操作" aria-hidden="true">#</a> Git分支的新建与合并-分支操作</h1>
<p>文档：<a href="https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6" target="_blank" rel="noopener noreferrer">Git 分支 - 分支的新建与合并</a></p>
<h3 id="创建分支并切换" tabindex="-1"><a class="header-anchor" href="#创建分支并切换" aria-hidden="true">#</a> 创建分支并切换</h3>
<p>此时有一个需求需要在新的分支<code v-pre>iss53</code>上工作：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git checkout -b iss53  # b表示branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它是下面两条命令的简写：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git branch iss53
$ git checkout iss53
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切换分支" tabindex="-1"><a class="header-anchor" href="#切换分支" aria-hidden="true">#</a> 切换分支</h3>
<p>突然有一个紧急问题要解决，需要在原来的<code v-pre>master</code>分支进行修复：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git checkout master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在切换到<code v-pre>master</code>之前，需要<code v-pre>iss53</code>分支保持好一个干净的状态（修改都已提交）。</p>
<p><strong>注意：切换分支Git 会重置你的工作目录。</strong></p>
<blockquote>
<p><code v-pre>checkout</code> 中文含义 “检出”，<code v-pre>checkout &lt;branch&gt;</code> 检出分支 =&gt; 检出指定分支的代码 =&gt; 重置工作目录并切换分支。</p>
</blockquote>
<p>接下来，你要修复这个紧急问题。 建立一个 <code v-pre>hotfix</code> 分支，在该分支上工作直到问题解决：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git checkout -b hotfix

# 中间过程在hotfix上修改了代码并提交
$ echo 'test' &gt; ./hotfix.txt
$ git add .
$ git commit -m 'fixed'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git checkout master # 首先切回master分支
$ git merge hotfix # 把 hotfix 分支合并过来
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git branch -d hotfix # d表示delete

# 然后切回iss53继续工作
$ git checkout iss53
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意删除分支是在 <code v-pre>branch</code> 命令上</p>
<h3 id="多次提交之后合并分支" tabindex="-1"><a class="header-anchor" href="#多次提交之后合并分支" aria-hidden="true">#</a> 多次提交之后合并分支</h3>
<p>假设你已经修正了 #53 问题，打算合并到<code v-pre>master</code>分支：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git checkout master
$ git merga iss53
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这看似和之前的合并区别不大。此时你的开发历史从一个更早的地方开始分叉开来（diverged）。 因为，<code v-pre>master</code> 分支所在提交并不是 <code v-pre>iss53</code> 分支所在提交的直接祖先，Git 不得不做一些额外的工作。 出现这种情况的时候，Git 会使用两个分支的末端所指的快照以及这两个分支的公共祖先，做一个简单的<strong>三方合并</strong>。</p>
<p>和之前将分支指针向前推进所不同的是，<strong>Git 将此次三方合并的结果做了一个新的快照并且自动创建一个新的提交指向它</strong>。 这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。</p>
<h3 id="遇到冲突时的分支合并" tabindex="-1"><a class="header-anchor" href="#遇到冲突时的分支合并" aria-hidden="true">#</a> 遇到冲突时的分支合并</h3>
<p>如果你在两个不同的分支中，<strong>对同一个文件的同一个部分进行了不同的修改</strong>，Git 就没法干净的合并它们，就产生了冲突。</p>
<p>合并过程中出现<code v-pre>CONFLICT</code>提升，表示有冲突</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>git status</code>查看未合并状态。</p>
<p>任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来。 <strong>Git 会在有冲突的文件中加入标准的冲突解决标记，这样你可以打开这些包含冲突的文件然后手动解决冲突。</strong> 出现冲突的文件会包含一些特殊区段，看起来像下面这个样子：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD:index.html
&lt;div id=&quot;footer&quot;&gt;contact : email.support@github.com&lt;/div&gt;
=======
&lt;div id=&quot;footer&quot;&gt;
 please contact us at support@github.com
&lt;/div&gt;
&gt;&gt;&gt;&gt;&gt;&gt;&gt; iss53:index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你需要<strong>手动解决冲突</strong>，解决了所有文件里的冲突之后，对每个文件<strong>使用 <code v-pre>git add</code> 命令</strong>来将其标记为冲突已解决。 <strong>一旦暂存这些原本有冲突的文件，Git 就会将它们标记为冲突已解决</strong>。</p>
<p>如果你对结果感到满意，并且确定之前有冲突的的文件都已经暂存了，这时你可以输入 <code v-pre>git commit</code> 来完成合并提交。</p>
</div></template>
