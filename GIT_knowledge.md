# GIT版本创建

新建一个文件夹，然后再命令行中将工作路径切换到新创建的文件夹中，输入命令 `git init` 初始化 GIT。

![img](https://xxx.ilovefishc.com/forum/201604/24/225205nl8u7u9hjutlju0u.gif)

然后在 新创建的文件夹下出现一个叫做 .git 的隐藏文件（这个文件夹就是 Git 用来跟踪管理版本迭代的）。



## 使用

（1）在新创建的文件夹（GIT）下，创建一个文件（code.txt），编辑内容：

```CMD
echo.>code.txt
echo this is the first line > code.txt
type code.txt
```

![image-20211205134217939](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205134217939.png)

（2）使用如下命令可以创建一个版本：

```cmd
git add code.txt
git commit -m '版本1'
```

![image-20211205134511785](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205134511785.png)

（3）使用如下命令可以查看版本记录：

```cmd
git log
```

![image-20211205134636681](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205134636681.png)

（4）继续编辑 code.txt，在里面增加一行。

```php
echo this is the second line >> code.txt
```

![image-20211205134852633](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205134852633.png)

（5）使用如下命令再创建一个版本并查看版本记录：

![image-20211205135118441](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205135118441.png)

（6）现在若想回到某一个版本，可以使用如下命令：

```cmd
git reset --hard HEAD^
```

其中，HEAD 表示当前最新版本，HEAD^ 表示当前版本的前一个版本，HEAD^^ 表示当前版本的前前个版本，也可以使用 HEAD~1 表示当前版本的前一个版本，HEAD~100 表示当前版本的前 100 版本。

**在 Windows 的命令提示字符 cmd.exe 里却无法执行，会出现错误:**

![image-20211205140508344](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205140508344.png)

^是cmd.exe的escape字符，属于特殊字符，命令里要用到文字 ^ 时必须用双引号把它夹起来，因此只要如下就可以正确执行：

```cmd
git reset --hard HEAD"^"
```

或者：

```cmd
git reset --hard "HEAD^"
```

或者直接使用：

```
git reset --hard HEAD~1
```

![image-20211205140714128](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205140714128.png)

（7）如果想要回到版本2，可以使用如下命令：

```cmd
git reset --hard 版本号
```

从上面可以看到版本2的版本号为：

![image-20211205140917024](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205140917024.png)

```cmd
git reset --hard 3f9b315f65b5 # 复制前面几个也是可以的
```

![image-20211205141148321](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205141148321.png)

（9）假如说上面的终端已经关掉了，怎么回退版本。

执行如下命令将版本回退到版本1。

![image-20211205141422217](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205141422217.png)

下面把终端关了，然后再打开终端，发现之前版本2的版本号看不到了。

使用 `git reflog` 命令可以查看操作的记录。

```cmd
git reflog
```

![image-20211205141952304](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205141952304.png)

![image-20211205142053064](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205142053064.png)



## 工作区和暂存区

### 工作区

电脑中的目录，比如新创建的文件夹（GIT），就是一个工作区



### 版本库

工作区有个一个隐藏目录 `.git`，这个不是工作区，而是 `git` 的版本库。`git` 的版本库里存了很多东西，其中最重要的就是称为 `stage`（或者叫 `index`）的暂存区，还有 `git` 为我们自动创建的第一个分支 `master`，以及指向 `master` 的一个指针叫 `HEAD`。

因为创建 `git` 版本库时，`git` 自动为我们创建了唯一一个 `master` 分支，所以，现在 `git commit` 就是往 `master` 分支上提交更改。

可以简单理解为，需要提交的文件修改统统放到暂存区，然后，一次性提交暂存区的所有修改。

![image-20211205142910393](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205142910393.png)

（1）下面在 `GIT` 目录下再创建一个文件 `code2.txt`，然后编辑内容如下：

```cmd
echo.>code2.txt
echo the code2 first line > code2.txt
type code2.txt
```

![image-20211205143522009](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205143522009.png)

（2）然后再次编辑 `code.txt` 内容，在其中加入一行，编辑后内容如下：

```cmd 
echo this is the third line >> code.txt
type code.txt
```

![image-20211205143748143](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205143748143.png)

（3）使用如下命令查看当前工作树的状态：

```cmd
git status
```

![image-20211205143924950](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205143924950.png)

上面提示我们 `code.txt` 被修改，而 `code2.txt` 没有被跟踪。

（4）使用如下命令把 `code.txt` 和 `code2.txt` 加入到暂存区，然后再执行 `git status` 命令，结果如下：

![image-20211205144217781](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205144217781.png)

所有 `git add` 命令是把所有提交的修改存放到暂存区。

（5）然后执行 `git commit` 就可以一次性把暂存区的所有修改提交到分支创建一个版本。

![image-20211205144449039](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205144449039.png)

（6）一旦提交后，如果没有对工作区做任何修改，那么工作区就是“干净“的。执行如下命令可以发现：

```cmd
git status
```

![image-20211205144630470](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205144630470.png)

现在，版本库变成了这样：

![image-20211205144716582](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205144716582.png)



### 管理修改

`git` 管理的文件的修改，**==它只会提交暂存区的修改来创建版本==**。

（1）编辑 `code.txt`，并使用 `git add` 命令将其添加到暂存区。

![image-20211205145132045](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205145132045.png)

（2）继续编辑 `code.txt`，并在其中添加一行：

![image-20211205145236935](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205145236935.png)

（3）`git commit` 创建一个版本，并使用 `git status` 查看，发现第二次修改 `code.txt` 内容之后，并没有将其添加到工作区，所以创建版本的时候并没有被提交。

![image-20211205145543368](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205145543368.png)



### 撤销修改

（1）继续上面的操作，提示我们可以使用 `git restore <文件>` 来丢弃工作区的改动。执行如下命令，发现工作区干净了，第二次的改动内容也没了。

![image-20211205150043214](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205150043214.png)

（2）继续编辑 `code.txt`，并在其中添加如下内容，并将其添加到暂存区。

![image-20211205150438125](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205150438125.png)

（3）`git` 同样告诉我们使用命令 `git restore --staged <file>` 可以把暂存区的修改撤销掉，重新放回工作区。

![image-20211205150621293](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205150621293.png)

（4）现在若想要丢弃  `code.txt` 的修改，执行如下命令即可。

![image-20211205150739910](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205150739910.png)

现在，如果不但改错了东西，还从暂存区提交到了版本库，则需要进行版本的回退。

**小结：**

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，使用命令 `git restore file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想要丢弃修改，分两步，第一步用命令 `git restore --staged file` ，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考回退一节。



### 对比文件的不同

对比工作区和某个版本中的文件的不同：

（1）继续编辑文件 `code.txt`，在其中添加一行内容。

![image-20211205152026005](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205152026005.png)

（3）使用如下命令丢弃工作区的改动。

```cmd
git restore code.txt
```

![image-20211205152122371](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205152122371.png)

对比两个版本间文件的不同：

（1）现在要对比 `HEAD` 和 `HEAD^` 版本中 `code.txt` 的不同，使用如下命令：

![image-20211205152445371](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205152445371.png)



### 删除文件

（1）把目录中的 `code2.txt` 删除。

```cmd
del code2.txt
```

这个时候，`git` 知道删除了文件，因此，工作区和版本库就不一致了，`git status` 命令会立刻提示哪些文件被删除了。

![image-20211205153013876](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205153013876.png)

（2）现在有两个选择，一是确定要从版本库中删除该文件，那就用命令 `git rm` 删掉，并且 `git commit`：

![image-20211205153526332](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211205153526332.png)

另一种情况是删错了，可以直接使用 `git restore code2.txt`，这样文件 `code2.txt` 又回来了。

**小结：**

命令 `git rm` 用于删除一个文件。如果一个文件已经被提交到版本库，那么永远不要担心误删，但是要小心，只能回复文件到最新版本，你会丢失**==最近一次提交后你修改的内容==**。



## 分支管理

### 创建与合并分支

截止到目前只有一条时间线，在 `git` 里，这个分支叫主分支，即 `master` 分支。`HEAD` 严格来说不是指向提交，而是指向 `master`，`master` 才是指向提交的，所以，`HEAD` 指向的就是当前分支。 

（1）一开始的时候，`master` 分支是一条线，`git` 用 `master` 指向最新的提交，再用 `HEAD` 指向  `master`，就能确定当前分支，以及当前分支的提交点：

![image-20211208213555677](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208213555677.png)

每次提交，`master` 分支都会向前移动一步，随着不断的提交，`master` 分支的线也越来越长。

（2）当创建新的分支，例如 `dev` 时，`git` 新建了一个指针叫 `dev`，指向 `master` 相同的提交，再把 `HEAD` 指向 `dev`，就表示当前分支在 `dev` 上：

![image-20211208213900223](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208213900223.png)

`git` 创建一个分支很快，因为除了增加一个 `dev` 指针，改变 `HEAD` 的指向，工作区的文件都没有任何的变化。

（3）不过，从现在开始，对工作区的修改和提交就是针对 `dev` 分支了，比如新提交一次后，`dev` 指针往前移动一步，而 `master` 指针不变：

![image-20211208214134119](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208214134119.png)

（4）加入在 `dev` 上的工作完成了，就可以把 `dev` 合并到 `master` 上。`master` 指向 `dev` 的当前的提交，就完成了合并：

![image-20211208214322711](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208214322711.png)

（5）合并完成分支后。甚至可以删除 `dev` 分支。删除 `dev` 分支就是把 `dev` 指针给删掉，删掉后，就剩下一条 `master` 分支：

![image-20211208214450438](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208214450438.png)



**案例：**

（1）执行如下命令可以查看当前有几个分支并且看到在哪个分支下工作：

```cmd
git branch
```

![image-20211208214627853](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208214627853.png)

（2）创建一个分支 `dev` 并切换到其上进行工作：

```cmd
git checkout -b dev
```

![image-20211208214803998](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208214803998.png)

（3）修改 `code.txt` 内容，在里面添加一行，并进行提交：

```cmd
echo add one line >> code.txt
git add code.txt
git commit -m 'dev分支提交'
git log --pretty=oneline
```

![image-20211208215120319](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208215120319.png)

（4）`dev` 分支的工作完成，切换回 `master` 分支：

```cmd
git checkout master
git branch
```

![image-20211208215430846](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208215430846.png)

查看 `code.txt`，发现添加的内容没有了。因为那个提交是在 `dev` 分支上，而 `master` 分支此刻的提交点并没有变：

（5）把 `dev` 分支的工作成果合并到 `master` 分支上：

```cmd
git log --pretty=oneline
git merge dev
git log --pretty=oneline
```

![image-20211208215803951](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208215803951.png)

`git merge` 命令用于合并指定分支到当前分支。合并后，再查看 `code.txt` 的内容，就可以看到和 `dev` 分支的最新提交是完全一样的。

注意到上面的 ==`Fast-forward`== 信息，`Git` 告诉我们，这次合并是“快进模式”，也就是直接把 `master` 指向 `dev` 的当前提交。

（6）合并完成后，就可以放心的删除 `dev` 分支了，删除后，查看 `branch`，就只剩下 `master` 分支了。

```cmd
git branch -d dev
git branch
```

![image-20211208220839750](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208220839750.png)



### 小结

查看分支：

```cmd
git branch
```

创建分支：

```cmd
git branch name
```

切换分支：

```cmd
git checkout name
```

创建并切换分支：

```cmd
git checkout -b name
```

合并某分支到当前分支：

```cmd
git merge name
```

删除分支：

```cmd
git branch -d name
```



### 解决冲突

（1）再创建一个新分支 `dev`：

![image-20211208221732171](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208221732171.png)

（2）修改 `code.txt` 内容，并进行提交。

![image-20211208221752013](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208221752013.png)

（3）切换回 `master` 分支。

![image-20211208221828197](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208221828197.png)

（4）在 `master` 的 `code.txt` 添加一行内容并进行提交。

![image-20211208222110254](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208222110254.png)

现在，==`master`== 分支和 ==`dev`== 分支各自都分别有新的提交，变成了这样：

![image-20211208223110341](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223110341.png)

这种情况下，`git` 无法执行“快速合并”，只能试图把各自的修改合并起来，但是这种合并就可能会有冲突。

（5）执行如下命令尝试将 `dev` 分支合并到 `master` 分支上来。

![image-20211208223301884](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223301884.png)

`git` 告诉我们，`code.txt` 文件存在冲突，必须手动解决冲突后再提交。

（6）`git status` 也可以告诉我们冲突的文件：

![image-20211208223437227](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223437227.png)

（7）查看 `code.txt` 的内容：

![image-20211208223520451](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223520451.png)

（8）`git` 用 `<<<<<<<，=======，>>>>>>>` 标记出不同分支的内容，我们修改后如下保存：

![image-20211208223653068](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223653068.png)

（9）再提交。

![image-20211208223728363](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223728363.png)

（10）现在，`master` 分支和 `dev` 分支变成了下图所示：

![image-20211208223817611](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223817611.png)

（11）用带参数的 `git log` 也可以看到分支的合并情况：

```cmd
git log --graph --pretty=oneline
```

![image-20211208223959723](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208223959723.png)

（12）最后工作完成，可以删除 `dev` 分支。

![image-20211208224134473](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211208224134473.png)



### 分支管理策略

**==通常，合并分支时，如果可能，`git` 会用 `fast forward` 模式，但是有些快速合并不能成而且合并时没有冲突，这个时候会合并之后做一次新的提交。==**但这种模式下，删除分支后，会丢掉分支信息。

（1）创建并切换到 `dev` 分支下：

![image-20211211140637649](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211140637649.png)

（2）新建一个文件 `code3.txt`，编辑内容如下，并提交一个 `commit`。

![image-20211211140849028](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211140849028.png)

（3）切换回 `master` 分支，编辑 `code.txt` 并进行一个提交。

![image-20211211141125602](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211141125602.png)

（4）合并 `dev` 分支的内容到 `master`。

![image-20211211141516844](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211141516844.png)

（5）使用分支命令查看分支信息。

![image-20211211141611994](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211141611994.png)

（6）删除 `dev` 分支。

![image-20211211141720560](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211141720560.png)



如果要强制禁用 `fast forward` 模式，`git` 就会在 `merge` 时生成一个新的 `commit`，这样，从分支历史上就可以看出分支信息。

（1）创建并切换到分支 `dev`。

![image-20211211142350021](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211142350021.png)

（2）修改 `code.txt` 内容，并提交一个 `commit`。

![image-20211211142522455](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211142522455.png)

（3）切换回 `master` 分支。

![image-20211211142610970](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211142610970.png)

（4）准备合并 `dev` 分支，请注意 `--no-ff` 参数，表示禁用 `Fast forward`：

![image-20211211142802483](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211142802483.png)



### bug 分支

在 `git` 中，每个 `bug` 都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

（1）当接到一个修复一个代号 001 的 `bug` 的任务时，创建一个分支 `bug-001` 来修复它，但是，当前正在 `dev` 上进行的工作还没有提交：

![image-20211211144702609](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211144702609.png)

并不是不想提交，而是工作只进行到一半，还没法提交，但是，必须在短时间内修复 `bug`。

（2）`git` 还提供了一个 `stash` 功能，可以把当前工作现场“储藏”起来，等以后回复现场后继续工作：

![image-20211211144753935](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211144753935.png)

（3）首先确定要在哪个分支上修复 `bug`，假定需要在 `master` 分支上修复，就从 `master` 创建临时分支：

![image-20211211145034584](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145034584.png)

（4）现在修复 `bug`，把 `a line` 删掉，然后提交。

![image-20211211145048474](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145048474.png)

（5）修复完成后，切换到 `master` 分支，并完成合并，最后删除 `bug-001` 分支。

![image-20211211145444393](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145444393.png)

![image-20211211145459354](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145459354.png)

![image-20211211145643143](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145643143.png)

（6）现在 `bug-001` 修复完成，接着回到 `dev` 继续工作。

![image-20211211145835319](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145835319.png)

（7）工作区是干净的，使用 `git stash list` 命令查看：

![image-20211211145919911](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211145919911.png)

工作现场还在，`git` 把 `stash` 内容存在某个地方了，但是需要恢复一下。

使用 `git stash pop` 命令：

![image-20211211150119232](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211150119232.png)



**小结：**

修复 `bug` 时，通过创建新的 `bug` 分支进行修复，然后合并，最后删除：

当手头工作没有完成时，先把工作现场 **`git stash`** 一下，然后去修复 `bug`，修复后，再 **`git stash pop`**，回到工作现场。



## 使用 github

### 创建仓库

（1）注册 `github` 账户，登录后，点击 `New respository`

![image-20211211152300557](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211152300557.png)

（2）在新页面中，输入项目名称，勾选 `readme.md`，在 `Add .gitignore` 中选择 `python`，这会忽略掉如  `.pyc` 这种除 `.py` 文件之外的警告。

![image-20211211152941030](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211152941030.png)



### 添加 ssh 账户

（1）点击账户头像后的下拉三角，选择 `settings`。如果某台机器需要与 `github` 上的仓库交互，那么就要把这台机器的 `ssh` 公钥添加到这个 `github` 账户上。

<img src="C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211153246725.png" alt="image-20211211153246725" style="zoom:100%;" align='left'/>

点击 `SSH and GPG keys`，添加 `ssh` 公钥

![image-20211211153840002](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211153840002.png)



（2）回到目录 `C:\Users\H` 下，编辑 `.gitconfig`，修改 `git` 配置。

![image-20211211154840277](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211154840277.png)

（3）修改为注册 `github` 时的邮箱，填写用户名。

（4）使用如下命令生成 `ssh` 密钥。

```git
ssh-keygen -t ras -C 注册邮箱
```

（5）在 `C:\Users\H\.ssh` 目录下有两个文件：

公钥为：`id_rsa.pub`

私钥为：`id_ras`

查看并复制公钥内容到 `github` 的 `Key` 中。

![image-20211211155904541](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211155904541.png)



### 克隆项目

（1）在浏览器中点击进入 `github` 首页，再进入项目仓库的页面

![image-20211211160757597](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211160757597.png)

（2）复制 `git` 地址

![image-20211211160833036](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211160833036.png)

（3）克隆出错

输入命令：

```cmd
eval "$(ssh-agent -s)"
ssh-add
```

（4）在创建的文件夹下的终端中输入 `git clone ssh地址`，即可克隆：

![image-20211211161039524](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211161039524.png)



### 创建分支

（1）项目克隆到本地之后，执行如下命令创建分支 `hwly`。

![image-20211211161601908](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211161601908.png)

（2）创建一个 `view.py`，并提交一个版本。

![image-20211211162017099](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211162017099.png)

（3）推送前 `github` 上文件列表如图：

![image-20211211162218285](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211162218285.png)

（4）推送前 `github` 上分支列表如下图：

![image-20211211162248267](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211162248267.png)

（5）推送分支，就是把该分支上的所有本地提交推送到远程库，推送时要指定本地分支，这样，`git` 就会把该分支推送到远程库对应的远程分支上。

```cmd
git push origin 分支名称
例如：
git push origin hwly
```

![image-20211211162600683](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211162600683.png)

（6）再去 `github` 网站上去看分支页面，内容如下：

![image-20211211162835420](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211162835420.png)



### 将本地分支跟踪服务器分支

```cmd
git branch --set-upstream-to=origin/远程分支名称 本地分支名称
例如：
git branch --set-upstream-to=origin/hwly hwly
```

![image-20211211163218505](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211163218505.png)

（1）使用 `git status` 查看状态：

![image-20211211163305128](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211163305128.png)

（2）编辑文件 `view.py`，并提交:

![image-20211211163823690](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211163823690.png)

（3）通过 `git log` 查看提交：

![image-20211211163852139](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211163852139.png)

（4）查看状态：

![image-20211211163921234](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211163921234.png)

此时发现本地分支提前远程分支一个版本。

（5）通过 `git push`，将本地分支内容同步到远程。

![image-20211211164027251](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211164027251.png)

（6）通过 `git status` 查看状态，版本一致。

![image-20211211164054521](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211164054521.png)



### 从远程分支上拉取代码

```cmd
git pull origin 分支名称
例如：
git pull origin hwly
```

使用上述命令会把远程分支 `hwly` 上的代码下载并合并到本地所在分支。

![image-20211211164645135](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211164645135.png)



### 工作使用 git

项目经理：

（1）项目经理搭建项目的框架

（2）搭建完项目框架之后，项目经理把项目框架代码放到服务器。

普通员工：

（1）在自己的电脑上，生成 `ssh`公钥，然后把公钥给项目经理，项目经理把它添加到服务器上面。

（2）项目经理会给每个组员的项目代码的地址，组员把代码下载到自己的电脑上。

（3）创建本地的分支 `dev`，在 `dev` 分支中进行每天的开发。

（4）每一个员工开发完自己的代码之后，都需要将代码发布到远程的 `dev` 分支上。



**Master：**用于保存发布的项目代码。

**Dev：**保存开发过程中的代码。



















































