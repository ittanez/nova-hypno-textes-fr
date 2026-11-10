/**
 * Bloc « Décryptage » des pages merci des guides : la question 1 du tunnel,
 * posée juste après le téléchargement. Un clic ouvre /decryptage à la
 * question 2 ; la source (guide) est enregistrée avec la réponse.
 */
import DecryptageEncart from '@/components/blog/DecryptageEncart';

interface GuideDecryptageBlocProps {
  guide: string;
}

const GuideDecryptageBloc = ({ guide }: GuideDecryptageBlocProps) => (
  <section style={{ padding: '0 16px 48px' }}>
    <DecryptageEncart guide={guide} />
  </section>
);

export default GuideDecryptageBloc;
