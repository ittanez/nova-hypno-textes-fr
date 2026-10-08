-- Rend trigger_auto_slug plus prudent : le slug (l'URL de l'article) n'est généré que s'il est vide.
-- Changer le titre d'un article existant ne change plus son adresse (bon pour le SEO : les URL indexées par
-- Google restent valables). Un nouvel article sans slug en reçoit toujours un, avec le même algorithme qu'avant.
--
-- Conséquence : si vous voulez VOLONTAIREMENT changer l'URL d'un article, modifiez le champ slug directement.
--
-- À coller en entier dans Supabase > SQL Editor > Run (projet NovaZen). À faire une seule fois.

create or replace function public.auto_generate_slug()
returns trigger
language plpgsql
as $function$
declare
  base_slug text;
  final_slug text;
  counter integer := 1;
begin
  -- Générer un slug seulement s'il est vide (nouvel article, ou slug effacé volontairement)
  if new.slug is null or btrim(new.slug) = '' then
    base_slug := generate_clean_slug(new.title);
    final_slug := base_slug;

    -- Vérifier l'unicité et ajouter un suffixe numérique si nécessaire
    while exists (
      select 1 from articles
      where slug = final_slug
      and id is distinct from new.id
    ) loop
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    end loop;

    new.slug := final_slug;
  end if;

  return new;
end;
$function$;

-- Vérification : doit afficher la nouvelle définition (avec « btrim(new.slug) = '' »)
select pg_get_functiondef(p.oid) like '%btrim(new.slug)%' as trigger_corrige
from pg_trigger t join pg_proc p on p.oid = t.tgfoid
where t.tgname = 'trigger_auto_slug';
