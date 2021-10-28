# GIT 常用命令详解

## GIT 简介

Git是Linux之父Linus的第二个伟大的作品，它最早是在Linux上开发的，被用来管理Linux核心的源代码。后来慢慢地有人将其移植到了Unix、Windows、Max OS等操作系统中。

Git是一个分布式的版本控制系统，与集中式的版本控制系统不同的是，每个人都工作在通过克隆建立的本地版本库中。也就是说每个人都拥有一个完整的版本库，查看提交日志、提交、创建里程碑和分支、合并分支、回退等所有操作都直接在本地完成而不需要网络连接。

对于Git仓库来说，每个人都有一个独立完整的仓库，所谓的远程仓库或是服务器仓库其实也是一个仓库，只不过这台主机24小时运行，它是一个稳定的仓库，供他人克隆、推送，也从服务器仓库中拉取别人的提交。

Git是目前世界上最先进的分布式版本控制系统，没有之一，对，没有之一!

## 三个区

```
            GIT 三大分区

开发者   -->      工作区          -->     暂存区      -->         版本库      -->      远程仓库
            working directory    add     stage     commit   commit history  push     remote
pull            

```

工作区（working diretory）用于修改文件
缓存区（stage）是用来暂时存放工作区中修改的内容
提交历史（commit history）提交代码的历史记录

## 主要命令

- git add       # 将工作区的修改提交到暂存区
- git commit    # 将暂存区的修改提交到当前分支
- git reset     # 回退到某一个版本
- git stash     # 保存某次修改
- git pull      # 从远程更新代码
- git push      # 将本地代码更新到远程分支上
- git reflog    # 查看历史命令
- git status    # 查看当前仓库的状态
- git diff      # 查看修改
- git log       # 查看提交历史
- git revert    # 回退某个修改

### git commit 用法

- git commit -m "本次提交描述"
该命令会将 git add 存入暂存区修改内容提交到本地仓库中，若文件未添加至暂存区，则提交时不会提交任何修改。

- git commit -a
相当于运行 git add -u 把所有当前目录下的文件加入缓存区域再运行 git commit 注意！对于新增的文件，并没有被commit。

- git commit -am "本地提交描述" 或者  git commit -a -m "本次提交描述"

等同于上面的 -a -m

- git commit --amend

修改最近一次提交。有时候如果提交注释写错或漏提文件，可以用此命令。对于漏提的文件，需要git add 到缓存区之后，git commit --amend 才能将修改追加到最近的一次提交上

## git stash 用法

- git stash 
所有未提交的修改都保存起来，用于后续恢复当前工作目录

- git stash save "stash_name" 
给每个stash加一个message，用于记录版本

- git stash pop / git stash apply 
恢复最新缓存的工作目录（第一个），并删除缓存堆栈中的那一个stash（pop）,apply则只恢复不删除。

- git stash list 
查看现有所有stash，在使用 git stash pop(apply) 命令时，可以通过名字指定使用哪个stash，默认使用最新的stash（即stash@{0}）

- git stash drop 
移除最新的stash，后面也可以跟指定stash的名字


## git reset 用法

- git reset 根据 -soft -mixed -hard，会对 working tree 和 index 和 HEAD 进行重置

- git reset HEAD^
回退版本，一个^表示一个版本，可以多个，另外也可以使用 git reset HEAD ~n 这种形式。也可以退回到指定版本：git reset commit -id

```
soft 参数： git reset --soft HEAD ~1 意为将版本库软回退1个版本，所谓软回退表示将本地版本库的头指针全部重置到指定版本，且将这次提交之后的所有变更都移动到暂存区
默认的mixed参数：git reset HEAD ~1 意为将版本库回退1个版本，将本地版本库的头指针全部充值到指定版本，且会重置暂存区，即这次提交之后的所有变更都移动到工作区
hard参数：git reset --hard HEAD ~1 意为将版本库回退1个版本，但是不仅仅是将本地版本库的头指针全部重置到指定版本，也会重置暂存区，并且会将工作区代码清空（工作区是clean状态）。
```

注意，soft 参数与默认参数都不会修改工作区代码，只有hard参数才会修改工作区代码。

另外，git reset HEAD filename 回退文件，将文件从暂存区回退到工作区(unstage),此时不能带hard,soft参数。

## git reflog

如果在回退以后又想再次回到之前的版本，git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录，git log则不能察看已经删除了的commit记录

比如说，回退到commit: zancun3，只需要： git reset --hard f3ef592 (或者HEAD@{49}) 即可 这个命令对于找回丢失的代码非常有用。

## git add

删除文件后需要 git add -A, 光 git add. 不行，区别如下：

- git add -A  # 保存所有的修改
- git add     # 保存新的添加和修改，但是不包括删除 
- git add -u  # 保存修改和删除，但是不包括新建文件

所以默认使用git add -A就行

## git checkout

- git checkout # 既可以操作分支，也可以操作文件

## git checkout 切换分支

