# Lingvist Smart Language Selector

<!-- badges:start -->
[![License](https://img.shields.io/github/license/monkey-sking/lingvist?style=flat-square)](https://github.com/monkey-sking/lingvist/blob/main/LICENSE) [![Last commit](https://img.shields.io/github/last-commit/monkey-sking/lingvist?style=flat-square)](https://github.com/monkey-sking/lingvist/commits/main) [![JavaScript](https://img.shields.io/github/languages/top/monkey-sking/lingvist?style=flat-square)](https://github.com/monkey-sking/lingvist/search?l=JavaScript) [![views](https://hits.sh/github.com/monkey-sking/lingvist.svg?style=flat-square&label=views&color=0e75b6)](https://github.com/monkey-sking/lingvist) [![Stars](https://img.shields.io/github/stars/monkey-sking/lingvist?style=flat-square)](https://github.com/monkey-sking/lingvist/stargazers) [![Forks](https://img.shields.io/github/forks/monkey-sking/lingvist?style=flat-square)](https://github.com/monkey-sking/lingvist/network/members)
<!-- badges:end -->

[中文](README_CN.md) | **English**

A Tampermonkey userscript that automatically selects your preferred language and starts learning on Lingvist platform.

## 🌟 Features

- 🎯 **Smart Language Switching**: Automatically selects specified language when entering https://learn.lingvist.com/#hub
- ⚙️ **Native Tampermonkey Settings**: Configure directly through Tampermonkey menu without UI interference
- 🚀 **Auto Start Learning**: Optional automatic clicking of "Start Learning" button
- 🌍 **Multi-language Support**: Supports 18 language combinations
- 🔍 **Current Language Detection**: Detects current page language and skips switching if already correct
- ⚡ **Fast Execution**: Optimized for speed, faster than manual clicking

## 🎯 How to Use

### 1. Install Script
- Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
- Click [here](https://greasyfork.org/en/scripts/546018-lingvist-%E6%99%BA%E8%83%BD%E8%AF%AD%E8%A8%80%E9%80%89%E6%8B%A9%E5%99%A8) to install the script

### 2. Configure Language
Click the Tampermonkey icon in your browser and select:
- **🌍 Select Language** - Choose the language to learn
- **⚙️ Toggle Auto Start Learning** - Enable/disable automatic "Start Learning" button clicking
- **📋 View Current Settings** - Check current configuration and page language detection

### 3. Language Selection
Enter the corresponding number in the "Select Language" dialog:

```
1.  English (learn with Simplified Chinese)
2.  French (learn with Simplified Chinese)
3.  Japanese (learn with Simplified Chinese)
4.  Korean (learn with Simplified Chinese)
5.  French (learn with Traditional Chinese)
6.  French (learn with English)
7.  Spanish (Europe) (learn with English)
8.  Spanish (Latin America) (learn with English)
9.  German
10. Italian
11. Russian
12. Portuguese (Brazil)
13. Dutch
14. Swedish
15. Norwegian
16. Danish
17. Polish
18. Estonian
```

### 4. Auto Execution
When visiting https://learn.lingvist.com/#hub, the script will automatically:
1. Detect if current language matches target language
2. Skip switching if already correct, or open language selection list
3. Find and click target language
4. Auto-click "Start Learning" (if enabled)

## ✨ Key Advantages

- **🔧 Native Integration**: Fully integrated into Tampermonkey menu system
- **🎨 No UI Interference**: No buttons or interface elements added to web pages
- **💾 Persistent Storage**: Settings auto-saved, persist after browser restart
- **🔄 Smart Route Listening**: Supports Single Page Application (SPA) route change detection
- **🛡️ Robust Click Mechanism**: Multiple click strategies ensure successful operation
- **⚡ Speed Optimized**: Reduced wait times and simplified click logic

## 🔧 Technical Features

- Single Page Application (SPA) route change detection
- Multiple DOM change monitoring mechanisms
- Smart element finding and clicking strategies
- Current language detection and matching
- Detailed debug logging output
- Anti-duplicate execution protection

## 📁 Project Structure

```
lingvist-smart-language-selector/
├── README.md                           # English documentation
├── README_CN.md                        # Chinese documentation
├── lingvist-smart-selector.user.js     # Main userscript file
├── docs/                               # Documentation
│   ├── installation.md                 # Installation guide
│   └── troubleshooting.md              # Troubleshooting guide
└── .github/
    └── workflows/
        └── release.yml                  # GitHub Actions for releases
```

## 🚀 Installation

### Method 1: From Greasyfork (Recommended)
1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Visit [Greasyfork page](https://greasyfork.org/en/scripts/546018-lingvist-%E6%99%BA%E8%83%BD%E8%AF%AD%E8%A8%80%E9%80%89%E6%8B%A9%E5%99%A8)
3. Click "Install this script"

### Method 2: Manual Installation
1. Download `lingvist-smart-selector.user.js`
2. Open Tampermonkey dashboard
3. Click "Create a new script"
4. Replace content with downloaded file
5. Save (Ctrl+S)

## 🐛 Troubleshooting

If the script doesn't work:
1. Check if you're on the correct page: https://learn.lingvist.com/#hub
2. Open browser console (F12) and look for `[Lingvist-AutoLang]` logs
3. Try refreshing the page
4. Check Tampermonkey settings to ensure script is enabled

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- Create an [Issue](https://github.com/username/lingvist-smart-language-selector/issues) for bug reports
- Leave feedback on [Greasyfork](https://greasyfork.org/en/scripts/546018-lingvist-%E6%99%BA%E8%83%BD%E8%AF%AD%E8%A8%80%E9%80%89%E6%8B%A9%E5%99%A8)
- Star ⭐ this repository if you find it helpful!

---

**Note**: This script only runs on https://learn.lingvist.com domain and will not affect other websites.
