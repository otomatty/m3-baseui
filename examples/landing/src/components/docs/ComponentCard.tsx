import { ComponentPreview } from './ComponentPreview';

interface ComponentCardProps {
  href: string;
  title: string;
  description?: string;
  slug: string;
}

export function ComponentCard({ href, title, description, slug }: ComponentCardProps) {
  return (
    <a href={href} className="doc-card">
      <ComponentPreview slug={slug} />
      <div className="doc-card__body-wrap">
        <p className="doc-card__title">{title}</p>
        {description ? <p className="doc-card__body">{description}</p> : null}
      </div>
    </a>
  );
}
