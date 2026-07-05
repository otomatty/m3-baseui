/**
 * menu-list-position.ts — M3 menu list item position (first / middle / last / only).
 *
 * Used by Select and Menu selectable rows so selected-container corner radii match
 * MenuDefaults.itemShape (issue #98). Scroll arrows and non-item siblings are
 * skipped when counting.
 */
import * as React from 'react';

export type MenuListItemPosition = 'only' | 'first' | 'middle' | 'last';

export interface AssignListItemPositionsOptions {
  /** Only descend into explicit list containers (Group / RadioGroup), not submenus. */
  shouldRecurseInto?: (child: React.ReactElement) => boolean;
}

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
  shouldRecurseInto?: (child: React.ReactElement) => boolean,
): React.ReactElement[] {
  const items: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (isPositionableItem(child)) {
      items.push(child);
      return;
    }
    if (
      shouldRecurseInto?.(child) &&
      child.props &&
      typeof child.props === 'object' &&
      'children' in child.props
    ) {
      items.push(
        ...collectPositionableItems(
          child.props.children as React.ReactNode,
          isPositionableItem,
          shouldRecurseInto,
        ),
      );
    }
  });
  return items;
}

function assignPositions(
  children: React.ReactNode,
  isPositionableItem: (child: React.ReactElement) => boolean,
  shouldRecurseInto: ((child: React.ReactElement) => boolean) | undefined,
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
    if (
      shouldRecurseInto?.(child) &&
      child.props &&
      typeof child.props === 'object' &&
      'children' in child.props
    ) {
      return React.cloneElement(
        child,
        {},
        assignPositions(
          child.props.children as React.ReactNode,
          isPositionableItem,
          shouldRecurseInto,
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
  options?: AssignListItemPositionsOptions,
): React.ReactNode {
  const shouldRecurseInto = options?.shouldRecurseInto;
  const count = collectPositionableItems(children, isPositionableItem, shouldRecurseInto).length;
  if (count === 0) return children;
  return assignPositions(children, isPositionableItem, shouldRecurseInto, count, { current: 0 });
}
