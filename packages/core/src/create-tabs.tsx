'use client';
/**
 * create-tabs.tsx — headless M3 Tabs parts.
 *
 * Base UI Tabs composition exposed as a namespace. Because the M3 `variant`
 * (primary/secondary) lives on Root but affects List/Tab/Indicator, Root
 * resolves the variant's slot classes once and shares them with the parts via
 * context. Tabs carry a ripple + state layer.
 */
import * as React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import type { TabsClassResolver, TabsSlotClasses, TabsVariant } from './tabs.contract';
import { mergeClassName } from './slot';
import { Ripple } from './ripple/Ripple';

const TabsClassContext = React.createContext<TabsSlotClasses | null>(null);

function useTabsClasses(): TabsSlotClasses {
  const ctx = React.useContext(TabsClassContext);
  if (!ctx) throw new Error('Tabs parts must be used within <Tabs.Root>.');
  return ctx;
}

type RootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  /** M3 tabs style. @default 'primary' */
  variant?: TabsVariant;
};
type ListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  /** Enable horizontal scrolling when the tabs overflow (M3 scrollable tabs). */
  scrollable?: boolean;
};
type TabProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tab> & {
  /** Leading/above icon (24dp). On primary tabs it stacks above the label. */
  icon?: React.ReactNode;
};
type IndicatorProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Indicator>;
type PanelProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Panel>;

export function createTabs(resolve: TabsClassResolver) {
  const Root = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, RootProps>(
    function Root({ variant = 'primary', className, ...props }, ref) {
      const classes = React.useMemo(() => resolve(variant), [variant]);
      return (
        <TabsClassContext.Provider value={classes}>
          <TabsPrimitive.Root
            ref={ref}
            className={mergeClassName(classes.root, className)}
            {...props}
          />
        </TabsClassContext.Provider>
      );
    },
  );
  Root.displayName = 'M3Tabs.Root';

  const List = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, ListProps>(
    function List({ className, scrollable, ...props }, ref) {
      const classes = useTabsClasses();
      const marker: { [key: `data-${string}`]: string } = {};
      if (scrollable) marker['data-scrollable'] = '';
      return (
        <TabsPrimitive.List
          ref={ref}
          className={mergeClassName(classes.list, className)}
          {...marker}
          {...props}
        />
      );
    },
  );
  List.displayName = 'M3Tabs.List';

  const Tab = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Tab>, TabProps>(function Tab(
    { className, children, icon, ...props },
    ref,
  ) {
    const classes = useTabsClasses();
    const marker: { [key: `data-${string}`]: string } = {};
    if (icon != null) marker['data-with-icon'] = '';
    return (
      <TabsPrimitive.Tab
        ref={ref}
        className={mergeClassName(classes.tab, className)}
        {...marker}
        {...props}
      >
        {icon != null ? (
          <span data-slot="tab-icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children}
        <Ripple />
      </TabsPrimitive.Tab>
    );
  });
  Tab.displayName = 'M3Tabs.Tab';

  const Indicator = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Indicator>,
    IndicatorProps
  >(function Indicator({ className, ...props }, ref) {
    const classes = useTabsClasses();
    return (
      <TabsPrimitive.Indicator
        ref={ref}
        className={mergeClassName(classes.indicator, className)}
        {...props}
      />
    );
  });
  Indicator.displayName = 'M3Tabs.Indicator';

  const Panel = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Panel>, PanelProps>(
    function Panel({ className, ...props }, ref) {
      const classes = useTabsClasses();
      return (
        <TabsPrimitive.Panel
          ref={ref}
          className={mergeClassName(classes.panel, className)}
          {...props}
        />
      );
    },
  );
  Panel.displayName = 'M3Tabs.Panel';

  return { Root, List, Tab, Indicator, Panel };
}
