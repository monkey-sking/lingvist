# Troubleshooting Guide

## Common Issues and Solutions

### Script Not Loading

**Symptoms**: No console messages, Tampermonkey menu items don't appear

**Solutions**:
1. **Check if you're on the correct page**: The script only runs on `https://learn.lingvist.com/*`
2. **Verify script is enabled**: 
   - Open Tampermonkey dashboard
   - Ensure the script status is "Enabled"
3. **Check @match pattern**: Ensure the URL matches the script's @match pattern
4. **Refresh the page**: Sometimes a simple refresh helps
5. **Restart browser**: Close and reopen your browser

### Language Selection Not Working

**Symptoms**: Script loads but doesn't click language button

**Solutions**:
1. **Check console logs**: Open browser console (F12) and look for error messages
2. **Verify page elements**: The language selection button might have changed
3. **Wait for page load**: Ensure the page is fully loaded before the script runs
4. **Check for page updates**: Lingvist might have updated their interface

### Script Runs Too Slowly

**Symptoms**: Script works but takes too long to execute

**Solutions**:
1. **Check network speed**: Slow internet can affect script performance
2. **Disable other extensions**: Other browser extensions might interfere
3. **Clear browser cache**: Cached resources might be causing delays
4. **Update script**: Ensure you have the latest version

### Language Not Found

**Symptoms**: Script reports "❌ 未找到目标语言"

**Solutions**:
1. **Check available languages**: Use "📋 查看当前设置" to see detected languages
2. **Verify language configuration**: Ensure your target language is in the LANGUAGE_OPTIONS
3. **Check language names**: Language names might have changed on Lingvist
4. **Try different language**: Test with a different language to isolate the issue

### Auto-Start Not Working

**Symptoms**: Language switches correctly but doesn't start learning

**Solutions**:
1. **Check auto-start setting**: Use "⚙️ 切换自动开始学习" to verify it's enabled
2. **Verify button text**: The "Start Learning" button text might have changed
3. **Check page state**: Ensure you're logged in and have access to the course
4. **Manual verification**: Try clicking the start button manually to ensure it works

## Debug Mode

The script includes detailed logging. To enable debug mode:

1. **Open browser console** (F12)
2. **Look for messages** starting with `[Lingvist-AutoLang]`
3. **Check the log sequence**:
   ```
   [Lingvist-AutoLang] 🚀 Lingvist 脚本已加载！
   [Lingvist-AutoLang] 📍 当前页面: https://learn.lingvist.com/#hub
   [Lingvist-AutoLang] 🌍 当前语言设置: 法语（用英语学）
   [Lingvist-AutoLang] ⚙️ 自动开始学习: 开启
   ```

## Browser-Specific Issues

### Chrome/Edge/Brave
- **Issue**: Script doesn't load after browser update
- **Solution**: Update Tampermonkey extension

### Firefox
- **Issue**: Console logs not showing
- **Solution**: Check if console logging is enabled in Firefox developer tools

### Safari
- **Issue**: Tampermonkey not working
- **Solution**: Ensure Tampermonkey extension is enabled in Safari preferences

## Advanced Troubleshooting

### Check Script Execution Context

1. **Open Tampermonkey dashboard**
2. **Click on the script name**
3. **Check "Last modified" and "Runs on" information**
4. **Verify @grant permissions are correct**

### Manual Script Testing

You can test parts of the script manually in the browser console:

```javascript
// Test if language button exists
document.querySelector('.course-select')

// Test if language list is available
document.querySelector('.courses-list')

// Test language detection
console.log(document.querySelector('.course-icon')?.getAttribute('data-value'))
```

### Reset Script Settings

If settings are corrupted:

1. **Open browser console**
2. **Run these commands**:
   ```javascript
   // Reset language selection
   GM_setValue('selectedLanguageKey', 'english_zh_cn')
   
   // Reset auto-start setting
   GM_setValue('autoClickStart', true)
   ```
3. **Refresh the page**

## Reporting Issues

When reporting issues, please include:

1. **Browser and version** (e.g., Chrome 120.0.6099.109)
2. **Tampermonkey version**
3. **Script version**
4. **Console error messages** (if any)
5. **Steps to reproduce** the issue
6. **Expected vs actual behavior**

### How to Report

1. **Visit GitHub Issues**: [Create new issue](https://github.com/username/lingvist-smart-language-selector/issues/new)
2. **Use the issue template** if available
3. **Provide detailed information** as listed above
4. **Add screenshots** if helpful

## Getting Help

- **GitHub Issues**: [Report bugs and request features](https://github.com/username/lingvist-smart-language-selector/issues)
- **Greasyfork Comments**: [Community discussion](https://greasyfork.org/en/scripts/546018-lingvist-%E6%99%BA%E8%83%BD%E8%AF%AD%E8%A8%80%E9%80%89%E6%8B%A9%E5%99%A8)
- **Documentation**: [Read the full documentation](../README.md)

## Known Limitations

1. **Single Page Application**: The script relies on DOM changes to detect navigation
2. **Language Detection**: Limited to predefined language configurations
3. **Site Updates**: Lingvist interface changes may break the script temporarily
4. **Browser Compatibility**: Primarily tested on Chrome/Firefox

## Version History

Check the [releases page](https://github.com/username/lingvist-smart-language-selector/releases) for:
- **Bug fixes** in recent versions
- **Known issues** with specific versions
- **Upgrade instructions** if needed
