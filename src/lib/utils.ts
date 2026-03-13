export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getElementCenter(rect: DOMRect): {
  x: number;
  y: number;
} {
  const { x, y, width, height } = rect;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return { x: centerX, y: centerY };
}

export function getElementBoundingInParent(
  rect: DOMRect,
  parentRect: DOMRect
): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const centerX = rect.x - parentRect.x + rect.width / 2;
  const centerY = rect.y - parentRect.y + rect.height / 2;

  return {
    x: centerX,
    y: centerY,
    width: rect.width,
    height: rect.height,
  };
}
