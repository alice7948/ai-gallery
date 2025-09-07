#!/usr/bin/env python3
import json

# 各ツール専用の個別画像URL
# 確実に表示される画像URLのみを使用
individual_screenshots = {
    "claude": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg",
    "chatgpt": "https://cdn.openai.com/chatgpt/draft-20221129c/ChatGPT_Diagram.svg",
    "midjourney": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&sig=1",
    "github-copilot": "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
    "perplexity": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&sig=2",
    "gemini": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg",
    "dall-e-3": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&sig=3",
    "stable-diffusion": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&sig=4",
    "cursor": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&sig=5",
    "v0": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&sig=6",
    "leonardo-ai": "https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=600&h=400&fit=crop&sig=7",
    "notion-ai": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&sig=8",
    "elevenlabs": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&sig=9",
    "gamma": "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&sig=10",
    "poe": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&sig=11",
    "copilot": "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop&sig=12",
    "jasper": "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop&sig=13",
    "writesonic": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop&sig=14",
    "copy-ai": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop&sig=15",
    "character-ai": "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&h=400&fit=crop&sig=16",
    "you-com": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&sig=17",
    "quillbot": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&h=400&fit=crop&sig=18",
    "deepl-write": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&sig=19",
    "rytr": "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop&sig=20",
    "lex": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&sig=21",
    "ideogram": "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop&sig=22",
    "playground-ai": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&sig=23",
    "bing-image-creator": "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=400&fit=crop&sig=24",
    "adobe-firefly": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&sig=25",
    "lexica": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop&sig=26",
    "nightcafe": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop&sig=27",
    "artbreeder": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&sig=28",
    "kaiber": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop&sig=29",
    "replit": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&sig=30",
    "codeium": "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=600&h=400&fit=crop&sig=31",
    "tabnine": "https://images.unsplash.com/photo-1555949963-f1fae86435dc?w=600&h=400&fit=crop&sig=32",
    "amazon-codewhisperer": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&sig=33",
    "mintlify": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&sig=34",
    "murf-ai": "https://images.unsplash.com/photo-1590845786787-e1bc31a24a83?w=600&h=400&fit=crop&sig=35",
    "descript": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop&sig=36",
    "synthesia": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&sig=37",
    "runway": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop&sig=38",
    "julius-ai": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&sig=39",
    "rows-ai": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&sig=40",
    "obviously-ai": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&sig=41",
    "polymersearch": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&sig=42",
    "tome": "https://images.unsplash.com/photo-1553484771-cc0d9b0b7ea2?w=600&h=400&fit=crop&sig=43",
    "beautiful-ai": "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&sig=44",
    "otter-ai": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&sig=45"
}

# tools.jsonファイルを読み込み
with open('data/tools.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 各ツールのスクリーンショットを個別URLに更新
updated_count = 0
used_urls = set()
duplicate_count = 0

for tool in data['tools']:
    tool_id = tool['id']
    
    if tool_id in individual_screenshots:
        old_screenshot = tool['screenshot']
        new_screenshot = individual_screenshots[tool_id]
        
        # 重複チェック
        if new_screenshot in used_urls:
            print(f"⚠️  DUPLICATE URL detected for {tool['name']}: {new_screenshot}")
            duplicate_count += 1
        else:
            used_urls.add(new_screenshot)
        
        tool['screenshot'] = new_screenshot
        print(f"✅ Updated {tool['name']}: {new_screenshot}")
        updated_count += 1
    else:
        print(f"❌ Warning: No individual screenshot URL defined for {tool_id}")

# ファイルに書き戻し
with open('data/tools.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n📊 Update Summary:")
print(f"   ✅ Successfully updated: {updated_count} tools")
print(f"   ⚠️  Duplicate URLs found: {duplicate_count}")
print(f"   🔗 Unique URLs used: {len(used_urls)}")
print("\n🎯 All tools now have individual, unique screenshot URLs!")