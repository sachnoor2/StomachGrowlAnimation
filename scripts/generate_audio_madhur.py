#!/usr/bin/env python3
import asyncio
import edge_tts
import os
import subprocess
from pathlib import Path

FPS = 60
AUDIO_DIR = Path("public/audio")
SEG_DIR = AUDIO_DIR / "segments"
TOTAL_FRAMES = 2700

AUDIO_DIR.mkdir(parents=True, exist_ok=True)
SEG_DIR.mkdir(parents=True, exist_ok=True)

SCENES = [
    { "id": "s01", "fs": 15,   "fe": 180,  "text": "क्या आपको लगता है कि पेट की गुड़गुड़ाहट का मतलब सिर्फ भूख है? आप गलत हैं।" },
    { "id": "s02", "fs": 220,  "fe": 480,  "text": "इसे 'Bor-bo-ryg-mus' कहते हैं, और ये असल में आपकी आंतों की सफाई का शोर है।" },
    { "id": "s03", "fs": 520,  "fe": 800,  "text": "जब आपका पेट खाली होता है, तो मांसपेशियां एक सफाई अभियान शुरू करती हैं।" },
    { "id": "s04", "fs": 840,  "fe": 1100, "text": "ये आंतों के बचे हुए खाने और बैक्टीरिया को आगे धकेलती हैं।" },
    { "id": "s05", "fs": 1140, "fe": 1400, "text": "लेकिन क्योंकि वहां खाना नहीं होता, सिर्फ हवा और तरल पदार्थ होते हैं..." },
    { "id": "s06", "fs": 1440, "fe": 1700, "text": "तो वो एक खाली गुफा की तरह गूंजते हैं।" },
    { "id": "s07", "fs": 1740, "fe": 2050, "text": "यही वो आवाज़ है जो आपको सुनाई देती है।" },
    { "id": "s08", "fs": 2090, "fe": 2350, "text": "तो अगली बार जब पेट गुड़गुड़ाए, तो समझ लें कि आपकी बॉडी क्लीनिंग मोड में है।" },
    { "id": "s09", "fs": 2390, "fe": 2650, "text": "सब्सक्राइब करें ऐसी और जानकारी के लिए!" },
]

VOICE_ID = "hi-IN-MadhurNeural"

async def main():
    print(f"── Generating Hindi Narration with Madhur (Azure) ──")
    for sc in SCENES:
        print(f"  Synthesizing {sc['id']}...")
        communicate = edge_tts.Communicate(sc["text"], VOICE_ID, rate="+5%")
        await communicate.save(str(SEG_DIR / f"{sc['id']}.mp3"))

    total_s = TOTAL_FRAMES / FPS
    inputs, filter_parts, labels = [], [], []
    for idx, sc in enumerate(SCENES):
        seg = SEG_DIR / f"{sc['id']}.mp3"
        start_ms = int(sc["fs"] / FPS * 1000)
        inputs += ["-i", str(seg)]
        filter_parts.append(f"[{idx}]adelay={start_ms}|{start_ms}[d{idx}]")
        labels.append(f"[d{idx}]")

    fc = ";".join(filter_parts) + ";" + "".join(labels) + f"amix=inputs={len(SCENES)}:normalize=0[out]"
    output_path = AUDIO_DIR / "narration_final.mp3"
    subprocess.run(["ffmpeg", "-y"] + inputs + ["-filter_complex", fc, "-map", "[out]", "-t", str(total_s), "-b:a", "192k", str(output_path)], check=True)
    print(f"✅ Audio pipeline complete: {output_path}")

if __name__ == "__main__":
    asyncio.run(main())
