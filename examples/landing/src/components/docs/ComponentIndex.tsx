import { COMPONENT_GROUPS } from '../../config/docs-nav';
import { COMPONENT_DOCS } from '../../data/components';
import { ComponentCard } from './ComponentCard';

export function ComponentIndex() {
  return (
    <>
      {COMPONENT_GROUPS.map((group) => (
        <section key={group.title} className="doc-section">
          <h2>{group.title}</h2>
          <div className="doc-card-grid">
            {group.items.map((item) => {
              const slug = item.href.replace('/docs/components/', '');
              const doc = COMPONENT_DOCS.find((d) => d.slug === slug);
              return (
                <ComponentCard
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  description={doc?.description}
                  slug={slug}
                />
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
