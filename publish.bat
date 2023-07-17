@echo off

REM Get the current version from package.json
for /f "usebackq tokens=2" %%v in (`npm show . version`) do set CURRENT_VERSION=%%v

REM Prompt for the new version
set /p NEW_VERSION=Enter the new version (current: %CURRENT_VERSION%):

REM Validate the version format
set "VERSION_REGEX=^[0-9]+\.[0-9]+\.[0-9]+$"
echo %NEW_VERSION% | findstr /r /c:"%VERSION_REGEX%" > nul
if errorlevel 1 (
  echo Invalid version format. Please use the format X.X.X (e.g., 1.0.0).
  exit /b 1
)

REM Update the package version in package.json
npm version %NEW_VERSION% --no-git-tag-version

REM Build the project (if necessary)
REM Add build commands here if SassifyPro requires building

REM Commit the changes with the new version
git add package.json
git commit -m "Release v%NEW_VERSION%"

REM Tag the release commit
git tag v%NEW_VERSION%

REM Push the changes and tags to the remote repository
git push origin master
git push origin v%NEW_VERSION%

REM Publish the module to npm
npm publish

echo SassifyPro v%NEW_VERSION% has been successfully released!
