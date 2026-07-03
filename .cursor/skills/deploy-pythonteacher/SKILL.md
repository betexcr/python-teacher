---
name: deploy-pythonteacher
description: Deploy PythonTeacher to Vercel production. Use when the user asks to deploy python-teacher.
---

# Deploy PythonTeacher

```powershell
cd c:\Code\python-teacher
npm run build
npx vercel deploy --prod --yes
```

Project alias: https://pythonprep.vercel.app

Only push/commit when the user explicitly asks.
