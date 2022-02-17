git config --global user.name 'legendsolarbot'
git config --global user.email 'githubbotlegendssolar@gmail.com'
git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/$GITHUB_REPOSITORY
git checkout "${GITHUB_REF:11}"
BRANCH_NAME=`date -u '+%d-%m-%Y_%H.%M.%S'` 
git branch $BRANCH_NAME
git checkout $BRANCH_NAME
git commit -am "[BOT] Automated branch creation before deploy"
git push