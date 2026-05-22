/**
 * High-Quality Animation Library
 * Provides scroll-triggered animations, smooth transitions, and advanced effects
 */

class AnimationController {
  constructor() {
    this.elements = [];
    this.intersectionObserver = null;
    this.resizeObserver = null;
    this.init();
  }

  /**
   * Initialize the animation controller
   */
  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupParallax();
    this.setupStagger();
  }

  /**
   * Setup Intersection Observer for scroll-triggered animations
   */
  setupIntersectionObserver() {
    const options = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
      rootMargin: '0px 0px -100px 0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target);
        }
      });
    }, options);

    // Observe all elements with animation data attributes
    document.querySelectorAll('[data-animate]').forEach(element => {
      this.intersectionObserver.observe(element);
    });
  }

  /**
   * Trigger animation on element
   */
  triggerAnimation(element) {
    const animationType = element.getAttribute('data-animate');
    const delay = element.getAttribute('data-animation-delay') || '0s';
    const duration = element.getAttribute('data-animation-duration') || '0.6s';

    if (animationType) {
      element.style.animationDelay = delay;
      element.style.animationDuration = duration;
      element.classList.add(`animate-${animationType}`);
      this.intersectionObserver?.unobserve(element);
    }
  }

  /**
   * Setup scroll-based animations
   */
  setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll-animate]');

    if (scrollElements.length === 0) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Update scroll-based animations
   */
  updateScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll-animate]');

    scrollElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const scrollPercent = 1 - (rect.top / (window.innerHeight + rect.height));

      if (scrollPercent >= 0 && scrollPercent <= 1) {
        const animationType = element.getAttribute('data-scroll-animate');

        switch (animationType) {
          case 'fade':
            element.style.opacity = Math.max(scrollPercent, 0);
            break;
          case 'scale':
            const scale = 0.9 + (scrollPercent * 0.1);
            element.style.transform = `scale(${scale})`;
            break;
          case 'translate':
            const translateY = (1 - scrollPercent) * 50;
            element.style.transform = `translateY(${translateY}px)`;
            break;
        }
      }
    });
  }

  /**
   * Setup parallax effect
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Update parallax elements
   */
  updateParallax() {
    const scrollY = window.scrollY;

    document.querySelectorAll('[data-parallax]').forEach(element => {
      const speed = element.getAttribute('data-parallax-speed') || 0.5;
      const yOffset = scrollY * speed;
      element.style.transform = `translateY(${yOffset}px)`;
    });
  }

  /**
   * Setup stagger animation for lists
   */
  setupStagger() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    staggerContainers.forEach(container => {
      const children = container.querySelectorAll('[data-stagger-item]');
      const staggerDelay = container.getAttribute('data-stagger') || '0.1';

      children.forEach((child, index) => {
        child.style.setProperty('--stagger-delay', `${index * parseFloat(staggerDelay)}s`);
        child.classList.add('stagger-delay-' + Math.ceil((index + 1) / 2));
      });
    });
  }

  /**
   * Trigger animation on demand
   */
  triggerManualAnimation(selector, animationType, duration = '0.6s') {
    const element = document.querySelector(selector);
    if (!element) return;

    element.style.animationDuration = duration;
    element.classList.add(`animate-${animationType}`);

    // Remove animation class after it completes
    setTimeout(() => {
      element.classList.remove(`animate-${animationType}`);
    }, parseFloat(duration) * 1000);
  }

  /**
   * Add fade-in animation to elements on page load
   */
  animateOnLoad(selector, delay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-fade-in');
      }, delay + (index * 100));
    });
  }

  /**
   * Create a timed animation sequence
   */
  createAnimationSequence(animations) {
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= animations.length) return;

      const animation = animations[currentIndex];
      const element = document.querySelector(animation.selector);

      if (element) {
        element.classList.add(`animate-${animation.type}`);
        setTimeout(() => {
          element.classList.remove(`animate-${animation.type}`);
          currentIndex++;
          playNext();
        }, animation.duration || 600);
      }
    };

    playNext();
  }

  /**
   * Add hover animation effect
   */
  addHoverAnimation(selector, animationType) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add(`animate-${animationType}`);
      });

      element.addEventListener('animationend', () => {
        element.classList.remove(`animate-${animationType}`);
      });
    });
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }
}

/**
 * Initialize animation controller when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
  });
} else {
  window.animationController = new AnimationController();
}

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}
