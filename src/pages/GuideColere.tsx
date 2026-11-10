import React from 'react';
import { submitColereLead } from '@/lib/services/colereLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitColereLead(p, e, l);

const GuideColere: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['colere']} submit={submit} />;

export default GuideColere;
