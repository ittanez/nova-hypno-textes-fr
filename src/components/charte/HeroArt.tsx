import React, { useEffect, useRef } from 'react';

/**
 * Illustration animée du hero des pages spécialités — la même signature visuelle
 * que les landing pages Google Ads (public/*-hypnose-paris.html), pour qu'un
 * visiteur arrivant d'une annonce retrouve le même univers sur le site.
 *
 * Tout le mouvement est en CSS (src/styles/charte-secondary.css, section
 * « ILLUSTRATION ANIMÉE DU HERO ») : tracé à l'entrée, une seule boucle lente,
 * transform/opacité uniquement, mouvement réduit respecté. Le composant ne fait
 * que mesurer la longueur réelle des tracés pour piloter l'animation de dessin.
 */
export type HeroArtTheme = 'sommeil' | 'avion' | 'confiance' | 'parole' | 'compulsions';

const ART: Record<HeroArtTheme, React.ReactNode> = {
  sommeil: (
      <svg viewBox="0 0 400 400" role="presentation" focusable="false" aria-hidden="true">
      <defs><path id="arc-mots" d="M7.5 165.2 A235 235 0 0 1 392.5 165.2"/></defs>
      <g className="art-scroll">
          <g className="art-drift">
              <circle className="art-halo art-lune-halo" cx="292" cy="112" r="22"/>
              <circle className="art-core" cx="292" cy="112" r="9" style={{ '--dd': '.6s' } as React.CSSProperties}/>
          </g>
          <circle className="art-core art-etoile" cx="96" cy="88" r="1.8" style={{ '--dd': '1.4s', '--o': '.7' } as React.CSSProperties}/>
          <circle className="art-core art-etoile" cx="150" cy="136" r="1.4" style={{ '--dd': '1.8s', '--o': '.5' } as React.CSSProperties}/>
          <circle className="art-core art-etoile" cx="352" cy="170" r="1.6" style={{ '--dd': '2.1s', '--o': '.6' } as React.CSSProperties}/>
          <g className="art-vague art-vague-1"><path className="art-line" data-draw d="M-40.0 202.1 L-36.0 202.0 L-32.0 202.3 L-28.0 203.0 L-24.0 204.0 L-20.0 205.3 L-16.0 206.9 L-12.0 208.7 L-8.0 210.7 L-4.0 212.8 L0.0 215.0 L4.0 217.2 L8.0 219.3 L12.0 221.3 L16.0 223.1 L20.0 224.7 L24.0 226.0 L28.0 227.0 L32.0 227.7 L36.0 228.0 L40.0 227.9 L44.0 227.5 L48.0 226.8 L52.0 225.7 L56.0 224.3 L60.0 222.6 L64.0 220.8 L68.0 218.8 L72.0 216.6 L76.0 214.5 L80.0 212.3 L84.0 210.2 L88.0 208.3 L92.0 206.5 L96.0 205.0 L100.0 203.7 L104.0 202.8 L108.0 202.2 L112.0 202.0 L116.0 202.1 L120.0 202.6 L124.0 203.5 L128.0 204.6 L132.0 206.1 L136.0 207.8 L140.0 209.7 L144.0 211.8 L148.0 213.9 L152.0 216.1 L156.0 218.2 L160.0 220.3 L164.0 222.2 L168.0 223.9 L172.0 225.4 L176.0 226.5 L180.0 227.4 L184.0 227.9 L188.0 228.0 L192.0 227.8 L196.0 227.2 L200.0 226.3 L204.0 225.0 L208.0 223.5 L212.0 221.7 L216.0 219.8 L220.0 217.7 L224.0 215.5 L228.0 213.4 L232.0 211.2 L236.0 209.2 L240.0 207.4 L244.0 205.7 L248.0 204.3 L252.0 203.2 L256.0 202.5 L260.0 202.1 L264.0 202.0 L268.0 202.3 L272.0 203.0 L276.0 204.0 L280.0 205.3 L284.0 206.9 L288.0 208.7 L292.0 210.7 L296.0 212.8 L300.0 215.0 L304.0 217.2 L308.0 219.3 L312.0 221.3 L316.0 223.1 L320.0 224.7 L324.0 226.0 L328.0 227.0 L332.0 227.7 L336.0 228.0 L340.0 227.9 L344.0 227.5 L348.0 226.8 L352.0 225.7 L356.0 224.3 L360.0 222.6 L364.0 220.8 L368.0 218.8 L372.0 216.6 L376.0 214.5 L380.0 212.3 L384.0 210.2 L388.0 208.3 L392.0 206.5 L396.0 205.0 L400.0 203.7 L404.0 202.8 L408.0 202.2 L412.0 202.0 L416.0 202.1 L420.0 202.6 L424.0 203.5 L428.0 204.6 L432.0 206.1 L436.0 207.8 L440.0 209.7" style={{ '--dd': '.15s' } as React.CSSProperties}/></g>
          <g className="art-vague art-vague-2"><path className="art-line" data-draw d="M-40.0 255.5 L-36.0 257.3 L-32.0 259.3 L-28.0 261.4 L-24.0 263.5 L-20.0 265.6 L-16.0 267.5 L-12.0 269.3 L-8.0 270.7 L-4.0 271.8 L0.0 272.6 L4.0 273.0 L8.0 272.9 L12.0 272.5 L16.0 271.6 L20.0 270.4 L24.0 268.9 L28.0 267.2 L32.0 265.2 L36.0 263.1 L40.0 261.0 L44.0 258.9 L48.0 256.9 L52.0 255.2 L56.0 253.6 L60.0 252.4 L64.0 251.6 L68.0 251.1 L72.0 251.0 L76.0 251.4 L80.0 252.1 L84.0 253.2 L88.0 254.7 L92.0 256.4 L96.0 258.3 L100.0 260.4 L104.0 262.5 L108.0 264.6 L112.0 266.6 L116.0 268.4 L120.0 270.0 L124.0 271.3 L128.0 272.3 L132.0 272.8 L136.0 273.0 L140.0 272.8 L144.0 272.1 L148.0 271.1 L152.0 269.7 L156.0 268.1 L160.0 266.2 L164.0 264.2 L168.0 262.1 L172.0 259.9 L176.0 257.9 L180.0 256.0 L184.0 254.4 L188.0 253.0 L192.0 251.9 L196.0 251.3 L200.0 251.0 L204.0 251.1 L208.0 251.7 L212.0 252.6 L216.0 253.9 L220.0 255.5 L224.0 257.3 L228.0 259.3 L232.0 261.4 L236.0 263.5 L240.0 265.6 L244.0 267.5 L248.0 269.3 L252.0 270.7 L256.0 271.8 L260.0 272.6 L264.0 273.0 L268.0 272.9 L272.0 272.5 L276.0 271.6 L280.0 270.4 L284.0 268.9 L288.0 267.2 L292.0 265.2 L296.0 263.1 L300.0 261.0 L304.0 258.9 L308.0 256.9 L312.0 255.2 L316.0 253.6 L320.0 252.4 L324.0 251.6 L328.0 251.1 L332.0 251.0 L336.0 251.4 L340.0 252.1 L344.0 253.2 L348.0 254.7 L352.0 256.4 L356.0 258.3 L360.0 260.4 L364.0 262.5 L368.0 264.6 L372.0 266.6 L376.0 268.4 L380.0 270.0 L384.0 271.3 L388.0 272.3 L392.0 272.8 L396.0 273.0 L400.0 272.8 L404.0 272.1 L408.0 271.1 L412.0 269.7 L416.0 268.1 L420.0 266.2 L424.0 264.2 L428.0 262.1 L432.0 259.9 L436.0 257.9 L440.0 256.0" style={{ '--dd': '.5s' } as React.CSSProperties}/></g>
          <g className="art-vague art-vague-3"><path className="art-line" data-draw d="M-40.0 310.9 L-36.0 312.8 L-32.0 314.5 L-28.0 315.9 L-24.0 317.0 L-20.0 317.7 L-16.0 318.0 L-12.0 317.9 L-8.0 317.3 L-4.0 316.4 L0.0 315.1 L4.0 313.5 L8.0 311.7 L12.0 309.8 L16.0 307.8 L20.0 305.9 L24.0 304.1 L28.0 302.6 L32.0 301.4 L36.0 300.5 L40.0 300.1 L44.0 300.0 L48.0 300.4 L52.0 301.2 L56.0 302.4 L60.0 303.9 L64.0 305.6 L68.0 307.5 L72.0 309.5 L76.0 311.4 L80.0 313.2 L84.0 314.8 L88.0 316.2 L92.0 317.2 L96.0 317.8 L100.0 318.0 L104.0 317.8 L108.0 317.1 L112.0 316.1 L116.0 314.7 L120.0 313.1 L124.0 311.2 L128.0 309.3 L132.0 307.3 L136.0 305.4 L140.0 303.7 L144.0 302.3 L148.0 301.1 L152.0 300.4 L156.0 300.0 L160.0 300.1 L164.0 300.6 L168.0 301.5 L172.0 302.7 L176.0 304.3 L180.0 306.1 L184.0 308.0 L188.0 309.9 L192.0 311.9 L196.0 313.6 L200.0 315.2 L204.0 316.5 L208.0 317.4 L212.0 317.9 L216.0 318.0 L220.0 317.6 L224.0 316.9 L228.0 315.8 L232.0 314.3 L236.0 312.6 L240.0 310.7 L244.0 308.8 L248.0 306.8 L252.0 305.0 L256.0 303.3 L260.0 302.0 L264.0 300.9 L268.0 300.2 L272.0 300.0 L276.0 300.2 L280.0 300.8 L284.0 301.8 L288.0 303.1 L292.0 304.7 L296.0 306.5 L300.0 308.5 L304.0 310.4 L308.0 312.3 L312.0 314.1 L316.0 315.6 L320.0 316.7 L324.0 317.5 L328.0 318.0 L332.0 317.9 L336.0 317.5 L340.0 316.6 L344.0 315.4 L348.0 313.9 L352.0 312.2 L356.0 310.3 L360.0 308.3 L364.0 306.4 L368.0 304.6 L372.0 303.0 L376.0 301.7 L380.0 300.7 L384.0 300.1 L388.0 300.0 L392.0 300.3 L396.0 301.0 L400.0 302.1 L404.0 303.5 L408.0 305.2 L412.0 307.0 L416.0 309.0 L420.0 310.9 L424.0 312.8 L428.0 314.5 L432.0 315.9 L436.0 317.0 L440.0 317.7" style={{ '--dd': '.85s' } as React.CSSProperties}/></g>
      </g>
      <g className="art-mots"><text><textPath href="#arc-mots" startOffset="0">ralentir · relâcher · s'endormir · ralentir · relâcher · s'endormir ·</textPath></text></g>
  </svg>
  ),
  avion: (
      <svg viewBox="0 0 400 400" role="presentation" focusable="false" aria-hidden="true">
      <defs><path id="arc-mots" d="M30 250 C 120 250, 190 92, 372 60"/></defs>
      <g className="art-scroll">
          <ellipse className="art-fill art-nuage art-nuage-1" cx="120" cy="150" rx="46" ry="16" style={{ '--dd': '1.4s', '--o': '.07' } as React.CSSProperties}/>
          <ellipse className="art-fill art-nuage art-nuage-2" cx="300" cy="230" rx="58" ry="19" style={{ '--dd': '1.7s', '--o': '.07' } as React.CSSProperties}/>
          <path className="art-soft" data-draw d="M22 330 L378 330" style={{ '--dd': '.15s' } as React.CSSProperties}/>
          <path className="art-line" data-draw d="M42 302 C 130 302, 200 138, 368 108" style={{ '--dd': '.5s' } as React.CSSProperties}/>
          <g className="art-avion" style={{ offsetPath: 'path("M42 302 C 130 302, 200 138, 368 108")' } as React.CSSProperties}>
              <circle className="art-halo art-avion-halo" cx="0" cy="0" r="14"/>
              <circle className="art-core" cx="0" cy="0" r="4.5" style={{ '--dd': '1.6s' } as React.CSSProperties}/>
          </g>
      </g>
      <g className="art-mots"><text><textPath href="#arc-mots" startOffset="0">respirer · se poser · voyager léger · respirer · se poser · voyager léger ·</textPath></text></g>
  </svg>
  ),
  confiance: (
      <svg viewBox="0 0 400 400" role="presentation" focusable="false" aria-hidden="true">
      <defs><path id="arc-mots" d="M18.7 155.5 A200 200 0 0 1 381.3 155.5"/></defs>
      <g className="art-scroll">
          <path className="art-soft" data-draw d="M110 334 L290 334" style={{ '--dd': '.15s' } as React.CSSProperties}/>
          <g className="art-arbre">
              <path className="art-line" data-draw d="M200 334 L200 152" style={{ '--dd': '.4s' } as React.CSSProperties}/>
          <path className="art-line" data-draw d="M200 262 Q 158 252 134 210" style={{ '--dd': '1.4s' } as React.CSSProperties}/>
          <path className="art-line" data-draw d="M200 236 Q 246 222 266 176" style={{ '--dd': '1.7s' } as React.CSSProperties}/>
          <path className="art-line" data-draw d="M200 210 Q 164 196 150 150" style={{ '--dd': '2.0s' } as React.CSSProperties}/>
          <path className="art-line" data-draw d="M200 190 Q 236 176 244 128" style={{ '--dd': '2.3s' } as React.CSSProperties}/>
              <circle className="art-halo art-cime-halo" cx="200" cy="152" r="18"/>
              <circle className="art-core" cx="200" cy="152" r="5" style={{ '--dd': '2.4s' } as React.CSSProperties}/>
          </g>
      </g>
      <g className="art-mots"><text><textPath href="#arc-mots" startOffset="0">s'appuyer · oser · avancer · s'appuyer · oser · avancer ·</textPath></text></g>
  </svg>
  ),
  parole: (
      <svg viewBox="0 0 400 400" role="presentation" focusable="false" aria-hidden="true">
      <defs><path id="arc-mots" d="M278.0 11.5 A262 262 0 0 1 278.0 388.5"/></defs>
      <g className="art-scroll">
          <path className="art-line art-onde" data-draw d="M130.8 161.4 A52 52 0 0 1 130.8 238.6" style={{ '--dd': '0.30s', '--i': '0' } as React.CSSProperties}/>
          <path className="art-line art-onde" data-draw d="M160.2 128.7 A96 96 0 0 1 160.2 271.3" style={{ '--dd': '0.65s', '--i': '1' } as React.CSSProperties}/>
          <path className="art-line art-onde" data-draw d="M189.7 96.0 A140 140 0 0 1 189.7 304.0" style={{ '--dd': '1.00s', '--i': '2' } as React.CSSProperties}/>
          <path className="art-line art-onde" data-draw d="M219.1 63.3 A184 184 0 0 1 219.1 336.7" style={{ '--dd': '1.35s', '--i': '3' } as React.CSSProperties}/>
          <path className="art-line art-onde" data-draw d="M248.6 30.6 A228 228 0 0 1 248.6 369.4" style={{ '--dd': '1.70s', '--i': '4' } as React.CSSProperties}/>
          <circle className="art-halo art-voix-halo" cx="96" cy="200" r="16"/>
          <circle className="art-core" cx="96" cy="200" r="5.5" style={{ '--dd': '.2s' } as React.CSSProperties}/>
      </g>
      <g className="art-mots"><text><textPath href="#arc-mots" startOffset="0">respirer · poser sa voix · être entendu · respirer · poser sa voix · être entendu ·</textPath></text></g>
  </svg>
  ),
  compulsions: (
      <svg viewBox="0 0 400 400" role="presentation" focusable="false" aria-hidden="true">
      <defs><path id="arc-mots" d="M68.5 287.2 A280 280 0 0 0 331.5 287.2"/></defs>
      <g className="art-scroll">
          <g className="art-souffle">
              <path className="art-soft" data-draw d="M24 200 L376 200" style={{ '--dd': '.15s' } as React.CSSProperties}/>
              <path className="art-line" data-draw d="M24.0 200.0 L27.0 214.8 L30.0 228.1 L33.0 239.0 L36.0 247.0 L39.0 251.6 L42.0 252.5 L45.0 249.9 L48.0 244.0 L51.0 235.3 L54.0 224.5 L57.0 212.5 L60.0 200.0 L63.0 188.0 L66.0 177.2 L69.0 168.3 L72.0 161.9 L75.0 158.3 L78.0 157.6 L81.0 159.8 L84.0 164.6 L87.0 171.7 L90.0 180.3 L93.0 190.0 L96.0 200.0 L99.0 209.6 L102.0 218.2 L105.0 225.2 L108.0 230.2 L111.0 233.0 L114.0 233.5 L117.0 231.7 L120.0 227.8 L123.0 222.2 L126.0 215.4 L129.0 207.8 L132.0 200.0 L135.0 192.6 L138.0 185.9 L141.0 180.5 L144.0 176.7 L147.0 174.6 L150.0 174.3 L153.0 175.8 L156.0 178.8 L159.0 183.1 L162.0 188.3 L165.0 194.1 L168.0 200.0 L171.0 205.6 L174.0 210.6 L177.0 214.6 L180.0 217.4 L183.0 218.9 L186.0 219.0 L189.0 217.9 L192.0 215.6 L195.0 212.4 L198.0 208.5 L201.0 204.3 L204.0 200.0 L207.0 195.9 L210.0 192.4 L213.0 189.5 L216.0 187.6 L219.0 186.5 L222.0 186.5 L225.0 187.3 L228.0 189.0 L231.0 191.3 L234.0 194.0 L237.0 197.0 L240.0 200.0 L243.0 202.8 L246.0 205.3 L249.0 207.2 L252.0 208.5 L255.0 209.2 L258.0 209.2 L261.0 208.6 L264.0 207.4 L267.0 205.9 L270.0 204.0 L273.0 202.0 L276.0 200.0 L279.0 198.1 L282.0 196.5 L285.0 195.3 L288.0 194.4 L291.0 194.0 L294.0 194.0 L297.0 194.4 L300.0 195.2 L303.0 196.2 L306.0 197.4 L309.0 198.7 L312.0 200.0 L315.0 201.2 L318.0 202.2 L321.0 203.1 L324.0 203.6 L327.0 203.9 L330.0 203.9 L333.0 203.7 L336.0 203.2 L339.0 202.6 L342.0 201.8 L345.0 200.9 L348.0 200.0 L351.0 199.2 L354.0 198.4 L357.0 197.8 L360.0 197.3 L363.0 197.0 L366.0 197.0 L369.0 197.1 L372.0 197.4 L375.0 197.9" style={{ '--dd': '.4s' } as React.CSSProperties}/>
                  <g className="art-point" style={{ offsetPath: 'path("M24.0 200.0 L27.0 214.8 L30.0 228.1 L33.0 239.0 L36.0 247.0 L39.0 251.6 L42.0 252.5 L45.0 249.9 L48.0 244.0 L51.0 235.3 L54.0 224.5 L57.0 212.5 L60.0 200.0 L63.0 188.0 L66.0 177.2 L69.0 168.3 L72.0 161.9 L75.0 158.3 L78.0 157.6 L81.0 159.8 L84.0 164.6 L87.0 171.7 L90.0 180.3 L93.0 190.0 L96.0 200.0 L99.0 209.6 L102.0 218.2 L105.0 225.2 L108.0 230.2 L111.0 233.0 L114.0 233.5 L117.0 231.7 L120.0 227.8 L123.0 222.2 L126.0 215.4 L129.0 207.8 L132.0 200.0 L135.0 192.6 L138.0 185.9 L141.0 180.5 L144.0 176.7 L147.0 174.6 L150.0 174.3 L153.0 175.8 L156.0 178.8 L159.0 183.1 L162.0 188.3 L165.0 194.1 L168.0 200.0 L171.0 205.6 L174.0 210.6 L177.0 214.6 L180.0 217.4 L183.0 218.9 L186.0 219.0 L189.0 217.9 L192.0 215.6 L195.0 212.4 L198.0 208.5 L201.0 204.3 L204.0 200.0 L207.0 195.9 L210.0 192.4 L213.0 189.5 L216.0 187.6 L219.0 186.5 L222.0 186.5 L225.0 187.3 L228.0 189.0 L231.0 191.3 L234.0 194.0 L237.0 197.0 L240.0 200.0 L243.0 202.8 L246.0 205.3 L249.0 207.2 L252.0 208.5 L255.0 209.2 L258.0 209.2 L261.0 208.6 L264.0 207.4 L267.0 205.9 L270.0 204.0 L273.0 202.0 L276.0 200.0 L279.0 198.1 L282.0 196.5 L285.0 195.3 L288.0 194.4 L291.0 194.0 L294.0 194.0 L297.0 194.4 L300.0 195.2 L303.0 196.2 L306.0 197.4 L309.0 198.7 L312.0 200.0 L315.0 201.2 L318.0 202.2 L321.0 203.1 L324.0 203.6 L327.0 203.9 L330.0 203.9 L333.0 203.7 L336.0 203.2 L339.0 202.6 L342.0 201.8 L345.0 200.9 L348.0 200.0 L351.0 199.2 L354.0 198.4 L357.0 197.8 L360.0 197.3 L363.0 197.0 L366.0 197.0 L369.0 197.1 L372.0 197.4 L375.0 197.9")' } as React.CSSProperties}>
                  <circle className="art-halo art-point-halo" cx="0" cy="0" r="14"/>
                  <circle className="art-core" cx="0" cy="0" r="4.5" style={{ '--dd': '1.6s' } as React.CSSProperties}/>
              </g>
          </g>
      </g>
      <g className="art-mots"><text><textPath href="#arc-mots" startOffset="0">ressentir · choisir · s'apaiser · ressentir · choisir · s'apaiser ·</textPath></text></g>
  </svg>
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
      {ART[theme]}
    </div>
  );
};

export default HeroArt;
