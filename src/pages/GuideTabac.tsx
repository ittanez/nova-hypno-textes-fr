import React from 'react';
import { submitTabacLead } from '@/lib/services/tabacLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitTabacLead(p, e, l);

const GuideTabac: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['tabac']} submit={submit} />;

export default GuideTabac;
