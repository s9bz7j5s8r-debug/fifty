# Animation Library Guide for Fifty Theme

## Overview

The Fifty theme now includes a comprehensive, high-quality animation library with 20+ pre-built animations optimized for performance and accessibility.

## Files Added

- **assets/animations.css** - All animation keyframes and utility classes
- **assets/animations.js** - JavaScript controller for advanced animations
- **ANIMATIONS-GUIDE.md** - This documentation file

## Quick Start

### 1. Include in Theme

Add to your theme's `<head>` or footer:

```liquid
{{ 'animations.css' | asset_url | stylesheet_tag }}
<script src="{{ 'animations.js' | asset_url }}" defer></script>
```

### 2. Basic CSS Animations

Use simple class names on any HTML element:

```html
<div class="animate-fade-in">Content fades in</div>
<div class="animate-slide-in-left">Content slides from left</div>
<div class="animate-scale-in">Content scales in</div>
```

## Available Animations

### Fade Animations
```html
<div class="animate-fade-in">Fade in</div>
<div class="animate-fade-in-up">Fade in from bottom</div>
<div class="animate-fade-in-down">Fade in from top</div>
<div class="animate-fade-in-left">Fade in from right</div>
<div class="animate-fade-in-right">Fade in from left</div>
```

### Slide Animations
```html
<div class="animate-slide-in-left">Slide in from left</div>
<div class="animate-slide-in-right">Slide in from right</div>
<div class="animate-slide-in-top">Slide in from top</div>
<div class="animate-slide-in-bottom">Slide in from bottom</div>
```

### Scale & Zoom Animations
```html
<div class="animate-scale-in">Scale in smoothly</div>
<div class="animate-zoom-in">Zoom in</div>
<div class="animate-bounce">Bouncy entrance</div>
```

### Special Effects
```html
<div class="animate-rotate">Continuous rotation</div>
<div class="animate-pulse">Pulsing opacity</div>
<div class="animate-glow">Glowing effect</div>
<div class="animate-shake">Shake effect</div>
<div class="animate-swing">Swinging motion</div>
<div class="animate-flip-x">Flip on X axis</div>
<div class="animate-flip-y">Flip on Y axis</div>
```

## Advanced Features

### Scroll-Triggered Animations

Elements animate when they come into view:

```html
<div data-animate="fade-in-up" data-animation-duration="0.8s">
  Animates when scrolled into view
</div>

<div data-animate="slide-in-left" data-animation-delay="0.2s">
  With delay
</div>
```

**Data Attributes:**
- `data-animate` - Animation type (without "animate-" prefix)
- `data-animation-duration` - How long animation takes (default: 0.6s)
- `data-animation-delay` - Delay before animation starts (default: 0s)

### Scroll-Based Animations

Animations that progress as you scroll:

```html
<div data-scroll-animate="fade">Opacity changes with scroll</div>
<div data-scroll-animate="scale">Scale changes with scroll</div>
<div data-scroll-animate="translate">Moves as you scroll</div>
```

### Parallax Effect

Create depth with parallax scrolling:

```html
<div data-parallax data-parallax-speed="0.5">
  Moves at 50% of scroll speed
</div>
```

**Common Speed Values:**
- `0.3` - Slow parallax
- `0.5` - Medium parallax
- `0.7` - Fast parallax

### Staggered List Animations

Animate multiple items with delay:

```html
<div data-stagger="0.1">
  <div data-stagger-item class="animate-fade-in">Item 1</div>
  <div data-stagger-item class="animate-fade-in">Item 2</div>
  <div data-stagger-item class="animate-fade-in">Item 3</div>
</div>
```

## Hover Effects

Built-in hover animations:

```html
<div class="hover-scale">Scales on hover</div>
<div class="hover-lift">Lifts on hover</div>
<div class="transition-smooth">Smooth transitions</div>
```

## JavaScript API

Use the global `animationController` object:

```javascript
// Trigger animation on demand
animationController.triggerManualAnimation('.my-element', 'fade-in', '0.6s');

// Animate elements on page load
animationController.animateOnLoad('.product-card', 500);

// Add hover animation
animationController.addHoverAnimation('.button', 'scale-in');

// Create animation sequence
animationController.createAnimationSequence([
  { selector: '.title', type: 'fade-in-up', duration: 600 },
  { selector: '.subtitle', type: 'fade-in-up', duration: 600 },
  { selector: '.image', type: 'scale-in', duration: 800 }
]);
```

## Performance Tips

1. **Use CSS animations** for simple, repeating effects - they're GPU accelerated
2. **Avoid animating large elements** - keep animations on smaller components
3. **Use `will-change` sparingly** - only for elements you're animating:
   ```css
   .animate-fade-in {
     will-change: opacity;
   }
   ```
4. **Test on mobile** - animations should be smooth at 60fps
5. **Respect `prefers-reduced-motion`** - Library includes accessibility support

## Accessibility

The library respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are reduced to nearly instant */
}
```

Users with `prefers-reduced-motion` enabled will see minimal or instant animations.

## Customization

### Adjust Animation Durations

Add to your CSS:

```css
.animate-fade-in {
  animation-duration: 1s; /* Custom duration */
}
```

### Change Animation Timing

Adjust easing:

```css
.animate-fade-in {
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### Create Custom Animations

Add your own keyframes:

```css
@keyframes myCustomAnimation {
  from {
    opacity: 0;
    transform: rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

.animate-custom {
  animation: myCustomAnimation 0.6s ease-out;
}
```

## Common Use Cases

### Product Grid
```html
<div data-stagger="0.15">
  {% for product in products %}
    <div data-stagger-item class="animate-fade-in-up">
      {% include 'product-card' %}
    </div>
  {% endfor %}
</div>
```

### Hero Section
```html
<section>
  <h1 class="animate-fade-in-down">Welcome</h1>
  <p class="animate-fade-in" style="animation-delay: 0.2s;">
    Subtitle
  </p>
  <img class="animate-scale-in" style="animation-delay: 0.4s;" src="..." />
</section>
```

### Scroll Animation
```html
<div data-animate="fade-in-up" data-animation-duration="1s">
  This animates when you scroll to it
</div>
```

### Hover Effect
```html
<button class="hover-scale transition-smooth">
  Hover me
</button>
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Mobile: All modern browsers supported

## Troubleshooting

**Animation not triggering?**
- Ensure `animations.js` is loaded
- Check browser console for errors
- Verify data attributes are spelled correctly

**Animation jittery?**
- Use `will-change` on parent container
- Reduce animation complexity
- Check for layout shifts

**Performance issues?**
- Reduce number of simultaneous animations
- Use `transform` and `opacity` instead of width/height
- Test with DevTools Performance tab

## Examples

See implementation examples in your Liquid templates by using:

```liquid
<!-- Product card with entrance animation -->
<article data-animate="fade-in-up">
  {{ product | featured_image }}
  <h3>{{ product.title }}</h3>
  <p class="price">{{ product.price | money }}</p>
</article>

<!-- Section with parallax -->
<section data-parallax data-parallax-speed="0.4">
  Background image moves slower than scroll
</section>

<!-- Staggered testimonials -->
<div data-stagger="0.2">
  {% for testimonial in testimonials %}
    <blockquote data-stagger-item class="animate-fade-in">
      {{ testimonial.text }}
    </blockquote>
  {% endfor %}
</div>
```

## Support

For issues or suggestions, refer to the animation controller documentation or check browser console for error messages.

---

**Last Updated:** 2026-05-22
**Animation Library Version:** 1.0
