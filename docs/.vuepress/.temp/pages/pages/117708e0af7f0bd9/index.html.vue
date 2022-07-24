<template><div><h1 id="nodejs递归读取所有文件" tabindex="-1"><a class="header-anchor" href="#nodejs递归读取所有文件" aria-hidden="true">#</a> nodejs递归读取所有文件</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
var fs = require('fs');
var path = require('path');
 
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    console.log(files);
    files.forEach((item, index) =&gt; {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {                
            filesList.push(fullPath);                     
        }        
    });
    return filesList;
}
 
var filesList = [];
readFileList(__dirname,filesList);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
