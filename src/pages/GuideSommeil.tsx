import React from 'react';
import { submitSommeilLead } from '@/lib/services/sommeilLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitSommeilLead(p, e, l);

const GuideSommeil: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['sommeil']} submit={submit} />;

export default GuideSommeil;
