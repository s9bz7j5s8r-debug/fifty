# Manual Push Instructions

The workspace network is restricted and cannot reach GitHub. Follow these steps on YOUR machine to push the animations:

## Quick Steps:

1. **Navigate to your repo** (on your computer):
   ```bash
   cd /Users/rossswanson/Documents/GitHub/fifty-recovered
   ```

2. **Pull the latest changes**:
   ```bash
   git pull origin main
   ```

3. **Push the commit**:
   ```bash
   git push origin main
   ```

## What's being pushed:

- **sections/hero.liquid** - Updated with scroll-triggered animations
  - Hero blocks fade up with staggered timing
  - Hero media animates in on load
  - Full accessibility support
  
- **fifty-logo.svg** - Your minimalist logo

## After pushing:

Shopify will automatically sync within 1-2 minutes. Your hero section will then show the animations on your live site.

## If it still doesn't work:

Make sure you have:
- Git installed (`git --version`)
- Network access to GitHub
- Your GitHub credentials configured

Then run the push commands above.
