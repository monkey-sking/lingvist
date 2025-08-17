# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-17

### Added
- 🎯 **Smart Language Switching**: Automatically selects specified language when entering Lingvist hub
- ⚙️ **Tampermonkey Native Settings**: Configure through Tampermonkey menu without UI interference
- 🚀 **Auto Start Learning**: Optional automatic clicking of "Start Learning" button
- 🌍 **Multi-language Support**: Support for 18 language combinations
- 🔍 **Current Language Detection**: Detects current page language and skips switching if already correct
- ⚡ **Speed Optimizations**: Reduced wait times and simplified click logic
- 🔄 **SPA Route Detection**: Smart detection of Single Page Application route changes
- 🛡️ **Robust Click Mechanism**: Multiple click strategies ensure successful operation
- 📝 **Detailed Logging**: Comprehensive debug logging for troubleshooting
- 💾 **Persistent Settings**: Settings auto-saved and persist after browser restart

### Technical Features
- Single Page Application (SPA) route change detection using multiple methods:
  - MutationObserver for DOM changes
  - History API monitoring (pushState/replaceState)
  - Browser navigation events (popstate/hashchange)
- Smart element finding with fallback selectors
- Current language detection via icon data attributes
- Anti-duplicate execution protection
- Optimized timing for faster execution

### Supported Languages
1. English (learn with Simplified Chinese)
2. French (learn with Simplified Chinese)
3. Japanese (learn with Simplified Chinese)
4. Korean (learn with Simplified Chinese)
5. French (learn with Traditional Chinese)
6. French (learn with English)
7. Spanish (Europe) (learn with English)
8. Spanish (Latin America) (learn with English)
9. German
10. Italian
11. Russian
12. Portuguese (Brazil)
13. Dutch
14. Swedish
15. Norwegian
16. Danish
17. Polish
18. Estonian

### Menu Commands
- 🌍 **Select Language**: Choose target language from numbered list
- ⚙️ **Toggle Auto Start Learning**: Enable/disable automatic "Start Learning" button clicking
- 📋 **View Current Settings**: Display current configuration and language detection status

### Performance Optimizations
- Reduced initial wait time: 2000ms → 500ms
- Faster button finding: 10 retries → 5 retries with 300ms intervals
- Simplified click strategy: Direct click first, fallback to simulation
- Reduced post-click wait times: 2000ms → 800ms
- Optimized language item clicking: 150ms → 100ms verification delay

### Browser Compatibility
- ✅ Chrome/Chromium-based browsers
- ✅ Firefox
- ✅ Safari (with Tampermonkey)
- ✅ Edge

### Security & Privacy
- No data collection or external requests
- Runs only on learn.lingvist.com domain
- Uses only necessary Tampermonkey permissions:
  - `GM_setValue`/`GM_getValue` for settings storage
  - `GM_registerMenuCommand` for menu integration

## [Unreleased]

### Planned Features
- [ ] Custom language configuration support
- [ ] Keyboard shortcuts for quick language switching
- [ ] Export/import settings functionality
- [ ] Multiple target languages with priority order
- [ ] Integration with Lingvist's new features

### Known Issues
- Language detection may fail if Lingvist updates their interface
- Script timing may need adjustment for very slow connections
- Some language combinations might not be available in all regions

---

## Release Notes Template

### [Version] - YYYY-MM-DD

#### Added
- New features

#### Changed
- Changes in existing functionality

#### Deprecated
- Soon-to-be removed features

#### Removed
- Now removed features

#### Fixed
- Bug fixes

#### Security
- Security improvements
