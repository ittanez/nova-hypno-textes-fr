import React, { useEffect, useRef } from 'react';

/**
 * Illustration animée du hero des pages spécialités — la même signature visuelle
 * que les landing pages Google Ads (public/*-hypnose-paris.html), pour qu'un
 * visiteur arrivant d'une annonce retrouve le même univers sur le site.
 *
 * Une métaphore par thème, jamais littérale : la marée pour le sommeil, l'arbre
 * ancré pour la confiance, la spirale pour l'anxiété, le lien qui demeure pour
 * le deuil, la boucle qui s'ouvre pour les blocages…
 *
 * Tout le mouvement est en CSS (src/styles/charte-secondary.css, section
 * « ILLUSTRATION ANIMÉE DU HERO ») : tracé à l'entrée, une seule boucle lente,
 * transform / opacité / offset-distance uniquement, mouvement réduit respecté.
 * Le composant ne fait que mesurer la longueur réelle des tracés, qui pilote
 * l'animation de dessin via la variable --len.
 */
export type HeroArtTheme =
  | 'sommeil'
  | 'avion'
  | 'confiance'
  | 'parole'
  | 'compulsions'
  | 'stress'
  | 'emotions'
  | 'deuil'
  | 'traumatismes'
  | 'blocages'
  | 'phobies'
  | 'tabac';

