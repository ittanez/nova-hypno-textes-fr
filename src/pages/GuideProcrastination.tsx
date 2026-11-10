import React from 'react';
import { submitProcrastinationLead } from '@/lib/services/procrastinationLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitProcrastinationLead(p, e, l);

const GuideProcrastination: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['procrastination']} submit={submit} />;

export default GuideProcrastination;
