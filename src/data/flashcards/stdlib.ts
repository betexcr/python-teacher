import type { FlashcardDeck } from './types';

export const stdlibDeck: FlashcardDeck = {
  "id": "stdlib",
  "slug": "stdlib",
  "title": "Standard Library",
  "cards": [
    {
      "question": "pathlib vs os.path?",
      "explanation": "pathlib.Path is object-oriented, cross-platform, readable. Prefer Path.read_text, / operator for joining segments.\n\n```python\nfrom pathlib import Path\n\nroot = Path(\"src\") / \"app\"\nfor py in root.rglob(\"*.py\"):\n    print(py)\n```"
    },
    {
      "question": "json module essentials?",
      "explanation": "json.loads/dumps for str; load/dump for file objects. default= for non-serializable types; use datetime.isoformat pattern.\n\n```python\nimport json\n\ndata = json.loads('{\"a\": 1}')\njson.dumps(data, indent=2)\n```"
    },
    {
      "question": "datetime best practices?",
      "explanation": "Store UTC internally; use datetime.timezone.utc or zoneinfo. Never mix naive and aware datetimes without conversion.\n\n```python\nfrom datetime import datetime, timezone\n\nnow = datetime.now(timezone.utc)\n```"
    },
    {
      "question": "re module basics?",
      "explanation": "re.compile for reuse. raw strings for patterns. Prefer re.search/finditer over match when pattern not anchored.\n\n```python\nimport re\n\nEMAIL = re.compile(r\"[\\w.-]+@[\\w.-]+\")\nEMAIL.search(text)\n```"
    },
    {
      "question": "itertools highlights?",
      "explanation": "chain, islice, groupby (requires sorted input), product, combinations—lazy iterator building blocks.\n\n```python\nfrom itertools import islice\n\nlist(islice(range(100), 5))  # first 5\n```"
    },
    {
      "question": "functools highlights?",
      "explanation": "partial, wraps, lru_cache, cache, reduce, singledispatch (overloaded functions by first arg type).\n\n```python\nfrom functools import singledispatch\n\n@singledispatch\ndef serialize(obj): ...\n```"
    },
    {
      "question": "contextlib utilities?",
      "explanation": "contextmanager decorator, suppress for ignored exceptions, ExitStack for dynamic context manager lists.\n\n```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef temp_env(**env):\n    ...\n```"
    },
    {
      "question": "logging vs print?",
      "explanation": "logging supports levels, handlers, structured fields, rotation. Configure once at app entry; use logger = logging.getLogger(__name__).\n\n```python\nimport logging\n\nlog = logging.getLogger(__name__)\nlog.info(\"started\", extra={\"user_id\": uid})\n```"
    },
    {
      "question": "subprocess safety?",
      "explanation": "Prefer subprocess.run with list args (no shell=True unless necessary). capture_output, check, timeout parameters.\n\n```python\nimport subprocess\n\nsubprocess.run([\"git\", \"status\"], check=True, capture_output=True, text=True)\n```"
    },
    {
      "question": "tempfile and shutil?",
      "explanation": "TemporaryDirectory/NamedTemporaryFile for scratch space. shutil.copytree, rmtree, disk_usage for filesystem ops."
    },
    {
      "question": "secrets module?",
      "explanation": "Cryptographically strong random for tokens/passwords. Never use random module for security-sensitive values.\n\n```python\nimport secrets\n\ntoken = secrets.token_urlsafe(32)\n```"
    },
    {
      "question": "hashlib for checksums?",
      "explanation": "hashlib.sha256(data).hexdigest() for file integrity. Use hmac for keyed authentication.\n\n```python\nimport hashlib\n\nhashlib.sha256(b\"data\").hexdigest()\n```"
    },
    {
      "question": "dataclasses vs attrs?",
      "explanation": "dataclasses in stdlib covers most needs. attrs/third-party pydantic add validators, converters, richer ecosystem."
    },
    {
      "question": "enum, uuid, csv?",
      "explanation": "uuid.uuid4() for IDs. csv.DictReader/Writer for tabular data. enum for constrained constants—common interview trio.\n\n```python\nimport uuid\n\nuid = str(uuid.uuid4())\n```"
    },
    {
      "question": "importlib and packages?",
      "explanation": "__init__.py marks packages (namespace packages optional PEP 420). importlib.import_module for dynamic imports; __all__ controls from pkg import *."
    }
  ]
};
