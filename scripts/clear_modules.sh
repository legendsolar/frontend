# find . -type d -name node_modules -prune -exec rm -rf {} \;

rm -rf *.lock
rm -rf *-lock.json
rm -rf node_modules 

rm -rf node_modules **/node_modules