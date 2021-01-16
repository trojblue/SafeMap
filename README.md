# STHacks

`combined`: 合并各种修改以后的代码放这里

其他文件夹随便用



关于多人合作: 看这个 https://www.cnblogs.com/idorax/p/9366035.html



上传:

```bash
git clone https://github.com/Trojblue/STHacks.git
git checkout -b dev
git remote add https://github.com/Trojblue/STHacks.git
git remote update
git fetch upstream master
git rebase upstream/master

git add foo.py
git commit -m "<name>: <actions>"
git push -u origin dev 
```