const ART: Record<HeroArtTheme, React.ReactNode> = {
  sommeil: (
    <>
      <defs><path id="m-sommeil" d="M7.5 165.2 A235.0 235.0 0 0 1 392.5 165.2" /></defs>
      <g className="art-scroll">
        <g className="art-drift">
          <circle className="art-halo art-lune-halo" cx="292" cy="112" r="22" />
          <circle className="art-core" cx="292" cy="112" r="9" style={{ '--dd': '.6s' } as React.CSSProperties} />
        </g>
        <circle className="art-core art-etoile" cx="96" cy="88" r="1.8" style={{ '--dd': '1.4s', '--o': '.7' } as React.CSSProperties} />
        <circle className="art-core art-etoile" cx="150" cy="136" r="1.4" style={{ '--dd': '1.8s', '--o': '.5' } as React.CSSProperties} />
        <circle className="art-core art-etoile" cx="352" cy="170" r="1.6" style={{ '--dd': '2.1s', '--o': '.6' } as React.CSSProperties} />
        <g className="art-vague art-vague-1"><path className="art-line" data-draw d="M-40.0 202.1 L-36.0 202.0 L-32.0 202.3 L-28.0 203.0 L-24.0 204.0 L-20.0 205.3 L-16.0 206.9 L-12.0 208.7 L-8.0 210.7 L-4.0 212.8 L0.0 215.0 L4.0 217.2 L8.0 219.3 L12.0 221.3 L16.0 223.1 L20.0 224.7 L24.0 226.0 L28.0 227.0 L32.0 227.7 L36.0 228.0 L40.0 227.9 L44.0 227.5 L48.0 226.8 L52.0 225.7 L56.0 224.3 L60.0 222.6 L64.0 220.8 L68.0 218.8 L72.0 216.6 L76.0 214.5 L80.0 212.3 L84.0 210.2 L88.0 208.3 L92.0 206.5 L96.0 205.0 L100.0 203.7 L104.0 202.8 L108.0 202.2 L112.0 202.0 L116.0 202.1 L120.0 202.6 L124.0 203.5 L128.0 204.6 L132.0 206.1 L136.0 207.8 L140.0 209.7 L144.0 211.8 L148.0 213.9 L152.0 216.1 L156.0 218.2 L160.0 220.3 L164.0 222.2 L168.0 223.9 L172.0 225.4 L176.0 226.5 L180.0 227.4 L184.0 227.9 L188.0 228.0 L192.0 227.8 L196.0 227.2 L200.0 226.3 L204.0 225.0 L208.0 223.5 L212.0 221.7 L216.0 219.8 L220.0 217.7 L224.0 215.5 L228.0 213.4 L232.0 211.2 L236.0 209.2 L240.0 207.4 L244.0 205.7 L248.0 204.3 L252.0 203.2 L256.0 202.5 L260.0 202.1 L264.0 202.0 L268.0 202.3 L272.0 203.0 L276.0 204.0 L280.0 205.3 L284.0 206.9 L288.0 208.7 L292.0 210.7 L296.0 212.8 L300.0 215.0 L304.0 217.2 L308.0 219.3 L312.0 221.3 L316.0 223.1 L320.0 224.7 L324.0 226.0 L328.0 227.0 L332.0 227.7 L336.0 228.0 L340.0 227.9 L344.0 227.5 L348.0 226.8 L352.0 225.7 L356.0 224.3 L360.0 222.6 L364.0 220.8 L368.0 218.8 L372.0 216.6 L376.0 214.5 L380.0 212.3 L384.0 210.2 L388.0 208.3 L392.0 206.5 L396.0 205.0 L400.0 203.7 L404.0 202.8 L408.0 202.2 L412.0 202.0 L416.0 202.1 L420.0 202.6 L424.0 203.5 L428.0 204.6 L432.0 206.1 L436.0 207.8 L440.0 209.7" style={{ '--dd': '.15s' } as React.CSSProperties} /></g>
        <g className="art-vague art-vague-2"><path className="art-line" data-draw d="M-40.0 255.5 L-36.0 257.3 L-32.0 259.3 L-28.0 261.4 L-24.0 263.5 L-20.0 265.6 L-16.0 267.5 L-12.0 269.3 L-8.0 270.7 L-4.0 271.8 L0.0 272.6 L4.0 273.0 L8.0 272.9 L12.0 272.5 L16.0 271.6 L20.0 270.4 L24.0 268.9 L28.0 267.2 L32.0 265.2 L36.0 263.1 L40.0 261.0 L44.0 258.9 L48.0 256.9 L52.0 255.2 L56.0 253.6 L60.0 252.4 L64.0 251.6 L68.0 251.1 L72.0 251.0 L76.0 251.4 L80.0 252.1 L84.0 253.2 L88.0 254.7 L92.0 256.4 L96.0 258.3 L100.0 260.4 L104.0 262.5 L108.0 264.6 L112.0 266.6 L116.0 268.4 L120.0 270.0 L124.0 271.3 L128.0 272.3 L132.0 272.8 L136.0 273.0 L140.0 272.8 L144.0 272.1 L148.0 271.1 L152.0 269.7 L156.0 268.1 L160.0 266.2 L164.0 264.2 L168.0 262.1 L172.0 259.9 L176.0 257.9 L180.0 256.0 L184.0 254.4 L188.0 253.0 L192.0 251.9 L196.0 251.3 L200.0 251.0 L204.0 251.1 L208.0 251.7 L212.0 252.6 L216.0 253.9 L220.0 255.5 L224.0 257.3 L228.0 259.3 L232.0 261.4 L236.0 263.5 L240.0 265.6 L244.0 267.5 L248.0 269.3 L252.0 270.7 L256.0 271.8 L260.0 272.6 L264.0 273.0 L268.0 272.9 L272.0 272.5 L276.0 271.6 L280.0 270.4 L284.0 268.9 L288.0 267.2 L292.0 265.2 L296.0 263.1 L300.0 261.0 L304.0 258.9 L308.0 256.9 L312.0 255.2 L316.0 253.6 L320.0 252.4 L324.0 251.6 L328.0 251.1 L332.0 251.0 L336.0 251.4 L340.0 252.1 L344.0 253.2 L348.0 254.7 L352.0 256.4 L356.0 258.3 L360.0 260.4 L364.0 262.5 L368.0 264.6 L372.0 266.6 L376.0 268.4 L380.0 270.0 L384.0 271.3 L388.0 272.3 L392.0 272.8 L396.0 273.0 L400.0 272.8 L404.0 272.1 L408.0 271.1 L412.0 269.7 L416.0 268.1 L420.0 266.2 L424.0 264.2 L428.0 262.1 L432.0 259.9 L436.0 257.9 L440.0 256.0" style={{ '--dd': '.5s' } as React.CSSProperties} /></g>
        <g className="art-vague art-vague-3"><path className="art-line" data-draw d="M-40.0 310.9 L-36.0 312.8 L-32.0 314.5 L-28.0 315.9 L-24.0 317.0 L-20.0 317.7 L-16.0 318.0 L-12.0 317.9 L-8.0 317.3 L-4.0 316.4 L0.0 315.1 L4.0 313.5 L8.0 311.7 L12.0 309.8 L16.0 307.8 L20.0 305.9 L24.0 304.1 L28.0 302.6 L32.0 301.4 L36.0 300.5 L40.0 300.1 L44.0 300.0 L48.0 300.4 L52.0 301.2 L56.0 302.4 L60.0 303.9 L64.0 305.6 L68.0 307.5 L72.0 309.5 L76.0 311.4 L80.0 313.2 L84.0 314.8 L88.0 316.2 L92.0 317.2 L96.0 317.8 L100.0 318.0 L104.0 317.8 L108.0 317.1 L112.0 316.1 L116.0 314.7 L120.0 313.1 L124.0 311.2 L128.0 309.3 L132.0 307.3 L136.0 305.4 L140.0 303.7 L144.0 302.3 L148.0 301.1 L152.0 300.4 L156.0 300.0 L160.0 300.1 L164.0 300.6 L168.0 301.5 L172.0 302.7 L176.0 304.3 L180.0 306.1 L184.0 308.0 L188.0 309.9 L192.0 311.9 L196.0 313.6 L200.0 315.2 L204.0 316.5 L208.0 317.4 L212.0 317.9 L216.0 318.0 L220.0 317.6 L224.0 316.9 L228.0 315.8 L232.0 314.3 L236.0 312.6 L240.0 310.7 L244.0 308.8 L248.0 306.8 L252.0 305.0 L256.0 303.3 L260.0 302.0 L264.0 300.9 L268.0 300.2 L272.0 300.0 L276.0 300.2 L280.0 300.8 L284.0 301.8 L288.0 303.1 L292.0 304.7 L296.0 306.5 L300.0 308.5 L304.0 310.4 L308.0 312.3 L312.0 314.1 L316.0 315.6 L320.0 316.7 L324.0 317.5 L328.0 318.0 L332.0 317.9 L336.0 317.5 L340.0 316.6 L344.0 315.4 L348.0 313.9 L352.0 312.2 L356.0 310.3 L360.0 308.3 L364.0 306.4 L368.0 304.6 L372.0 303.0 L376.0 301.7 L380.0 300.7 L384.0 300.1 L388.0 300.0 L392.0 300.3 L396.0 301.0 L400.0 302.1 L404.0 303.5 L408.0 305.2 L412.0 307.0 L416.0 309.0 L420.0 310.9 L424.0 312.8 L428.0 314.5 L432.0 315.9 L436.0 317.0 L440.0 317.7" style={{ '--dd': '.85s' } as React.CSSProperties} /></g>
      </g>
      <g className="art-mots"><text><textPath href="#m-sommeil" startOffset="0">ralentir · relâcher · s'endormir · ralentir · relâcher · s'endormir ·</textPath></text></g>
    </>
  ),
  avion: (
    <>
      <defs><path id="m-avion" d="M30 250 C 120 250, 190 92, 372 60" /></defs>
      <g className="art-scroll">
        <ellipse className="art-fill art-nuage art-nuage-1" cx="120" cy="150" rx="46" ry="16" style={{ '--dd': '1.4s', '--o': '.07' } as React.CSSProperties} />
        <ellipse className="art-fill art-nuage art-nuage-2" cx="300" cy="230" rx="58" ry="19" style={{ '--dd': '1.7s', '--o': '.07' } as React.CSSProperties} />
        <path className="art-soft" data-draw d="M22 330 L378 330" style={{ '--dd': '.15s' } as React.CSSProperties} />
        <path className="art-line" data-draw d="M42 302 C 130 302, 200 138, 368 108" style={{ '--dd': '.5s' } as React.CSSProperties} />
        <g className="art-avion" style={{ offsetPath: 'path("M42 302 C 130 302, 200 138, 368 108")' } as React.CSSProperties}>
          <circle className="art-halo art-avion-halo" cx="0" cy="0" r="14" />
          <circle className="art-core" cx="0" cy="0" r="4.5" style={{ '--dd': '1.6s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-avion" startOffset="0">respirer · se poser · voyager léger · respirer · se poser · voyager léger ·</textPath></text></g>
    </>
  ),
  confiance: (
    <>
      <defs><path id="m-confiance" d="M18.7 155.5 A200.0 200.0 0 0 1 381.3 155.5" /></defs>
      <g className="art-scroll">
        <path className="art-soft" data-draw d="M110 334 L290 334" style={{ '--dd': '.15s' } as React.CSSProperties} />
        <g className="art-arbre">
          <path className="art-line" data-draw d="M200 334 L200 152" style={{ '--dd': '.4s' } as React.CSSProperties} />
          <path className="art-line" data-draw d="M200 262 Q 158 252 134 210" style={{ '--dd': '1.4s' } as React.CSSProperties} />
          <path className="art-line" data-draw d="M200 236 Q 246 222 266 176" style={{ '--dd': '1.7s' } as React.CSSProperties} />
          <path className="art-line" data-draw d="M200 210 Q 164 196 150 150" style={{ '--dd': '2.0s' } as React.CSSProperties} />
          <path className="art-line" data-draw d="M200 190 Q 236 176 244 128" style={{ '--dd': '2.3s' } as React.CSSProperties} />
          <circle className="art-halo art-cime-halo" cx="200" cy="152" r="18" />
          <circle className="art-core" cx="200" cy="152" r="5" style={{ '--dd': '2.4s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-confiance" startOffset="0">s'appuyer · oser · avancer · s'appuyer · oser · avancer ·</textPath></text></g>
    </>
  ),
  parole: (
    <>
      <defs><path id="m-parole" d="M278.0 11.5 A262.0 262.0 0 0 1 278.0 388.5" /></defs>
      <g className="art-scroll">
        <path className="art-line art-onde" data-draw d="M130.8 161.4 A52.0 52.0 0 0 1 130.8 238.6" style={{ '--dd': '0.30s', '--i': '0' } as React.CSSProperties} />
        <path className="art-line art-onde" data-draw d="M160.2 128.7 A96.0 96.0 0 0 1 160.2 271.3" style={{ '--dd': '0.65s', '--i': '1' } as React.CSSProperties} />
        <path className="art-line art-onde" data-draw d="M189.7 96.0 A140.0 140.0 0 0 1 189.7 304.0" style={{ '--dd': '1.00s', '--i': '2' } as React.CSSProperties} />
        <path className="art-line art-onde" data-draw d="M219.1 63.3 A184.0 184.0 0 0 1 219.1 336.7" style={{ '--dd': '1.35s', '--i': '3' } as React.CSSProperties} />
        <path className="art-line art-onde" data-draw d="M248.6 30.6 A228.0 228.0 0 0 1 248.6 369.4" style={{ '--dd': '1.70s', '--i': '4' } as React.CSSProperties} />
        <circle className="art-halo art-voix-halo" cx="96" cy="200" r="16" />
        <circle className="art-core" cx="96" cy="200" r="5.5" style={{ '--dd': '.2s' } as React.CSSProperties} />
      </g>
      <g className="art-mots"><text><textPath href="#m-parole" startOffset="0">respirer · poser sa voix · être entendu · respirer · poser sa voix · être entendu ·</textPath></text></g>
    </>
  ),
  compulsions: (
    <>
      <defs><path id="m-compulsions" d="M68.5 287.2 A280.0 280.0 0 0 0 331.5 287.2" /></defs>
      <g className="art-scroll">
        <g className="art-souffle">
          <path className="art-soft" data-draw d="M24 200 L376 200" style={{ '--dd': '.15s' } as React.CSSProperties} />
          <path className="art-line" data-draw d="M24.0 200.0 L27.0 214.8 L30.0 228.1 L33.0 239.0 L36.0 247.0 L39.0 251.6 L42.0 252.5 L45.0 249.9 L48.0 244.0 L51.0 235.3 L54.0 224.5 L57.0 212.5 L60.0 200.0 L63.0 188.0 L66.0 177.2 L69.0 168.3 L72.0 161.9 L75.0 158.3 L78.0 157.6 L81.0 159.8 L84.0 164.6 L87.0 171.7 L90.0 180.3 L93.0 190.0 L96.0 200.0 L99.0 209.6 L102.0 218.2 L105.0 225.2 L108.0 230.2 L111.0 233.0 L114.0 233.5 L117.0 231.7 L120.0 227.8 L123.0 222.2 L126.0 215.4 L129.0 207.8 L132.0 200.0 L135.0 192.6 L138.0 185.9 L141.0 180.5 L144.0 176.7 L147.0 174.6 L150.0 174.3 L153.0 175.8 L156.0 178.8 L159.0 183.1 L162.0 188.3 L165.0 194.1 L168.0 200.0 L171.0 205.6 L174.0 210.6 L177.0 214.6 L180.0 217.4 L183.0 218.9 L186.0 219.0 L189.0 217.9 L192.0 215.6 L195.0 212.4 L198.0 208.5 L201.0 204.3 L204.0 200.0 L207.0 195.9 L210.0 192.4 L213.0 189.5 L216.0 187.6 L219.0 186.5 L222.0 186.5 L225.0 187.3 L228.0 189.0 L231.0 191.3 L234.0 194.0 L237.0 197.0 L240.0 200.0 L243.0 202.8 L246.0 205.3 L249.0 207.2 L252.0 208.5 L255.0 209.2 L258.0 209.2 L261.0 208.6 L264.0 207.4 L267.0 205.9 L270.0 204.0 L273.0 202.0 L276.0 200.0 L279.0 198.1 L282.0 196.5 L285.0 195.3 L288.0 194.4 L291.0 194.0 L294.0 194.0 L297.0 194.4 L300.0 195.2 L303.0 196.2 L306.0 197.4 L309.0 198.7 L312.0 200.0 L315.0 201.2 L318.0 202.2 L321.0 203.1 L324.0 203.6 L327.0 203.9 L330.0 203.9 L333.0 203.7 L336.0 203.2 L339.0 202.6 L342.0 201.8 L345.0 200.9 L348.0 200.0 L351.0 199.2 L354.0 198.4 L357.0 197.8 L360.0 197.3 L363.0 197.0 L366.0 197.0 L369.0 197.1 L372.0 197.4 L375.0 197.9" style={{ '--dd': '.4s' } as React.CSSProperties} />
          <g className="art-point" style={{ offsetPath: 'path("M24.0 200.0 L27.0 214.8 L30.0 228.1 L33.0 239.0 L36.0 247.0 L39.0 251.6 L42.0 252.5 L45.0 249.9 L48.0 244.0 L51.0 235.3 L54.0 224.5 L57.0 212.5 L60.0 200.0 L63.0 188.0 L66.0 177.2 L69.0 168.3 L72.0 161.9 L75.0 158.3 L78.0 157.6 L81.0 159.8 L84.0 164.6 L87.0 171.7 L90.0 180.3 L93.0 190.0 L96.0 200.0 L99.0 209.6 L102.0 218.2 L105.0 225.2 L108.0 230.2 L111.0 233.0 L114.0 233.5 L117.0 231.7 L120.0 227.8 L123.0 222.2 L126.0 215.4 L129.0 207.8 L132.0 200.0 L135.0 192.6 L138.0 185.9 L141.0 180.5 L144.0 176.7 L147.0 174.6 L150.0 174.3 L153.0 175.8 L156.0 178.8 L159.0 183.1 L162.0 188.3 L165.0 194.1 L168.0 200.0 L171.0 205.6 L174.0 210.6 L177.0 214.6 L180.0 217.4 L183.0 218.9 L186.0 219.0 L189.0 217.9 L192.0 215.6 L195.0 212.4 L198.0 208.5 L201.0 204.3 L204.0 200.0 L207.0 195.9 L210.0 192.4 L213.0 189.5 L216.0 187.6 L219.0 186.5 L222.0 186.5 L225.0 187.3 L228.0 189.0 L231.0 191.3 L234.0 194.0 L237.0 197.0 L240.0 200.0 L243.0 202.8 L246.0 205.3 L249.0 207.2 L252.0 208.5 L255.0 209.2 L258.0 209.2 L261.0 208.6 L264.0 207.4 L267.0 205.9 L270.0 204.0 L273.0 202.0 L276.0 200.0 L279.0 198.1 L282.0 196.5 L285.0 195.3 L288.0 194.4 L291.0 194.0 L294.0 194.0 L297.0 194.4 L300.0 195.2 L303.0 196.2 L306.0 197.4 L309.0 198.7 L312.0 200.0 L315.0 201.2 L318.0 202.2 L321.0 203.1 L324.0 203.6 L327.0 203.9 L330.0 203.9 L333.0 203.7 L336.0 203.2 L339.0 202.6 L342.0 201.8 L345.0 200.9 L348.0 200.0 L351.0 199.2 L354.0 198.4 L357.0 197.8 L360.0 197.3 L363.0 197.0 L366.0 197.0 L369.0 197.1 L372.0 197.4 L375.0 197.9")' } as React.CSSProperties}>
            <circle className="art-halo art-point-halo" cx="0" cy="0" r="14" />
            <circle className="art-core" cx="0" cy="0" r="4.5" style={{ '--dd': '1.6s' } as React.CSSProperties} />
          </g>
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-compulsions" startOffset="0">ressentir · choisir · s'apaiser · ressentir · choisir · s'apaiser ·</textPath></text></g>
    </>
  ),
  stress: (
    <>
      <defs><path id="m-stress" d="M372.0 200.0 A172.0 172.0 0 1 1 372.0 199.7" /></defs>
      <g className="art-scroll">
        <g className="art-respire">
          <path className="art-line" data-draw d="M200.0 193.0 L200.9 192.5 L201.9 192.2 L203.0 192.0 L204.1 192.0 L205.3 192.1 L206.6 192.4 L207.8 192.9 L209.0 193.6 L210.2 194.4 L211.2 195.5 L212.2 196.7 L213.0 198.1 L213.6 199.6 L214.1 201.3 L214.3 203.1 L214.3 204.9 L214.1 206.8 L213.6 208.7 L212.9 210.6 L211.9 212.4 L210.7 214.1 L209.2 215.8 L207.5 217.2 L205.5 218.4 L203.4 219.5 L201.1 220.2 L198.6 220.7 L196.1 220.9 L193.5 220.8 L190.8 220.4 L188.2 219.6 L185.7 218.4 L183.2 217.0 L181.0 215.2 L178.9 213.1 L177.0 210.7 L175.4 208.1 L174.1 205.2 L173.2 202.1 L172.6 198.9 L172.4 195.6 L172.6 192.2 L173.3 188.8 L174.4 185.5 L175.9 182.2 L177.8 179.2 L180.1 176.3 L182.7 173.7 L185.7 171.3 L189.1 169.4 L192.7 167.8 L196.5 166.6 L200.5 165.9 L204.6 165.7 L208.7 166.0 L212.9 166.8 L217.0 168.1 L220.9 169.9 L224.7 172.3 L228.2 175.0 L231.3 178.3 L234.1 181.9 L236.5 185.9 L238.4 190.2 L239.8 194.7 L240.7 199.5 L241.0 204.4 L240.7 209.3 L239.8 214.2 L238.2 219.1 L236.1 223.8 L233.5 228.2 L230.2 232.3 L226.5 236.1 L222.3 239.4 L217.6 242.3 L212.6 244.6 L207.4 246.2 L201.8 247.3 L196.2 247.7 L190.5 247.4 L184.7 246.4 L179.1 244.7 L173.7 242.4 L168.5 239.4 L163.7 235.7 L159.4 231.5 L155.5 226.7 L152.2 221.5 L149.5 215.8 L147.4 209.8 L146.1 203.5 L145.6 197.1 L145.8 190.6 L146.8 184.1 L148.6 177.7 L151.2 171.5 L154.5 165.6 L158.6 160.1 L163.3 155.1 L168.6 150.6 L174.4 146.7 L180.7 143.6 L187.5 141.2 L194.5 139.6 L201.7 138.9 L209.0 139.0 L216.3 140.0 L223.5 141.9 L230.4 144.7 L237.1 148.2 L243.3 152.6 L249.0 157.7 L254.1 163.6 L258.5 170.0 L262.1 177.0 L264.9 184.4 L266.8 192.1 L267.8 200.1 L267.8 208.2 L266.8 216.3 L264.9 224.3 L262.0 232.0 L258.2 239.4 L253.5 246.4 L248.0 252.8 L241.7 258.5 L234.7 263.5 L227.1 267.6 L219.1 270.9 L210.6 273.1 L201.9 274.4 L193.0 274.6 L184.1 273.7 L175.3 271.8 L166.7 268.8 L158.5 264.8 L150.8 259.8 L143.7 254.0 L137.3 247.2 L131.7 239.7 L127.0 231.5 L123.3 222.8 L120.6 213.6 L119.1 204.2 L118.6 194.5 L119.4 184.8 L121.3 175.2 L124.3 165.8 L128.4 156.8 L133.6 148.3 L139.9 140.5 L147.0 133.4 L155.0 127.1 L163.8 121.9 L173.1 117.6 L183.0 114.5 L193.2 112.6 L203.6 111.9 L214.1 112.4 L224.5 114.2 L234.7 117.3 L244.5 121.5 L253.8 127.0 L262.5 133.5 L270.3 141.0 L277.2 149.5 L283.1 158.8 L287.9 168.8 L291.5 179.3 L293.8 190.2 L294.8 201.4 L294.5 212.7 L292.8 223.9 L289.8 235.0 L285.5 245.6 L279.9 255.7 L273.1 265.1 L265.2 273.7 L256.3 281.3 L246.5 287.9 L235.9 293.2 L224.8 297.3 L213.1 300.1 L201.2 301.4 L189.1 301.4 L177.0 299.9 L165.2 296.9 L153.7 292.6 L142.8 286.8 L132.6 279.8 L123.2 271.6 L114.8 262.3 L107.6 252.0 L101.6 240.9 L97.0 229.1 L93.7 216.8 L92.0 204.1 L91.8 191.2 L93.1 178.3 L95.9 165.6 L100.2 153.3 L106.0 141.6 L113.2 130.5 L121.7 120.4 L131.4 111.2 L142.1 103.3 L153.8 96.7 L166.2 91.4 L179.2 87.7 L192.7 85.5 L206.3 84.9 L220.0 86.0 L233.5 88.7 L246.7 93.0 L259.3 98.8 L271.2 106.2 L282.2 114.9 L292.1 124.9 L300.7 136.1 L308.1 148.2 L313.9 161.2 L318.2 174.9 L320.9 189.1 L321.8 203.5 L321.1 218.0 L318.6 232.3 L314.4 246.3 L308.5 259.8 L301.1 272.6 L292.1 284.4 L281.8 295.1 L270.3 304.5 L257.6 312.6 L244.0 319.1 L229.7 324.0 L214.9 327.1 L199.7 328.5 L184.4 328.1 L169.2 325.8 L154.3 321.8 L140.0 315.9 L126.4 308.4 L113.7 299.3 L102.2 288.8 L91.9 276.8 L83.1 263.7 L75.9 249.6 L70.4 234.7 L66.7 219.2 L64.9 203.2 L65.0 187.2 L66.9 171.1 L70.8 155.4 L76.5 140.2 L84.1 125.7 L93.3 112.1 L104.1 99.7 L116.4 88.7 L129.9 79.1 L144.5 71.2 L160.0 65.0 L176.2 60.7 L192.9 58.4 L209.7 58.0 L226.6 59.7 L243.2 63.3 L259.3 69.0 L274.7 76.5 L289.1 85.8 L302.4 96.8 L314.3 109.4 L324.7 123.3 L333.3 138.4 L340.2 154.5" style={{ '--dd': '.15s' } as React.CSSProperties} />
          <circle className="art-halo art-spirale-halo" cx="200" cy="200" r="150" />
          <circle className="art-core" cx="200" cy="193" r="4.5" style={{ '--dd': '2.2s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots art-mots--tourne"><text><textPath href="#m-stress" startOffset="0">respirer · relâcher · revenir au calme · respirer · relâcher · revenir au calme ·</textPath></text></g>
    </>
  ),
  emotions: (
    <>
      <defs><path id="m-emotions" d="M-27.3 194.0 A268.0 268.0 0 0 1 427.3 194.0" /></defs>
      <g className="art-scroll">
        <g className="art-eventail">
          <path className="art-line art-brin art-brin-1" data-draw d="M200 336 Q 120 300 72 190" style={{ '--dd': '0.30s' } as React.CSSProperties} />
          <circle className="art-core art-bout art-bout-1" cx="72" cy="190" r="3.4" style={{ '--dd': '1.80s', '--o': '.75' } as React.CSSProperties} />
          <path className="art-line art-brin art-brin-2" data-draw d="M200 336 Q 150 236 128 120" style={{ '--dd': '0.52s' } as React.CSSProperties} />
          <circle className="art-core art-bout art-bout-2" cx="128" cy="120" r="3.4" style={{ '--dd': '1.98s', '--o': '.75' } as React.CSSProperties} />
          <path className="art-line art-brin art-brin-3" data-draw d="M200 336 Q 200 210 200 92" style={{ '--dd': '0.74s' } as React.CSSProperties} />
          <circle className="art-core art-bout art-bout-3" cx="200" cy="92" r="3.4" style={{ '--dd': '2.16s', '--o': '.75' } as React.CSSProperties} />
          <path className="art-line art-brin art-brin-4" data-draw d="M200 336 Q 250 236 272 120" style={{ '--dd': '0.96s' } as React.CSSProperties} />
          <circle className="art-core art-bout art-bout-4" cx="272" cy="120" r="3.4" style={{ '--dd': '2.34s', '--o': '.75' } as React.CSSProperties} />
          <path className="art-line art-brin art-brin-5" data-draw d="M200 336 Q 280 300 328 190" style={{ '--dd': '1.18s' } as React.CSSProperties} />
          <circle className="art-core art-bout art-bout-5" cx="328" cy="190" r="3.4" style={{ '--dd': '2.52s', '--o': '.75' } as React.CSSProperties} />
        </g>
        <circle className="art-halo art-source-halo" cx="200" cy="336" r="16" />
        <circle className="art-core" cx="200" cy="336" r="5.5" style={{ '--dd': '.2s' } as React.CSSProperties} />
      </g>
      <g className="art-mots"><text><textPath href="#m-emotions" startOffset="0">accueillir · traverser · s'apaiser · accueillir · traverser · s'apaiser ·</textPath></text></g>
    </>
  ),
  deuil: (
    <>
      <defs><path id="m-deuil" d="M20.3 159.6 A228.0 228.0 0 0 1 379.7 159.6" /></defs>
      <g className="art-scroll">
        <path className="art-line" data-draw d="M64 236 C 118 236, 152 200, 204 196" style={{ '--dd': '.3s' } as React.CSSProperties} />
        <path className="art-line art-tenu" d="M204 196 C 258 192, 292 164, 344 158" style={{ '--dd': '.9s' } as React.CSSProperties} />
        <circle className="art-halo art-ancre-halo" cx="64" cy="236" r="17" />
        <circle className="art-core" cx="64" cy="236" r="6" style={{ '--dd': '.4s' } as React.CSSProperties} />
        <g className="art-eloigne" style={{ offsetPath: 'path("M204 196 C 258 192, 292 164, 344 158")' } as React.CSSProperties}>
          <circle className="art-core" cx="0" cy="0" r="4.5" style={{ '--dd': '1.9s', '--o': '.7' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-deuil" startOffset="0">se souvenir · relier · avancer · se souvenir · relier · avancer ·</textPath></text></g>
    </>
  ),
  traumatismes: (
    <>
      <defs><path id="m-trauma" d="M26.9 122.0 A196.0 196.0 0 0 1 373.1 122.0" /></defs>
      <g className="art-scroll">
        <g className="art-recolle">
          <path className="art-line art-eclat art-eclat-1" data-draw d="M213.4 72.7 A128.0 128.0 0 0 1 327.7 208.9" style={{ '--dd': '0.3s' } as React.CSSProperties} />
          <path className="art-line art-eclat art-eclat-2" data-draw d="M327.3 213.4 A128.0 128.0 0 0 1 213.4 327.3" style={{ '--dd': '0.6s' } as React.CSSProperties} />
          <path className="art-line art-eclat art-eclat-3" data-draw d="M186.6 327.3 A128.0 128.0 0 0 1 72.7 213.4" style={{ '--dd': '0.9s' } as React.CSSProperties} />
          <path className="art-line art-eclat art-eclat-4" data-draw d="M72.7 186.6 A128.0 128.0 0 0 1 186.6 72.7" style={{ '--dd': '1.2s' } as React.CSSProperties} />
        </g>
        <circle className="art-core art-jointure art-jointure-1" cx="213.4" cy="72.7" r="3.6" style={{ '--dd': '1.9s', '--o': '.8' } as React.CSSProperties} />
        <circle className="art-core art-jointure art-jointure-2" cx="327.3" cy="213.4" r="3.6" style={{ '--dd': '2.1s', '--o': '.8' } as React.CSSProperties} />
        <circle className="art-core art-jointure art-jointure-3" cx="186.6" cy="327.3" r="3.6" style={{ '--dd': '2.3s', '--o': '.8' } as React.CSSProperties} />
        <circle className="art-core art-jointure art-jointure-4" cx="72.7" cy="186.6" r="3.6" style={{ '--dd': '2.5s', '--o': '.8' } as React.CSSProperties} />
        <circle className="art-halo art-centre-halo" cx="200" cy="200" r="56" />
        <circle className="art-core" cx="200" cy="200" r="4" style={{ '--dd': '2.6s', '--o': '.6' } as React.CSSProperties} />
      </g>
      <g className="art-mots"><text><textPath href="#m-trauma" startOffset="0">déposer · réparer · se reconstruire · déposer · réparer · se reconstruire ·</textPath></text></g>
    </>
  ),
  blocages: (
    <>
      <defs><path id="m-blocages" d="M7.7 120.3 A232.0 232.0 0 0 1 392.3 120.3" /></defs>
      <g className="art-scroll">
        <path className="art-line" data-draw d="M200.0 158.0 L208.2 158.4 L216.2 159.7 L224.1 161.8 L231.7 164.7 L239.0 168.5 L245.8 172.9 L252.2 178.0 L258.0 183.8 L263.1 190.2 L267.5 197.0 L271.3 204.3 L274.2 211.9 L276.3 219.8 L277.6 227.8 L278.0 236.0 L277.6 244.2 L276.3 252.2 L274.2 260.1 L271.3 267.7 L267.5 275.0 L263.1 281.8 L258.0 288.2 L252.2 294.0 L245.8 299.1 L239.0 303.5 L231.7 307.3 L224.1 310.2 L216.2 312.3 L208.2 313.6 L200.0 314.0 L191.8 313.6 L183.8 312.3 L175.9 310.2 L168.3 307.3 L161.0 303.5 L154.2 299.1 L147.8 294.0 L142.0 288.2 L136.9 281.8 L132.5 275.0 L128.7 267.7 L125.8 260.1 L123.7 252.2 L122.4 244.2 L122.0 236.0 L122.4 227.8 L123.7 219.8 L125.8 211.9 L128.7 204.3 L132.5 197.0 L136.9 190.2 L142.0 183.8 L147.8 178.0 L154.2 172.9 L161.0 168.5 L168.3 164.7 L175.9 161.8 L183.8 159.7 L191.8 158.4 L200.0 158.0 C 250 150, 300 126, 368 112" style={{ '--dd': '.25s' } as React.CSSProperties} />
        <g className="art-echappe" style={{ offsetPath: 'path("M200.0 158.0 L208.2 158.4 L216.2 159.7 L224.1 161.8 L231.7 164.7 L239.0 168.5 L245.8 172.9 L252.2 178.0 L258.0 183.8 L263.1 190.2 L267.5 197.0 L271.3 204.3 L274.2 211.9 L276.3 219.8 L277.6 227.8 L278.0 236.0 L277.6 244.2 L276.3 252.2 L274.2 260.1 L271.3 267.7 L267.5 275.0 L263.1 281.8 L258.0 288.2 L252.2 294.0 L245.8 299.1 L239.0 303.5 L231.7 307.3 L224.1 310.2 L216.2 312.3 L208.2 313.6 L200.0 314.0 L191.8 313.6 L183.8 312.3 L175.9 310.2 L168.3 307.3 L161.0 303.5 L154.2 299.1 L147.8 294.0 L142.0 288.2 L136.9 281.8 L132.5 275.0 L128.7 267.7 L125.8 260.1 L123.7 252.2 L122.4 244.2 L122.0 236.0 L122.4 227.8 L123.7 219.8 L125.8 211.9 L128.7 204.3 L132.5 197.0 L136.9 190.2 L142.0 183.8 L147.8 178.0 L154.2 172.9 L161.0 168.5 L168.3 164.7 L175.9 161.8 L183.8 159.7 L191.8 158.4 L200.0 158.0 C 250 150, 300 126, 368 112")' } as React.CSSProperties}>
          <circle className="art-halo art-echappe-halo" cx="0" cy="0" r="14" />
          <circle className="art-core" cx="0" cy="0" r="5" style={{ '--dd': '2.2s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-blocages" startOffset="0">observer · dénouer · avancer · observer · dénouer · avancer ·</textPath></text></g>
    </>
  ),
  phobies: (
    <>
      <defs><path id="m-phobies" d="M-1.8 173.9 A238.0 238.0 0 0 1 401.8 173.9" /></defs>
      <g className="art-scroll">
        <path className="art-soft" data-draw d="M18 300 L382 300" style={{ '--dd': '.15s' } as React.CSSProperties} />
        <path className="art-line art-arche art-arche-1" data-draw d="M50 300 A 48 48 0 0 1 146 300" style={{ '--dd': '0.3s' } as React.CSSProperties} />
        <path className="art-line art-arche art-arche-2" data-draw d="M110 300 A 68 68 0 0 1 246 300" style={{ '--dd': '0.6s' } as React.CSSProperties} />
        <path className="art-line art-arche art-arche-3" data-draw d="M176 300 A 88 88 0 0 1 352 300" style={{ '--dd': '0.9s' } as React.CSSProperties} />
        <path className="art-line art-arche art-arche-4" data-draw d="M244 300 A 108 108 0 0 1 460 300" style={{ '--dd': '1.2s' } as React.CSSProperties} />
        <g className="art-passe" style={{ offsetPath: 'path("M30 300 L374 300")' } as React.CSSProperties}>
          <circle className="art-halo art-passe-halo" cx="0" cy="0" r="14" />
          <circle className="art-core" cx="0" cy="0" r="5" style={{ '--dd': '1.8s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-phobies" startOffset="0">approcher · apprivoiser · traverser · approcher · apprivoiser · traverser ·</textPath></text></g>
    </>
  ),
  tabac: (
    <>
      <defs><path id="m-tabac" d="M9.1 181.3 A236.0 236.0 0 0 1 390.9 181.3" /></defs>
      <g className="art-scroll">
        <path className="art-soft" data-draw d="M40 322 L360 322" style={{ '--dd': '.15s' } as React.CSSProperties} />
          <path className="art-line art-volute art-volute-1" data-draw d="M112.0 250.1 L115.0 252.1 L118.0 254.4 L121.0 257.0 L124.0 259.8 L127.0 262.8 L130.0 265.9 L133.0 269.0 L136.0 272.2 L139.0 275.2 L142.0 278.1 L145.0 280.8 L148.0 283.2 L151.0 285.3 L154.0 287.1 L157.0 288.4 L160.0 289.4 L163.0 289.9 L166.0 290.0 L169.0 289.6 L172.0 288.8 L175.0 287.6 L178.0 285.9 L181.0 283.9 L184.0 281.6 L187.0 279.0 L190.0 276.2 L193.0 273.2 L196.0 270.1 L199.0 267.0 L202.0 263.8 L205.0 260.8 L208.0 257.9 L211.0 255.2 L214.0 252.8 L217.0 250.7 L220.0 248.9 L223.0 247.6 L226.0 246.6 L229.0 246.1 L232.0 246.0 L235.0 246.4 L238.0 247.2 L241.0 248.4 L244.0 250.1 L247.0 252.1 L250.0 254.4 L253.0 257.0 L256.0 259.8 L259.0 262.8 L262.0 265.9 L265.0 269.0 L268.0 272.2 L271.0 275.2 L274.0 278.1 L277.0 280.8 L280.0 283.2 L283.0 285.3 L286.0 287.1" style={{ '--dd': '0.5s' } as React.CSSProperties} />
          <path className="art-line art-volute art-volute-2" data-draw d="M120.0 238.9 L123.0 240.1 L126.0 240.8 L129.0 241.0 L132.0 240.8 L135.0 240.1 L138.0 238.9 L141.0 237.4 L144.0 235.4 L147.0 233.2 L150.0 230.6 L153.0 227.9 L156.0 225.0 L159.0 222.0 L162.0 219.0 L165.0 216.1 L168.0 213.4 L171.0 210.8 L174.0 208.6 L177.0 206.6 L180.0 205.1 L183.0 203.9 L186.0 203.2 L189.0 203.0 L192.0 203.2 L195.0 203.9 L198.0 205.1 L201.0 206.6 L204.0 208.6 L207.0 210.8 L210.0 213.4 L213.0 216.1 L216.0 219.0 L219.0 222.0 L222.0 225.0 L225.0 227.9 L228.0 230.6 L231.0 233.2 L234.0 235.4 L237.0 237.4 L240.0 238.9 L243.0 240.1 L246.0 240.8 L249.0 241.0 L252.0 240.8 L255.0 240.1 L258.0 238.9 L261.0 237.4 L264.0 235.4 L267.0 233.2 L270.0 230.6 L273.0 227.9 L276.0 225.0 L279.0 222.0" style={{ '--dd': '0.8s' } as React.CSSProperties} />
          <path className="art-line art-volute art-volute-3" data-draw d="M130.0 170.7 L133.0 168.1 L136.0 165.8 L139.0 163.9 L142.0 162.2 L145.0 161.0 L148.0 160.3 L151.0 160.0 L154.0 160.2 L157.0 160.9 L160.0 162.1 L163.0 163.6 L166.0 165.6 L169.0 167.9 L172.0 170.4 L175.0 173.1 L178.0 175.8 L181.0 178.6 L184.0 181.3 L187.0 183.9 L190.0 186.2 L193.0 188.1 L196.0 189.8 L199.0 191.0 L202.0 191.7 L205.0 192.0 L208.0 191.8 L211.0 191.1 L214.0 189.9 L217.0 188.4 L220.0 186.4 L223.0 184.1 L226.0 181.6 L229.0 178.9 L232.0 176.2 L235.0 173.4 L238.0 170.7 L241.0 168.1 L244.0 165.8 L247.0 163.9 L250.0 162.2 L253.0 161.0 L256.0 160.3 L259.0 160.0 L262.0 160.2 L265.0 160.9 L268.0 162.1" style={{ '--dd': '1.1s' } as React.CSSProperties} />
        <g className="art-souffle-libre">
          <circle className="art-halo art-souffle-halo" cx="200" cy="322" r="18" />
          <circle className="art-core" cx="200" cy="322" r="6" style={{ '--dd': '.3s' } as React.CSSProperties} />
        </g>
      </g>
      <g className="art-mots"><text><textPath href="#m-tabac" startOffset="0">respirer · se libérer · durer · respirer · se libérer · durer ·</textPath></text></g>
    </>
  ),
};

const HeroArt: React.FC<{ theme: HeroArtTheme }> = ({ theme }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelectorAll<SVGGeometryElement>('[data-draw]').forEach((p) => {
      if (p.getTotalLength) p.style.setProperty('--len', p.getTotalLength().toFixed(0));
    });
  }, [theme]);

  return (
    <div ref={ref} className="sp-hero__art" aria-hidden="true">
      <svg viewBox="0 0 400 400" role="presentation" focusable="false">
        {ART[theme]}
      </svg>
    </div>
  );
};

export default HeroArt;
