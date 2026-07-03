export const ecosystemExtras = {
  'State libraries comparison': {
    detail:
      'TanStack Query for server/async cache; Zustand/Jotai for light UI state; Redux Toolkit when you need time-travel debugging and strict event flows—Recoil is largely unmaintained.',
    code: `const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
const sidebarOpen = useUIStore((s) => s.sidebarOpen);`,
  },
  Zustand: {
    detail:
      'No Provider wrapper—select slices with selectors to avoid re-rendering on unrelated store changes; middleware adds persist and devtools.',
    code: `const useStore = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));`,
  },
  'Redux Toolkit': {
    detail:
      'createSlice + Immer reducers cut boilerplate; RTK Query colocates API cache with Redux when teams already standardized on Redux DevTools.',
    code: `const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as Item[] },
  reducers: {
    add(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
  },
});`,
  },
  'Framer Motion': {
    detail:
      'Animate presence and layout transitions declaratively—respect prefers-reduced-motion by shortening or disabling motion variants.',
    code: `<motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} />`,
  },
  'React Hook Form + UI libs': {
    detail:
      'Controller bridges register() to MUI/Chakra inputs that own internal value state—keeps validation in RHF while using design-system widgets.',
    code: `<Controller
  name="email"
  control={control}
  render={({ field }) => <TextField {...field} label="Email" />}
/>`,
  },
  i18n: {
    detail:
      'react-i18next namespaces split translations; lazy-load locale JSON so English users do not download every language upfront.',
    code: `const { t, i18n } = useTranslation('common');

<button onClick={() => i18n.changeLanguage('es')}>{t('save')}</button>`,
  },
  MDX: {
    detail:
      'Embed interactive React components inside Markdown docs—compile MDX to components at build time for blogs and design system docs.',
    code: `export function BlogPost({ components }: { components: MDXComponents }) {
  return <MDXContent components={components} />;
}`,
  },
  'Micro-frontend integration': {
    detail:
      'Module federation or single-spa shells load remote bundles—pin react/react-dom versions as singletons or hooks break across boundaries.',
    code: `// webpack ModuleFederationPlugin shared: { react: { singleton: true } }`,
  },
  'Electron + React': {
    detail:
      'Renderer runs React; main process holds Node APIs—enable contextIsolation and avoid nodeIntegration in renderer for XSS containment.',
    code: `// preload exposes narrow ipcRenderer API via contextBridge`,
  },
  'React Native architecture': {
    detail:
      'Fabric renderer and TurboModules on the New Architecture reduce async bridge hops—most greenfield apps target New Arch today.',
    code: `import { View, Text } from 'react-native';

export function Hello() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}`,
  },
  Storybook: {
    detail:
      'Develop components in isolation with controls and docs—Chromatic adds visual regression on PRs for design-system teams.',
    code: `export default { component: Button };
export const Primary = { args: { variant: 'primary', children: 'Save' } };`,
  },
  'Design tokens': {
    detail:
      'Style Dictionary exports tokens to CSS variables and TS constants—one source prevents drift between Figma and code.',
    code: `:root {
  --color-brand: #863bff;
  --space-md: 1rem;
}`,
  },
  'CMS headless': {
    detail:
      'Sanity/Contentful content feeds RSC or SSG pages—preview mode shows draft content to editors without publishing.',
    code: `const posts = await sanity.fetch(groq\`*[_type == "post"]\`);`,
  },
  Analytics: {
    detail:
      'Fire page views on route changes in useEffect; honor consent banners and strip PII from event payloads—GDPR applies to client trackers too.',
    code: `const location = useLocation();

useEffect(() => {
  if (consent.analytics) trackPage(location.pathname);
}, [location.pathname, consent.analytics]);`,
  },
};
