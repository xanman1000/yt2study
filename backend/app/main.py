from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

from supabase import create_client, Client
import openai

app = FastAPI()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client | None = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class GuideRequest(BaseModel):
    video_id: str
    title: str | None = None
    user_id: str | None = None

class GuideResponse(BaseModel):
    guide: str

@app.post("/guide", response_model=GuideResponse)
async def generate_guide(req: GuideRequest):
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"https://youtubetranscript.com/?format=json&video_id={req.video_id}"
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Transcript fetch failed")
        data = resp.json()

    transcript = " ".join(item.get("text", "") for item in data.get("transcript", []))
    max_chars = 32000
    chunks = [transcript[i : i + max_chars] for i in range(0, len(transcript), max_chars)]

    openai.api_key = OPENAI_API_KEY
    messages = [
        {
            "role": "system",
            "content": "Return (1) \u2264 120-word exec summary, (2) bullet study guide with timestamps, (3) three related video suggestions (title + URL).",
        }
    ]
    for ch in chunks:
        messages.append({"role": "user", "content": ch})

    completion = await openai.ChatCompletion.acreate(
        model="gpt-4o", messages=messages
    )
    guide_text = completion.choices[0].message.content

    if supabase and req.user_id:
        supabase.table("guides").insert(
            {
                "user_id": req.user_id,
                "video_id": req.video_id,
                "title": req.title or "",
                "guide": guide_text,
            }
        ).execute()

    return {"guide": guide_text}
