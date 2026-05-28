import React from 'react';

interface AuditPageProps {
  params: {
    slug: string;
  };
}

export default function AuditPage({ params }: AuditPageProps) {
  return (
    <main>
      <h1>Shared Audit</h1>
      <p>Audit slug: {params.slug}</p>
      <p>This page will render the shareable audit report.</p>
    </main>
  );
}
