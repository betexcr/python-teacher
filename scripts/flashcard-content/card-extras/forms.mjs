export const formsExtras = {
  'Controlled form fields': {
    detail:
      'value + onChange ties inputs to React state so validation and submit payloads stay consistent—every keystroke re-renders unless you optimize hot paths.',
    code: `const [email, setEmail] = useState('');

return (
  <input
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
);`,
  },
  'react-hook-form': {
    detail:
      'register() uses refs for inputs to cut re-renders; zodResolver connects schema validation—Controller wraps MUI/Chakra when third-party inputs manage their own value.',
    code: `const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  {errors.email && <span>{errors.email.message}</span>}
</form>`,
  },
  'Zod + forms': {
    detail:
      'One schema drives runtime validation and z.infer types—change the schema once instead of duplicating TS interfaces and manual checks.',
    code: `const schema = z.object({
  email: z.string().email(),
  age: z.coerce.number().min(18),
});

type FormData = z.infer<typeof schema>;`,
  },
  'Field-level vs form-level validation': {
    detail:
      'Validate on blur for friendly UX; run full schema on submit to catch cross-field rules like password confirm—map Zod issues to field paths.',
    code: `const onBlur = async (name: keyof FormData) => {
  await trigger(name);
};

<button type="submit" onClick={handleSubmit(onValid, onInvalid)}>Save</button>`,
  },
  'Touched/dirty flags': {
    detail:
      'Show errors only after touch to avoid screaming red on first paint—dirty means the user changed the value from the default.',
    code: `{touchedFields.email && errors.email && (
  <p id="email-error">{errors.email.message}</p>
)}`,
  },
  'Async validation': {
    detail:
      'Debounce username availability checks on blur—cancel in-flight requests when the user types again to avoid showing stale "taken" results.',
    code: `const checkUsername = useMemo(
  () => debounce(async (name: string) => {
    const ok = await api.isAvailable(name);
    setError(ok ? undefined : 'Username taken');
  }, 400),
  []
);`,
  },
  'Form state machines': {
    detail:
      'Multi-step wizards with branching (billing vs shipping) stay maintainable as explicit states and events—XState shines when flows exceed three steps.',
    code: `const [step, send] = useReducer(wizardReducer, { name: 'contact' });

<button onClick={() => send({ type: 'NEXT' })}>Continue</button>`,
  },
  'File inputs': {
    detail:
      'Files are awkward to control fully—store File in state on change or use uncontrolled ref and read files on submit for uploads.',
    code: `const [file, setFile] = useState<File | null>(null);

<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
/>`,
  },
  'Native form validation': {
    detail:
      'required, minLength, and pattern give free UX before JS—still re-validate on the server; native messages need styling or reportValidity for polish.',
    code: `<input type="email" required pattern="[^@]+@[^@]+" />`,
  },
  'Accessibility in forms': {
    detail:
      'Associate labels with htmlFor, wire aria-invalid and aria-describedby to error text—screen readers announce errors only when ids match.',
    code: `<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && <p id="email-error">{errors.email.message}</p>}`,
  },
  'Reset form': {
    detail:
      'RHF reset(defaultValues) restores fields; remounting with key={userId} clears stubborn uncontrolled widgets when switching records.',
    code: `useEffect(() => {
  reset(defaultValuesForUser(user));
}, [user, reset]);

// Or: <Form key={user.id} />`,
  },
  'Dynamic fields': {
    detail:
      'useFieldArray manages repeatable sections (line items, attendees)—each row needs stable keys from field.id, not array index alone.',
    code: `const { fields, append, remove } = useFieldArray({ control, name: 'items' });

{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(\`items.\${index}.name\` as const)} />
    <button type="button" onClick={() => remove(index)}>Remove</button>
  </div>
))}`,
  },
  'Server Actions forms': {
    detail:
      'Plain <form action={serverFn}> works without JS; pending spinners and useActionState need a client boundary—progressive enhancement first.',
    code: `'use client';

export function ContactForm({ action }: { action: (fd: FormData) => Promise<void> }) {
  const [pending, start] = useTransition();
  return (
    <form action={(fd) => start(() => action(fd))}>
      <button disabled={pending}>Send</button>
    </form>
  );
}`,
  },
  'Prevent double submit': {
    detail:
      'Disable the submit button while isSubmitting or an action is pending—guards against duplicate charges when users double-click impatiently.',
    code: `<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Saving…' : 'Save'}
</button>`,
  },
};
