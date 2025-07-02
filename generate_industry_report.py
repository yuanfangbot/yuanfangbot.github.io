import json
import os
import argparse
from datetime import datetime

def initialize_articles_file():
    """初始化articles.json文件"""
    if not os.path.exists('articles.json'):
        with open('articles.json', 'w', encoding='utf-8') as f:
            json.dump({"articles": []}, f, ensure_ascii=False, indent=2)
        print("已创建新的articles.json文件")

def add_article(title=None, content=None):
    try:
        if not title or not content:
            print("=== 添加新文章 ===")
            title = input("请输入文章标题: ").strip()
            content = input("请输入文章内容: ").strip()
            
            if not title or not content:
                print("错误：标题和内容不能为空")
                return
            
        # 初始化文件（如果不存在）
        initialize_articles_file()
        
        # 读取现有文章
        try:
            with open('articles.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
        except json.JSONDecodeError:
            print("错误：articles.json文件格式不正确")
            return
            
        # 生成新文章ID
        new_id = 1
        if data['articles']:
            new_id = max(article['id'] for article in data['articles']) + 1
        
        # 添加新文章
        new_article = {
            "id": new_id,
            "title": title,
            "content": content,
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        data['articles'].append(new_article)
        
        # 保存更新
        with open('articles.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"文章 '{title}' 已成功添加!")
        
    except Exception as e:
        print(f"发生错误: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='文章生成工具')
    parser.add_argument('--title', help='文章标题')
    parser.add_argument('--content', help='文章内容')
    args = parser.parse_args()
    
    if args.title and args.content:
        add_article(args.title, args.content)
    else:
        add_article()