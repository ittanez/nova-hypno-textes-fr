import React from 'react';
import { submitCarriereLead } from '@/lib/services/carriereLeadService';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

/* Page de téléchargement du guide : gabarit commun (GuideLanding), contenu dans src/data/guideLandings.tsx. */
const submit = (p, e, l) => submitCarriereLead(p, e, l);

const GuideCarriere: React.FC = () => <GuideLanding config={GUIDE_LANDINGS['carriere']} submit={submit} />;

export default GuideCarriere;