- git checkout -b newBranchName Switched to a new branch 'newBranchName'
这相当于执行下面这两条命令： git branch newBranchName git checkout newBranchName(工作区一定要是clean的)

- git checkout -b newBranchName remote_branch_name  # 拉取远程分支
remote_branch_name创建一个本地分支newBranchName，并切到本地分支newBranchName，采用此种方法建立的本地分支会和远程分支建立映射关系。

## git checkout 回退修改

- git checkout -- fileName
把 fileName 从当前 HEAD 中检出，也就是回退当前工作区的这个文件的修改 -- 可以省略不写

- git checkout --hard HEAD
回退工作区的全部文件修改


## git revert

- git revert 
反转提交，撤销一个提交的同时会创建一个新的提交，也就是用一个新提交来消除一个历史提交所做的任何修改。

- git revert commit-id revert 
指定的一个commit git revert HEAD ~3 revert指定倒数第四个commit

- git revert --abort
revert 过程有可能遇到冲突，使用命令 终止此次操作，代码还原至 revert 命令前。


## 删除分支

- git branch -d branchName 或 git branch -D branchName 
删除分支，不管没有没merge,前提是要先切换到其他分支


## git push 

git push 命令用于将本地分支的更新，推送到远程主机

```git
git push <远程主机名> <本地分支名>:<远程分支名>
git push origin master 
```

上面命令表示，将本地的master分支推送到origin主机的master分支。如果master不存在，则会被新建。

如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。

```GIT
git push origin :master
等同于
git push origin --delete master
```

上面命令表示删除origin主机的master分支。如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。

- git push origin
上面的命令表示，将当前分支推送到origin主机的对应分支。如果当前分支只有一个追踪分支，那么主机名都可以省略。

- git push
如果当前分支与多个主机存在追踪关系，则可以使用 —u 选项指定一个默认主机，然后后面就可以不加任何参数使用git push

- git push -u origin master
上面命令将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了

- git push origin HEAD
将当前分支推送到远程的同名的简单方法。

- git push origin HEAD:master
单独使用git push时，没有指定push的remote分支名，假如当前本地分支名称与其对应的remote分支名称不一样，则会有一下提示：

```
fatal: The upstream branch of your current branch does not match
the name of your current branch.  To push to the upstream branch
on the remote, use

    git push origin HEAD:my_new_test_branch

To push to the branch of the same name on the remote, use

    git push origin test

To choose either option permanently, see push.default in 'git help config'.
```

当执行git push origin test时，会在远程重新创建一个新的分支，名称就是test，然后把修改同步到test分支。


## git pull

git pull命令用于从另一个存储库或本地分支获取并集成(整合)。git pull命令的作用是：取回远程主机某个分支的更新，再与本地的指定分支合并，

- git pull <远程主机名> <远程分支名>:<本地分支名>

比如，要取回origin主机的master分支，与本地的test分支合并，需要写成下面这样
- git pull origin master:test

如果远程分支(master)要与当前分支合并，则冒号后面的部分可以省略。上面命令可以简写：
- git pull origin master

将远程存储库中的更改合并到当前分支中。在默认模式下，git pull是git fetch后跟git merge FETCH_HEAD的缩写。

更准确地说，git pull使用给定的参数运行git fetch，并调用git merge将检索到的分支头合并到当前分支中。 使用--rebase，它运行git rebase而不是git merge。也就是说

- git pull = git fetch + git merge
- git pull --rebase = git fetch + git rebase

git中都fetch命令是将远程分支的最新内容拉到了本地，但是fetch后是看不到变化的，此时本地多了一个FETCH_HEAD的指针，checkout到该指针后可以查看远程分支的最新内容。然后checkout到master分支，执行metch,选中FETCH_HEAD指针,合并后如果出现冲突则解决冲突，最后commit。

pull的作用就相当于fetch和merge，自动合并

- git fetch origin master git merge FETCH_HEAD

git fetch origin isoda-android_1.3.0_feature :branch1 使用远程isoda-android_1.3.0_feature分支在本地创建branch1分支（但不会切换到该分支）

## 1. git merge

1. git merge
将 origin 分支合并到 mywork 分支最简单的办法就是用下面这些命令

- git checkout mywork git merge origin
或者
- git merge origin mywork

## 2. git rebase

作为 merge 的替代选择，你可以像下面这样将 mywork 分支并入 origin 分支：

- git checkout mywork git rebase origin

它会把整个 mywork 分支移动到 origin 分支的后面，有效地把所有 master 分支上新的提交并入过来。但是，rebase为原分支上每一个提交创建一个新的提交，重写了项目历史，并且不会带来合并提交。rebase的好处是避免了菱形的产生，保持提交曲线为直线，让大家易于理解。

## 3. rebase的高级操作--交互式rebase

交互式的 rebase 允许你更改并入新分支的提交。这比自动的 rebase 更加强大，因为它提供了对分支上提交历史完整的控制。一般来说，这被用于将 feature 分支并入 master 分支之前，清理混乱的历史。

把 -i 传入 git rebase 选项来开始一个交互式的rebase过程：

- git checkout feature git rebase -i master

