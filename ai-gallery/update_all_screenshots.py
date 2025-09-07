#!/usr/bin/env python3
import json

# プレースホルダー画像の定義（各ツールに対して確実に表示される画像URL）
placeholder_images = {
    "claude": "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Claude",
    "chatgpt": "https://via.placeholder.com/600x400/10a37f/ffffff?text=ChatGPT",
    "midjourney": "https://via.placeholder.com/600x400/4c51bf/ffffff?text=Midjourney",
    "github-copilot": "https://via.placeholder.com/600x400/24292e/ffffff?text=GitHub+Copilot",
    "perplexity": "https://via.placeholder.com/600x400/6b46c1/ffffff?text=Perplexity",
    "gemini": "https://via.placeholder.com/600x400/4285f4/ffffff?text=Gemini",
    "dall-e-3": "https://via.placeholder.com/600x400/10a37f/ffffff?text=DALL-E+3",
    "stable-diffusion": "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Stable+Diffusion",
    "cursor": "https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Cursor",
    "v0": "https://via.placeholder.com/600x400/18181b/ffffff?text=v0",
    "leonardo-ai": "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Leonardo+AI",
    "notion-ai": "https://via.placeholder.com/600x400/000000/ffffff?text=Notion+AI",
    "elevenlabs": "https://via.placeholder.com/600x400/1f2937/ffffff?text=ElevenLabs",
    "gamma": "https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Gamma",
    "poe": "https://via.placeholder.com/600x400/ef4444/ffffff?text=Poe",
    "copilot": "https://via.placeholder.com/600x400/0078d4/ffffff?text=Microsoft+Copilot",
    "jasper": "https://via.placeholder.com/600x400/7c2d92/ffffff?text=Jasper+AI",
    "writesonic": "https://via.placeholder.com/600x400/6366f1/ffffff?text=Writesonic",
    "copy-ai": "https://via.placeholder.com/600x400/00d4aa/ffffff?text=Copy.ai",
    "character-ai": "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Character+AI",
    "you-com": "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=You.com",
    "quillbot": "https://via.placeholder.com/600x400/059669/ffffff?text=QuillBot",
    "deepl-write": "https://via.placeholder.com/600x400/0f172a/ffffff?text=DeepL+Write",
    "rytr": "https://via.placeholder.com/600x400/dc2626/ffffff?text=Rytr",
    "lex": "https://via.placeholder.com/600x400/374151/ffffff?text=Lex",
    "ideogram": "https://via.placeholder.com/600x400/f97316/ffffff?text=Ideogram",
    "playground-ai": "https://via.placeholder.com/600x400/14b8a6/ffffff?text=Playground+AI",
    "bing-image-creator": "https://via.placeholder.com/600x400/0078d4/ffffff?text=Bing+Image+Creator",
    "adobe-firefly": "https://via.placeholder.com/600x400/ff0000/ffffff?text=Adobe+Firefly",
    "lexica": "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Lexica",
    "nightcafe": "https://via.placeholder.com/600x400/1e293b/ffffff?text=NightCafe",
    "artbreeder": "https://via.placeholder.com/600x400/7c2d92/ffffff?text=Artbreeder",
    "kaiber": "https://via.placeholder.com/600x400/dc2626/ffffff?text=Kaiber",
    "replit": "https://via.placeholder.com/600x400/f97316/ffffff?text=Replit",
    "codeium": "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Codeium",
    "tabnine": "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Tabnine",
    "amazon-codewhisperer": "https://via.placeholder.com/600x400/ff9900/ffffff?text=CodeWhisperer",
    "mintlify": "https://via.placeholder.com/600x400/10b981/ffffff?text=Mintlify",
    "murf-ai": "https://via.placeholder.com/600x400/6366f1/ffffff?text=Murf+AI",
    "descript": "https://via.placeholder.com/600x400/ef4444/ffffff?text=Descript",
    "synthesia": "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Synthesia",
    "runway": "https://via.placeholder.com/600x400/10b981/ffffff?text=Runway",
    "julius-ai": "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Julius+AI",
    "rows-ai": "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Rows+AI",
    "obviously-ai": "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Obviously+AI",
    "polymersearch": "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Polymer+Search",
    "tome": "https://via.placeholder.com/600x400/6366f1/ffffff?text=Tome",
    "beautiful-ai": "https://via.placeholder.com/600x400/ec4899/ffffff?text=Beautiful.AI",
    "otter-ai": "https://via.placeholder.com/600x400/059669/ffffff?text=Otter.ai"
}

# tools.jsonファイルを読み込み
with open('data/tools.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 各ツールのスクリーンショットを更新
updated_count = 0
for tool in data['tools']:
    tool_id = tool['id']
    if tool_id in placeholder_images:
        old_screenshot = tool['screenshot']
        tool['screenshot'] = placeholder_images[tool_id]
        print(f"Updated {tool['name']}: {old_screenshot} -> {placeholder_images[tool_id]}")
        updated_count += 1
    else:
        print(f"Warning: No placeholder image defined for {tool_id}")

# ファイルに書き戻し
with open('data/tools.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n✅ Successfully updated {updated_count} tool screenshots!")
print("All screenshots now use reliable placeholder images that are guaranteed to display.")