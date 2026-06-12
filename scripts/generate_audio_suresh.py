import asyncio
import edge_tts

TEXT = """
क्या आपको पता है कि आपका पेट असल में क्यों गुड़गुड़ाता है?
ज्यादातर लोग सोचते हैं कि ऐसा तब होता है जब हमें भूख लगती है, लेकिन असलियत इससे कहीं ज़्यादा दिलचस्प है।
इसे 'बोरबोरिग्मस' कहते हैं। यह तब होता है जब आपकी मांसपेशियाँ पेट और आंतों में हवा और तरल पदार्थ को आगे ढकेलती हैं।
ये आपकी आंतों का 'क्लीयरेंस मोड' है, जो बचे हुए खाने और बैक्टीरिया को साफ करता है।
तो अगली बार जब आपका पेट आवाज़ करे, तो समझ जाइये कि आपकी सफाई टीम काम पर है!
सब्सक्राइब करना न भूलें!
"""

VOICE = "hi-IN-SureshNeural"
OUTPUT_FILE = "public/audio/suresh_full.mp3"

async def generate_audio():
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="+0%")
    await communicate.save(OUTPUT_FILE)
    print(f"Audio saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
