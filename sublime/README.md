# sublime

My sublime language / theme settings. Also provides MIB and YANG syntax highlighting with tailf support. Intended to be used with [forked Seti theme](https://github.com/trflynn89/Seti_UI).

## Package Control

Install the Package Control plugin here: https://sublime.wbond.net/installation

### PackageResourceViewer

PackageResourceViewer allows you to edit any Sublime resource, including language and theme settings.

Once Package Control is installed, hit Ctrl+Shift+P to open the Command Palette (or go to "Tools > Command Palette...").

In the popup box, start typing "instpkg", which sublime will auto-complete to "Package Control: Install Package". Select this option by hitting enter. Next, start typing PackageResourceViewer and select it. In a few seconds this package will be installed.

## Editing language resources

We can now edit any language file with PackageResourceViewer. Open the Command Palatte and start typing Open Resource. You can then select any language you want to edit, e.g. C++.

### YANG syntax highlighting

Open the Command Palette, start typing "instpkg" and select the Install Package option. Start typing YANG, and select "YANG Syntax Highlighting".

The yang-syntax.tmLanguage file in this repository fixes some issues with this package and adds support for the "tailf:" statements used in ConfD. Open the Command Palette, start typing Open Resource, and open the YANG > yang-syntax.tmLanguage file. Replace its contents with the file in this repository.

### MIB syntax highlighting

Create a directory called MIB in the same directory as the C++, YANG, User, etc. directories. Place MIB.tmLanguage from this repository in the MIB directory.

## Installation

### Windows (powershell) installation

```
git clone https://github.com/trflynn89/dotfiles.git
git clone https://github.com/trflynn89/Seti_UI.git

cmd /c mklink /J "$env:APPDATA/Sublime Text 3/Packages/Flynn" (convert-path ./dotfiles/sublime/Flynn)
cmd /c mklink /J "$env:APPDATA/Sublime Text 3/Packages/Seti_UI" (convert-path ./Seti_UI)
```

### Linux installation

```
git clone https://github.com/trflynn89/dotfiles.git
git clone https://github.com/trflynn89/Seti_UI.git

ln -s `pwd`/dotfiles/sublime/Flynn ~/.config/sublime-text-3/Packages/Flynn
ln -s `pwd`/Seti_UI ~/.config/sublime-text-3/Packages/Seti_UI
```

### OS X installation

```
git clone https://github.com/trflynn89/dotfiles.git
git clone https://github.com/trflynn89/Seti_UI.git

ln -s `pwd`/dotfiles/sublime/Flynn ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/Flynn
ln -s `pwd`/Seti_UI ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/Seti_UI
```

### Apply installation

Go to "Preferences >  Settings - User" and replace the file contents with Preferences.sublime-settings file from this repository.