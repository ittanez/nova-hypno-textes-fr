import React from 'react';
import { submitGuideLead } from '@/lib/services/guideLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e) => submitGuideLead(p, e);

const GuideEbook: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['emotions-travail']} submit={submit} />;

export default GuideEbook;
