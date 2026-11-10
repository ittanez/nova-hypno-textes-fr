import React from 'react';
import { submitAutohypnoseLead } from '@/lib/services/autohypnoseLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitAutohypnoseLead(p, e, l);

const GuideAutohypnose: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['autohypnose']} submit={submit} />;

export default GuideAutohypnose;
