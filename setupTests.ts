/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'

// jsdom doesn't implement these browser APIs. next-themes/motion/Radix
// touch them even when the feature they gate isn't actually exercised by a
// given test, so stub them globally rather than per-test.
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
  }

  if (!('IntersectionObserver' in window)) {
    class MockIntersectionObserver {
      root = null
      rootMargin = ''
      thresholds: ReadonlyArray<number> = []
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    // @ts-expect-error jsdom has no IntersectionObserver implementation
    window.IntersectionObserver = MockIntersectionObserver
    global.IntersectionObserver = MockIntersectionObserver
  }

  if (!('ResizeObserver' in window)) {
    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error jsdom has no ResizeObserver implementation
    window.ResizeObserver = MockResizeObserver
    global.ResizeObserver = MockResizeObserver
  }
}
