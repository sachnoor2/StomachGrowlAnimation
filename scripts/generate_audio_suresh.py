import asyncio
import edge_tts
import os

# HINGLISH SCRIPT for Suresh (Urban Indian Accent style)
TEXT = """
क्या आपको पता है कि आपका stomach असल में क्यों growl करता है?
ज़्यादातर लोग सोचते हैं कि ऐसा तब होता है जब हमें भूख लगती है, लेकिन reality इससे अलग है।
अगर आपका पेट empty है, तो आपके brain को signal मिलता है कि खाने का समय है।
लेकिन ये growling sound आपकी digestive system की एक normal बात है!
इसे 'Borborygmus' कहते हैं। यह तब होता है जब आपकी muscles, पेट और intestines में हवा और fluid को आगे धकेलती हैं।
और ये सिर्फ़ भूख लगने पर नहीं होता - ये तब भी हो सकता है जब आप खा चुके हों!
ये आपकी आंतों का 'clearance mode' है, जो बचे हुए खाने और bacteria को साफ़ करता है।
तो अगली बार जब आपका पेट आवाज़ करे, तो समझ जाइये कि आपकी cleaning team काम पर है!
सब्सक्राइब करना न भूलें!
"""

VOICE = "hi-IN-SureshNeural"
OUTPUT_FILE = "public/audio/suresh_full.mp3"

async def generate_audio():
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Adding a slight rate increase for a more punchy Hinglish delivery
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="+5%")
    await communicate.save(OUTPUT_FILE)
    print(f"Hinglish Audio saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
