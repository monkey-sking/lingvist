# Lingvist Smart Language Selector

## 🌟 Features

- 🎯 **Smart Language Switching**: Automatically selects specified language when entering https://learn.lingvist.com/#hub
- ⚙️ **Native Tampermonkey Settings**: Configure directly through Tampermonkey menu without UI interference
- 🚀 **Auto Start Learning**: Optional automatic clicking of "Start Learning" button
- 🌍 **Multi-language Support**: Supports 18 language combinations

## 🎯 How to Use

### 1. Install Script
Install the script to Tampermonkey

### 2. Configure Language
Click the Tampermonkey icon in your browser and select:
- **🌍 Select Language** - Choose the language to learn
- **⚙️ Toggle Auto Start Learning** - Enable/disable automatic "Start Learning" button clicking
- **📋 View Current Settings** - Check current configuration

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
1. Detect page load completion
2. Open language selection list
3. Find and click target language
4. Auto-click "Start Learning" (if enabled)

## ✨ Key Advantages

- **🔧 Native Integration**: Fully integrated into Tampermonkey menu system
- **🎨 No UI Interference**: No buttons or interface elements added to web pages
- **💾 Persistent Storage**: Settings auto-saved, persist after browser restart
- **🔄 Smart Route Listening**: Supports Single Page Application (SPA) route change detection
- **🛡️ Robust Click Mechanism**: Multiple click strategies ensure successful operation

## 🔧 Technical Features

- Single Page Application (SPA) route change detection
- Multiple DOM change monitoring mechanisms
- Smart element finding and clicking strategies
- Detailed debug logging output
- Anti-duplicate execution protection

## 📞 Feedback & Support

For issues or suggestions, please leave a comment.

---

**Note**: This script only runs on https://learn.lingvist.com domain and will not affect other websites.
