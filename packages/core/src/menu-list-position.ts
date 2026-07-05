/**
 * menu-list-position.ts — M3 menu list item position (first / middle / last / only).
 *
 * Used by Select and Menu selectable rows so selected-container corner radii match
 * MenuDefaults.itemShape (issue #98). Scroll arrows and non-item siblings are
 * skipped when counting.
 */
import * as React from 'react';

export type MenuListItemPosition = 'only' | 'first' | 'middle' | 'last';

/** Map a zero-based index + total count to the M3 segmented-menu position token. */
export function getMenuListItemPosition(index: number, count: number): MenuListItemPosition {
  if (count <= 1) return 'only';
  if (index === 0) return 'first';
  if (index === count - 1) return 'last';
  return 'middle';
}

function collectPositionableItems(
  children: React.ReactNode,
  isPositionableItem: (child: React.ReactElement) => boolean,
): React.ReactElement[] {
  const items: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (isPositionableItem(child)) {
      items.push(child);
      return;
    }
    if (child.props && typeof child.props === 'object' && 'children' in child.props) {
      items.push(
        ...collectPositionableItems(
          child.props.children as React.ReactNode,
          isPositionableItem,
        ),
      );
    }
  });
  return items;
}

function assignPositions(
  children: React.ReactNode,
  isPositionableItem: (child: React.ReactElement) => boolean,
  count: number,
  indexRef: { current: number },
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (isPositionableItem(child)) {
      const position = getMenuListItemPosition(indexRef.current, count);
      indexRef.current += 1;
      return React.cloneElement(child, { 'data-position': position } as Record<string, string>);
    }
    if (child.props && typeof child.props === 'object' && 'children' in child.props) {
      return React.cloneElement(
        child,
        {},
        assignPositions(
          child.props.children as React.ReactNode,
          isPositionableItem,
          count,
          indexRef,
        ),
      );
    }
    return child;
  });
}

/**
 * Walk popup children (including nested Groups) and stamp `data-position` on each
 * row matched by `isPositionableItem`. Non-matching siblings (ScrollArrows, etc.)
 * are left untouched.
 */
export function assignListItemPositions(
  children: React.ReactNode,
  isPositionableItem: (child: React.ReactElement) => boolean,
): React.ReactNode {
  const count = collectPositionableItems(children, isPositionableItem).length;
  if (count === 0) return children;
  return assignPositions(children, isPositionableItem, count, { current: 0 });
}
