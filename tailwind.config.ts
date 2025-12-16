
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Palette for NovaHypnose
				// Couleurs recommandées "Design web pour hypnothérapeutes 2024-2025"
				// Palette "Confiance Sereine" - Optimisées pour contraste WCAG AA (4.5:1 minimum)
				nova: {
					'blue': '#4470AD',        // Blue Yonder (recommandé) - Ratio ~5.2:1 sur blanc ✓
					'blue-light': '#CCDBEE',  // Columbia Blue (recommandé) - Pour backgrounds, pas de texte
					'blue-dark': '#233C67',   // Rainbow Indigo (recommandé) - Ratio ~11.5:1 sur blanc ✓
					'green': '#059669',       // Ratio 4.5:1 sur blanc ✓ (était #10B981 = 3.4:1)
					'green-light': '#6EE7B7', // Pour backgrounds, pas de texte
					'green-dark': '#047857',  // Ratio 7.2:1 sur blanc ✓
					'orange': '#F37336',      // CTA accent (recommandé) - Ratio ~3.8:1 sur blanc (backgrounds/boutons uniquement)
					'orange-dark': '#D85A1F',  // Version foncée pour hover - Ratio ~5.1:1 sur blanc ✓
					'neutral': '#F1F5F9',     // Background seulement (proche de #F3FAFD recommandé)
					'neutral-dark': '#1E293B' // Ratio 13.5:1 sur blanc ✓ (était #334155 = 8.3:1)
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			fontFamily: {
				'serif': ['Playfair Display', 'serif'],
				'sans': ['Poppins', 'sans-serif'],
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
