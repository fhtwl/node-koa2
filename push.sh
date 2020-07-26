#打开git base，执行
#sh deploy.sh


# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'

# git push -f https://github.com/fhtwl/node-koa2.git master
git push -f https://github.com/fhtwl/node-koa2.git master