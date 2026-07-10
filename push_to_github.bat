@echo off
echo Initializing Git repository...
git init

echo Configuring local Git identity...
git config user.name "Bhavin Parmar"
git config user.email "bhavinparmar8833@gmail.com"

echo Staging files...
git add .

echo Committing files...
git commit -m "Initial commit"

echo Setting branch to main...
git branch -M main

echo Configuring remote repository...
:: Remove origin if it already exists to prevent errors
git remote remove origin 2>nul
git remote add origin git@github.com:Bhavin8833/parmarautohouse.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
