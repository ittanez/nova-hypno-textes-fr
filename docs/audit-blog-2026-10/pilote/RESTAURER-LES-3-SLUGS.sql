-- Le changement de titre des 3 articles pilotes a fait recalculer leur slug par un
-- déclencheur de la base (le script de mise à jour ne touchait pas au slug).
-- Décision d'Alain : les slugs ne changent pas. On remet les anciens, articles ciblés par id.
-- Les déclencheurs de la table sont désactivés le temps de la correction, sinon le slug
-- serait recalculé à nouveau.
--
-- À coller en entier dans Supabase > SQL Editor > Run (projet NovaZen).

begin;

alter table public.articles disable trigger user;

update public.articles set slug = 'hypnose-peur-avion-solution-efficace-3-seances'
where id = 'efeedb19-d7c0-4cd9-980e-ba59d74676a7'
  and slug = 'peur-de-lavion-comment-lhypnose-peut-aider-a-voyager-plus-sereinement';

update public.articles set slug = 'pourquoi-regimes-echouent-hypnose-reussit'
where id = '62ca790c-fb3f-434d-9cdd-8c5e0028a071'
  and slug = 'regimes-qui-echouent-ce-que-lhypnose-peut-et-ne-peut-pas-changer';

update public.articles set slug = 'suisje-hypnotisable-la-question-que-tous-mes-clients-me-posent-et-la-reponse-va-vous-surprendre'
where id = 'd2d64373-f910-4186-a7b2-9dec418a235c'
  and slug = 'suisje-hypnotisable-ce-que-lon-sait-vraiment';

alter table public.articles enable trigger user;

-- Vérification : doit afficher les 3 anciens slugs avec les nouveaux titres
select slug, title from public.articles
where id in ('efeedb19-d7c0-4cd9-980e-ba59d74676a7',
             '62ca790c-fb3f-434d-9cdd-8c5e0028a071',
             'd2d64373-f910-4186-a7b2-9dec418a235c');

commit;

-- Pour information : liste les déclencheurs de la table articles
-- (celui qui recalcule le slug devra être évité pour les prochains lots)
select tgname, pg_get_triggerdef(oid) from pg_trigger
where tgrelid = 'public.articles'::regclass and not tgisinternal;
