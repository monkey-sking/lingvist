# Installation Guide

## Prerequisites

Before installing the Lingvist Smart Language Selector, you need to have a userscript manager installed in your browser.

### Install Tampermonkey

**Tampermonkey** is the most popular userscript manager and is recommended for this script.

#### Chrome/Edge/Brave
1. Visit [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Click "Add to Chrome"
3. Confirm installation

#### Firefox
1. Visit [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Click "Add to Firefox"
3. Confirm installation

#### Safari
1. Visit [App Store](https://apps.apple.com/us/app/tampermonkey/id1482490089)
2. Install Tampermonkey for Safari
3. Enable the extension in Safari preferences

## Install the Script

### Method 1: From Greasyfork (Recommended)

1. **Visit Greasyfork page**: [Lingvist Smart Language Selector](https://greasyfork.org/en/scripts/546018-lingvist-%E6%99%BA%E8%83%BD%E8%AF%AD%E8%A8%80%E9%80%89%E6%8B%A9%E5%99%A8)
2. **Click "Install this script"**
3. **Tampermonkey will open** with the script content
4. **Click "Install"** to confirm

### Method 2: Manual Installation

1. **Download the script file**: `lingvist-smart-selector.user.js`
2. **Open Tampermonkey dashboard**:
   - Click the Tampermonkey icon in your browser
   - Select "Dashboard"
3. **Create new script**:
   - Click the "+" tab or "Create a new script"
4. **Replace content**:
   - Delete the default content
   - Copy and paste the downloaded script content
5. **Save the script**:
   - Press `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac)
   - Or click "File" → "Save"

### Method 3: From GitHub

1. **Visit GitHub repository**: [lingvist-smart-language-selector](https://github.com/username/lingvist-smart-language-selector)
2. **Download script file**: Click on `lingvist-smart-selector.user.js`
3. **Click "Raw" button** to view the raw script content
4. **Copy the URL** from the address bar
5. **Install in Tampermonkey**:
   - Open Tampermonkey dashboard
   - Click "Utilities" tab
   - Paste the URL in "Install from URL" field
   - Click "Install"

## Verify Installation

1. **Check Tampermonkey dashboard**:
   - The script should appear in your installed scripts list
   - Status should show as "Enabled"

2. **Visit Lingvist**:
   - Go to [https://learn.lingvist.com/#hub](https://learn.lingvist.com/#hub)
   - Open browser console (F12)
   - Look for `[Lingvist-AutoLang] 🚀 Lingvist 脚本已加载！` message

3. **Test menu commands**:
   - Click Tampermonkey icon
   - You should see three new menu items:
     - 🌍 选择语言
     - ⚙️ 切换自动开始学习
     - 📋 查看当前设置

## Configuration

After installation, configure the script:

1. **Click Tampermonkey icon** in your browser
2. **Select "🌍 选择语言"**
3. **Choose your preferred language** by entering the corresponding number
4. **Configure auto-start** using "⚙️ 切换自动开始学习" if desired

## Troubleshooting

If the script doesn't install properly:

1. **Check Tampermonkey version**: Ensure you have the latest version
2. **Disable other userscripts**: Temporarily disable other scripts to check for conflicts
3. **Clear browser cache**: Clear cache and cookies for the Tampermonkey extension
4. **Reinstall Tampermonkey**: Uninstall and reinstall the extension if necessary

For more troubleshooting tips, see [troubleshooting.md](troubleshooting.md).

## Next Steps

- [Configure your language preferences](../README.md#how-to-use)
- [Report issues](https://github.com/username/lingvist-smart-language-selector/issues)
- [Contribute to the project](../README.md#contributing)