它会打开一个文本编辑器，显示所有将被移动的提交：

```
pick e900fa0 zancun
pick 6b82c75 zancun2
pick f3ef592 zancun3

# Rebase fb74ec2..f3ef592 onto fb74ec2 (3 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

这个列表定义了 rebase 将被执行后分支会是什么样的。更改 pick 命令或者重新排序，这个分支的历史就能如你所愿了。比如说，如果第二个和第三个提交只是修复了第一个提交中的小问题，你可以用 fixup 命令把它们合到第一个提交中，并修改第一个的日志：

```
r e900fa0 zancun
f 6b82c75 zancun2
f f3ef592 zancun3
```

这样三个提交合并成了一个提交，并可以重新修改提交日志，非常实用。 忽略不重要的提交会让你的 feature 分支的历史更清晰易读。这是 git merge 做不到的。

## 4. Rebase的黄金法则

当你理解rebase是什么的时候，最重要的就是什么时候不能用rebase。git rebase 的黄金法则便是，绝不要在公共的分支上使用它。

这次 rebase 将 master 分支上的所有提交都移到了 feature 分支后面。问题是它只发生在你的代码仓库中，其他所有的开发者还在原来的 master 上工作。因为 rebase 引起了新的提交，Git 会认为你的 master 分支和其他人的 master 已经分叉了。

同步两个 master 分支的唯一办法是把它们 merge 到一起，导致一个额外的合并提交和两堆包含同样更改的提交。不用说，这会让人非常困惑。

所以，在你运行 git rebase 之前，一定要问问你自己「有没有别人正在这个分支上工作？」。如果答案是肯定的，那么把你的爪子放回去，重新找到一个无害的方式（如 git merge）来提交你的更改。不然的话，你可以随心所欲地重写历史。

## 5. rebae的本地清理功能

在你工作流中使用 rebase 最好的用法之一就是清理本地正在开发的分支。隔一段时间执行一次交互式 rebase，你可以保证你 feature 分支中的每一个提交都是专注和有意义的。

调用 git rebase 的时候，你有两个基（base）可以选择：上游分支（比如 master）或者你 feature 分支中早先的一个提交。我们在「交互式 rebase」一节看到了第一种的例子。后一种在当你只需要修改最新几次提交时也很有用。比如说，下面的命令对最新的 3 次提交进行了交互式 rebase：

- git checkout feature
- git rebase -i HEAD~3(或者第四个commit-id)

这样，就可以对本地提交历史中最新的三个提交进行重新整理了，包括提交合并，提交日志修改等等。

通过指定 HEAD~3 作为新的基提交，你实际上没有移动分支——你只是将之后的 3 次提交重写了。注意它不会把上游分支（master）的更改并入到 feature 分支中。

交互式 rebase 是在你工作流中引入 git rebase 的的好办法，因为它只影响本地分支。其他开发者只能看到你已经完成的结果，那就是一个非常整洁、易于追踪的分支历史。


## 追踪关系

- git branch --track test origin/master
建立test仓库，并建立追踪关系

- git checkout test
修改追踪关系，先切换到test

- git branch --set -upstream-to origin/master
修改追踪仓库，先切换

建立追踪关系之后，本地分支名称和远程一样时，使用git push时不用带上远程名称，git pull也不用带上远程分支名


# git 冲突的修复

## 1. 直接编辑冲突文件
使用git pull --rebase经常会出现冲突 冲突产生后，文件系统中冲突了的文件里面的内容会显示为类似下面这样：

```
<<<<<< HEAD
 * test2
 * test3
=======
 * this is my modify, my be conflicked
 * test1000
>>>>>> my_modify
```

其中：<<<<<<<（7个<）HEAD与=======之间的内容是remote上的修改，冲突标记=======与>>>>>>>之间的内容是我的修改内容。 在这两者之间选择任何你需要的内容保留下来，并删除所有的===,<<<,>>>即可解决冲突，解决完成之后，git add -A, git rebase --continue就提交了代码

## 2. 利用图形界面工具解决冲突
当然我们也可以利用图形工具解决冲突 如果要解决的冲突很多，且比较复杂，图形界面的冲突解决工具就显得很重要了。 执行git mergetool用预先配置的Meld(Beyond Compare)解决冲突：

上面左右两个窗口依次是“LOCAL”、“REMOTE”，它们只是提供解决冲突需要的信息，是无法编辑的。中间的窗口是合并后的结果，可以手动修改，也可以点击相应颜色的箭头选择“LOCAL”或者“REMOTE”。

如果不向解决冲突，回到之前状态，可执行：

- git rebase --abort

## 3. 代码提交完整流程

步骤如下：

- git clone url
- git add -A
- git commit -m "message"
- git pull 
- git push --rebase (或者 git fetch + git rebase)

- 解决冲突 git add 冲突文件 git rebase –continue git push 其中，3、4、5点，如果没遇到冲突就不用进行，直接push上去。
- 当遇到冲突时，git会提示patch failed，并要我们解决问题了再执行git rebase --continue
