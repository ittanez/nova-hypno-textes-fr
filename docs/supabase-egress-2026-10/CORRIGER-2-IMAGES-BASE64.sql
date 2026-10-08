-- Deux articles ont leur image enregistrée en base64 directement dans image_url (294 Ko et 216 Ko).
-- Chaque requête qui liste les articles transporte ces ~510 Ko.
-- Les mêmes images existent déjà en fichiers sur le Storage (colonne storage_image_url, vérifié le 2026-10-08) :
-- on fait pointer image_url vers ces fichiers, que le site sert ensuite via ImageKit.
--
-- À coller en entier dans Supabase > SQL Editor > Run (projet NovaZen).
-- Sauvegarde existante : table articles_backup_20261007.

begin;

update articles
set image_url = storage_image_url
where image_url like 'data:%'
  and storage_image_url like 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/%'
  and slug in (
    'hypnose-votre-alliee-secrete-pour-reussir-examens-et-competitions-techniques-de-preparation-mentale-qui-changent-tout',
    'la-cartographie-de-ses-moi-paralleles-explorer-les-versions-alternatives-de-soi-pour-debloquer-son-potentiel'
  );

-- Vérification : doit renvoyer 0
select count(*) as images_base64_restantes from articles where image_url like 'data:%';

commit;
