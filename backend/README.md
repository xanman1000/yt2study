# Backend

FastAPI service providing the `/guide` endpoint.

## Setup
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Environment variables expected:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`
